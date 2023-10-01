import React, { useEffect, useMemo, useRef, useState } from "react";
import Timer from "./components/timer/Timer";
import Card from "./components/card/Card";
import "./App.css";

const imagePairs = Array.from({ length: 8 }, (_, index) => index + 1);
const shuffleArray = (array:any[]) => {

  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};


function App() {
  const [timer, setTimer] = useState(30);
  const [cards, setCards] = useState<number[]>(
    shuffleArray([...imagePairs, ...imagePairs])
  );
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [timerStarted, setTimerStarted] = useState(false);
  const [intervalId, setIntervalId] = useState<any>(null);

  const startTimer = () => {
    if (!timerStarted) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer === 0 ? 0 : prevTimer - 1));
      }, 1000);
      setIntervalId(interval);
      setTimerStarted(true);
    }
  };


  const stopTimer = () => {
    if (intervalId) {

      clearInterval(intervalId);
      setIntervalId(0);
      setTimerStarted(false);
    }
  };






  const handleCardClick = (index:number) => {
    if(flippedIndices.length===2 || flippedIndices.includes(index) || matchedPairs.includes(cards[index])){
      return;
    }
    setFlippedIndices((prev) => [...prev, index]);

    if (!timerStarted) {
      // Start the timer on the first card click
      startTimer();
    }

    if (flippedIndices.length === 1) {
      // If two cards are flipped, check for a match
      const [firstIndex] = flippedIndices;
      if (cards[firstIndex] === cards[index]) {
        setMatchedPairs([...matchedPairs, cards[firstIndex]]);
        setFlippedIndices([]);
      } else {
        // Not matched, flip them back after a delay
        setTimeout(() => {
          setFlippedIndices([]);
        }, 200);
      }
    }
    
  };

  const handleRestart = () => {
    // Clear the timer interval if it exists
    setCards(shuffleArray([...imagePairs, ...imagePairs]));
    setFlippedIndices([]);
    setMatchedPairs([]);
    setTimer(30);
    setTimerStarted(false);
    stopTimer();
  };

  useEffect(() => {
    if (matchedPairs.length === imagePairs.length || timer === 0) {
      // Game Over
      const score = matchedPairs.length;
      alert(`Game Over! Your score: ${score}`);
      setFlippedIndices([]);
      setMatchedPairs([]);
      handleRestart();
    }
  }, [matchedPairs, timer, handleRestart]);


  return (
    <div className="app_container">
      <Timer seconds={timer} />
      <div className="grid_container">
        
        {cards.map((card, index) => (
          <Card
            key={index}
            index={index}
            image={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${card}`}
            isFlipped={
              flippedIndices.includes(index) || matchedPairs.includes(card)
            }
            onClick={handleCardClick}
          />
        ))}
      </div>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}

export default App;
