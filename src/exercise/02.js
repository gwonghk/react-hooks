// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react';

const useLocalStorageState = (key, defaultValue = '', {
  serialize = JSON.stringify,
  deserialize = JSON.parse
} = {}) => {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  const [name, setName] = React.useState(
    () => {
      const valueInLocalStorage = window.localStorage.getItem(key);
      if (valueInLocalStorage) {
        // the try/catch is here in case the localStorage value was set before
        // we had the serialization in place (like we do in previous extra credits)
        try {
          return deserialize(valueInLocalStorage);
        } catch (error) {
          window.localStorage.removeItem(key);
        }
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      }
    }
  );


  const prevKeyRef = React.useRef(key);

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(name));
  }, [key, name, serialize]);

  return [name, setName];
};

function Greeting(props) {
  const { initialName } = props;
  const [name, setName] = useLocalStorageState('name', initialName);

  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
