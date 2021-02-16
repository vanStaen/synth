import './Keyboard.css'; 

type KeyboardProps = {
    playNoteHandler: (event: React.MouseEvent<HTMLElement>) => void;
  }
  
const Keyboard = ({playNoteHandler}: KeyboardProps) => {

    return (
        <ul className="set">
            <li key="F" className="white b" onClick={playNoteHandler}></li>
            <li key="F#" className="black as" onClick={playNoteHandler}></li>
            <li key="G" className="white a" onClick={playNoteHandler}></li>
            <li key="G#" className="black gs" onClick={playNoteHandler}></li>
            <li key="A" className="white g" onClick={playNoteHandler}></li>
            <li key="A#" className="black fs" onClick={playNoteHandler}></li>
            <li key="B" className="white f" onClick={playNoteHandler}></li>
            <li key="C" className="white e" onClick={playNoteHandler}></li>
            <li key="C#" className="black ds" onClick={playNoteHandler}></li>
            <li key="D" className="white d" onClick={playNoteHandler}></li>
            <li key="D#" className="black cs" onClick={playNoteHandler}></li>
            <li key="E" className="white c" onClick={playNoteHandler}></li>
        </ul>
    )
}

export default Keyboard;
