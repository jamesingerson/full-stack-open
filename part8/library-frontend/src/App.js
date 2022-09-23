import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import { useApolloClient, useQuery } from "@apollo/client";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const client = useApolloClient();

  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  });

  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors
        show={page === "authors"}
        authors={authors.data.allAuthors}
        canEdit={!!token}
      />

      <Books show={page === "books"} books={books.data.allBooks} />

      <NewBook show={page === "add"} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
