import React, { Component } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActivityType from './ActivityType';
import ImageTask from './images/activity-task-32.png';
import ImageCondition from './images/activity-condition-32.png';
import ImageLoop from './images/activity-loop-32.png';
import T from 'i18n-react';


class ActivitySelector extends Component {
  getActivities(){
    return [
      {
        type: ActivityType.Task, 
        text: T.translate("workflow.task"),
        image: ImageTask
      },
      {
        type: ActivityType.Condition, 
        text: T.translate("workflow.condition"),
        image: ImageCondition
      },
      {
        type: ActivityType.Loop, 
        text: T.translate("workflow.loop"),
        image: ImageLoop
      }  
    ];
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    return (
      <Dialog onClose={this.handleClose} open={this.props.open}>
        <DialogTitle id="simple-dialog-title"><T.span text="workflow.selectActivity" /></DialogTitle>
        <div>
          <List>
            {this.getActivities().map((activity,index) => (
              <ListItem button onClick={() => this.handleListItemClick(activity)} key={index}>
                <ListItemAvatar>
                  <Avatar src={activity.image} style={{height: 24,width: 24}}/>
                </ListItemAvatar>
                <ListItemText primary={activity.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

export default ActivitySelector;