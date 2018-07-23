import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';

class ActivityTaskEditor extends Component {
  constructor(props) {
    super(props);
    // State
    this.state = { activity: this.props.activity };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  
  handleOnChange(field,value){
    this.props.onChange(_.assign(null,this.props.activity,{[field]: value}))
  }

  getMessage(field){
    if (!this.props.errors){
      return null;
    }
    let error = _.find(this.props.errors,{field: field});
    if (error){
      return error.message;
    }else{
      return null;
    }
  }

  render() {
      return (
          <Paper className="hf-activity-wrapper">
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  value={this.props.activity.name}
                  label={"Nombre"} fullWidth
                  margin="normal"
                  onChange={(event) => {
                    this.handleOnChange("name", event.target.value)
                  }}
                  helperText={this.getMessage("name")}
                />
              </Grid>
            </Grid>
          </Paper>
      );
    }
}

export default ActivityTaskEditor;