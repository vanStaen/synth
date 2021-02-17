import { useState } from 'react';
import Keyboard from './component/keyboard/Keyboard';

import './App.css';

const App = () => {

  const [octave, setOctave] = useState(4);

  const audioContext = new AudioContext();

  // First paramter = number of chanel (1 for mono, 2 for duo <-> Stero or polyphony)
  const buffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate * 1,
    audioContext.sampleRate,
  )

  // Create a Gain control (Master Volume)
  const primaryGainControl= audioContext.createGain();
  primaryGainControl.gain.setValueAtTime(0.05, 0);
  primaryGainControl.connect(audioContext.destination);


  // Create a filter (LP)
  const primaryfilter = audioContext.createBiquadFilter();
  primaryfilter.type = "lowpass";
  primaryfilter.frequency.value = 1500;
  primaryfilter.connect(primaryGainControl);


  const playWhiteNoiseHandler = () => {   

      // Represente 1 second of audio. 
      const channelData = buffer.getChannelData(0);

      // Create white noise by assigning random value between -1 and 1
      for (let i = 0; i < buffer.length;i++) {
        channelData[i] = Math.random() * 2 - 1;
      }  
      //Resume audioContext when clicking button
      audioContext.resume();
      //Create a Buffer Source
      const whiteNoiseSource = audioContext.createBufferSource();
      whiteNoiseSource.buffer = buffer;
      //Link Audio Source to Gain control
      whiteNoiseSource.connect(primaryfilter);
      whiteNoiseSource.start();

  }

  const playNoteHandler = (freq: number) => {   

    console.log("freq", freq);

    // Resume audioContext when clicking button
    audioContext.resume();

    // Create a Buffer Source
    const sinOscillator = audioContext.createOscillator();
    sinOscillator.frequency.setValueAtTime(freq, 0); // Here convert to note

    // Link Audio Source to Gain control
    sinOscillator.connect(primaryfilter);
    sinOscillator.start();
    sinOscillator.stop(audioContext.currentTime + 0.2); // will play for one second.
}

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Synth 
        </p>
        <button onClick={playWhiteNoiseHandler}>White Noise</button>
        <Keyboard playNoteHandler={playNoteHandler} octave={octave}/>
      </header>
    </div>
  );
}

export default App;
