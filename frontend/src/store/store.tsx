import { action, makeObservable, observable } from "mobx";
import { NoteConfig, createAllNotes } from './createAllNotes';

export interface noteData {
    freq: number,
    name: string,
    sineNoteGain: GainNode,
    sineOsc: OscillatorNode,
    squareNoteGain: GainNode,
    squareOsc: OscillatorNode,
    noiseNoteGain: GainNode,
    noise: AudioBufferSourceNode,
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
        sineNoteGain: GainNode,
        sineOsc: OscillatorNode,
        squareNoteGain: GainNode,
        squareOsc: OscillatorNode,
        noiseNoteGain: GainNode,
        noise: AudioBufferSourceNode) {

        const note: noteData = {
            freq: freq,
            name: name,
            sineNoteGain: sineNoteGain,
            sineOsc: sineOsc,
            squareNoteGain: squareNoteGain,
            squareOsc: squareOsc,
            noiseNoteGain: noiseNoteGain,
            noise: noise
        }

        this.notes.push(note);
    }
}

export const noteStore = new NoteStore();
