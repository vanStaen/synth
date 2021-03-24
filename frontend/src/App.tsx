import { useEffect, useState, useCallback, useMemo } from 'react';
import { noteStore } from "./store/store";
import ControlGrid from "./component/controlGrid/ControlGrid";
import Keyboard from "./component/keyboard/Keyboard";

import "./App.css";

type Action = {type: 'mainVolume'; volume: number} | 
              {type: 'noiseVolume'; volume: number}
              
const App = () => {
  const [octave, setOctave] = useState(5);
  const [mainVolume, setMainVolume] = useState(0.05);
  const [noiseVolume, setNoiseVolume] = useState(1);
  const [sineVolume, setSineVolume] = useState(1);
  const [squareVolume, setSquareVolume] = useState(1)
  const [filterFreq, setFilterFreq] = useState(5000); // from 30hz to 25000hz

 
  const {audioContext, primaryFilter, primaryGainControl, sineGain, squareGain, noiseGain} = useMemo(() => {
    const audioContext = new AudioContext();
    const visualizer = audioContext.createAnalyser();

    // Create a Gain control (Master Volume)
    const primaryGainControl = audioContext.createGain();
    primaryGainControl.gain.setValueAtTime(mainVolume, 0);
    primaryGainControl.connect(audioContext.destination);

    // Create a filter (LP)
    const primaryFilter = audioContext.createBiquadFilter();
    primaryFilter.type = "lowpass";
    primaryFilter.frequency.value = filterFreq;
    primaryFilter.connect(primaryGainControl);

    // Create Sine Gain
    const sineGain = audioContext.createGain();
    sineGain.gain.setValueAtTime(sineVolume, 0);
    sineGain.connect(primaryFilter);

    // Create Square Gain
    const squareGain = audioContext.createGain();
    squareGain.gain.setValueAtTime(squareVolume, 0);
    squareGain.connect(primaryFilter);

    // Create Noise Gain
    const noiseGain = audioContext.createGain();
    noiseGain.gain.setValueAtTime(noiseVolume, 0);
    noiseGain.connect(primaryFilter);

    // Create all notes
    noteStore.createAllNotes({ audioContext, primaryFilter, sineGain, squareGain, noiseGain });

    return {audioContext, visualizer, primaryFilter, primaryGainControl, sineGain, squareGain, noiseGain};
  }, []);

  useEffect(() => {
    // Update FilterFrequence
    primaryFilter.frequency.value = Math.round(filterFreq);
  }, [filterFreq])

  useEffect(() => {
    // Update primaryGain
    primaryGainControl.gain.setValueAtTime(mainVolume, audioContext.currentTime);
  }, [mainVolume])

  useEffect(() => {
    // Update sine/square/noise volume
    sineGain.gain.setValueAtTime(sineVolume, audioContext.currentTime);
    squareGain.gain.setValueAtTime(squareVolume, audioContext.currentTime);
    noiseGain.gain.setValueAtTime(noiseVolume, audioContext.currentTime);
  }, [sineVolume, squareVolume, noiseVolume])

  const playNoteHandler = useCallback((freq: number) => {
    audioContext.resume();
    const noteArray = noteStore.notes.find(note => note.freq == freq);
    if (noteArray) {
      const sineNoteGain = noteArray.sineNoteGain;
      sineNoteGain.gain.setValueAtTime(sineVolume, audioContext.currentTime);
      const squareNoteGain = noteArray.squareNoteGain;
      squareNoteGain.gain.setValueAtTime(squareVolume, audioContext.currentTime);
      const noiseNoteGain = noteArray.noiseNoteGain;
      noiseNoteGain.gain.setValueAtTime(noiseVolume, audioContext.currentTime);
    }
  }, [noteStore.notes, audioContext]);

  const stopNoteHandler = useCallback((freq: number) => {
    const noteArray = noteStore.notes.find(note => note.freq == freq);
    if (noteArray) {
      const sineNoteGain = noteArray.sineNoteGain;
      sineNoteGain.gain.setValueAtTime(sineNoteGain.gain.value, audioContext.currentTime);
      sineNoteGain.gain.exponentialRampToValueAtTime(0.000001, audioContext.currentTime + 0.03);
      const squareNoteGain = noteArray.squareNoteGain;
      squareNoteGain.gain.setValueAtTime(squareNoteGain.gain.value, audioContext.currentTime);
      squareNoteGain.gain.exponentialRampToValueAtTime(0.000001, audioContext.currentTime + 0.03);
      const noiseNoteGain = noteArray.noiseNoteGain;
      noiseNoteGain.gain.setValueAtTime(noiseNoteGain.gain.value, audioContext.currentTime);
      noiseNoteGain.gain.exponentialRampToValueAtTime(0.000001, audioContext.currentTime + 0.03);
    }
  }, [noteStore.notes, audioContext]);

  return (
    <div className="App">
      <header className="App-header">
        <div id="oscilloscope"></div>
        <ControlGrid 
          octave={octave}
          setOctave={setOctave}
          mainVolume={mainVolume}
          setMainVolume={setMainVolume}
          noiseVolume={noiseVolume}
          setNoiseVolume={setNoiseVolume}
          sineVolume={sineVolume}
          setSineVolume={setSineVolume}
          squareVolume={squareVolume}
          setSquareVolume={setSquareVolume}
          filterFreq={filterFreq}
          setFilterFreq={setFilterFreq}
        />
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

// Use reducer instead of Setter
// https://reactjs.org/docs/hooks-reference.html#usereducer
// customehook : useAppState()