import React, { Component } from 'react';
import Activity from './Activity';
import ActivityLabel from './ActivityLabel';

class ActivitySequence extends Component {
    getChildrenActivities(){
    return this.props.activity.childrenActivities || [];
  }
  renderChildrenActivities(){
    let childrenActivities = this.getChildrenActivities();
    return childrenActivities.map((activity) => {
      return (
        <tr key={activity._id}>
          <td>
            <Activity activity={activity} />
          </td>
        </tr>
      );
    });
  }
  render() {
    this.anchors = [];

    return (
      <table className="hf-workflow">
        <tbody>
          {
            this.props.activity.label ? 
            <tr><td>
            <ActivityLabel activity={this.props.activity} />
            </td>
            </tr>
            :
            null
          }
          {this.renderChildrenActivities()}
        </tbody>
      </table>
    );
  }
}

export default ActivitySequence;