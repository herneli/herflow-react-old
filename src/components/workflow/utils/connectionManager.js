import 'jsplumb';
import ActivityType from '../classes/ActivityType';
import _ from 'lodash';

const arrowOverlay = {
  width: 6, 
  length: 6, 
  foldback: 0.8, 
  location: 1, 
}

const defaultPaintStyle = {
  stroke: "#aaaaaa",
  strokeWidth: 2
};


function getJsPlumbInstance() {
  let jsPlumb = window.jsPlumb;

  let jsPlumbInstance = jsPlumb.getInstance();
  jsPlumbInstance.setContainer("body");
  jsPlumbInstance.Defaults.PaintStyle = defaultPaintStyle;
  jsPlumbInstance.Defaults.Connector = ["Flowchart", { cornerRadius: 4, midpoint: 1, stub: 10 }];
  jsPlumbInstance.Defaults.Endpoint = "Blank";
  jsPlumbInstance.Defaults.Anchor = ["Top", "Bottom"];
  return jsPlumbInstance;
}

function connect(jsPlumbInstance, source, destination,options) {
  let connectObject = _.assign({},{ source: source, target: destination},options);
  if (options){
    console.log(connectObject);
  }
  jsPlumbInstance.connect(connectObject);
}

function createConnections(jsPlumbInstance, activity) {

  let returnNode;
  let nodes = [];
  let activityId = 'activity-' + activity._id;
  switch (activity.type) {
    // Sequential activities
    case ActivityType.Sequence:
      if (!activity.isMain){
        nodes.push({ initial: activityId + '-label', final: activityId + "-label" });
      }
      activity.childrenActivities && activity.childrenActivities.forEach(function (activity) {
        nodes.push(createConnections(jsPlumbInstance, activity));
      });
      if (nodes.length > 0) {
        returnNode = { initial: nodes[0].initial, final: nodes[nodes.length - 1].final };
        if (nodes.length > 1) {
          for (let i = 0; i < nodes.length - 1; i++) {
            connect(jsPlumbInstance, nodes[i].final, nodes[i + 1].initial);
          }
        }
      }
      return returnNode;
    // Parallel activities
    case ActivityType.Switch:
    case ActivityType.Parallel:
    case ActivityType.Loop:
    case ActivityType.Condition:
      let finalPointId = activityId + "-final";
      
      if (activity.childrenActivities && activity.childrenActivities.length > 0) {
        activity.childrenActivities.forEach(function (childrenActivity) {
          let parallelNode = createConnections(jsPlumbInstance, childrenActivity);
          connect(jsPlumbInstance, activityId, parallelNode.initial);
          connect(jsPlumbInstance, parallelNode.final, finalPointId);
          if (activity.type === ActivityType.Loop){
            let loopBackId = activityId + "-loop-back";
            console.log(loopBackId);
            connect(jsPlumbInstance, finalPointId, loopBackId,{anchor: "Left"});
            connect(jsPlumbInstance, loopBackId,activityId,{anchor: "Left", overlays: [["Arrow", arrowOverlay]]});
          }
        });

        return { initial: activityId, final: finalPointId };
      } else {
        connect(jsPlumbInstance, activityId, finalPointId);
        return { initial: activityId, final: finalPointId };
      }

    // Single activities
    default:
      return { initial: activityId, final: activityId };
  }
}

export {
  getJsPlumbInstance,
  createConnections
}