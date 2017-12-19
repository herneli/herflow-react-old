import React, { Component } from 'react';

class ActivityLabel extends Component {
  render() {
    return (
      <div id={"activity-" + this.props.activity._id + "-label"} className="hf-label">
        {this.props.activity.label}
      </div>
    );
  }
}

export default ActivityLabel;