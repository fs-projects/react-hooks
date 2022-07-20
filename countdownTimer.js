import React, { Fragment, useRef, useEffect, useState } from 'react';

function CountDownTimer() {
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');

  const [secondInputVal, setSecondInputVal] = useState(0);
  const [minuteInputVal, setMinuteInputVal] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [startClicked, setStartClicked] = useState({
    count: 0,
    handled: null,
  });

  const minutesRef = useRef();
  const secondsRef = useRef();

  let intervalId;
  useEffect(() => {
    console.log('effect called..');

    if (intervalId) {
      clearInterval(intervalId);
    }

    if (!startClicked.handled && startClicked.count > 1) {
      setStartClicked((prev) => ({ ...prev, handled: true }));
      const secondInputInitial = secondInputVal;
      if (secondInputInitial >= 0 && secondInputInitial < 10) {
        setSecond(`0${secondInputInitial}`);
      } else {
        if (secondInputInitial === '') {
          setSecond(`00`);
        } else {
          setSecond(secondInputInitial);
        }
      }
      const minuteInputInitial = minuteInputVal;
      if (minuteInputInitial >= 0 && minuteInputInitial < 10) {
        setMinute(`0${minuteInputInitial}`);
      } else {
        if (minuteInputInitial === '') {
          setMinute(`00`);
        } else {
          setMinute(minuteInputInitial);
        }
      }
    }

    let secondCounter = parseInt(second);
    let minuteCounter = parseInt(minute);
    console.log('1111', minute, second);

    if (isActive) {
      intervalId = setInterval(() => {
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
        if (minuteCounter >= 0 && minuteCounter <= 10 && secondCounter === 0) {
          if (minuteCounter === 0) {
            setMinute('00');
          } else if (minuteCounter === 1 && secondCounter === 0) {
            setMinute(`00`);
            setSecond('59');
          } else if (minuteCounter === 0) {
            stopTimer();
            clearInterval(intervalId);
            return;
          } else {
            setMinute((prev) => {
              let prevTimeUpdated = parseInt(prev) - 1;
              return `0${prevTimeUpdated}`;
            });
            setSecond('59');
          }
        } else {
          if (secondCounter === 0) {
            setMinute((prev) => {
              let prevTimeUpdated = parseInt(prev) - 1;
              if (prevTimeUpdated >= 0) {
                return prevTimeUpdated;
              } else {
                return `00`;
              }
            });
          }
        }

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter, startClicked.count]);

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond('00');
    setMinute('00');
    setSecondInputVal(0);
    setMinuteInputVal(0);
  }

  const handleMinuteChange = () => {
    const val = minutesRef.current.value;
    // if (intervalId) {
    //   setMinuteInputVal(val);
    //   return;
    // }
    if (val >= 0 && val < 10) {
      setMinute(`0${val}`);
    } else {
      if (val === '') {
        setMinute(`00`);
      } else {
        setMinute(val);
      }
    }
    setMinuteInputVal(val);
  };

  const handleSecondChange = () => {
    const val = secondsRef.current.value;
    // if (intervalId) {
    //   setSecondInputVal(val);
    //   return;
    // }
    if (minuteInputVal === 0) {
      setMinute('00');
    }
    let remainingSeconds;
    if (val > 60) {
      let additonalMinutes = Math.floor(val / 60);
      remainingSeconds = val % 60;
      let totalMinutes = parseInt(minute) + additonalMinutes;
      if (totalMinutes > 0 && totalMinutes < 10) {
        setMinute(`0${totalMinutes}`);
      } else {
        setMinute(totalMinutes);
      }
      if (remainingSeconds >= 0 && remainingSeconds < 10) {
        setSecond(`0${remainingSeconds}`);
      } else {
        setSecond(remainingSeconds);
      }
    } else {
      let orginalVal = val;
      if (remainingSeconds) {
        orginalVal = remainingSeconds;
      }
      if (orginalVal === '') {
        setSecond(`00`);
      } else if (orginalVal >= 0 && orginalVal < 10) {
        setSecond(`0${orginalVal}`);
      } else {
        setSecond(orginalVal);
      }
    }
    setSecondInputVal(val);
  };

  const handleStartClicked = () => {
    setIsActive(true);
    setStartClicked((prev) => ({
      ...prev,
      count: prev.count + 1,
      handled: null,
    }));
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

      <button onClick={handleStartClicked}>START</button>
      <button onClick={() => setIsActive(!isActive)}>PAUSE / RESUME</button>
      <button onClick={stopTimer}>RESET</button>

      <h1 data-testid="running-clock">
        {minute}:{second}
      </h1>
    </Fragment>
  );
}

export default CountDownTimer;
