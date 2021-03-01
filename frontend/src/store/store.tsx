import { action, makeObservable, observable } from "mobx";
import { NoteConfig, createAllNotes } from './createAllNotes';

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

export class NoteStore {

    notes: noteData[] = [];

    constructor() {
        makeObservable(this, {
            notes: observable,
            addNote: action,
        });
    }

    createAllNotes(noteConfig: NoteConfig) {
        createAllNotes(this, noteConfig);
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

export const noteStore = new NoteStore();
