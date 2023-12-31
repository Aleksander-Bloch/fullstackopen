import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function handleNextAnecdote() {
    const anecdoteIndex = getRandomIntInclusive(0, anecdotes.length - 1);
    setSelected(anecdoteIndex);
  }

  function handleVote() {
    const nextVotes = [...votes];
    nextVotes[selected]++;
    setVotes(nextVotes);
  }

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const mostVotesIndex = votes.reduce(
    (prevMostVotesIndex, curVotes, curIndex) =>
      curVotes > votes[prevMostVotesIndex] ? curIndex : prevMostVotesIndex,
    0
  );

  return (
    <>
      <h1>Anecdotes App</h1>
      <Anecdote
        title="Anecdote of the day"
        content={anecdotes[selected]}
        numVotes={votes[selected]}
      />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <Anecdote
        title="Anecdote with most votes"
        content={anecdotes[mostVotesIndex]}
        numVotes={votes[mostVotesIndex]}
      />
    </>
  );
};

const Anecdote = ({ title, content, numVotes }) => (
  <>
    <h2>{title}</h2>
    <div>{content}</div>
    <div>has {numVotes} votes</div>
  </>
);

export default App;
