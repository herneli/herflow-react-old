import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

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
  render() {
    const { classes } = this.props;
    if (!this.props.open){
      return null;
    }
    return (
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.props.onClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="contrast" onClick={this.props.onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                {this.props.activity.name}
              </Typography>
              <Button color="contrast" onClick={this.props.onClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div>
            <h1>Edit</h1>
          </div>
        </Dialog>
    );
  }
}

ActivityEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActivityEdit);