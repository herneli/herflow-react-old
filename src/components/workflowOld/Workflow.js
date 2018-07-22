import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Workflow.css';
import Activity from './Activity';
import ZoomSelector from '../common/ZoomSelector';
import { getJsPlumbInstance, createConnections } from './utils/connectionManager';
import { loadFakeWorkflow, setCurrentWorkflow } from './redux/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

class Workflow extends Component {
  jsPlumbInstance = null;
  constructor(props){
    super(props);
    this.state = {zoom: 1};
    this.jsPlumbInstance = getJsPlumbInstance();
    this.handleOnChangeMainActivity = this.handleOnChangeMainActivity.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleZoomSelected = this.handleZoomSelected.bind(this);
  }

  componentDidMount() {
    this.props.loadFakeWorkflow();
    if (this.props.workflow) {
      createConnections(this.jsPlumbInstance, this.props.workflow.mainActivity);
    }
    window.addEventListener("resize", this.handleResize);
  }
  componentDidUpdate(prevProps, prevState) {
    this.repaint();
  }

  handleZoomSelected(zoom){
    this.setState({zoom: zoom});
  }

  handleResize(){
    this.repaint();
  }

  repaint(){
    if (this.props.workflow) {
      this.jsPlumbInstance.reset();
      createConnections(this.jsPlumbInstance, this.props.workflow.mainActivity);
    }
  }

  handleOnChangeMainActivity(activity){
    let newWorfklow = _.assign({},this.props.workflow,{
      mainActivity: activity
    });
    this.props.onChangeWorkflow(newWorfklow);
  }

  render() {
    return (
      this.props.workflow ?
        <div>
          <ZoomSelector onSelected={this.handleZoomSelected}/>

          <div>
            <div id="workflow-canvas" style={{zoom: this.state.zoom}}>
              <Activity 
                activity={this.props.workflow.mainActivity} 
                onChange={this.handleOnChangeMainActivity}/>
            </div>
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