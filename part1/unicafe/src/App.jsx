import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function handleGoodClick() {
    setGood(good + 1);
  }

  function handleNeutralClick() {
    setNeutral(neutral + 1);
  }

  function handleBadClick() {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

export default App;