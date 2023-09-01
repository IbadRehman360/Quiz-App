import Header from "./Header";
import Main from "./MainComponent";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextBtn from "./Btn";
import Progress from "./Progress";
import Result from "./Result";
import Time from "./Time";
import { useQuiz } from "../context/QuizContext";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <NextBtn />
            <Time />
          </>
        )}
        {status === "finished" && <Result />}
      </Main>
    </div>
  );
}
