import { useState } from "react";
import './PresetDropDown.css';

const PresetDropDown = () => {
  const [value, setValue] = useState(2);

  const changeHandler = (event: React.ChangeEvent) => {
    console.log(event);
  };

  return (
    <div className="Preset">
      <select name="rpeset" id="preset" className="Preset__dropdown">
        <option value="1">First Preset</option>
        <option value="2">Sinus Only</option>
        <option value="3">Noise Only</option>
        <option value="4">All-to-the-Max</option>
      </select>
      <label htmlFor="htmlFor" className="Preset__title">Choose a preset</label>
    </div>
  );
};

export default PresetDropDown;
