import { action, makeObservable, observable } from "mobx";

export interface noteData {
    freq: number,
    name: string,
    noteGain: GainNode,
    sinOsc: OscillatorNode,
    sinGain: GainNode,
    squareOsc: OscillatorNode,
    squareGain: GainNode,
    whiteNoise: AudioBufferSourceNode,
    whiteNoiseGain: GainNode
};

export class NoteStoreImplementation {

    notes: noteData[] = [];

    constructor() {
        makeObservable(this, {
            notes: observable,
            addNote: action,
        });
    }

    addNote(
        freq: number,
        name: string,
        noteGain: GainNode,
        sinOsc: OscillatorNode,
        sinGain: GainNode,
        squareOsc: OscillatorNode,
        squareGain: GainNode,
        whiteNoise: AudioBufferSourceNode,
        whiteNoiseGain: GainNode) {

        const note: noteData = {
            freq: freq,
            name: name,
            noteGain: noteGain,
            sinOsc: sinOsc,
            sinGain: sinGain,
            squareOsc: squareOsc,
            squareGain: squareGain,
            whiteNoise: whiteNoise,
            whiteNoiseGain: whiteNoiseGain
        }

        this.notes.push(note);
    }
}

export const noteStore = new NoteStoreImplementation();
