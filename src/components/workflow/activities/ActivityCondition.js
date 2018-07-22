import React, { Component } from 'react';
import ActivityBox from './ActivityBox';
import ActivityFinalPoint from './ActivityFinalPoint';
import Image from './images/activity-condition-32.png';
import T from 'i18n-react';
import './ActivityCondition.css';

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
            <td>
              <ActivityBox
                activity={this.props.activity}
                onCut={this.props.onCut}
                onEdit={this.props.onEdit}
                onChange={this.props.onChange} />
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
  type: "Condition",
  name: 'activity.condition',
  image: Image,
  ActivityChart: Activity,
  createConnections(manager, activity) {
    return manager.createConnectionsParallel(activity);
  },
  generateActivity: (manager) => {
    return {
      id: manager.newId(),
      name: T.translate("activity.newCondition"),
      type: "Condition",
      childrenActivities: [
        {
          id: manager.newId(),
          type: "Sequence",
          label: T.translate("activity.conditionTrue")
        },
        {
          id: manager.newId(),
          type: "Sequence",
          label: T.translate("activity.conditionFalse")
        }
      ]
    }
  }
}