import { useEffect, useState, useCallback, useMemo } from 'react';
import { noteStore } from "./store/store";
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

  const {audioContext, primaryFilter} = useMemo(() => {
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

    // Create all notes
    noteStore.createAllNotes({ audioContext, primaryFilter, sineVolume, squareVolume, noiseVolume });

    return {audioContext, primaryFilter};
  }, []);

  useEffect(() => {
    // Update FilterFrequence
    primaryFilter.frequency.value = Math.round(filterFreq);
  }, [filterFreq])

  const playNoteHandler = useCallback((freq: number) => {

    audioContext.resume();

    const noteArray = noteStore.notes.find(note => note.freq == freq);
    if (noteArray) {
      const noteGain = noteArray.noteGain;
      noteGain.gain.setValueAtTime(1, 0);
    }
  }, [noteStore.notes, audioContext]);

  const stopNoteHandler = useCallback((freq: number) => {
    const noteArray = noteStore.notes.find(note => note.freq == freq);
    if (noteArray) {
      const noteGain = noteArray.noteGain;
      noteGain.gain.setValueAtTime(noteGain.gain.value, audioContext.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.000001, audioContext.currentTime + 0.03);
    }
  }, [noteStore.notes, audioContext]);

  return (
    <div className="App">
      <header className="App-header">
        <p> </p>
        <div>
          <Knob value={mainVolume} valueSetter={setMainVolume} knobName="vol" min={0} max={0.1} multiply={1000} unit="%" />
          <Knob value={noiseVolume} valueSetter={setNoiseVolume} knobName="noise" min={0.01} max={1} multiply={100} unit="%" />
          <Knob value={sineVolume} valueSetter={setSineVolume} knobName="sin" min={0.01} max={1} multiply={100} unit="%" />
          <Knob value={squareVolume} valueSetter={setSquareVolume} knobName="square" min={0.01} max={1} multiply={100} unit="%" />
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
