import "./Keyboard.css";
import noteToFrequency from "../../helper/noteToFrequency";
import { useEffect } from "react";

const notes: { [note: string]: string } = {
  "Aflat" : "Ab",
  "A" : "A",
  "Asharp" : "Bb",
  "Bflat" : "Bb",
  "B" : "B",
  "C" : "C",
  "Csharp" : "Db",
  "Dflat" : "Db",
  "D" : "D",
  "Dsharp" : "Eb",
  "Eflat" : "Eb",
  "E" : "E",
  "F" : "F",
  "Fsharp" : "Gb",
  "Gflat" : "Gb",
  "G" : "G",
  "Gsharp" : "Ab",
}

const keyboardToNote: { [key: string]: string } = {
  "a" : "C",
  "w" : "Csharp",
  "s" : "D",
  "e" : "Dsharp",
  "d" : "E",
  "f" : "F",
  "t" : "Fsharp",
  "g" : "G",
  "z" : "Gsharp",
  "h" : "A",
  "u" : "Asharp",
  "j" : "B",
}

type KeyboardProps = {
  playNoteHandler: (freq: number) => void;
  stopNoteHandler: (freq: number) => void;
  octave: number;
};

const Keyboard = ({ playNoteHandler, stopNoteHandler, octave }: KeyboardProps) => {
  const handleKeyPress = () => {
    const keydownhandler = (e: KeyboardEvent) => {
      const keyPressed = e.key;
      var element = document.getElementById(keyboardToNote[keyPressed]);
      element && ( keyboardToNote[keyPressed].includes("sharp") ? 
      element.classList.add("black__pressed") : 
      element.classList.add("white__pressed") )
      // Start sound
      keyboardToNote[keyPressed] &&
      playNoteHandler(noteToFrequency(notes[keyboardToNote[keyPressed]], octave));
    };

    const keyuphandler = (e: KeyboardEvent) => {
      const keyPressed = e.key;
      var element = document.getElementById(keyboardToNote[keyPressed]);
      element && ( keyboardToNote[keyPressed].includes("sharp") ? 
      element.classList.remove("black__pressed") :
      element.classList.remove("white__pressed") )
      // Stop sound
      keyboardToNote[keyPressed] &&
      stopNoteHandler(noteToFrequency(notes[keyboardToNote[keyPressed]], octave));
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
          onClick={() => playNoteHandler(noteToFrequency(notes["C"], octave))}
        ></li>
        <li
          id="Csharp"
          className="black ds"
          onClick={() => playNoteHandler(noteToFrequency(notes["Csharp"], octave))}
        ></li>
        <li
          id="D"
          className="white d"
          onClick={() => playNoteHandler(noteToFrequency(notes["D"], octave))}
        ></li>
        <li
          id="Dsharp"
          className="black cs"
          onClick={() => playNoteHandler(noteToFrequency(notes["Dsharp"], octave))}
        ></li>
        <li
          id="E"
          className="white c"
          onClick={() => playNoteHandler(noteToFrequency(notes["E"], octave))}
        ></li>
        <li
          id="F"
          className="white b"
          onClick={() => playNoteHandler(noteToFrequency(notes["F"], octave))}
        ></li>
        <li
          id="Fsharp"
          className="black as"
          onClick={() => playNoteHandler(noteToFrequency(notes["Fsharp"], octave))}
        ></li>
        <li
          id="G"
          className="white a"
          onClick={() => playNoteHandler(noteToFrequency(notes["G"], octave))}
        ></li>
        <li
          id="Gsharp"
          className="black gs"
          onClick={() => playNoteHandler(noteToFrequency(notes["Gsharp"], octave))}
        ></li>
        <li
          id="A"
          className="white g"
          onClick={() => playNoteHandler(noteToFrequency(notes["A"], octave))}
        ></li>
        <li
          id="Asharp"
          className="black fs"
          onClick={() => playNoteHandler(noteToFrequency(notes["Asharp"], octave))}
        ></li>
        <li
          id="B"
          className="white f"
          onClick={() => playNoteHandler(noteToFrequency(notes["B"], octave))}
        ></li>
      </ul>
    </div>
  );
};

export default Keyboard;
