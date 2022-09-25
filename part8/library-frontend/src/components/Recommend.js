import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS, ME } from "../queries";
import "../styles.css";

const Recommend = (props) => {
  const [fetchBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "no-cache",
  });
  const [recommendbooks, setRecommendBooks] = useState([]);
  const [favouriteGenre, setFavouriteGenre] = useState("");

  const user = useQuery(ME);

  useEffect(() => {
    if (user.data) {
      setFavouriteGenre(user.data.me?.favouriteGenre);
      fetchBooks({ variables: { genre: favouriteGenre } });
    }
  }, [fetchBooks, favouriteGenre, user.data]);

  useEffect(() => {
    if (result.data) {
      setRecommendBooks(result.data.allBooks);
    }
  }, [result]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Recommended Titles</h2>
      <span>
        Books from your favourite genre: <strong>{favouriteGenre}</strong>
      </span>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendbooks.map((book) => (
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
