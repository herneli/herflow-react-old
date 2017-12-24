import React, { Component } from 'react';
import Activity from './Activity';
import ActivityLabel from './ActivityLabel';
import ActivityInsert from './ActivityInsert';
import ActivityType from './ActivityType';

class ActivitySequence extends Component {
  getChildrenActivities() {
    return this.props.activity.childrenActivities || [];
  }

  renderChildrenActivities() {
    let childrenActivities = this.getChildrenActivities();

    let returnNodes = [];
    if (!this.props.activity.isMain) {
      returnNodes.push(
        <tr key={this.props.activity._id + "-ins-first"}>
          <td>
            <ActivityInsert activity={this.props.activity} insertFirst={true} />
          </td>
        </tr>
      );
    }
    childrenActivities.forEach((activity, index) => {
      returnNodes.push(
        <tr key={activity._id}>
          <td>
            <Activity activity={activity} />
          </td>
        </tr>
      );
      if (activity.type !== ActivityType.Final) {
        returnNodes.push(
          <tr key={activity._id + "-ins"}>
            <td>
              <ActivityInsert activity={activity} insertBefore={false} />
            </td>
          </tr>
        );
      }
    });
    return returnNodes;
  }
  render() {
    this.anchors = [];

    return (
      <table className="hf-workflow">
        <tbody>
          {this.props.activity.label ?
            <tr>
              <td>
                <ActivityLabel activity={this.props.activity} />
              </td>
            </tr> : null}
          {this.renderChildrenActivities()}
        </tbody>
      </table>
    );
  }
}

export default ActivitySequence;