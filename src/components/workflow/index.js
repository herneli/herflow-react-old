import React, { Component } from 'react';
import fakeWorkflow from './fakeWorkflow';
import { setCurrentWorkflow } from './redux/actions';
import { connect } from 'react-redux';
import Workflow from 'herflow/Workflow';

class WorkflowDev extends Component {
    componentDidMount() {
      this.props.setCurrentWorkflow(fakeWorkflow);
    }
    
    render() {
        return (
          <Workflow 
            workflow={this.props.workflow}
            onChange={this.props.onChange}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      workflow: state.workflow.activeWorkflow,
      activityClipboard: state.workflow.activityClipboard
    };
  };
  
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      setCurrentWorkflow: (workflow) => {
        dispatch(setCurrentWorkflow(workflow))
      },
      onChange: (workflow) => {
        dispatch(setCurrentWorkflow(workflow))
      }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(WorkflowDev);

