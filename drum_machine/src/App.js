import React, { useState, useEffect } from 'react';

export default function App() {

  const buttons = [
    {
      id: 'Heater-1',
      letter: 'Q',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      id: 'Heater-2',
      letter: 'W',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      id: 'Heater-3',
      letter: 'E',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      id: 'Heater-4',
      letter: 'A',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      id: 'Clap',
      letter: 'S',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      id: 'Open-HH',
      letter: 'D',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      id: "Kick-n'-Hat",
      letter: 'Z',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      id: 'Kick',
      letter: 'X',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      id: 'Closed-HH',
      letter: 'C',
      src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];

  const [display, setDisplay] = useState({
    display: "Let's play!",
    volume: 0.5,
    power: true,
    keydownEnabled: true
  });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [display.keydownEnabled]);

  const handleKeyDown = (event) => {
    if (display.power && display.keydownEnabled) {
      const audio = document.getElementById(event.key.toUpperCase());
      if (audio) {
        audio.currentTime = 0;
        audio.play();
        setDisplay((prevState) => ({
          ...prevState,
          display: audio.parentElement.id
        }));
      }
    } else {
      alert("Turn on the power");
    }
  };

  const handleClick = (event) => {
    if (display.power) {
      const audio = document.getElementById(event.target.innerText);
      audio.currentTime = 0;
      audio.play();
      setDisplay((prevState) => ({
        ...prevState,
        display: event.target.id
      }));
    } else {
      alert("Turn on the power");
    }
  };

  const handlePower = () => {
    setDisplay({
      ...display,
      power: !display.power,
      keydownEnabled: !display.keydownEnabled
    })
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" id='drum-machine'>
      <div className="container">
        <h1 className="text-center">Drum Machine</h1>
        <div className="row bg-dark rounded-5 p-5 m-3 ">
          <div className="col-6">
            <div className="row">
              {buttons.map((button) => (
                <button className='btn btn-outline-light col-md-3 m-1 p-5 rounded-2 drum-pad'
                  key={button.id}
                  id={button.id}
                  onClick={handleClick}
                >
                  {button.letter}
                  <audio src={button.src} id={button.letter} className='clip' />
                </button>
              ))}
            </div>
          </div>

          <div className="col-6 p-3 mx-auto rounded-2" id='display'>
            <h3 className='text-center text-light mt-5 mb-3 '>Click or press a key</h3>
            <h3 className='text-center text-light mb-3'>{display.display}</h3>
            <button className='btn btn-outline-primary btn-lg col-12' onClick={handlePower}>
              {display.power ? 'Power On' : 'Power Off'}
            </button>
          </div>
        </div>
        <p className="text-center mt-3 h5"> <a href='https://github.com/DanielUrregoL' className='text-dark' ><i className="bi bi-github"></i> By @DanielUrregoL</a></p>
      </div>
    </div>
  );
};

