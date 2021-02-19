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

  const oscGainMap = new Map();

  const playNoteHandler = (freq: number) => {  
    if (!oscGainMap.has(freq)) {
      audioContext.resume();
      const sinOscillatorGain = audioContext.createGain();
      sinOscillatorGain.gain.setValueAtTime(1, 0);
      sinOscillatorGain.connect(primaryfilter);
      const sinOscillator = audioContext.createOscillator();
      sinOscillator.frequency.setValueAtTime(freq, 0);
      sinOscillator.connect(sinOscillatorGain);
      sinOscillator.start();    
      oscGainMap.set(freq, sinOscillatorGain);
    } 
  }

  const stopNoteHandler = (freq: number) => {  
    if (oscGainMap.has(freq)) {  
      const sinOscillatorGain = oscGainMap.get(freq);
      sinOscillatorGain.gain.setValueAtTime(sinOscillatorGain.gain.value, audioContext.currentTime); 
      sinOscillatorGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03);
      oscGainMap.delete(freq);
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
