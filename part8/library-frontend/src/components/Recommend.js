import "../styles.css";

const Recommend = (props) => {
  if (!props.show) {
    return null;
  }

  const books = props.books;
  const filter = props.user.favouriteGenre;

  const filteredBooks = filter
    ? books.filter((book) => book.genres.includes(filter))
    : books;

  return (
    <div>
      <h2>Recommended Titles</h2>
      <span>
        Books from your favourite genre: <strong>{filter}</strong>
      </span>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
