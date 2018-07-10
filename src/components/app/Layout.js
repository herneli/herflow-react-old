import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from 'mdi-react/MenuIcon';
import './Layout.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class Layout extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
  }
  
  render() {
    
    return (
      <div className="container">
        <AppBar position="fixed">
          <Toolbar>
            <IconButton className={this.classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon fill="white"/>
            </IconButton>
            <Typography type="title" color="inherit" className={this.classes.flex}>
              Herflow
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <div className="hf-main">      
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);