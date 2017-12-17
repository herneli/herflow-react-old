import 'jsplumb';
let jsPlumb = window.jsPlumb;
const defaultPaintStyle = {
  stroke: "#aaaaaa",
  strokeWidth: 2
};
let jsPlumbInstance = jsPlumb.getInstance();
jsPlumbInstance.setContainer("workflow-canvas");
jsPlumbInstance.Defaults.PaintStyle = defaultPaintStyle;
jsPlumbInstance.Defaults.Connector = ["Flowchart", { cornerRadius: 2, midpoint: 1, stub: 10 }];
jsPlumbInstance.Defaults.Endpoint = "Blank";
jsPlumbInstance.Defaults.Anchor =  [ "TopCenter", "BottomCenter" ];

// const hoverPaintStyle = { strokeStyle: "#7ec3d9" };
// const arrowPaintStyle = {
//   lineWidth: 3,
//   strokeStyle: "rgba(100,100,100,0.8)",
//   outlineColor: "#666",
//   outlineWidth: 1,
//   joinstyle: "round"
// };

function setActivityAsSource(element) {
  jsPlumbInstance.makeSource(element, {
    filter: ".rc-activity-icon",
    //anchor: ["Continuous", { faces: ["top", "bottom"] }],
    anchor: ["BottomCenter"],
    maxConnections: 100,
    onMaxConnections: function (info, e) {
      alert("Maximum connections (" + info.maxConnections + ") reached");
    }
  });
}

function setActivityAsTarget(element) {
  jsPlumbInstance.makeTarget(element, {
    dropOptions: { hoverClass: "dragHover" },
    anchor: ["TopCenter"]
  });
}

function connect(source,destination){
  jsPlumbInstance.connect({
    source: source,
    target: destination
  });
}

function repaintEverything(){
  console.log("Repaint");
  jsPlumbInstance.repaintEverything();
}

export {
  setActivityAsSource,
  setActivityAsTarget,
  connect,
  repaintEverything
}