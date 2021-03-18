import Grid from "@material-ui/core/Grid";
import Knob from "../knob/Knob";

import "./ControlGrid.css";

const ControlGrid = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="gridItem">xs=4</div>
        </Grid>
        <Grid item xs={4}>
          <div className="gridItem">xs=4</div>
        </Grid>
        <Grid item xs={4}>
          <div className="gridItem">xs=4</div>
        </Grid>
        <Grid item xs={4}>
          <div className="gridItem">xs=4</div>
        </Grid>
        <Grid item xs={4}>
          <div className="gridItem">xs=4</div>
        </Grid>
        <Grid item xs={4}>
          <div className="gridItem">xs=4</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ControlGrid;
