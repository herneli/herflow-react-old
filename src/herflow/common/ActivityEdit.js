import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Form from "../form/Form";
import T from "i18n-react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ActivityEdit extends React.Component {
  constructor(props) {
    super(props);

    // State
    this.state = { activity: this.props.activity, errors: null };

    // Bindings
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleOnSave = this.handleOnSave.bind(this);

    // Generate form maanger
    this.formManager = this.props.workflowManager.getActivityFormManager(
      this.props.activity
    );
  }

  componentWillReceiveProps(nextProps) {
    this.formManager = this.props.workflowManager.getActivityFormManager(
      this.props.activity
    );
    if (this.props.activity !== nextProps.activity) {
      this.setState({ activity: nextProps.activity, errors: null });
    }
  }

  handleOnChange(activity) {
    this.setState({
      activity: activity,
      errors: null
    });
  }

  handleOnClose() {
    this.props.onClose && this.props.onClose(null);
  }

  handleOnSave() {
    if (this.formManager === null) {
      this.props.onClose && this.props.onClose(null);
      return;
    }
    let errors = this.formManager.validate(
      this.state.activity,
      this.props.workflowManager
    );
    if (errors) {
      this.setState({ errors: errors });
    } else {
      this.props.onClose && this.props.onClose(this.state.activity);
    }
  }

  getEditor() {
    if (this.formManager === null) {
      return null;
    }
    return (
      <Form
        formManager={this.formManager}
        value={this.state.activity}
        errors={this.state.errors}
        onChange={this.handleOnChange}
      />
    );
  }

  render() {
    const { classes } = this.props;
    if (!this.props.open) {
      return null;
    }
    return (
      <Dialog open={this.props.open} fullWidth={true} maxWidth="md">
        <DialogTitle id="form-dialog-title">
          {T.translate("activity.editTitle")}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              {this.getEditor()}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleOnClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.handleOnSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ActivityEdit.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ActivityEdit);
