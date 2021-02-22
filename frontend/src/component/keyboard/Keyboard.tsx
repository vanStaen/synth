import "./Keyboard.css";
import noteToFrequency from "../../helper/noteToFrequency";
import { useEffect } from "react";

const notes: { [note: string]: string } = {
  "Aflat": "Ab",
  "A": "A",
  "Asharp": "Bb",
  "Bflat": "Bb",
  "B": "B",
  "C": "C",
  "Csharp": "Db",
  "Dflat": "Db",
  "D": "D",
  "Dsharp": "Eb",
  "Eflat": "Eb",
  "E": "E",
  "F": "F",
  "Fsharp": "Gb",
  "Gflat": "Gb",
  "G": "G",
  "Gsharp": "Ab",
}

const keyboardToNote: { [key: string]: string } = {
  "a": "C",
  "w": "Csharp",
  "s": "D",
  "e": "Dsharp",
  "d": "E",
  "f": "F",
  "t": "Fsharp",
  "g": "G",
  "z": "Gsharp",
  "h": "A",
  "u": "Asharp",
  "j": "B",
}

type KeyboardProps = {
  playNoteHandler: (freq: number) => void;
  stopNoteHandler: (freq: number) => void;
  octave: number;
};

const Keyboard = ({ playNoteHandler, stopNoteHandler, octave }: KeyboardProps) => {

  const handleKeyPress = () => {
    const keydownhandler = (e: KeyboardEvent) => {
      const keyPressed = e.key.toLowerCase();
      if (keyPressed in keyboardToNote) {
        var element = document.getElementById(keyboardToNote[keyPressed]);
        element && (keyboardToNote[keyPressed].includes("sharp") ?
          element.classList.add("black__pressed") :
          element.classList.add("white__pressed"))
        playNoteHandler(noteToFrequency(notes[keyboardToNote[keyPressed]], octave));
      }
    };

    const keyuphandler = (e: KeyboardEvent) => {
      const keyPressed = e.key.toLowerCase();
      if (keyPressed in keyboardToNote) {
        var element = document.getElementById(keyboardToNote[keyPressed]);
        element && (keyboardToNote[keyPressed].includes("sharp") ?
          element.classList.remove("black__pressed") :
          element.classList.remove("white__pressed"))
        stopNoteHandler(noteToFrequency(notes[keyboardToNote[keyPressed]], octave));
      }
    };

    document.addEventListener("keydown", keydownhandler);
    document.addEventListener("keyup", keyuphandler);

    // cleanup function
    return () => {
      document.removeEventListener("keydown", keydownhandler);
      document.removeEventListener("keyup", keyuphandler);
    };
  };

  useEffect(handleKeyPress);

  return (
    <div>
      <ul className="set">
        <li
          id="C"
          className="white e"
          onMouseDown={() => playNoteHandler(noteToFrequency(notes["C"], octave))}
          onMouseUp={() => stopNoteHandler(noteToFrequency(notes["C"], octave))}
          onMouseLeave={() => stopNoteHandler(noteToFrequency(notes["C"], octave))}
        ></li>
        <li
          id="Csharp"
          className="black ds"
          onMouseDown={() => playNoteHandler(noteToFrequency(notes["Csharp"], octave))}
          onMouseUp={() => stopNoteHandler(noteToFrequency(notes["Csharp"], octave))}
          onMouseLeave={() => stopNoteHandler(noteToFrequency(notes["Csharp"], octave))}
        ></li>
        <li
          id="D"
          className="white d"
          onMouseDown={() => playNoteHandler(noteToFrequency(notes["D"], octave))}
          onMouseUp={() => stopNoteHandler(noteToFrequency(notes["D"], octave))}
          onMouseLeave={() => stopNoteHandler(noteToFrequency(notes["D"], octave))}
        ></li>
        <li
          id="Dsharp"
          className="black cs"
          onMouseDown={() => playNoteHandler(noteToFrequency(notes["Dsharp"], octave))}
          onMouseUp={() => stopNoteHandler(noteToFrequency(notes["Dsharp"], octave))}
          onMouseLeave={() => stopNoteHandler(noteToFrequency(notes["Dsharp"], octave))}
        ></li>
        <li
          id="E"
          className="white c"
          onMouseDown={() => playNoteHandler(noteToFrequency(notes["E"], octave))}
          onMouseUp={() => stopNoteHandler(noteToFrequency(notes["E"], octave))}
          onMouseLeave={() => stopNoteHandler(noteToFrequency(notes["E"], octave))}
        ></li>
        <li
          id="F"
          className="white b"
          onMouseDown={() => playNoteHandler(noteToFrequency(notes["F"], octave))}
          onMouseUp={() => stopNoteHandler(noteToFrequency(notes["F"], octave))}
          onMouseLeave={() => stopNoteHandler(noteToFrequency(notes["F"], octave))}
        ></li>
        <li
          id="Fsharp"
          className="black as"
          onMouseDown={() => playNoteHandler(noteToFrequency(notes["Fsharp"], octave))}
          onMouseUp={() => stopNoteHandler(noteToFrequency(notes["Fsharp"], octave))}
          onMouseLeave={() => stopNoteHandler(noteToFrequency(notes["Fsharp"], octave))}
        ></li>
        <li
          id="G"
          className="white a"
          onMouseDown={() => playNoteHandler(noteToFrequency(notes["G"], octave))}
          onMouseUp={() => stopNoteHandler(noteToFrequency(notes["G"], octave))}
          onMouseLeave={() => stopNoteHandler(noteToFrequency(notes["G"], octave))}
        ></li>
        <li
          id="Gsharp"
          className="black gs"
          onMouseDown={() => playNoteHandler(noteToFrequency(notes["Gsharp"], octave))}
          onMouseUp={() => stopNoteHandler(noteToFrequency(notes["Gsharp"], octave))}
          onMouseLeave={() => stopNoteHandler(noteToFrequency(notes["Gsharp"], octave))}
        ></li>
        <li
          id="A"
          className="white g"
          onMouseDown={() => playNoteHandler(noteToFrequency(notes["A"], octave))}
          onMouseUp={() => stopNoteHandler(noteToFrequency(notes["A"], octave))}
          onMouseLeave={() => stopNoteHandler(noteToFrequency(notes["A"], octave))}
        ></li>
        <li
          id="Asharp"
          className="black fs"
          onMouseDown={() => playNoteHandler(noteToFrequency(notes["Asharp"], octave))}
          onMouseUp={() => stopNoteHandler(noteToFrequency(notes["Asharp"], octave))}
          onMouseLeave={() => stopNoteHandler(noteToFrequency(notes["Asharp"], octave))}
        ></li>
        <li
          id="B"
          className="white f"
          onMouseDown={() => playNoteHandler(noteToFrequency(notes["B"], octave))}
          onMouseUp={() => stopNoteHandler(noteToFrequency(notes["B"], octave))}
          onMouseLeave={() => stopNoteHandler(noteToFrequency(notes["B"], octave))}
        ></li>
      </ul>
    </div>
  );
};

export default Keyboard;
