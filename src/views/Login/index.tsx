import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../core/hooks/use-stores';
import { Link } from 'react-router-dom';

export const Login: React.FC = observer(() => {
  const { testStore } = useStores();

  const addMessage = () => {
    testStore.addMessage({ message: 'hello n.', sender: 'jay' });
  };

  return (
    <div className="App">
      <header className="App-header">
        This is Login
        <p>
          {testStore.uppercased
            .map(e => e.sender + ' : ' + e.message)
            .join('\n')}
        </p>
        <button onClick={() => addMessage()}>Add Message</button>
        <Link to="/">Go back home</Link>
      </header>
    </div>
  );
});
