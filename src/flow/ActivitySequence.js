import React, { Component } from 'react';
import Activity from './Activity';
import {connect} from './connectionManager';

class ActivitySequence extends Component {
  anchors = [];
  componentDidMount() {
    let initialAnchor;
    let finalAnchor;
    this.anchors.forEach((anchor,index) => {
      // Calculate initial anchor
      if (index === 0){
        initialAnchor = anchor.initial;
      // Calculate final anchor
      } else if (index === this.anchors.length - 1){
        finalAnchor = anchor.final;
      }
      // Connect intermediate anchors
      if (index < this.anchors.length - 1){

        console.log("Anchor",anchor.final,this.anchors[index + 1].initial);
        connect(anchor.final,this.anchors[index + 1].initial);
      }
    });

    // Call ´refAnchors´ callback
    this.props.refAnchors && this.props.refAnchors({initial: initialAnchor,final: finalAnchor});
  }
  
  getChildrenActivities(){
    return this.props.activity.childrenActivities || [];
  }
  renderChildrenActivities(){
    let childrenActivities = this.getChildrenActivities();
    return childrenActivities.map((activity) => {
      return (
        <tr key={activity._id}>
          <td>
            <Activity 
              activity={activity} 
              refAnchors={(anchor) => {
                this.anchors.push(anchor);
              }}/>
          </td>
        </tr>
      );
    });
  }
  render() {
    

    return (
      <table className="hf-workflow">
        <tbody>
          {
            this.props.activity.label ? 
            <div 
              className="hf-label" 
              ref={(div) => {this.anchors.push({initial: div, final: div})}}>
                {this.props.activity.label}
            </div>:
            null
          }
          {this.renderChildrenActivities()}
        </tbody>
      </table>
    );
  }
}

export default ActivitySequence;