function Answer({ questions, dispatch, answer }) {
  const ifAnswered = answer !== null;

  return (
    <div>
      {" "}
      <div className="options">
        {questions.options.map((questionOption, index) => (
          <button
            disabled={ifAnswered}
            key={index}
            onClick={() => dispatch({ type: "SELECTEDANSWER", payload: index })}
            className={` btn btn-option  ${
              ifAnswered
                ? index === questions.correctOption
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
