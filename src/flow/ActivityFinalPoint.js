import React, { Component } from 'react';
import {setActivityAsSource,setActivityAsTarget} from './connectionManager';

class ActivityFinalPoint extends Component {
  componentDidMount() {
    this.props.refAnchors({initial: this.anchor, final: this.anchor});
  }
  
  render() {
    return (
      <div id={"activity-" + this.props.activity._id + "-final"} ref={(div) => this.anchor = div} style={{height: 1,width: 1,display: "inline-block"}}></div>
    );
  }
}

export default ActivityFinalPoint;