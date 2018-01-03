import React, { Component } from 'react';
import Activity from './Activity';
import ActivityBox from './ActivityBox';
import ActivityFinalPoint from './ActivityFinalPoint';
import {handleOnChangeChildren} from './utils/activityManager';

class ActivityCondition extends Component {
  constructor(props) {
    super(props);
    this.handleOnChangeChildren = handleOnChangeChildren.bind(this);
  }
  
  getChildrenActivities() {
    return this.props.activity.childrenActivities || [];
  }

  render() {
    let childrenActivities = this.getChildrenActivities();
    let childrenActivityComponents = childrenActivities.map((activity) => {
      return (
        <td key={activity._id}>
          <Activity 
            activity={activity} 
            onChange={this.handleOnChangeChildren}/>
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
              />
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

export default ActivityCondition;