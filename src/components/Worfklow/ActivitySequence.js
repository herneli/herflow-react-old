import React, { Component } from 'react';
import Activity from './Activity';
import ActivityLabel from './ActivityLabel';
import ActivityInsert from './ActivityInsert';
import ActivityType from './ActivityType';
import AcitivitySelector from './ActivitySelector';

class ActivitySequence extends Component {
  constructor(props){
    super(props);
    this.state = { insertDialog: false };

    // Bindings
    this.handleInsertActivity = this.handleInsertActivity.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  getChildrenActivities() {
    return this.props.activity.childrenActivities || [];
  }

  handleInsertActivity(activity, insertFirst){
    this.setState({insertDialog: true, activity: activity, insertFirst: insertFirst});
  }

  handleCloseDialog(){
    this.setState({insertDialog: false});
  }

  renderChildrenActivities() {
    let childrenActivities = this.getChildrenActivities();

    let returnNodes = [];
    if (!this.props.activity.isMain) {
      returnNodes.push(
        <tr key={this.props.activity._id + "-ins-first"}>
          <td>
            <ActivityInsert 
              activity={this.props.activity} 
              insertFirst={true} 
              onClick={this.handleInsertActivity}/>
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
              <ActivityInsert 
                activity={activity} 
                insertBefore={false} 
                onClick={this.handleInsertActivity}/>
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
      <div>
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
      <AcitivitySelector 
        open={this.state.insertDialog} 
        onClose={this.handleCloseDialog}/>
      </div>
    );
  }
}

export default ActivitySequence;