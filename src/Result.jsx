function Result({ totalpoints, points, highestpoints, dispatch }) {
  const percentage = (points / totalpoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <div className="result">
      {" "}
      <p>
        <span>{emoji}</span> You scored <strong> {points} </strong>out of{" "}
        {totalpoints} points ({Math.ceil(percentage)}
        %)
      </p>
      <p>(Highscore: {highestpoints} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "RESTART" })}
      >
        Restart
      </button>
    </div>
  );
}

export default Result;
