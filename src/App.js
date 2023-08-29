import React, { useEffect, useReducer } from 'react';
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"
import Question from './Question';
import NextBtn from './Btn';
import Progress from './Progress';
import Result from './Result';
import Time from './Time';

const PER_QUESTION_TIMESTAMP = 30


const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  points: 0,
  answer: null,
  highestpoints: 0,
  time: null
};

const reducer = (state, action) => {
  switch (action.type) {

    case "DATA":
      return { ...state, questions: action.payload, status: "ready" };

    case "ERROR":
      return { ...state, status: "error" };

    case "START":
      return { ...state, status: "active", time: state.questions.length * PER_QUESTION_TIMESTAMP };

    case "SELECTEDANSWER":
      const question = state.questions.at(state.index)
      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points }

    case "NEXT":
      return { ...state, index: state.index + 1, answer: null }
    case "FINISHED":
      return { ...state, status: "finished", highestpoints: state.points > state.highestpoints ? state.points : state.highestpoints }
    case "RESTART":
      return { ...initialState, status: "ready", questions: state.questions }
    case "TIME":
      return {
        ...state, time: state.time - 1, status: state.time === 0 ? "finished" : state.status
      }
    default:
      return state

  }
};

export default function App() {
  const [{ questions, status, index, answer, points, highestpoints, time }, dispatch] = useReducer(reducer, initialState);
  const questionLength = questions.length
  const totalpoints = questions.reduce((perv, cur) => perv + cur.points, 0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3089/questions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch({ type: 'DATA', payload: data });

      } catch (err) {
        dispatch({ type: 'ERROR', payload: err });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main >
        {
          status === "loading" && <Loader />
        }
        {
          status === "error" && <Error />
        }
        {
          status === "ready" &&
          <StartScreen numQuestions={questionLength} dispatch={dispatch} />
        }
        {
          status === "active" &&
          <>
            <Progress index={index} points={points} numQuestions={questionLength} totalpoints={totalpoints} />
            <Question questions={questions[index]} dispatch={dispatch} answer={answer} />
            <NextBtn answer={answer} dispatch={dispatch} index={index} numQuestions={questionLength} />
            <Time dispatch={dispatch} time={time} />
          </>
        }
        {
          status === "finished" && <Result points={points} totalpoints={totalpoints} dispatch={dispatch} highestpoints={highestpoints} />
        }
      </Main >
    </div >
  )
}