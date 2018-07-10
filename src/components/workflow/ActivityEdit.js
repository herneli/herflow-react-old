import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import T from 'i18n-react';
import _ from 'lodash';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ActivityEdit extends React.Component {
  constructor(props) {
    super(props);

    // State
    this.state = { activity: this.props.activity };

    // Bindings
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleOnSave = this.handleOnSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activity !== nextProps.activity) {
      this.setState({ activity: nextProps.activity })
    }
  }

  handleOnChange(field, value) {
    this.setState({
      activity: _.assign({}, this.state.activity, { [field]: value })
    });
  }

  handleOnClose(){
    this.props.onClose && this.props.onClose(null);
  }

  handleOnSave(){
    this.props.onClose && this.props.onClose(this.state.activity);
  }
  

  render() {
    const { classes } = this.props;
    if (!this.props.open) {
      return null;
    }
    return (
      <Dialog
        fullScreen
        open={this.props.open}
        TransitionComponent={Transition}
        className={"hf-dialog-full"}
      >

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleOnClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {this.props.activity.name}
            </Typography>
            <Button color="inherit" onClick={this.handleOnSave}>
              <T.span text="save" />
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container className={"xxx"}>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}

ActivityEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActivityEdit);