import { useState } from "react";

import "./Slider.css";

const Slider = () => {
  const [value, setValue] = useState(2);

  const changeHandler = (event: React.ChangeEvent) => {
    console.log(event);
  };

  return (
    <div className="slider">
      <input
        className="slider__input"
        type="range"
        id="slider"
        name="slider"
        min="0"
        max="4"
        step="1"
        defaultValue="2"
        onChange={changeHandler}
      />
      <label htmlFor="slider" className="slider__title">Octave Select</label>
    </div>
  );
};

export default Slider;
