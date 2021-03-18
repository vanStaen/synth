import Grid from "@material-ui/core/Grid";
import Knob from "../knob/Knob";

import "./ControlGrid.css";

export type ControlGridProps = {
  octave: number,
  mainVolume: number,
  noiseVolume: number,
  sineVolume: number,
  squareVolume: number,
  filterFreq: number,
};

const ControlGrid = (props: ControlGridProps) => {
  return (
    <div className="ControlGrid__container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="ControlGrid__gridItem">
            <Knob
              value={mainVolume}
              valueSetter={setMainVolume}
              knobName="vol"
              min={0}
              max={0.1}
              multiply={1000}
              unit="%"
            />
            <Knob
              value={noiseVolume}
              valueSetter={setNoiseVolume}
              knobName="noise"
              min={0.01}
              max={1}
              multiply={100}
              unit="%"
            />
            <Knob
              value={sineVolume}
              valueSetter={setSineVolume}
              knobName="sin"
              min={0.01}
              max={1}
              multiply={100}
              unit="%"
            />
            <Knob
              value={squareVolume}
              valueSetter={setSquareVolume}
              knobName="square"
              min={0.01}
              max={0.8}
              multiply={100}
              unit="%"
            />
            <Knob
              value={filterFreq}
              valueSetter={setFilterFreq}
              knobName="filter"
              min={30}
              max={20000}
              multiply={1}
              unit="hz"
            />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="ControlGrid__gridItem">3</div>
        </Grid>
        <Grid item xs={6}>
          <div className="ControlGrid__gridItem">Graph</div>
        </Grid>
        <Grid item xs={3}>
          <div className="ControlGrid__gridItem">3</div>
        </Grid>
        <Grid item xs={8}>
          <div className="ControlGrid__gridItem">xs=8</div>
        </Grid>
        <Grid item xs={4}>
          <div className="ControlGrid__gridItem">xs=4</div>
        </Grid>
        <Grid item xs={4}>
          <div className="ControlGrid__gridItem">xs=4</div>
        </Grid>
        <Grid item xs={5}>
          <div className="ControlGrid__gridItem">xs=5</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ControlGrid;
