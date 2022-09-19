const { ApolloServer, UserInputError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

const password = process.argv[2];

const MONGODB_URI = `mongodb+srv://fullstackopen:${password}@cluster1.k6btj.mongodb.net/libraryApp?retryWrites=true&w=majority`;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author", {
          name: 1,
          id: 1,
          born: 1,
          bookCount: 1,
        });
      }
      let filteredBooks = await Book.find({}).populate("author", {
        name: 1,
        id: 1,
        born: 1,
        bookCount: 1,
      });
      const author = await Author.findOne({ name: args.author });
      args.author &&
        (filteredBooks = filteredBooks.filter(
          (book) => book.author.name === author.name
        ));
      args.genre &&
        (filteredBooks = filteredBooks.filter((book) =>
          book.genres.includes(args.genre)
        ));
      return filteredBooks;
    },

    allAuthors: async () => {
      return Author.find({});
    },
  },

  Author: {
    bookCount: async (root) => {
      return Book.collection.countDocuments({ author: root._id });
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const book = new Book({ ...args, author });
      await book.save();
      return book;
    },

    editAuthor: async (root, args) => {
      const filter = { name: args.name };
      const update = { born: args.setBornTo };
      const author = await Author.findOneAndUpdate(filter, update, {
        returnOriginal: false,
      });

      if (!author) {
        return null;
      }

      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
