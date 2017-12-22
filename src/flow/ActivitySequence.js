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
    childrenActivities.forEach((activity,index) => {
      if (index === 0 && !this.props.activity.isMain){
        returnNodes.push(
          <tr key={activity._id + "-insp"}>
            <td>
              <ActivityInsert activity={activity} insertBefore={true}/>
            </td>
          </tr>
        );
      }
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
            <ActivityInsert activity={activity} insertBefore={false}/>
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
            {!this.props.activity.isMain ?
            <tr>
              <td>
                <ActivityLabel activity={this.props.activity} />
              </td>
            </tr>: null}
          {this.renderChildrenActivities()}
        </tbody>
      </table>
    );
  }
}

export default ActivitySequence;