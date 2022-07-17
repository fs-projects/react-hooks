import { useState } from 'react';

export default function customInputHook(initialValue) {
  const [value, setInputValue] = useState(initialValue);
  const reset = () => {
    setInputValue(initialValue);
  };

  const bind = {
    value,
    onChange: () => {
      setInputValue(e.target.value);
    },
  };

  return [value, bind, reset];
}
