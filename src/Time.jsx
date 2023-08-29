import { useEffect } from "react";

function Time({ time, dispatch }) {
  const min = Math.floor(time / 60);
  const sec = time % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "TIME" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      <p>
        {min < 10 && "0"}
        {min}:{sec < 10 && "0"}
        {sec}
      </p>
    </div>
  );
}

export default Time;
