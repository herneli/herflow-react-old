import 'jsplumb';
import ActivityType from './ActivityType';

function getJsPlumbInstance() {
  let jsPlumb = window.jsPlumb;
  const defaultPaintStyle = {
    stroke: "#aaaaaa",
    strokeWidth: 2
  };
  let jsPlumbInstance = jsPlumb.getInstance();
  jsPlumbInstance.setContainer("body");
  jsPlumbInstance.Defaults.PaintStyle = defaultPaintStyle;
  jsPlumbInstance.Defaults.Connector = ["Flowchart", { cornerRadius: 4, midpoint: 1, stub: 10 }];
  jsPlumbInstance.Defaults.Endpoint = "Blank";
  jsPlumbInstance.Defaults.Anchor = ["Top", "Bottom"];
  return jsPlumbInstance;
}
// const hoverPaintStyle = { strokeStyle: "#7ec3d9" };
// const arrowPaintStyle = {
//   lineWidth: 3,
//   strokeStyle: "rgba(100,100,100,0.8)",
//   outlineColor: "#666",
//   outlineWidth: 1,
//   joinstyle: "round"
// };

function connect(jsPlumbInstance, source, destination) {
  console.log("Connect", source, destination)
  jsPlumbInstance.connect({
    source: source,
    target: destination
  });
}

// function repaintEverything(){
//   console.log("Repaint");
//   jsPlumbInstance.repaintEverything();
// }


function createConnections(jsPlumbInstance, activity) {

  let returnNode;
  let nodes = [];
  let activityId = 'activity-' + activity._id;
  switch (activity.type) {
    // Sequential activities
    case ActivityType.Sequence:
      if (activity.label){
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
      let finalPointId = activityId + "-final";
      if (activity.childrenActivities && activity.childrenActivities.length > 0) {
        activity.childrenActivities.forEach(function (activity) {
          let parallelNode = createConnections(jsPlumbInstance, activity);
          connect(jsPlumbInstance, activityId, parallelNode.initial);
          connect(jsPlumbInstance, parallelNode.final, finalPointId);
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