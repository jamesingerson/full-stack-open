import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import {
  createNotification,
  clearNotification,
} from "../reducers/notificationReducer";

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
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const handleClick = (anecdote) => {
    dispatch(voteFor(anecdote.id));
    dispatch(createNotification(`voted for ${anecdote.content}`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
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
