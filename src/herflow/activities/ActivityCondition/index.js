import React, { Component } from 'react';
import ActivityFinalPoint from '../../common/ActivityFinalPoint';
import Image from '../../images/activity-condition-32.png';
import T from 'i18n-react';
import './ActivityCondition.css';

class Branch extends Component {
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
  type: "Condition",
  name: 'activity.condition',
  image: Image,
  ActivityChart: Branch,
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