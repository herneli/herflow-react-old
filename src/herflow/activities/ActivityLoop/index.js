import React, { Component } from 'react';
import ActivityFinalPoint from '../../common/ActivityFinalPoint';
import Image from '../../images/activity-loop-32.png';
import T from 'i18n-react';
import './ActivityLoop.css';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.handleOnChangeChildren = this.props.manager.handleOnChangeChildren.bind(this);
  }
  
  getChildrenActivities() {
    return this.props.activity.childrenActivities || [];
  }

  
  render() {
    let childrenActivities = this.getChildrenActivities();
    let childrenActivityComponents = childrenActivities.map((activity) => {
      const ActivityChart = this.props.manager.getActivityChart(activity);
      return (
        <td key={activity.id}>
          <ActivityChart
            manager={this.props.manager}
            activity={activity}
            onChange={this.handleOnChangeChildren}
            onCut={this.handleOnCut} />
        </td>
      );
    });
    return (
      <table className="hf-workflow">
        <tbody>
          <tr>
            <td id={"activity-" + this.props.activity.id + "-loop-back"}>
              {this.props.manager.renderActivityBox(this.props)}
            </td>
          </tr>
          <tr>
            <td>
              <table className="hf-workflow">
                <tbody>
                  <tr>
                    {childrenActivityComponents}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <ActivityFinalPoint activity={this.props.activity} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default {
  type: "Loop",
  name: 'activity.loop',
  image: Image,
  ActivityChart: Activity,
  createConnections(manager, activity) {
    return manager.createConnectionsParallel(activity);
  },
  generateActivity: (manager) => {
    return {
      id: manager.newId(),
      name: T.translate("activity.newLoop"),
      type: "Loop",
      childrenActivities: [
        {
          id: manager.newId(),
          type: "Sequence",
          branchName: "loop",
        }
      ]
    }
  }
}