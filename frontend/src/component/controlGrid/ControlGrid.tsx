import Grid from "@material-ui/core/Grid";
import Knob from "../knob/Knob";
import Slider from "../slider/Slider";

import "./ControlGrid.css";

interface ControlGridProps {
  octave: number;
  setOctave: (num: number) => void;
  mainVolume: number;
  setMainVolume: (num: number) => void;
  noiseVolume: number;
  setNoiseVolume: (num: number) => void;
  sineVolume: number;
  setSineVolume: (num: number) => void;
  squareVolume: number;
  setSquareVolume: (num: number) => void;
  filterFreq: number;
  setFilterFreq: (num: number) => void;
  //reducer: (action: Action) => void;
}

const ControlGrid = (props: ControlGridProps) => {
  const {
    octave,
    setOctave,
    mainVolume,
    setMainVolume,
    noiseVolume,
    setNoiseVolume,
    sineVolume,
    setSineVolume,
    squareVolume,
    setSquareVolume,
    filterFreq,
    setFilterFreq,
  } = props;

  return (
    <div className="ControlGrid__container">
      <Grid container spacing={2}>
        {/* VOLUME */}
        <Grid item xs={2}>
          <Knob
            value={mainVolume}
            valueSetter={setMainVolume}
            knobName="vol"
            min={0}
            max={0.1}
            multiply={1000}
            unit="%"
          />
        </Grid>
        <Grid item xs={2}>
          <Knob
            value={noiseVolume}
            valueSetter={setNoiseVolume}
            knobName="noise"
            min={0.01}
            max={1}
            multiply={100}
            unit="%"
          />
        </Grid>
        <Grid item xs={2}>
          <Knob
            value={sineVolume}
            valueSetter={setSineVolume}
            knobName="sin"
            min={0.01}
            max={1}
            multiply={100}
            unit="%"
          />
        </Grid>
        <Grid item xs={2}>
          <Knob
            value={squareVolume}
            valueSetter={setSquareVolume}
            knobName="square"
            min={0.01}
            max={0.8}
            multiply={100}
            unit="%"
          />
        </Grid>

        {/* ADSR */}
        <Grid item xs={2}>
          <Knob
            value={mainVolume}
            valueSetter={setMainVolume}
            knobName="Attack"
            min={0}
            max={100}
            multiply={1}
            unit="%"
          />
        </Grid>
        <Grid item xs={2}>
          <Knob
            value={mainVolume}
            valueSetter={setMainVolume}
            knobName="Decay"
            min={0}
            max={100}
            multiply={1}
            unit="%"
          />
        </Grid>
        <Grid item xs={2}>
          <Knob
            value={mainVolume}
            valueSetter={setMainVolume}
            knobName="Release"
            min={0}
            max={100}
            multiply={1}
            unit="%"
          />
        </Grid>
        <Grid item xs={2}>
          <Knob
            value={mainVolume}
            valueSetter={setMainVolume}
            knobName="Sustain"
            min={0}
            max={100}
            multiply={1}
            unit="%"
          />
        </Grid>

        <Grid item xs={2}>
          <Knob
            value={filterFreq}
            valueSetter={setFilterFreq}
            knobName="filter"
            min={30}
            max={20000}
            multiply={1}
            unit="hz"
          />
        </Grid>
        <Grid item xs={5}>
            <Slider />
        </Grid>
      </Grid>
    </div>
  );
};

export default ControlGrid;
