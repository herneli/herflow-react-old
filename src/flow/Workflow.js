import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Workflow.css';
import Activity from './Activity';
import {repaintEverything} from './connectionManager';

class Workflow extends Component {
  componentDidMount() {
    repaintEverything();
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