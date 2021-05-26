// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import {useState} from 'react';

const Greeting = props => {
  const { initialName } = props;
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [ name, setName ] = useState(initialName);


  const handleChange = event => {
    // 🐨 update the name here based on event.target.value
    const { value } = event.target;
    setName(value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting initialName='boogaloo' />;
}

export default App;
