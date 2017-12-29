import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Workflow.css';
import Activity from './Activity';
import { getJsPlumbInstance, createConnections } from './utils/connectionManager';
import ActivitySelector from "./ActivitySelector";
import { loadFakeWorkflow, setCurrentWorkflow } from './redux/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

class Workflow extends Component {
  jsPlumbInstance = null;
  constructor(props){
    super(props);
    this.jsPlumbInstance = getJsPlumbInstance();
    this.handleOnChangeMainActivity = this.handleOnChangeMainActivity.bind(this);
  }
  componentDidMount() {
    this.props.loadFakeWorkflow();
    if (this.props.workflow) {
      createConnections(this.jsPlumbInstance, this.props.workflow.mainActivity);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.workflow) {
        this.jsPlumbInstance.reset();
        createConnections(this.jsPlumbInstance, this.props.workflow.mainActivity);
    }
  }

  handleOnChangeMainActivity(activity){
    let newWorfklow = _.assign({},this.props.workflow,{
      mainActivity: activity
    });
    console.log("main change");
    this.props.onChangeWorkflow(newWorfklow);
  }

  render() {
    return (
      this.props.workflow ?
        <div>
          <ActivitySelector />
          <h1>{this.props.workflow.name}</h1>
          <div id="workflow-canvas">
            <Activity 
              activity={this.props.workflow.mainActivity} 
              onChange={this.handleOnChangeMainActivity}/>
          </div>
        </div>
        :
        <div>No workflow</div>
    );
  }
}

Workflow.propTypes = {
  workflow: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    workflow: state.workflow.activeWorkflow
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadFakeWorkflow: () => {
      dispatch(loadFakeWorkflow())
    },
    onChangeWorkflow: (workflow) => {
      dispatch(setCurrentWorkflow(workflow))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workflow);
export { Workflow };