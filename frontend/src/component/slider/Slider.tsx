import { useEffect, useRef } from "react";
import { MDCSlider } from "@material/slider";

const Slider = () => {

  const slider = useRef<MDCSlider | null>(null)

  useEffect(() => {
    const sliderElement = document.querySelector(".mdc-slider")
    if (sliderElement) { slider.current = new MDCSlider(sliderElement) }
  }, [])

  return (
    <div className="mdc-slider">
      <input
        className="mdc-slider__input"
        type="range"
        min="0"
        max="100"
        value="50"
        name="volume"
        aria-label="Continuous slider demo"
      />
      <div className="mdc-slider__track">
        <div className="mdc-slider__track--inactive"></div>
        <div className="mdc-slider__track--active">
          <div className="mdc-slider__track--active_fill"></div>
        </div>
      </div>
      <div className="mdc-slider__thumb">
        <div
          className="mdc-slider__value-indicator-container"
          aria-hidden="true"
        >
          <div className="mdc-slider__value-indicator">
            <span className="mdc-slider__value-indicator-text">
              Octave selector
            </span>
          </div>
        </div>
        <div className="mdc-slider__thumb-knob"></div>
      </div>
    </div>
  );
};

export default Slider;
