import knob from './knob.svg';
import "./Knob.css";

type KnobProps = {
    value: number;
    valueSetter: (value: number) => void;
    knobName: string;
  };

const Knob  = ({ value, valueSetter, knobName }: KnobProps) => {

    return (
        <div className="knob">
            <img src={knob} alt="knob" />
            { knobName.length === 1 ?
                (<span className="knob__bigName" >{knobName}</span>) :
                (<span className="knob__name" >{knobName}</span>)
            }
        </div>
    )
}

export default Knob;