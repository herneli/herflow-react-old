import React, { Component } from 'react';
import './Activity.css';
import ActivityType from './ActivityType';
import ActivityStatus from './ActivityStatus';

class ActivityBox extends Component {
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
        className={"hf-activity " + this.getActivityClass()}>

        <div className="hf-activity-icon">
        </div>
        <div className="hf-activity-description ellipsis-2">
          <p>{this.props.activity._id} {this.props.activity.name}</p>
        </div>
        <div className={"hf-activity-status" + activityStatusClass}>
        </div>
      </div>
    );
  }
}

export default ActivityBox;