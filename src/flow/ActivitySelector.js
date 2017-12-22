import React, { Component } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActivityType from './ActivityType';
import ImageTask from './images/activity-task-32.png';
import ImageCondition from './images/activity-condition-32.png';
import ImageLoop from './images/activity-loop-32.png';

let activities = [
  {
    type: ActivityType.Task, 
    text: "Tarea",
    image: ImageTask
  },
  {
    type: ActivityType.Condition, 
    text: "Condición",
    image: ImageCondition
  },
  {
    type: ActivityType.Loop, 
    text: "Repetir",
    image: ImageLoop
  },
  {
    type: ActivityType.Task, 
    text: "Tarea",
    image: ImageTask
  },
  {
    type: ActivityType.Condition, 
    text: "Condición",
    image: ImageCondition
  },
  {
    type: ActivityType.Loop, 
    text: "Repetir",
    image: ImageLoop
  },
  {
    type: ActivityType.Task, 
    text: "Tarea",
    image: ImageTask
  },
  {
    type: ActivityType.Condition, 
    text: "Condición",
    image: ImageCondition
  },
  {
    type: ActivityType.Loop, 
    text: "Repetir",
    image: ImageLoop
  },
  {
    type: ActivityType.Task, 
    text: "Tarea",
    image: ImageTask
  },
  {
    type: ActivityType.Condition, 
    text: "Condición",
    image: ImageCondition
  },
  {
    type: ActivityType.Loop, 
    text: "Repetir",
    image: ImageLoop
  }  
];
class ActivitySelector extends Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue } = this.props;

    return (
      <Dialog onClose={this.handleClose} open={true}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <div>
          <List>
            {activities.map(activity => (
              <ListItem button onClick={() => this.handleListItemClick(activity)} key={activity.type}>
                <ListItemAvatar>
                  <Avatar src={activity.image} />
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