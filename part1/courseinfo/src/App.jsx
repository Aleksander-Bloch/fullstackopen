const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <p>
      {props.partName} {props.numExercises}
    </p>
  );
};

const Total = (props) => {
  return (
    <p>
      Numer of exercises{' '}
      {props.numExercises1 + props.numExercises2 + props.numExercises3}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content partName={part1} numExercises={exercises1} />
      <Content partName={part2} numExercises={exercises2} />
      <Content partName={part3} numExercises={exercises3} />
      <Total
        numExercises1={exercises1}
        numExercises2={exercises2}
        numExercises3={exercises3}
      />
    </div>
  );
};

export default App;
