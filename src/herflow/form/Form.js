import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types';
import FormText from './FormText';
import _ from 'lodash';

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(field,value){
    this.props.onChange && this.props.onChange(_.assign(null,this.props.value,{[field]: value}))
  }
  
  getEditor(field){
    switch (field.type){
      case "string":
        return (
          <FormText
            field={field}
            value={this.props.value && this.props.value[field.name]}
            errors={this.props.errors}
            onChange={this.handleOnChange}
          />
        );
      default: 
        throw new Error("Field " + field.name + "has invalid type " + field.type);
    }
  }

  renderFields(){
    return this.props.formManager.fields.map(function(field,index){
      return (
        <Grid item xs={12} key={index}>
          {this.getEditor(field)}
        </Grid>
      );
    }.bind(this)  );
  }

  render() {
    return (
      <Paper className="hf-activity-wrapper">
        <Grid container>
          {this.renderFields()}
        </Grid>
    </Paper>
    );
  }
}

Form.propTypes = {
  formManager: PropTypes.object.isRequired,
  value: PropTypes.any.isRequired,
  context: PropTypes.object
};
export default Form;