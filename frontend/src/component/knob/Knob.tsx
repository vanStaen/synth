import { useState } from 'react';
import knob from '../../logos/knob.svg';
import "./Knob.css";

type KnobProps = {
    value: number;
    valueSetter: (value: number) => void;
    knobName: string;
};

const Knob = ({ value, valueSetter, knobName }: KnobProps) => {

    const [showValue, setShowValue] = useState(false);
    const [knobAngle, setKnobAngle] = useState(0);

    // mouse down : position merken
    // mouse move : diff mousedown zum aktuell
    // mouse move : rechent final position + wert für setter
    // Debounce (für input)
    // z.B 300px oder % vom display höhe
    // css use "rotate"

    return (
        <div
            className="knob"
            onMouseEnter={() => setShowValue(true)}
            onMouseLeave={() => setShowValue(false)}
        >

            <img src={knob} alt="knob" className="knob__logo" />
            {showValue ?
                (<span className="knob__value">{(value * 10).toFixed(2)}</span>) :
                knobName.length === 1 ?
                    (<span className="knob__specialchar" >{knobName}</span>) :
                    (<span className="knob__name" >{knobName}</span>)
            }
        </div>
    )
}

export default Knob;