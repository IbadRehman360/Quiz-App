import { useQuiz } from "../context/QuizContext";

function Answer({ question }) {
  const { dispatch, answer } = useQuiz();
  const ifAnswered = answer !== null;

  return (
    <div>
      {" "}
      <div className="options">
        {question.options.map((questionOption, index) => (
          <button
            disabled={ifAnswered}
            key={index}
            onClick={() => dispatch({ type: "SELECTEDANSWER", payload: index })}
            className={` btn btn-option  ${
              ifAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
          >
            {questionOption}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Answer;
