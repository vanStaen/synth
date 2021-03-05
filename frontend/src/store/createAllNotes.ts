import { noteToFrequency } from '../helper/noteToFrequency';
import { NoteStore } from './store';

export const listOfNotes: string[] = [
    "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B",
];

export type NoteConfig = {
    audioContext: AudioContext,
    primaryFilter: BiquadFilterNode,
    sineGain: GainNode,
    squareGain: GainNode,
    noiseGain: GainNode,
};

export function createAllNotes(store: NoteStore, noteConfig: NoteConfig) {
    const { audioContext, primaryFilter, sineGain, squareGain, noiseGain } = noteConfig;

    listOfNotes.forEach((noteToCreate) => {
        let octave;
        for (octave = 1; octave < 9; octave++) {
            createNote(store, {
                freq: noteToFrequency(noteToCreate, octave),
                name: `${noteToCreate}${octave}`,
                audioContext,
                primaryFilter,
                sineGain,
                squareGain,
                noiseGain
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
    sineGain: GainNode,
    squareGain: GainNode,
    noiseGain: GainNode
};

export const createNote = (store: NoteStore, noteProps: NoteProps) => {
    const { freq, name, audioContext, primaryFilter, sineGain, squareGain, noiseGain } = noteProps;

    //Gain
    const sineNoteGain = audioContext.createGain();
    sineNoteGain.gain.setValueAtTime(0, 0);
    sineNoteGain.connect(sineGain);
    const squareNoteGain = audioContext.createGain();
    squareNoteGain.gain.setValueAtTime(0, 0);
    squareNoteGain.connect(squareGain);
    const noiseNoteGain = audioContext.createGain();
    noiseNoteGain.gain.setValueAtTime(0, 0);
    noiseNoteGain.connect(noiseGain);

    //Sinus
    const sineOsc = audioContext.createOscillator();
    sineOsc.frequency.setValueAtTime(freq, 0);
    sineOsc.type = 'sine';
    sineOsc.connect(sineNoteGain);
    sineOsc.start();

    //Square
    const squareOsc = audioContext.createOscillator();
    squareOsc.frequency.setValueAtTime(freq, 0);
    squareOsc.type = 'square';
    squareOsc.connect(squareNoteGain);
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
    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;
    noise.connect(noiseNoteGain);
    noise.loop = true;
    noise.start();

    // Add to the Store
    store.addNote(
      freq,
      name,
      sineNoteGain,
      sineOsc,
      squareNoteGain,
      squareOsc,
      noiseNoteGain,
      noise,
    );
}
