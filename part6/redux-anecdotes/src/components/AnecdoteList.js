import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  let anecdotesToDisplay = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const filter = useSelector((state) => state.filter);
  if (filter) {
    anecdotesToDisplay = anecdotesToDisplay.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const handleClick = (anecdote) => {
    dispatch(voteForAnecdote(anecdote));
    dispatch(setNotification(`voted for ${anecdote.content}`, 5));
  };

  return (
    <>
      {anecdotesToDisplay.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleClick(anecdote)}
        />
      ))}
    </>
  );
};

export default Anecdotes;
