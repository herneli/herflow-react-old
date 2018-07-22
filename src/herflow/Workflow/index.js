import React, { Component } from 'react';
import WorkflowManager from './WorkflowManager';
import ZoomSelector from '../common/ZoomSelector';
import _ from 'lodash';
import './Workflow.css';

class Workflow extends Component {
  constructor(props) {
    super(props);
    this.handleOnChangeMainActivity = this.handleOnChangeMainActivity.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.manager = new WorkflowManager();
    this.state = { zoom: 1 };
  }

  componentDidMount() {
    if (this.props.workflow){
      this.repaint();
    }
    window.addEventListener("resize", this.handleResize);
  }

  componentDidUpdate(prevProps, prevState) {
    this.repaint();
  }
  
  handleResize(){
    this.repaint();
  }

  repaint(){
    if (this.props.workflow) {
      this.manager.resetJsPlumb();
      this.manager.createConnections(this.props.workflow.mainActivity);
    }
  }

  handleOnChangeMainActivity(activity) {
    let newWorfklow = _.assign({}, this.props.workflow, {
      mainActivity: activity
    });
    this.props.onChange(newWorfklow);
  }

  render() {
    if (this.props.workflow){
        const ActivityChart = this.manager.getActivityChart(this.props.workflow.mainActivity);
      return (
          <div>
            <ZoomSelector onSelected={this.handleZoomSelected} />
  
            <div>
              <div id="workflow-canvas" style={{ zoom: this.state.zoom }}>
                <ActivityChart
                  manager={this.manager}
                  activity={this.props.workflow.mainActivity}
                  onChange={this.handleOnChangeMainActivity} />
              </div>
            </div>
          </div>
      );
      
    } else {
      return <div>Loading...</div>
    }
  }
}

export default Workflow;