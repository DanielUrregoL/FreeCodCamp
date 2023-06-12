import React, { useState, useEffect } from 'react';
import './App.css';


export default function App() {
  const [timeLength, setTimeLength] = useState({
    breakLength: 5,
    sessionLength: 25,
    timeLeft: 25 * 60,
    power: false,
    labelName: 'Session',
    button: <i className="bi bi-stop-circle"></i>
  });

  const [timerInterval, setTimerInterval] = useState(null);

  const handleReset = () => {
    clearInterval(timerInterval);
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    setTimeLength({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      power: false,
      labelName: 'Session',
      button: <i className="bi bi-stop-circle"></i>
    });
  };

  const runTimer = () => {

    if (timeLength.timeLeft > 0) {
      setTimeLength((prevState) => ({
        ...prevState,
        timeLeft: prevState.timeLeft - 1,

      }));
    } else if (timeLength.timeLeft === 0) {
      document.getElementById('beep').play();
      if (timeLength.timerLabel === 'Session') {
        setTimeLength((prevState) => ({
          ...prevState,
          timeLeft: prevState.breakLength * 60,
          timerLabel: 'Break',
        }));
      } else {
        setTimeLength((prevState) => ({
          ...prevState,
          timeLeft: prevState.sessionLength * 60,
          timerLabel: 'Session',
        }));
      }
    }
  };



  const handleStartStop = () => {
    if (timeLength.power === false) {
      const interval = setInterval(runTimer, 1000);
      setTimerInterval(interval);
      setTimeLength((prevState) => ({
        ...prevState,
        button: <i className="bi bi-stop-circle-fill"></i>
      }));
    } else {
      clearInterval(timerInterval);
      setTimeLength((prevState) => ({
        ...prevState,
        button: <i className="bi bi-stop-circle"></i>
      }));
    }

    setTimeLength((prevState) => ({
      ...prevState,
      power: !prevState.power,
    }));

  };

  useEffect(() => {
    if (timeLength.timeLeft === 0) {
      document.getElementById('beep').play();
      setTimeLength((prevState) => ({
        ...prevState,
        timeLeft: prevState.breakLength * 60,
        labelName: 'Break',
      }));
      if (timeLength.labelName === 'Break') {
        setTimeLength((prevState) => ({
          ...prevState,
          timeLeft: prevState.sessionLength * 60,
          labelName: 'Session',
        }));
      }
    }
  }, [timeLength]);

  useEffect(() => {
    return () => {
      clearInterval(timerInterval);
    };
  }, [timerInterval]);

  const breakTime = (event) => {
    if (event.target.id === 'break-decrement' && timeLength.breakLength > 1) {
      setTimeLength((prevState) => ({
        ...prevState,
        breakLength: prevState.breakLength - 1,
      }));
    }
    if (event.target.id === 'break-increment' && timeLength.breakLength < 60) {
      setTimeLength((prevState) => ({
        ...prevState,
        breakLength: prevState.breakLength + 1,
      }));
    }
  };

  const sessionTime = (event) => {
    if (event.target.id === 'session-decrement' && timeLength.sessionLength > 1) {
      setTimeLength((prevState) => ({
        ...prevState,
        sessionLength: prevState.sessionLength - 1,
        timeLeft: (prevState.sessionLength - 1) * 60,
      }));
    }
    if (event.target.id === 'session-increment' && timeLength.sessionLength < 60) {
      setTimeLength((prevState) => ({
        ...prevState,
        sessionLength: prevState.sessionLength + 1,
        timeLeft: (prevState.sessionLength + 1) * 60,
      }));
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <h1 className="text-center">25 + 5 Clock</h1>
        <div className="row bg-dark rounded-5 text-light p-5">

          <div className="col-4 p-3 mx-auto text-center">
            <h2 className="text-center text-white" id="break-label">
              Break Length
            </h2>
            <button id="break-decrement" className="btn btn-success btn-lg" onClick={breakTime}>
              <i className="bi bi-arrow-down-circle-fill"></i>
            </button>
            <span id="break-length" className="mx-4 h3">
              {timeLength.breakLength}
            </span>
            <button id="break-increment" className="btn btn-success btn-lg" onClick={breakTime}>
              <i className="bi bi-arrow-up-circle-fill"></i>
            </button>
          </div>

          <div className="col-4 p-3 mx-auto text-center">
            <h2 className="text-center text-white" id="session-label">
              Session Length
            </h2>
            <button id="session-decrement" className="btn btn-success btn-lg " onClick={sessionTime}>
              <i className="bi bi-arrow-down-circle-fill"></i>
            </button>
            <span id="session-length" className="mx-4 h3">
              {timeLength.sessionLength}
            </span>
            <button id="session-increment" className="btn btn-success btn-lg" onClick={sessionTime}>
              <i className="bi bi-arrow-up-circle-fill"></i>
            </button>
          </div>

          <div className="row">
            <div className="col-8 p-3 m-3 mx-auto text-center border border-success rounded-pill">
              <h2 className="text-center text-white" id="timer-label">
                <i className="bi bi-clock-history"></i>  {timeLength.labelName}
              </h2>
              <h2 className="text-center text-white" id="time-left">
                {formatTime(timeLength.timeLeft)}
              </h2>
              <button id="start_stop" className="btn btn-success btn-lg m-2" onClick={handleStartStop}>
                {timeLength.button}
              </button>
              <button id="reset" className="btn btn-success btn-lg m-2" onClick={handleReset}>
                <i className="bi bi-arrow-repeat"></i>
              </button>
              <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
            </div>
          </div>
        </div>
        <p className="text-center mt-3 h5">
          <a href="https://github.com/DanielUrregoL" className="text-dark">
            <i className="bi bi-github"></i> By @DanielUrregoL
          </a>
        </p>
      </div>
    </div>
  );
};
