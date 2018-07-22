import React, { Component } from 'react';
import Activity from './Activity';
import ActivityLabel from './ActivityLabel';
import ActivityInsert from './ActivityInsert';
import ActivityType from './classes/ActivityType';
import AcitivitySelector from './ActivitySelector';
import { handleOnChangeChildren } from './utils/activityManager';
import ActivityManager from './classes/ActivityManager';
import _ from 'lodash';
import { setActivityClipboard } from './redux/actions'
import { connect } from 'react-redux';

class ActivitySequence extends Component {
  constructor(props) {
    super(props);
    this.state = { insertDialog: false };

    // Bindings
    this.handleInsertActivity = this.handleInsertActivity.bind(this);
    this.handleCloseSelector = this.handleCloseSelector.bind(this);
    this.handleOnChangeChildren = handleOnChangeChildren.bind(this);
    this.handleOnCut = this.handleOnCut.bind(this);
  }

  getChildrenActivities() {
    return this.props.activity.childrenActivities || [];
  }

  handleInsertActivity(insertIndex) {
    this.setState({ insertDialog: true, insertIndex });
  }

  handleCloseSelector(activity) {
    if (activity) {
      let addedActivity;
      let children = this.getChildrenActivities();
      if (activity.type === 'clipboard'){
        addedActivity = this.props.activityClipboard;
      }else{
        addedActivity = ActivityManager.generateActivity(activity.type);
      }
      
      let newActivity = _.assign({}, this.props.activity, {
        childrenActivities: [
          ...children.slice(0, this.state.insertIndex),
          addedActivity,
          ...children.slice(this.state.insertIndex, children.length)
        ]
      });
      this.props.onChange && this.props.onChange(newActivity);

      if (activity.type === 'clipboard'){
        this.props.resetClipboard(null);
      }
    }
    this.setState({ insertDialog: false });
  }

  handleOnCut(activity){
    // Remove from current sequence
    let children = this.getChildrenActivities();
    let activityIndex = _.findIndex(children,{'id': activity.id});
    let newActivity = _.assign({}, this.props.activity, {
      childrenActivities: [
        ...children.slice(0, activityIndex),
        ...children.slice(activityIndex+1, children.length)
      ]
    });
    this.props.saveToClipboard(activity);
    this.props.onChange && this.props.onChange(newActivity);
  }

  renderChildrenActivities() {
    let childrenActivities = this.getChildrenActivities();

    let returnNodes = [];
    if (!this.props.activity.isMain) {
      returnNodes.push(
        <tr key={this.props.activity.id + "-ins-first"}>
          <td>
            <ActivityInsert
              insertIndex={0}
              onClick={this.handleInsertActivity} />
          </td>
        </tr>
      );
    }
    childrenActivities.forEach((activity, index) => {
      returnNodes.push(
        <tr key={activity.id}>
          <td>
            <Activity
              activity={activity}
              onChange={this.handleOnChangeChildren} 
              onEdit={this.props.onActivityEdit}
              onCut={this.handleOnCut}/>
          </td>
        </tr>
      );
      if (activity.type !== ActivityType.Final) {
        returnNodes.push(
          <tr key={activity.id + "-ins"}>
            <td>
              <ActivityInsert
                insertIndex={index + 1}
                onClick={this.handleInsertActivity} />
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
        <table className={"hf-workflow" + (this.props.activity.isMain ? " main": "")}>
          <tbody>
            {!this.props.activity.isMain ?
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
          activityClipboard={this.props.activityClipboard}
          onClose={this.handleCloseSelector} />
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    activityClipboard: state.workflow.activityClipboard
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetClipboard: () => {
      dispatch(setActivityClipboard(null))
    },
    saveToClipboard: (activity) => {
      dispatch(setActivityClipboard(activity))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitySequence);