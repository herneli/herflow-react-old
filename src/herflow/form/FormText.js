import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class FormText extends Component {
  render() {
    let message = this.props.errors &&  this.props.errors[this.props.field.name] ? this.props.errors[this.props.field.name] : null;
    return (
      <TextField
        error={message !== null}
        value={this.props.value}
        label={this.props.field.label} fullWidth
        margin="normal"
        onChange={(event) => {
          this.props.onChange && this.props.onChange(this.props.field.name, event.target.value);
        }}
        helperText={message}
      />
    );
  }
}

export default FormText;