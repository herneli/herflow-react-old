import React, { Component } from 'react';
class ActivityFinalPoint extends Component {
  render() {
    return (
      <div id={"activity-" + this.props.activity._id + "-final"} style={{height: 1,width: 1,display: "inline-block"}}></div>
    );
  }
}

export default ActivityFinalPoint;