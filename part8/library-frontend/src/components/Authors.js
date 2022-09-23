import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_BIRTH_YEAR, ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (!props.show) {
    return null;
  }

  const authors = props.authors;

  const submit = async (event) => {
    event.preventDefault();

    editBirthYear({
      variables: { name, born: parseInt(born) },
    });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {props.canEdit && (
        <form onSubmit={submit}>
          <h2>Set Birth Year</h2>
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <div>
            Born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">Update Author</button>
        </form>
      )}
    </div>
  );
};

export default Authors;
