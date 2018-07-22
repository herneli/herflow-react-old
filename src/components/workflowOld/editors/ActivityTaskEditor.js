import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

class ActivityTaskEditor extends Component {
  constructor(props) {
    super(props);
    // State
    this.state = { activity: this.props.activity };
  
  }
  

    render() {
        return (
            <Paper className="hf-activity-wrapper">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    value={this.state.activity.name}
                    label={"Nombre"} fullWidth
                    margin="normal"
                    onChange={(event) => {
                      this.handleOnChange("name", event.target.value)
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
        );
    }
}

export default ActivityTaskEditor;