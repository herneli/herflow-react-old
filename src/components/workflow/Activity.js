import React, { Component } from 'react';
import ActivityType from './classes/ActivityType';
import ActivitySequence from './ActivitySequence';
import ActivityParallel from './ActivityParallel';
import ActivityLoop from './ActivityLoop';
import ActivityCondition from './ActivityCondition';
import ActivityBox from './ActivityBox';

class Activity extends Component {
  getActivityComponent() {
    switch (this.props.activity.type) {
      case ActivityType.Sequence:
        return <ActivitySequence 
                  activity={this.props.activity} 
                  onChange={this.props.onChange}
                  onEdit={this.props.onEdit}
                  onCut={this.props.onCut}/>;
      case ActivityType.Parallel:
        return <ActivityParallel 
                  activity={this.props.activity}  
                  onChange={this.props.onChange}
                  onEdit={this.props.onEdit}
                  onCut={this.props.onCut}/>;
      case ActivityType.Loop:
        return <ActivityLoop 
                  activity={this.props.activity} 
                  onChange={this.props.onChange}
                  onEdit={this.props.onEdit}
                  onCut={this.props.onCut}/>;
      case ActivityType.Condition:
        return <ActivityCondition
          activity={this.props.activity} 
          onChange={this.props.onChange}
          onEdit={this.props.onEdit}
          onCut={this.props.onCut}/>;        
      case ActivityType.Initial:
      case ActivityType.Final:
      case ActivityType.Task:
      case ActivityType.Approval:
      case ActivityType.Email:
        return <ActivityBox 
          activity={this.props.activity} 
          onEdit={this.props.onEdit}
          onCut={this.props.onCut}
        />
      default:
        return <div>Component {this.props.activity.type} not defined</div>
    }
  }
  render() {
    return this.getActivityComponent();
  }
}

export default Activity;