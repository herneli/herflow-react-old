import React, { Component } from 'react';
import ActivityType from './classes/ActivityType';
import ActivityStatus from './ActivityStatus';
import IconButton from 'material-ui/IconButton';
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';
import Menu, { MenuItem } from 'material-ui/Menu';
import _ from 'lodash';
import T from 'i18n-react';
import './Activity.css';

class ActivityBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenuButton: false,
      menuOpen: false,
      anchorEl: null
    };
    // Bindings
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuSelected = this.handleMenuSelected.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  handleMouseEnter(){
    this.setState(_.assign({},this.state,{showMenuButton: true}));
  }

  handleMouseLeave(){
    this.setState(_.assign({},this.state,{showMenuButton: false}));
  }  

  handleMenuClick(event) {
    this.setState(_.assign({},this.state,{ menuOpen: true, anchorEl: event.currentTarget }));
  };

  handleMenuSelected(selected) {
    this.setState(_.assign({},this.state,{ menuOpen: false, anchorEl: null }));
    if (selected === 'cut'){
      this.props.onCut && this.props.onCut(this.props.activity);
    }
  };

  handleMenuClose(){
    this.setState(_.assign({},this.state,{ menuOpen: false, anchorEl: null }));
  }
  getActivityClass() {
    switch (this.props.activity.type) {
      case ActivityType.Initial:
        return "hf-activity-initial";
      case ActivityType.Final:
        return "hf-activity-final";
      case ActivityType.Task:
        return "hf-activity-task";
      case ActivityType.Approval:
        return "hf-activity-task";
        case ActivityType.Email:
        return "hf-activity-email";
      case ActivityType.Parallel:
        return "hf-activity-branch";
      case ActivityType.Switch:
        return "hf-activity-switch";
      case ActivityType.Condition:
        return "hf-activity-condition";
      case ActivityType.Loop:
        return "hf-activity-loop";
      default:
        return "";
    }
  }

  getActivityStatusClass(){
    let activityStatusClass = "";
    if (this.props.isInstance) {
      switch (this.props.activity.status) {
        case ActivityStatus.Closed:
          activityStatusClass = " rc-activity-closed";
          break;
        case ActivityStatus.Started:
          activityStatusClass = " rc-activity-started";
          break;
        case ActivityStatus.Cancelled:
          activityStatusClass = " rc-activity-cancelled";
          break;
        default:
          activityStatusClass = " rc-activity-cancelled";
      }
    }
    return activityStatusClass;
  }

  render() {
    let activityStatusClass = this.getActivityStatusClass();
    return (
      <div
        id={"activity-" + this.props.activity._id}
        className={"hf-activity " + this.getActivityClass()}
        onMouseEnter={this.handleMouseEnter} 
        onMouseLeave={this.handleMouseLeave} >
        <div className="hf-activity-icon">
        </div>
        <div className="hf-activity-description ellipsis-2">
          <p>{this.props.activity.name}</p>
        </div>
        <div className={"hf-activity-status" + activityStatusClass}>
        </div>
        {this.state.showMenuButton ?
          <div className="hf-activity-menu">
            <IconButton
              aria-owns={'simple-menu'}
              aria-haspopup="true"
              onClick={this.handleMenuClick}>
              <DotsVerticalIcon/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.menuOpen}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={() => this.handleMenuSelected("edit")}><T.span text="edit" /></MenuItem>
              <MenuItem onClick={() => this.handleMenuSelected("cut")}><T.span text="cut" /></MenuItem>
            </Menu>            
          </div> 
          : null 
        }
      </div>
    );
  }
}

export default ActivityBox;