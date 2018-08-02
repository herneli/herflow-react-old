import React, { Component } from "react";
import WorkflowManager from "./WorkflowManager";
import ZoomSelector from "../common/ZoomSelector";
import _ from "lodash";
import "./Workflow.css";

class Workflow extends Component {
  constructor(props) {
    super(props);
    this.handleOnChangeMainActivity = this.handleOnChangeMainActivity.bind(
      this
    );
    this.handleZoomSelected = this.handleZoomSelected.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.workflowManager = new WorkflowManager(this.props.workflow);
    this.state = { zoom: 1 };
  }

  componentDidMount() {
    if (this.props.workflow) {
      this.repaint();
    }
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.workflow !== this.workflowManager.workflow) {
      this.workflowManager.workflow = nextProps.workflow;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.repaint();
  }

  handleResize() {
    this.repaint();
  }

  repaint() {
    if (this.props.workflow) {
      this.workflowManager.resetJsPlumb();
      this.workflowManager.createConnections(this.props.workflow.mainActivity);
    }
  }

  handleOnChangeMainActivity(activity) {
    let newWorfklow = _.assign({}, this.props.workflow, {
      mainActivity: activity
    });
    this.props.onChange(newWorfklow);
  }

  handleZoomSelected(zoom) {
    this.setState({ ...this.state, zoom });
  }

  render() {
    if (this.props.workflow) {
      const ActivityChart = this.workflowManager.getActivityChart(
        this.props.workflow.mainActivity
      );
      return (
        <div>
          <ZoomSelector onSelected={this.handleZoomSelected} />

          <div id="workflow-canvas" style={{ zoom: this.state.zoom }}>
            <ActivityChart
              workflowManager={this.workflowManager}
              workflow={this.props.workflow}
              activity={this.props.workflow.mainActivity}
              onChange={this.handleOnChangeMainActivity}
            />
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default Workflow;
