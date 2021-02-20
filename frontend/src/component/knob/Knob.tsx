import { useState } from 'react';
import knob from './knob.svg';
import "./Knob.css";

type KnobProps = {
    value: number;
    valueSetter: (value: number) => void;
    knobName: string;
  };

const Knob  = ({ value, valueSetter, knobName }: KnobProps) => {

    const [showValue, setShowValue] = useState(false);
    const [knobAngle, setKnobAngle] = useState(0);

    return (
        <div 
            className="knob"        
            onMouseEnter={() => setShowValue(true)}
            onMouseLeave={() => setShowValue(false)}
        >
            <img src={knob} alt="knob" className="knob__logo"/>
            {showValue ? 
                (<span className="knob__value">{(value*10).toFixed(2)}</span>) : 
                    knobName.length === 1 ?
                        (<span className="knob__specialchar" >{knobName}</span>) :
                        (<span className="knob__name" >{knobName}</span>)
            }
        </div>
    )
}

export default Knob;