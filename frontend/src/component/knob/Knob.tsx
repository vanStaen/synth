import { useEffect, useState, useCallback } from "react";

import { Dispatcher } from "../../useAppState";
import { degreeToValue } from "../../helper/degreeToValue";
import { valueToDegree } from "../../helper/valueToDegree";
import knob from "../../logos/knob.svg";
import "./Knob.css";

type KnobProps = {
  value: number;
  name: "octave" | "mainVolume" | "noiseVolume" | "sineVolume" | "squareVolume" | "filterFreq";
  min: number;
  max: number;
  multiply: number;
  dispatch: Dispatcher;
  title: string;
  unit: String;
  color?: boolean;
};

const Knob = (props: KnobProps) => {
  const { value, name, min, max, multiply, dispatch, title, unit, color } = props;

  const [showValue, setShowValue] = useState(false);
  const [knobValue, setKnobValue] = useState(value);
  const [originalClientY, setOriginalClientY] = useState(0);
  const [mouseIsDown, setMouseIsDown] = useState(false);

  useEffect(() => {
    document.getElementById(title)!.setAttribute("draggable", "false");
    setKnobValue(knobValue * multiply);
    const knobRotation = valueToDegree(knobValue, min, max, -90, 310);
    document
      .getElementById(title)!
      .style.setProperty("transform", `rotate(${knobRotation}deg)`);
  }, [title, setKnobValue, multiply, min, max]);

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
          .getElementById(title)!
          .style.setProperty("transform", `rotate(${movedInDegree}deg)`);
        dispatch({ type: name, value: newValue });
        setKnobValue(Math.round(newValue * multiply));
      }
    },
    [originalClientY, mouseIsDown, min, max, multiply, title, dispatch]
  );

  return (
    <div
      className="knob"
      onMouseEnter={() => setShowValue(true)}
      onMouseLeave={() => setShowValue(false)}
    >
      <img
        src={knob}
        id={title}
        className="knob__image"
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseLeave={mouseLeaveHandler}
        style={ color ? { filter: "hue-rotate(180deg) sepia(20%)"} : {}}
      />
      {showValue ? (
        <span className="knob__value">
          {knobValue}
          {unit}
        </span>
      ) : (
          <span className="knob__name">{title}</span>
        )}
    </div>
  );
};

export default Knob;
