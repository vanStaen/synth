import { useState, useEffect } from 'react';
import Keyboard from './component/keyboard/Keyboard';

import './App.css';

const App = () => {

  const [octave, setOctave] = useState(4);
  const [volume, setVolume] = useState(0.05);
  const [fitlerFreq, setFitlerFreq] = useState(5000);  

  const audioContext = new AudioContext();

  // Create a Gain control (Master Volume)
  const primaryGainControl= audioContext.createGain();
  primaryGainControl.gain.setValueAtTime(volume, 0);
  primaryGainControl.connect(audioContext.destination);

  // Create a filter (LP)
  const primaryfilter = audioContext.createBiquadFilter();
  primaryfilter.type = "lowpass";
  primaryfilter.frequency.value = fitlerFreq;
  primaryfilter.connect(primaryGainControl);


  const playWhiteNoiseHandler = () => {   

      // First paramter = number of chanel (1 for mono, 2 for duo <-> Stero or polyphony)
      const buffer = audioContext.createBuffer(
        1,
        audioContext.sampleRate * 1,
        audioContext.sampleRate,
      )
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length;i++) {
        channelData[i] = Math.random() * 2 - 1;
      }  
      audioContext.resume();
      const whiteNoiseSource = audioContext.createBufferSource();
      whiteNoiseSource.buffer = buffer;
      whiteNoiseSource.connect(primaryfilter);
      whiteNoiseSource.start();

  }

  const oscMap = new Map();

  const playNoteHandler = (freq: number) => {  
    if (!oscMap.has(freq)) {
      audioContext.resume();
      const sinOscillator = audioContext.createOscillator();
      sinOscillator.frequency.setValueAtTime(freq, 0);
      sinOscillator.connect(primaryfilter);
      sinOscillator.start();    
      oscMap.set(freq, sinOscillator);
    } 
  }

  const stopNoteHandler = (freq: number) => {  
    if (oscMap.has(freq)) {  
      const sinOscillator = oscMap.get(freq);
      sinOscillator.stop(audioContext.currentTime + 0.1);
      sinOscillator.disconnect(primaryfilter);
      oscMap.delete(freq);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Synth 
        </p>
        <button onClick={playWhiteNoiseHandler}>White Noise</button>
        <Keyboard 
          playNoteHandler={playNoteHandler} 
          stopNoteHandler={stopNoteHandler} 
          octave={octave}/>
      </header>
    </div>
  );
}

export default App;
