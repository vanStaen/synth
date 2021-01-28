import logo from './logo.svg';
import Keyboard from './component/keyboard/Keyboard';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Synth
        </p>
        <Keyboard/>
      </header>
    </div>
  );
}

export default App;
