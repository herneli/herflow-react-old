import React, { Component } from 'react';
import Activity from './Activity';
import ActivityBox from './ActivityBox';
import { connect, setActivityAsSource, setActivityAsTarget} from './connectionManager';

class ActivityBranch extends Component {
  anchors = [];
  componentDidMount() {
    setActivityAsSource(this.finalAnchor);
    setActivityAsTarget(this.finalAnchor);
    this.anchors.forEach(function(anchor, index) {
      // Calculate initial anchor
      // Connect intermediate anchors
      connect(this.initialAnchor.final, anchor.initial);
      connect(anchor.final, this.finalAnchor);
    }.bind(this));

    // Call ´refAnchors´ callback
    console.log("Branch anchors",this.initialAnchor)
    this.props.refAnchors && this.props.refAnchors({initial: this.initialAnchor.initial, final: this.finalAnchor});
  }

  getChildrenActivities() {
    return this.props.activity.childrenActivities || [];
  }

  render() {
    let childrenActivities = this.getChildrenActivities();
    let childrenActivityComponents = childrenActivities.map((activity) => {
      return (
        <td key={activity._id}>
          <Activity
            activity={activity}
            refAnchors={(anchor) => {
              this.anchors.push(anchor);
            }} />
        </td>
      );
    });
    return (
      <table className="hf-workflow">
        <tbody>
          <tr>
            <td>
              <ActivityBox activity={this.props.activity} refAnchors={(anchor) => {
                this.initialAnchor = anchor;
              }} />
            </td>
          </tr>
          <tr>
            <td>
              <table className="hf-workflow">
                <tbody>
                  <tr>
                    {childrenActivityComponents}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <div ref={(div) => this.finalAnchor = div} style={{height: 0,width: 0,display: "inline-block",backgroundColor: "red"}}></div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default ActivityBranch;