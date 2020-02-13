import React from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../core/hooks/use-stores';
import { Link } from 'react-router-dom';

export const Home: React.FC = observer(() => {
  const { testStore } = useStores();

  const addMessage = () => {
    testStore.addMessage({ message: 'hello n.', sender: 'jay' });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {testStore.uppercased
            .map(e => e.sender + ' : ' + e.message)
            .join('\n')}
        </p>
        <button onClick={() => addMessage()}>Add Message</button>
        <Link to="/login">Go to login</Link>
      </header>
    </div>
  );
});
