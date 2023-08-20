function Progress({ index, numQuestions, totalpoints, points }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index}></progress>

      <p>
        Questions <strong> {index} </strong> / {numQuestions}
      </p>
      <p>
        {" "}
        <strong> {points} </strong> / {totalpoints}
      </p>
    </header>
  );
}

export default Progress;
