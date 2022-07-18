import React from 'react';
import { useState, useContext, createContext } from 'react';
import customInputHook from './customInputHook';
import CountDownTimer from './countdownTimer';
import { render } from 'react-dom';
import './style.css';

const BaseContext = createContext();
const NormalInputFormWithReactHook = () => {
  const context = useContext(BaseContext);
  const [firstName, setFirstName] = useState('First Name');
  const [lastName, setLastName] = useState('Last Name');

  const firstNameChangeHandler = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const lastNameChangeHandler = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    alert(`${context.base} ${firstName} ${lastName}!!!`);
  };

  return (
    <form onSubmit={submitFormHandler}>
      <label>
        First Name
        <input
          type="text"
          value={firstName}
          onChange={firstNameChangeHandler}
        />
      </label>
      <label style={{ display: 'block' }}>
        Last Name
        <input type="text" value={lastName} onChange={lastNameChangeHandler} />
      </label>
      <button>Submit</button>
    </form>
  );
};

const CustomInputFormWithReactHook = () => {
  const context = useContext(BaseContext);
  const [firstName, bindFirstName, resetFirstName] =
    customInputHook('First Name');
  const [lastName, bindLastName, resetLastName] = customInputHook('Last Name');

  const submitFormHandler = (e) => {
    e.preventDefault();
    alert(`${context.base} ${firstName} ${lastName}!!!`);
    resetFirstName();
    resetLastName();
  };

  return (
    <form onSubmit={submitFormHandler}>
      <label>
        First Name
        <input type="text" {...bindFirstName} />
      </label>
      <label style={{ display: 'block' }}>
        Last Name
        <input type="text" {...bindLastName} />
      </label>
      <button>Submit</button>
    </form>
  );
};

const App = () => {
  return (
    <BaseContext.Provider value={{ base: 'Hello ' }}>
      <CountDownTimer />
    </BaseContext.Provider>
  );
};

render(<App />, document.getElementById('root'));
