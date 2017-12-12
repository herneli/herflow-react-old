import React, { Component } from 'react';
import './Activity.css';
import ActivityType from './ActivityType';
import ActivityStatus from './ActivityStatus';

class ActivityBox extends Component {
  getActivityClass()
  {
      switch (this.props.activity.type)
      {
          case ActivityType.Automatic:
              return "hf-activity-automatic";
          case ActivityType.Condition:
              return "hf-activity-condition";
          case ActivityType.Email:
              return "hf-activity-email";
          case ActivityType.Final:
              return "hf-activity-final";
          case ActivityType.Initial:
              return "hf-activity-initial";
          case ActivityType.Task:
              return "hf-activity-task";
          case ActivityType.Subworkflow:
              return "hf-activity-subworkflow";
          default:
              return "";
      }
  }

  render() {
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
    return (
      <div 
        className={"hf-activity " + this.getActivityClass() }
        ref={this.props.ref2}
        onClick={() => this.props.onActivityClick(this.props.activity)}>

        <div className="hf-activity-icon">
        </div>
        <div className="hf-activity-description ellipsis-2">
            <p>{this.props.activity.name}</p>
        </div>
        <div className={"hf-activity-status" + activityStatusClass}>
        </div>                
      </div>
    );
  }
}

export default ActivityBox;