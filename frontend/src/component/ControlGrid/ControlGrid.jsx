import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import "ControlGrid.css";

const ControlGrid = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper className="paper">xs=4</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="paper">xs=4</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="paper">xs=4</Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className="paper">xs=8</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="paper">xs=4</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ControlGrid;
