import React, { Fragment, useRef, useEffect, useState } from 'react';

function CountDownTimer() {
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');

  const [secondInputVal, setSecondInputVal] = useState(0);
  const [minuteInputVal, setMinuteInputVal] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  const minutesRef = useRef();
  const secondsRef = useRef();

  useEffect(() => {
    console.log('effect called..');
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        console.log('1111', minute, second);
        let secondCounter = parseInt(second);
        let minuteCounter = parseInt(minute);
        if (secondCounter >= 0 && secondCounter <= 10) {
          if (secondCounter === 0) {
            setSecond('00');
          } else {
            setSecond((prev) => {
              let prevTimeUpdated = parseInt(prev) - 1;
              return `0${prevTimeUpdated}`;
            });
          }
        } else {
          setSecond((prev) => {
            let prevTimeUpdated = parseInt(prev) - 1;
            if (prevTimeUpdated >= 0) {
              return prevTimeUpdated;
            } else {
              return `00`;
            }
          });
        }
        if (minuteCounter >= 0 && minuteCounter <= 10) {
          if (minuteCounter === 0) {
            setMinute('00');
          } else if (minuteCounter === 1 && secondCounter === 0) {
            setMinute(`00`);
            setSecond('59');
          } else {
            setMinute((prev) => {
              let prevTimeUpdated = parseInt(prev) - 1;
              return `0${prevTimeUpdated}`;
            });
          }
        } else {
          setMinute((prev) => {
            let prevTimeUpdated = parseInt(prev) - 1;
            if (prevTimeUpdated >= 0) {
              return prevTimeUpdated;
            } else {
              return `00`;
            }
          });
        }

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond('00');
    setMinute('00');
  }

  const handleMinuteChange = () => {
    const val = minutesRef.current.value;
    if (val > 0 && val < 10) {
      setMinute(`0${val}`);
    } else {
      setMinute(val);
    }
    setMinuteInputVal(val);
  };

  const handleSecondChange = () => {
    const val = secondsRef.current.value;
    if (val > 0 && val < 10) {
      setSecond(`0${val}`);
    } else {
      setSecond(val);
    }
    setSecondInputVal(val);
  };

  return (
    <Fragment>
      <label style={{ display: 'block' }}>
        Minutes
        <input
          onChange={handleMinuteChange}
          type="number"
          value={minuteInputVal}
          ref={minutesRef}
        />
      </label>
      <label style={{ display: 'block' }}>
        Seconds
        <input
          onChange={handleSecondChange}
          type="number"
          value={secondInputVal}
          ref={secondsRef}
        />
      </label>

      <button onClick={() => setIsActive(true)}>START</button>
      <button onClick={() => setIsActive(!isActive)}>PAUSE / RESUME</button>
      <button onClick={stopTimer}>RESET</button>

      <h1 data-testid="running-clock">
        {minute}:{second}
      </h1>
    </Fragment>
  );
}

export default CountDownTimer;
