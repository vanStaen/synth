import Grid from "@material-ui/core/Grid";

import { State, Dispatcher } from "../../useAppState";
import Knob from "../knob/Knob";
import Slider from "../slider/Slider";
import PresetDropDown from "../presetDropDown/PresetDropDown";

import "./ControlGrid.css";

interface ControlGridProps {
  dispatch: Dispatcher;
  state: State;
}

const ControlGrid = (props: ControlGridProps) => {
  const { dispatch, state } = props;

  return (
    <div className="ControlGrid__container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="ControlGrid__gridItem">
            <Knob
              value={state.mainVolume}
              name="mainVolume"
              dispatch={dispatch}
              title="vol"
              min={0}
              max={0.1}
              multiply={1000}
              unit="%"
            />
            <Knob
              value={state.noiseVolume}
              name="noiseVolume"
              dispatch={dispatch}
              title="noise"
              min={0.01}
              max={1}
              multiply={100}
              unit="%"
            />
            <Knob
              value={state.sineVolume}
              name="sineVolume"
              dispatch={dispatch}
              title="sin"
              min={0.01}
              max={1}
              multiply={100}
              unit="%"
            />
            <Knob
              value={state.squareVolume}
              name="squareVolume"
              dispatch={dispatch}
              title="square"
              min={0.01}
              max={0.8}
              multiply={100}
              unit="%"
            />
            <Knob
              value={state.filterFreq}
              name="filterFreq"
              dispatch={dispatch}
              title="filter"
              min={30}
              max={20000}
              multiply={1}
              unit="hz"
              color={true}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className="ControlGrid__gridItem">
            <Knob
              value={state.mainVolume}
              name="mainVolume"
              dispatch={dispatch}
              title="Attack"
              min={0}
              max={0.1}
              multiply={1000}
              unit="%"
            />
            <Knob
              value={state.noiseVolume}
              name="noiseVolume"
              dispatch={dispatch}
              title="Decay"
              min={0.01}
              max={1}
              multiply={100}
              unit="%"
            />
            <Knob
              value={state.sineVolume}
              name="sineVolume"
              dispatch={dispatch}
              title="Sustain"
              min={0.01}
              max={1}
              multiply={100}
              unit="%"
            />
            <Knob
              value={state.squareVolume}
              name="squareVolume"
              dispatch={dispatch}
              title="Release"
              min={0.01}
              max={0.8}
              multiply={100}
              unit="%"
            />
          </div>
        </Grid>
        <Grid item xs={5}>
          <Slider />
        </Grid>
        <Grid item xs={5}>
          < PresetDropDown />
        </Grid>        
      </Grid>
    </div>
  );
};

export default ControlGrid;
