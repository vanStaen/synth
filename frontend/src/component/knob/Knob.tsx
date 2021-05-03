import { useEffect, useState, useCallback } from "react";
import { degreeToValue } from "../../helper/degreeToValue";
import { valueToDegree } from "../../helper/valueToDegree";
import knob from "../../logos/knob.svg";
import "./Knob.css";

type KnobProps = {
  value: number;
  min: number;
  max: number;
  multiply: number;
  valueSetter: (value: number) => void;
  knobName: string;
  unit: String;
};

const Knob = (props: KnobProps) => {
  const { value, min, max, multiply, valueSetter, knobName, unit } = props;

  const [showValue, setShowValue] = useState(false);
  const [knobValue, setKnobValue] = useState(value);
  const [originalClientY, setOriginalClientY] = useState(0);
  const [mouseIsDown, setMouseIsDown] = useState(false);

  useEffect(() => {
    document.getElementById(knobName)!.setAttribute("draggable", "false");
    setKnobValue(knobValue * multiply);
    const knobRotation = valueToDegree(knobValue, min, max, -90, 310);
    document
      .getElementById(knobName)!
      .style.setProperty("transform", `rotate(${knobRotation}deg)`);
  }, [knobName, setKnobValue, multiply, min, max]);

  const mouseDownHandler = useCallback(
    (event: React.MouseEvent) => {
      window.addEventListener('mouseup',mouseUpHandler)
      setOriginalClientY(event.clientY);
      setMouseIsDown(true);
    },
    [setOriginalClientY, setMouseIsDown]
  );

  const mouseUpHandler = useCallback(() => {
    window.removeEventListener('mouseup',mouseUpHandler)
    setOriginalClientY(0);
    setMouseIsDown(false);
  }, [setOriginalClientY, setMouseIsDown]);

  const mouseLeaveHandler = useCallback(() => {
    if (!mouseIsDown) {
      setOriginalClientY(0);
    }
  }, [mouseIsDown, setOriginalClientY]);

  const mouseMoveHandler = useCallback(
    (event: React.MouseEvent) => {
      if (originalClientY !== 0 && mouseIsDown) {
        const newClientY = event.clientY;
        let movedInPixel = originalClientY - newClientY + 50;
        if (movedInPixel > 100) {
          movedInPixel = 100;
        }
        if (movedInPixel < 0) {
          movedInPixel = 0;
        }
        const movedInDegree = movedInPixel * 3.1 - 90; // 315 degree max, with start at - 90
        const newValue = degreeToValue(movedInDegree, min, max, -90, 310);

        document
          .getElementById(knobName)!
          .style.setProperty("transform", `rotate(${movedInDegree}deg)`);
        valueSetter(newValue);
        setKnobValue(Math.round(newValue * multiply));
      }
    },
    [originalClientY, mouseIsDown, min, max, multiply, knobName, valueSetter]
  );

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
        onMouseLeave={mouseLeaveHandler}
      />
      {showValue ? (
        <span className="knob__value">
          {knobValue}
          {unit}
        </span>
      ) : (
        <span className="knob__name">{knobName}</span>
      )}
    </div>
  );
};

export default Knob;
