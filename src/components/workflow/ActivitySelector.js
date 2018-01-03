import React, { Component } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActivityType from './classes/ActivityType';
import ImageTask from './images/activity-task-32.png';
import ImageCondition from './images/activity-condition-32.png';
import ImageLoop from './images/activity-loop-32.png';
import ImageEmail from './images/activity-email-32.png';
import ImageBranch from './images/activity-branch-32.png';
import ImageClipboard from './images/clipboard.png';
import T from 'i18n-react';


class ActivitySelector extends Component {
  getActivities(){
    let activities = [];
    if (this.props.activityClipboard){
      activities.push({
        type: "clipboard", 
        text: T.translate("workflow.clipboard"),
        image: ImageClipboard
      });
    }
    activities = activities.concat([
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
      },
      {
        type: ActivityType.Email, 
        text: T.translate("workflow.email"),
        image: ImageEmail
      },
      {
        type: ActivityType.Parallel, 
        text: T.translate("workflow.parallel"),
        image: ImageBranch
      }        
    ]);
    return activities;
  }
  handleClose = () => {
    this.props.onClose(null);
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
                  <Avatar src={activity.image} style={{height: 24,width: 24}} />
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