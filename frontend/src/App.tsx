import { useEffect, useState, useCallback, useMemo } from 'react';
import { noteStore } from "./store/store";
import ControlGrid from "./component/ControlGridtemp/ControlGrid";
import Keyboard from "./component/keyboard/Keyboard";
import Knob from "./component/knob/Knob";

import "./App.css";

const App = () => {
  const [octave, setOctave] = useState(5);
  const [mainVolume, setMainVolume] = useState(0.05);
  const [noiseVolume, setNoiseVolume] = useState(1);
  const [sineVolume, setSineVolume] = useState(1);
  const [squareVolume, setSquareVolume] = useState(1)
  const [filterFreq, setFilterFreq] = useState(5000); // from 30hz to 25000hz

 
  const {audioContext, primaryFilter, primaryGainControl, sineGain, squareGain, noiseGain} = useMemo(() => {
    const audioContext = new AudioContext();

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

    return {audioContext, primaryFilter, primaryGainControl, sineGain, squareGain, noiseGain};
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
        <p> </p>
        <ControlGrid />
        <div>
          <Knob value={mainVolume} valueSetter={setMainVolume} knobName="vol" min={0} max={0.1} multiply={1000} unit="%" />
          <Knob value={noiseVolume} valueSetter={setNoiseVolume} knobName="noise" min={0.01} max={1} multiply={100} unit="%" />
          <Knob value={sineVolume} valueSetter={setSineVolume} knobName="sin" min={0.01} max={1} multiply={100} unit="%" />
          <Knob value={squareVolume} valueSetter={setSquareVolume} knobName="square" min={0.01} max={0.8} multiply={100} unit="%" />
          <Knob value={filterFreq} valueSetter={setFilterFreq} knobName="filter" min={30} max={20000} multiply={1} unit="hz" />
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
