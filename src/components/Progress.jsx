import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { points, index, questions } = useQuiz();
  const numQuestions = questions.length;
  const totalpoints = questions.reduce((perv, cur) => perv + cur.points, 0);
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
