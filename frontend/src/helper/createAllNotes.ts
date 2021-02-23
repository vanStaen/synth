import { noteToFrequency } from './noteToFrequency';
import { note } from "../component/note/note";
import { noteStore } from '../store/store';

export const listOfNotes: string[] = [
    "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B",
];

type noteProps = {
    audioContext: AudioContext,
    primaryfilter: BiquadFilterNode,
    sineVolume: number,
    squareVolume: number,
    noiseVolume: number,
};

export default function createAllNotes({ audioContext, primaryfilter, sineVolume, squareVolume, noiseVolume }: noteProps) {
    listOfNotes.forEach((noteToCreate) => {
        let octave;
        for (octave = 1; octave < 9; octave++) {
            note({
                freq: noteToFrequency(noteToCreate, octave),
                name: `${noteToCreate}${octave}`,
                audioContext: audioContext,
                primaryfilter: primaryfilter,
                sineVolume: sineVolume,
                squareVolume: squareVolume,
                noiseVolume: noiseVolume,
                noteStore: noteStore,
            })
            // console.log("note created", `${noteToCreate}${octave}`, noteToFrequency(noteToCreate, 3));
        }
    })
}