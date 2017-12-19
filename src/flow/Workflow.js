import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Workflow.css';
import Activity from './Activity';
import {getJsPlumbInstance, createConnections} from './connectionManager';

class Workflow extends Component {
  jsPlumbInstance = null;
  componentDidMount() {
    this.jsPlumbInstance = getJsPlumbInstance();
    createConnections(this.jsPlumbInstance,this.props.workflow.mainActivity);
  }
  componentDidUpdate(prevProps, prevState) {
    this.jsPlumbInstance.reset();
    createConnections(this.jsPlumbInstance,this.props.workflow.mainActivity);
  }
  
  render() {
    return (
      <div>
        <h1>{this.props.workflow.name}</h1>
        <div id="workflow-canvas">
          <Activity activity={this.props.workflow.mainActivity} />
        </div>
      </div>
    );
  }
}

Workflow.propTypes = {
  workflow: PropTypes.object
}

export default Workflow;