import React, { Component } from 'react';
import {setActivityAsSource,setActivityAsTarget} from './connectionManager';

class ActivityLabel extends Component {
  componentDidMount() {
    setActivityAsSource(this.anchor);
    setActivityAsTarget(this.anchor);
    this.props.refAnchors({initial: this.anchor, final: this.anchor});
  }
  
  render() {
    return (
      <div id={"activity-" + this.props.activity._id + "-label"} className="hf-label" 
        ref={div => {
          this.anchor = div
        }}>
        {this.props.activity.label}
      </div>
    );
  }
}

export default ActivityLabel;