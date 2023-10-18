const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.partName} {props.numExercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part partName={props.partName1} numExercises={props.numExercises1} />
      <Part partName={props.partName2} numExercises={props.numExercises2} />
      <Part partName={props.partName3} numExercises={props.numExercises3} />
    </div>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content
        partName1={part1.name}
        numExercises1={part1.exercises}
        partName2={part2.name}
        numExercises2={part2.exercises}
        partName3={part3.name}
        numExercises3={part3.exercises}
      />
      <Total
        numExercises1={part1.exercises}
        numExercises2={part2.exercises}
        numExercises3={part3.exercises}
      />
    </div>
  );
};

export default App;
