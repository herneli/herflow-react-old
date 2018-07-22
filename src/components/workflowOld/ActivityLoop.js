import React, { Component } from 'react';
import Activity from './Activity';
import ActivityBox from './ActivityBox';
import ActivityFinalPoint from '../common/ActivityFinalPoint';
import {handleOnChangeChildren} from './utils/activityManager';

class ActivityParallel extends Component {
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
        <td key={activity.id}>
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
            <td id={"activity-" + this.props.activity.id + "-loop-back"}>
              <ActivityBox 
                activity={this.props.activity} 
                onCut={this.props.onCut}
                onChange={this.props.onChange}
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

export default ActivityParallel;