import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ value, text }) => (
  <p>
    {text} {value}
  </p>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedback = () => setGood(good + 1);
  const neutralFeedback = () => setNeutral(neutral + 1);
  const badFeedback = () => setBad(bad + 1);

  const sum = good + neutral + bad;
  const average = (good - bad) / sum;
  const positive = (good / sum) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodFeedback} text="good" />
      <Button handleClick={neutralFeedback} text="neutral" />
      <Button handleClick={badFeedback} text="bad" />
      <h1>statistics</h1>
      <Statistics value={good} text="good" />
      <Statistics value={neutral} text="neutral" />
      <Statistics value={bad} text="bad" />
      <Statistics value={sum} text="all" />
      <Statistics value={average} text="average" />
      <Statistics value={positive + " %"} text="positive" />
    </div>
  );
};

export default App;
