import React from "react";
import Answer from "./Answer";

function Question({ questions, dispatch, answer }) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Answer questions={questions} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
