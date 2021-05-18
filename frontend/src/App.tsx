import { useEffect, useCallback, useMemo } from 'react';
import { noteStore } from "./store/store";
import ControlGrid from "./component/controlGrid/ControlGrid";
import Keyboard from "./component/keyboard/Keyboard";
import { useAppState } from "./useAppState";

import "./App.css";

const App = () => {

  const [state, dispatch] = useAppState();

  const { audioContext, primaryFilter, primaryGainControl, sineGain, squareGain, noiseGain } = useMemo(() => {
    const audioContext = new AudioContext();
    const visualizer = audioContext.createAnalyser();

    // Create a Gain control (Master Volume)
    const primaryGainControl = audioContext.createGain();
    primaryGainControl.gain.setValueAtTime(state.mainVolume, 0);
    primaryGainControl.connect(audioContext.destination);

    // Create a filter (LP)
    const primaryFilter = audioContext.createBiquadFilter();
    primaryFilter.type = "lowpass";
    primaryFilter.frequency.value = state.filterFreq;
    primaryFilter.connect(primaryGainControl);

    // Create Sine Gain
    const sineGain = audioContext.createGain();
    sineGain.gain.setValueAtTime(state.sineVolume, 0);
    sineGain.connect(primaryFilter);

    // Create Square Gain
    const squareGain = audioContext.createGain();
    squareGain.gain.setValueAtTime(state.squareVolume, 0);
    squareGain.connect(primaryFilter);

    // Create Noise Gain
    const noiseGain = audioContext.createGain();
    noiseGain.gain.setValueAtTime(state.noiseVolume, 0);
    noiseGain.connect(primaryFilter);

    // Create all notes
    noteStore.createAllNotes({ audioContext, primaryFilter, sineGain, squareGain, noiseGain });

    return { audioContext, visualizer, primaryFilter, primaryGainControl, sineGain, squareGain, noiseGain };
  }, []);

  useEffect(() => {
    // Update FilterFrequence
    primaryFilter.frequency.value = Math.round(state.filterFreq);
  }, [state.filterFreq])

  useEffect(() => {
    // Update primaryGain
    primaryGainControl.gain.setValueAtTime(state.mainVolume, audioContext.currentTime);
  }, [state.mainVolume])

  useEffect(() => {
    // Update sine/square/noise volume
    sineGain.gain.setValueAtTime(state.sineVolume, audioContext.currentTime);
    squareGain.gain.setValueAtTime(state.squareVolume, audioContext.currentTime);
    noiseGain.gain.setValueAtTime(state.noiseVolume, audioContext.currentTime);
  }, [state.sineVolume, state.squareVolume, state.noiseVolume])

  const playNoteHandler = useCallback((freq: number) => {
    audioContext.resume();
    const noteArray = noteStore.notes.find(note => note.freq == freq);
    if (noteArray) {
      const sineNoteGain = noteArray.sineNoteGain;
      sineNoteGain.gain.setValueAtTime(state.sineVolume, audioContext.currentTime);
      const squareNoteGain = noteArray.squareNoteGain;
      squareNoteGain.gain.setValueAtTime(state.squareVolume, audioContext.currentTime);
      const noiseNoteGain = noteArray.noiseNoteGain;
      noiseNoteGain.gain.setValueAtTime(state.noiseVolume, audioContext.currentTime);
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
          dispatch={dispatch}
          state={state}
        />
        <Keyboard
          playNoteHandler={playNoteHandler}
          stopNoteHandler={stopNoteHandler}
          octave={state.octave}
        />
      </header>
    </div>
  );
};

export default App;