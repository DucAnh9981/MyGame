import React, { useState } from "react";
import "./game.css";

function Game() {
  const [n, setN] = useState(0);
  const [inputN, setInputN] = useState(0);
  const [time, setTime] = useState(0);
  const [circles, setCircles] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [timer, setTimer] = useState(null);
  const [finalTime, setFinalTime] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [hasGameStartedOnce, setHasGameStartedOnce] = useState(false);
  const [isHandlingClick, setIsHandlingClick] = useState(false);

  const startOrResetGame = () => {
    if (inputN <= 0) {
      alert("Please enter a number of cells greater than 0!");
      return;
    }

    clearInterval(timer);

    for (let i = 1; i <= n; i++) {
      const circleElement = document.getElementById(`circle-${i}`);
      if (circleElement) {
        circleElement.style.opacity = 1;
        circleElement.style.filter = "";
      }
    }

    setN(inputN);
    setCircles(generateCircles(inputN));
    setIsGameWon(false);
    setTime(0);
    setNextNumber(1);
    setHasGameStartedOnce(true);

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 0.1);
    }, 100);
    setTimer(interval);
    setTimeout(() => {
      setNextNumber(1);
      setIsGameWon(false);
    }, 0);
  };

  const generateCircles = (n) => {
    let arr = Array.from({ length: n }, (_, i) => ({
      number: i + 1,
      top: Math.random() * 90 + "%",
      left: Math.random() * 90 + "%",
    }));

    return arr.reverse();
  };

  const handleCircleClick = (number) => {
    if (isHandlingClick) return;
    setIsHandlingClick(true);

    if (number === nextNumber) {
        setNextNumber(nextNumber + 1);

        const circleElement = document.getElementById(`circle-${number}`);
        if (circleElement) {
            circleElement.style.filter = "hue-rotate(133deg)";
            circleElement.style.opacity = 1;


            setTimeout(() => {
               
                setCircles((prevCircles) =>
                    prevCircles.filter(circle => circle.number !== number)
                );
            }, 500);
        }

        
        if (nextNumber === n) {
            setFinalTime(time.toFixed(1)); 
            setIsGameWon(true);
            setTimeout(() => {
                alert(`ALL CLEARED!`);
            }, 1000);
            clearInterval(timer);
        }
    }
    setIsHandlingClick(false);
};

  return (
    <div className="game">
      <div className="text-input form__group field">
        <input
          className="form__field"
          type="number"
          value={inputN}
          onChange={(e) => setInputN(Math.max(0, parseInt(e.target.value) || 0))}
        />
        <label htmlFor="name" className="form__label">
          Point
        </label>
      </div>

      <div className="time">
        <label>Time: {time.toFixed(1)}s</label>
      </div>

      <label className="final-time">Best: {finalTime}s</label>

      <button className="reset-button" onClick={startOrResetGame}>
        <span className="button_top">
          {hasGameStartedOnce ? "Reset" : "Start"}
        </span>
      </button>

      <div className="board-game">
        {circles.map((circle) => (
          <div
            key={circle.number}
            id={`circle-${circle.number}`}
            onClick={() => handleCircleClick(circle.number)}
            className="circle"
            style={{
              top: circle.top,
              left: circle.left,
              zIndex: n - circle.number + 1,
            }}
          >
            <img src="./beer.png" alt="beer" className="circle-image" />
            <strong className="circle-number">{circle.number}</strong>
          </div>
        ))}
      </div>

      {isGameWon && <label className="final-in-mobile">ALL CLEARED</label>}
    </div>
  );
}

export default Game;
