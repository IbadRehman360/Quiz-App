import React from "react";
import Answer from "./Answer";
import { useQuiz } from "../context/QuizContext";

function Question() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);
  return (
    <div>
      <h4>{question.question}</h4>
      <Answer question={question} />
    </div>
  );
}

export default Question;
