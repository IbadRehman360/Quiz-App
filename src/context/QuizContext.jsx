import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create a QuizContext to provide state and actions to components
const QuizContext = createContext();

const PER_QUESTION_TIMESTAMP = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  points: 0,
  answer: null,
  highestpoints: 0,
  time: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DATA":
      return { ...state, questions: action.payload, status: "ready" };

    case "ERROR":
      return { ...state, status: "error" };

    case "START":
      return {
        ...state,
        status: "active",
        time: state.questions.length * PER_QUESTION_TIMESTAMP,
      };

    case "SELECTEDANSWER":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "NEXT":
      return { ...state, index: state.index + 1, answer: null };
    case "FINISHED":
      return {
        ...state,
        status: "finished",
        highestpoints:
          state.points > state.highestpoints
            ? state.points
            : state.highestpoints,
      };
    case "RESTART":
      return { ...initialState, status: "ready", questions: state.questions };
    case "TIME":
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? "finished" : state.status,
      };
    default:
      return state;
  }
};

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3089/questions");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dispatch({ type: "DATA", payload: data });
      } catch (err) {
        dispatch({ type: "ERROR", payload: err });
      }
    };

    fetchData();
  }, []);

  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("Quiz context is undefined or not defined");
  }
  return context;
}

export { useQuiz, QuizProvider };
