import React, { Component } from 'react';
import ActivityType from './ActivityType';
class ActivityFinalPoint extends Component {
  render() {
    switch(this.props.activity.type){
      case ActivityType.Loop:
        return (
          <div id={"activity-" + this.props.activity._id + "-final"} className="hf-loop-back" />
        );
      default:
        return (
          <div id={"activity-" + this.props.activity._id + "-final"} className="hf-final-point" />
        );
    }
  }
}

export default ActivityFinalPoint;