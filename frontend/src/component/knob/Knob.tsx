import { useEffect, useState } from 'react';
import { degreeToValue } from '../../helper/degreeToValue';
import { valueToDegree } from '../../helper/valueToDegree';
import knob from '../../logos/knob.svg';
import "./Knob.css";

type KnobProps = {
    value: number,
    min: number,
    max: number,
    multiply: number,
    valueSetter: (value: number) => void,
    knobName: string,
    unit: String
};

const Knob = ({ value, min, max, multiply, valueSetter, knobName, unit }: KnobProps) => {

    const [showValue, setShowValue] = useState(false);
    const [knobValue, setKnobValue] = useState(value);
    const [originalClientY, setOriginalClientY] = useState(0);
    const [mouseIsDown, setMouseIsDown] = useState(false);
    const [knobAngle, setKnobAngle] = useState(0);

    useEffect(() => {
        document.getElementById(knobName)!.setAttribute('draggable', "false");
        setKnobValue(knobValue * multiply);
        const knobRotation = valueToDegree(knobValue, min, max, -90, 310)
        document.getElementById(knobName)!.style.setProperty('transform', `rotate(${knobRotation}deg)`);
    }, [])

    const mouseDownHandler = (event: React.MouseEvent) => {
        setOriginalClientY(event.clientY);
        setMouseIsDown(true);
    }

    const mouseUpHandler = (event: React.MouseEvent) => {
        setOriginalClientY(0);
        setMouseIsDown(false);
    }

    const mouseLeaveHandler = (event: React.MouseEvent) => {
        !mouseIsDown && setOriginalClientY(0);
    }

    const mouseMoveHandler = (event: React.MouseEvent) => {
        if (originalClientY !== 0 && mouseIsDown) {
            const newClientY = event.clientY;
            let movedInPixel = (originalClientY - newClientY) + 50;
            if (movedInPixel > 100) { movedInPixel = 100; }
            if (movedInPixel < 0) { movedInPixel = 0; }
            const movedInDegree = (movedInPixel * 3.1) - 90; // 315 degre max, with start at - 90
            const newValue = degreeToValue(movedInDegree, min, max, -90, 310);
            document.getElementById(knobName)!.style.setProperty('transform', `rotate(${movedInDegree}deg)`);
            valueSetter(newValue);
            setKnobValue(Math.round(newValue * multiply));
        }
    }


    return (
        <div
            className="knob"
            onMouseEnter={() => setShowValue(true)}
            onMouseLeave={() => setShowValue(false)}
        >
            <img
                src={knob}
                id={knobName}
                className="knob__image"
                onMouseDown={mouseDownHandler}
                onMouseMove={mouseMoveHandler}
                onMouseUp={mouseUpHandler}
                onMouseLeave={mouseLeaveHandler}
            />
            {showValue ?
                (<span className="knob__value">{knobValue}{unit}</span>) :
                knobName.length === 1 ?
                    (<span className="knob__specialchar" >{knobName}</span>) :
                    (<span className="knob__name" >{knobName}</span>)
            }
        </div>
    )
}

export default Knob;