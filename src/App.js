import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Navbar from './Navbar';


const getCloud = () =>
  'athlete ball basket bicycle champion coach competition court cycling equipment exercise fitness football game gym health jump match medal olympics physical player race racket referee running score soccer sport stadium team tennis tournament train trophy victory weightlifting'.split(
    ' '
  );

function Word(props) {
  const { text, active, correct } = props;

  if (correct === true) {
    return <span className='correct'>{text} </span>;
  }

  if (correct === false) {
    return <span className='incorrect'>{text} </span>;
  }

  if (active) {
    return <span className='active'>{text} </span>;
  }
  return <span>{text} </span>;
}
Word = React.memo(Word);

function Timer(props) {
  const { correctWords, startCounting, testCompleted } = props;
  const [timeElapsed, setTimeElapsed] = useState(0);
  useEffect(() => {
    let id;
    if (startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [startCounting]);

  const minutes = timeElapsed / 60;
  const Speed = ((correctWords / minutes) || 0).toFixed(2);

  useEffect(() => {
    if (testCompleted) {
      const user = localStorage.getItem('user');
      const results = JSON.parse(localStorage.getItem(user)) || [];
      const newResult = { Speed, date: new Date().toLocaleDateString() };
      results.push(newResult);
      localStorage.setItem(user, JSON.stringify(results));
    }
  }, [testCompleted]);

  return (
    <div>
      <span className='p1'>
        <p>Timer: {timeElapsed}</p>
      </span>
      <span className='p2'>
        <p>Speed: {Speed}WPM</p>
      </span>
    </div>
  );
}

function App() {
  const [userInput, setUserInput] = useState('');
  const cloud = useRef(getCloud());
  const [startCounting, setStartCounting] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  function processInput(value) {
    if (activeWordIndex === cloud.current.length) {
      return;
    }
    if (!startCounting) {
      setStartCounting(true);
    }
    if (activeWordIndex === cloud.current.length) {
      return;
    }

    if (value.endsWith(' ')) {
      if (activeWordIndex === cloud.current.length - 1) {
        setStartCounting(false);
        setUserInput('Completed');
        setTestCompleted(true);
      } else {
        setUserInput('');
      }
      setActiveWordIndex((index) => index + 1);

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] =
          word === cloud.current[activeWordIndex];
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  }

  return (
    <div>
      <Navbar/>
      
      {!showModal && (
        <div className='abc'>
          <p className='infobox'>
            There is no time limit, the word per minute will be calculated after you complete your typing. Only correct words are taken into account.
            <Timer
              startCounting={startCounting}
              correctWords={correctWordArray.filter(Boolean).length}
              testCompleted={testCompleted}
            />
          </p>
          <div className='container'>
            <div className='words'>
              <p>
                {cloud.current.map((word, index) => {
                  return (
                    <Word
                      key={index}
                      text={word}
                      active={index === activeWordIndex}
                      correct={correctWordArray[index]}
                    />
                  );
                })}
              </p>
            </div>
          </div>
          <div className='input-field'>
            <input
              placeholder='Type here'
              type='text'
              value={userInput}
              onChange={(e) => processInput(e.target.value)}
            />
            <br />
            <br />
            <button className='bt' onClick={() => window.location.reload()}>
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
