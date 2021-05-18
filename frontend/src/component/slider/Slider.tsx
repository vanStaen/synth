import { useCallback } from "react";
import { Dispatcher } from "../../useAppState";

import "./Slider.css";

type SliderProps = {
  value: number;
  name: "octave";
  dispatch: Dispatcher;
  title: string;
  min: number;
  max: number;
};
const Slider = (props: SliderProps) => {
  const { value, name, min, max, dispatch, title } = props;

  const changeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: name, value: parseInt(event.target.value, 10) });
      console.log(event.target.value);
    },
    []
  );

  return (
    <div className="slider">
      <input
        className="slider__input"
        type="range"
        id={`${name}_slider`}
        name={name}
        min={min}
        max={max}
        step="1"
        defaultValue={value}
        onChange={changeHandler}
      />
      <label htmlFor="slider" className="slider__title">
        {title}
      </label>
    </div>
  );
};

export default Slider;
