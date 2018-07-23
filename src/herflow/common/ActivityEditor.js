import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import T from 'i18n-react';

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

class ActivityEditor extends React.Component {
  render() {
    const { classes } = this.props;

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
        <Grid container>
          <Grid item xs={12}>
            {this.props.children}
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}
export default withStyles(styles)(ActivityEditor);
