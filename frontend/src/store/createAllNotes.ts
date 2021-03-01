import { noteToFrequency } from '../helper/noteToFrequency';
import { NoteStore } from './store';

export const listOfNotes: string[] = [
    "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B",
];

export type NoteConfig = {
    audioContext: AudioContext,
    primaryFilter: BiquadFilterNode,
    sineVolume: number,
    squareVolume: number,
    noiseVolume: number,
};

export function createAllNotes(store: NoteStore, noteConfig: NoteConfig) {
    const { audioContext, primaryFilter, sineVolume, squareVolume, noiseVolume } = noteConfig;

    listOfNotes.forEach((noteToCreate) => {
        let octave;
        for (octave = 1; octave < 9; octave++) {
            createNote(store, {
                freq: noteToFrequency(noteToCreate, octave),
                name: `${noteToCreate}${octave}`,
                audioContext,
                primaryFilter,
                sineVolume,
                squareVolume,
                noiseVolume
            })
            // console.log("note created", `${noteToCreate}${octave}`, noteToFrequency(noteToCreate, 3));
        }
    })
}

type NoteProps = {
    freq: number,
    name: string,
    audioContext: AudioContext,
    primaryFilter: BiquadFilterNode,
    sineVolume: number,
    squareVolume: number,
    noiseVolume: number
};

export const createNote = (store: NoteStore, noteProps: NoteProps) => {
    const { freq, name, audioContext, primaryFilter, sineVolume, squareVolume, noiseVolume } = noteProps;

    //Gain
    const noteGain = audioContext.createGain();
    noteGain.gain.setValueAtTime(0, 0);
    noteGain.connect(primaryFilter);

    //Sinus
    const sinGain = audioContext.createGain();
    sinGain.gain.setValueAtTime(sineVolume, 0);
    sinGain.connect(noteGain);
    const sinOsc = audioContext.createOscillator();
    sinOsc.frequency.setValueAtTime(freq, 0);
    sinOsc.type = 'sine';
    sinOsc.connect(sinGain);
    sinOsc.start();

    //Square
    const squareGain = audioContext.createGain();
    squareGain.gain.setValueAtTime(squareVolume, 0);
    squareGain.connect(noteGain);
    const squareOsc = audioContext.createOscillator();
    squareOsc.frequency.setValueAtTime(freq, 0);
    squareOsc.type = 'square';
    squareOsc.connect(squareGain);
    squareOsc.start();

    //Noise
    const CHANNELS = 1;
    const buffer = audioContext.createBuffer(
      CHANNELS,
      audioContext.sampleRate * CHANNELS,
      audioContext.sampleRate
    );
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < buffer.length; i++) {
        channelData[i] = Math.random() * 2 - 1;
    }
    audioContext.resume();
    const whiteNoiseGain = audioContext.createGain();
    whiteNoiseGain.gain.setValueAtTime(noiseVolume, 0);
    whiteNoiseGain.connect(noteGain);
    const whiteNoise = audioContext.createBufferSource();
    whiteNoise.buffer = buffer;
    whiteNoise.connect(whiteNoiseGain);
    whiteNoise.loop = true;
    whiteNoise.start();

    // Add to the Store
    store.addNote(
      freq,
      name,
      noteGain,
      sinOsc,
      sinGain,
      squareOsc,
      squareGain,
      whiteNoise,
      whiteNoiseGain
    );
}
