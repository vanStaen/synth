import { useEffect } from 'react';
import { noteToFrequency } from '../../helper/noteToFrequency';
import { KeyboardProps } from './Keyboard';

const keyboardToNote: { [key: string]: string } = {
  "a": "C",
  "w": "Db",
  "s": "D",
  "e": "Eb",
  "d": "E",
  "f": "F",
  "t": "Gb",
  "g": "G",
  "z": "Ab",
  "h": "A",
  "u": "Bb",
  "j": "B",
}

function toggleClass(keyPressed: string, addClass: boolean) {
  const element = document.getElementById(keyboardToNote[keyPressed]);
  if (keyboardToNote[keyPressed].includes("b")) {
    element?.classList.toggle("black__pressed", addClass);
  } else {
    element?.classList.toggle("white__pressed", addClass);
  }
}

export function useKeyboard(props: KeyboardProps) {
  const { playNoteHandler, stopNoteHandler, octave } = props;

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      const keyPressed = e.key.toLowerCase();
      if (keyPressed in keyboardToNote) {
        toggleClass(keyPressed, true);
        playNoteHandler(noteToFrequency(keyboardToNote[keyPressed], octave));
      }
    };

    const keyUpHandler = (e: KeyboardEvent) => {
      const keyPressed = e.key.toLowerCase();
      if (keyPressed in keyboardToNote) {
        toggleClass(keyPressed, false);
        stopNoteHandler(noteToFrequency(keyboardToNote[keyPressed], octave));
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    // cleanup function
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  });
}
