import { useState, useEffect } from "react";
import Keyboard from "./component/keyboard/Keyboard";
import Knob from "./component/knob/Knob";

import "./App.css";

const App = () => {
  const [octave, setOctave] = useState(4);
  const [mainVolume, setMainVolume] = useState(0.05);
  const [noiseVolume, setNoiseVolume] = useState(.7);
  const [sineVolume, setSineVolume] = useState(1);
  const [fitlerFreq, setFitlerFreq] = useState(5000); // from 25hz to 25000hz

  const audioContext = new AudioContext();

  // Create a Gain control (Master Volume)
  const primaryGainControl = audioContext.createGain();
  primaryGainControl.gain.setValueAtTime(mainVolume, 0);
  primaryGainControl.connect(audioContext.destination);

  // Create a filter (LP)
  const primaryfilter = audioContext.createBiquadFilter();
  primaryfilter.type = "lowpass";
  primaryfilter.frequency.value = fitlerFreq;
  primaryfilter.connect(primaryGainControl);


  const noteGainMap = new Map();

  const playNoteHandler = (freq: number) => {
    if (!noteGainMap.has(freq)) {
      audioContext.resume();

      //Gain
      const noteGain = audioContext.createGain();
      noteGain.gain.setValueAtTime(sineVolume, 0);
      noteGain.connect(primaryfilter);

      //Sinus
      const sinGain = audioContext.createGain();
      sinGain.gain.setValueAtTime(sineVolume, 0);
      sinGain.connect(primaryfilter);
      const sinOscillator = audioContext.createOscillator();
      sinOscillator.frequency.setValueAtTime(freq, 0);
      sinOscillator.connect(noteGain);
      sinOscillator.start();

      //Noise
      const buffer = audioContext.createBuffer(
        1,
        audioContext.sampleRate * 1,
        audioContext.sampleRate
      );
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) {
        channelData[i] = Math.random() * 2 - 1;
      }
      audioContext.resume();
      const noiseGain = audioContext.createGain();
      noiseGain.gain.setValueAtTime(noiseVolume, 0);
      noiseGain.connect(noteGain);
      const whiteNoiseSource = audioContext.createBufferSource();
      whiteNoiseSource.buffer = buffer;
      whiteNoiseSource.connect(noiseGain);
      whiteNoiseSource.start();

      // noteGainMap
      noteGainMap.set(freq, noteGain);
    }
  };

  const stopNoteHandler = (freq: number) => {
    if (noteGainMap.has(freq)) {
      const noteGain = noteGainMap.get(freq);
      noteGain.gain.setValueAtTime(noteGain.gain.value,audioContext.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03);
      noteGainMap.delete(freq);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p> </p>
        <div>
          <Knob value={mainVolume} valueSetter={setMainVolume} knobName="Volume"/>
          <Knob value={noiseVolume} valueSetter={setNoiseVolume} knobName="Noise"/>
          <Knob value={sineVolume} valueSetter={setSineVolume} knobName="∿"/>
          <Knob value={fitlerFreq} valueSetter={setFitlerFreq} knobName="LP Filter"/>
        </div>
        <Keyboard
          playNoteHandler={playNoteHandler}
          stopNoteHandler={stopNoteHandler}
          octave={octave}
        />
      </header>
    </div>
  );
};

export default App;
