import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS } from "../queries";
import "../styles.css";

const Books = (props) => {
  const [filter, setFilter] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [fetchBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (result.data) {
      setFilteredBooks(result.data.allBooks);
    } else if (filter === "") {
      setFilteredBooks(props.allBooks);
    }
  }, [filter, props.allBooks, result]);

  const allGenres = new Set(props.allBooks.map((book) => book.genres).flat());

  const filterChange = (filter) => {
    setFilter(filter);
    fetchBooks({ variables: { genre: filter } });
  };

  if (!props.show) {
    return null;
  }

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
