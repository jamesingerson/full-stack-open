import { useState } from "react";
import "../styles.css";

const Books = (props) => {
  const [filter, setFilter] = useState("");

  if (!props.show) {
    return null;
  }

  const books = props.books;
  const allGenres = new Set(books.map((book) => book.genres).flat());

  const filteredBooks = filter
    ? books.filter((book) => book.genres.includes(filter))
    : books;
  console.log(filteredBooks);

  const filterChange = (filter) => {
    setFilter(filter);
  };

  return (
    <div>
      <h2>books</h2>

      {!!filter && (
        <span>
          Filtered to show: <strong>{filter}</strong>
        </span>
      )}

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
      {[...allGenres].map((genre) => (
        <button
          key={genre}
          onClick={() => filterChange(genre)}
          className={genre === filter ? "active" : ""}
        >
          {genre}
        </button>
      ))}
      <button
        onClick={() => filterChange("")}
        className={!filter ? "active" : ""}
      >
        All Genres
      </button>
    </div>
  );
};

export default Books;
