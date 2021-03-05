import "./Keyboard.css";
import { noteToFrequency } from "../../helper/noteToFrequency";
import { useKeyboard } from './useKeyboard';
import { useEffect, useState } from "react";

const keys = [
  {note: 'C', className: 'white e'},
  {note: 'Db', className: 'black ds'},
  {note: 'D', className: 'white d'},
  {note: 'Eb', className: 'black cs'},
  {note: 'E', className: 'white c'},
  {note: 'F', className: 'white b'},
  {note: 'Gb', className: 'black as'},
  {note: 'G', className: 'white a'},
  {note: 'Ab', className: 'black gs'},
  {note: 'A', className: 'white g'},
  {note: 'Bb', className: 'black fs'},
  {note: 'B', className: 'white f'},
]

export type KeyboardProps = {
  playNoteHandler: (freq: number) => void;
  stopNoteHandler: (freq: number) => void;
  octave: number;
};


const Keyboard = (props: KeyboardProps) => {
  const { playNoteHandler, stopNoteHandler, octave } = props;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const handleWindowsResize = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowsResize);
    return () => {
      window.removeEventListener('resize', handleWindowsResize);
    };
  }, [setWindowWidth]);

  useKeyboard(props);

  return (
    <div>
      <ul className="set">
        {keys.map((key) =>
          <li
            id={key.note}
            key={key.note}
            className={key.className}
            onMouseDown={() => playNoteHandler(noteToFrequency(key.note, octave))}
            onMouseUp={() => stopNoteHandler(noteToFrequency(key.note, octave))}
            onMouseLeave={() => stopNoteHandler(noteToFrequency(key.note, octave))}
          />
        )}
      </ul>
    </div>
  );
};

export default Keyboard;
