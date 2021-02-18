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

const keyboard = {
  a: "C",
  w: "Csharp",
  s: "D",
  e: "Dsharp",
  d: "E",
  f: "F",
  t: "Fsharp",
  g: "G",
  z: "Gsharp",
  h: "A",
  u: "Asharp",
  j: "B",
};

type KeyboardProps = {
  playNoteHandler: (freq: number) => void;
  octave: number;
};

const Keyboard = ({ playNoteHandler, octave }: KeyboardProps) => {
  const handleKeyPress = () => {
    const keydownhandler = (e: KeyboardEvent) => {
      const keyPressed = String(e.key);
      // Start sound
      
      // change taste css
      var element = document.getElementById(keyboard["a"]);
      element && element.classList.add("white__pressed");
    };

    const keyuphandler = (e: KeyboardEvent) => {
      // Start sound

      // change taste css
      var element = document.getElementById("C");
      element && element.classList.remove("white__pressed");
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
          onClick={() => playNoteHandler(noteToFrequency(Notes.C, octave))}
        ></li>
        <li
          id="Csharp"
          className="black ds"
          onClick={() => playNoteHandler(noteToFrequency(Notes.Csharp, octave))}
        ></li>
        <li
          id="D"
          className="white d"
          onClick={() => playNoteHandler(noteToFrequency(Notes.D, octave))}
        ></li>
        <li
          id="Dsharp"
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
