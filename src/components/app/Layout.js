import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'mdi-react/MenuIcon';
import './Layout.css';
const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  icon: {
    color: "white"
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
            <IconButton className={this.classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon fill="white"/>
            </IconButton>
            <Typography type="title" color="inherit" className={this.classes.flex}>
              Herflow
            </Typography>
            <Button color="contrast">Login</Button>
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