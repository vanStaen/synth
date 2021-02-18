import "./Keyboard.css";
import noteToFrequency from "../../helper/noteToFrequency";
import { useEffect } from "react";

export enum Notes {
  "Aflat" = "Ab",
  "A" = "A",
  "Asharp" = "Bb",
  "Bflat" = "Bb",
  "B" = "B",
  "C" = "C",
  "Csharp" = "Db",
  "Dflat" = "Db",
  "D" = "D",
  "Dsharp" = "Eb",
  "Eflat" = "Eb",
  "E" = "E",
  "F" = "F",
  "Fsharp" = "Gb",
  "Gflat" = "Gb",
  "G" = "G",
  "Gsharp" = "Ab",
}

type KeyboardProps = {
  playNoteHandler: (freq: number) => void;
  octave: number;
};

const Keyboard = ({ playNoteHandler, octave }: KeyboardProps) => {
    
  const handleKeyPress = () => {
    let listener = (e: any) => {

      switch (e.key) {
        case "a":
          playNoteHandler(noteToFrequency(Notes.C, octave));
          break;
        case "w":
          playNoteHandler(noteToFrequency(Notes.Csharp, octave));
          break;
        case "s":
          playNoteHandler(noteToFrequency(Notes.D, octave));
          break;
        case "e":
          playNoteHandler(noteToFrequency(Notes.Dsharp, octave));
          break;
        case "d":
          playNoteHandler(noteToFrequency(Notes.E, octave));
          break;
        case "f":
          playNoteHandler(noteToFrequency(Notes.F, octave));
          break;
        case "t":
          playNoteHandler(noteToFrequency(Notes.Fsharp, octave));
          break;
        case "g":
          playNoteHandler(noteToFrequency(Notes.G, octave));
          break;
        case "z":
          playNoteHandler(noteToFrequency(Notes.Gsharp, octave));
          break;
        case "h":
          playNoteHandler(noteToFrequency(Notes.A, octave));
          break;
        case "u":
          playNoteHandler(noteToFrequency(Notes.Asharp, octave));
          break;
        case "j":
          playNoteHandler(noteToFrequency(Notes.B, octave));
          break;
        default:
          break;
      }
    };

    document.addEventListener("keypress", listener);

    // cleanup function
    return () => {
      document.removeEventListener("keypress", listener);
    };
  };

  useEffect(handleKeyPress);

  return (
    <div>
      <ul className="set">
        <li
          key="C"
          className="white e"
          onClick={() => playNoteHandler(noteToFrequency(Notes.C, octave))}
        ></li>
        <li
          key="C#"
          className="black ds"
          onClick={() => playNoteHandler(noteToFrequency(Notes.Csharp, octave))}
        ></li>
        <li
          key="D"
          className="white d"
          onClick={() => playNoteHandler(noteToFrequency(Notes.D, octave))}
        ></li>
        <li
          key="D#"
          className="black cs"
          onClick={() => playNoteHandler(noteToFrequency(Notes.Dsharp, octave))}
        ></li>
        <li
          key="E"
          className="white c"
          onClick={() => playNoteHandler(noteToFrequency(Notes.E, octave))}
        ></li>
        <li
          key="F"
          className="white b"
          onClick={() => playNoteHandler(noteToFrequency(Notes.F, octave))}
        ></li>
        <li
          key="F#"
          className="black as"
          onClick={() => playNoteHandler(noteToFrequency(Notes.Fsharp, octave))}
        ></li>
        <li
          key="G"
          className="white a"
          onClick={() => playNoteHandler(noteToFrequency(Notes.G, octave))}
        ></li>
        <li
          key="G#"
          className="black gs"
          onClick={() => playNoteHandler(noteToFrequency(Notes.Gsharp, octave))}
        ></li>
        <li
          key="A"
          className="white g"
          onClick={() => playNoteHandler(noteToFrequency(Notes.A, octave))}
        ></li>
        <li
          key="A#"
          className="black fs"
          onClick={() => playNoteHandler(noteToFrequency(Notes.Asharp, octave))}
        ></li>
        <li
          key="B"
          className="white f"
          onClick={() => playNoteHandler(noteToFrequency(Notes.B, octave))}
        ></li>
      </ul>
    </div>
  );
};

export default Keyboard;
