import React, { Component } from 'react';
import ActivityType from './ActivityType';
import ActivitySequence from './ActivitySequence';
import ActivityParallel from './ActivityParallel';
import ActivityBox from './ActivityBox';

class Activity extends Component {
  getActivityComponent() {
    switch (this.props.activity.type) {
      case ActivityType.Sequence:
        return <ActivitySequence activity={this.props.activity} refAnchors={this.props.refAnchors} />;
      case ActivityType.Parallel:
        return <ActivityParallel activity={this.props.activity} refAnchors={this.props.refAnchors} />;
      case ActivityType.Initial:
      case ActivityType.Final:
      case ActivityType.Task:
      case ActivityType.Approval:
      case ActivityType.Email:
        return <ActivityBox activity={this.props.activity} refAnchors={this.props.refAnchors} />
      default:
        return <div>Component {this.props.activity.type} not defined</div>
    }
  }
  render() {
    return this.getActivityComponent();
  }
}

export default Activity;