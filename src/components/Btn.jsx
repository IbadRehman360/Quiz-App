import { useQuiz } from "../context/QuizContext";

function NextBtn() {
  const { dispatch, answer, index, questions } = useQuiz();
  const numQuestions = questions.length;

  if (answer === null) {
    return null;
  }

  if (index < numQuestions - 1) {
    return (
      <div>
        <button
          onClick={() => dispatch({ type: "NEXT" })}
          className="btn btn-ui"
        >
          Next
        </button>
      </div>
    );
  } else if (index === numQuestions - 1) {
    return (
      <div>
        <button
          onClick={() => dispatch({ type: "FINISHED" })}
          className="btn btn-ui"
        >
          Finished
        </button>
      </div>
    );
  }
}

export default NextBtn;
