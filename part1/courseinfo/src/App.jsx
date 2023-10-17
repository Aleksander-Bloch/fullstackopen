const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      <p>
        {props.partName1} {props.numExercises1}
      </p>
      <p>
        {props.partName2} {props.numExercises2}
      </p>
      <p>
        {props.partName3} {props.numExercises3}
      </p>
    </>
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
      <Content
        partName1={part1}
        numExercises1={exercises1}
        partName2={part2}
        numExercises2={exercises2}
        partName3={part3}
        numExercises3={exercises3}
      />
      <Total
        numExercises1={exercises1}
        numExercises2={exercises2}
        numExercises3={exercises3}
      />
    </div>
  );
};

export default App;
