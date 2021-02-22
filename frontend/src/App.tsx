import { useState } from "react";
import { note } from "./component/note/note";
import { noteStore } from "./store/store";
import Keyboard from "./component/keyboard/Keyboard";
import Knob from "./component/knob/Knob";

import "./App.css";

const App = () => {
  const [octave, setOctave] = useState(3);
  const [mainVolume, setMainVolume] = useState(0.05);
  const [noiseVolume, setNoiseVolume] = useState(.5);
  const [sineVolume, setSineVolume] = useState(1);
  const [squareVolume, setSquareVolume] = useState(1)
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

  // Create all notes (check for dupplicxate)
  note({
    freq: 440,
    name: "C4",
    audioContext: audioContext,
    primaryfilter: primaryfilter,
    sineVolume: sineVolume,
    squareVolume: squareVolume,
    noiseVolume: noiseVolume,
    noteStore: noteStore,
  })

  console.log("notes", noteStore.notes);

  const playNoteHandler = (freq: number) => {
    audioContext.resume();
    const noteArray = noteStore.notes.find(note => note.freq == 440);
    if (noteArray) {
      console.log("noteArray", noteArray);
      const noteGain = noteArray.noteGain;
      noteGain.gain.setValueAtTime(1, 0);
    }
  };

  const stopNoteHandler = (freq: number) => {
    const noteArray = noteStore.notes.find(note => note.freq == 440);
    if (noteArray) {
      const noteGain = noteArray.noteGain;
      noteGain.gain.setValueAtTime(noteGain.gain.value, audioContext.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p> </p>
        <div>
          <Knob value={mainVolume} valueSetter={setMainVolume} knobName="Volume" />
          <Knob value={noiseVolume} valueSetter={setNoiseVolume} knobName="Noise" />
          <Knob value={sineVolume} valueSetter={setSineVolume} knobName="∿" />
          <Knob value={fitlerFreq} valueSetter={setFitlerFreq} knobName="LP Filter" />
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
