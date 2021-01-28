import logo from './logo.svg';
import Keyboard from './component/keyboard/Keyboard';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Keyboard/>
      </header>
    </div>
  );
}

export default App;
