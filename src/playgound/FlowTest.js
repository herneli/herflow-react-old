import React, { Component } from 'react';
import Activity from '../flow/Activity';
import './Flow.css';
import 'jsplumb';
let jsPlumb = window.jsPlumb;

const defaultPaintStyle = {
  stroke: "rgba(152,152,152,0.8)",
  strokeWidth: 2
};
const hoverPaintStyle = { strokeStyle: "#7ec3d9" };
const arrowPaintStyle = {
  lineWidth: 3,
  strokeStyle: "rgba(100,100,100,0.8)",
  outlineColor: "#666",
  outlineWidth: 1,
  joinstyle: "round"
};

class FlowTesst extends Component {
  componentDidMount() {
    this.jp = jsPlumb.getInstance();
    this.jp.Defaults.PaintStyle = defaultPaintStyle;
    this.jp.Defaults.Connector = ["Flowchart", { cornerRadius: 2, midpoint: 1, stub: 10 }];
    this.jp.Defaults.Endpoint = "Blank";
    //this.jp.Defaults.Overlays = [["Arrow", { width: 10, length: 10, foldback: 1, location: 1, paintStyle: arrowPaintStyle }]];
    let activities = ["activityA", "activityBA", "activityBBA", "activityBBB", "activityBBC", "activityBCA", "activityC", "activityXA", "activityXBA", "activityXBBA", "activityXBBB", "activityXBBC", "activityXBCA", "activityXBCB", "activityXBDA", "activityXBDB","activityXC","labelA","labelB","labelC","labelD"];
    activities.forEach((val) => {
      this.setActivitySource(this[val]);
      this.setActivityTarget(this[val]);
    });

    this.jp.connect({
      source: this.activityA,
      target: this.activityBA
    });
    this.jp.connect({
      source: this.activityA,
      target: this.activityBBA
    });
    this.jp.connect({
      source: this.activityBBA,
      target: this.activityBBB
    });
    this.jp.connect({
      source: this.activityBBB,
      target: this.activityBBC
    });

    this.jp.connect({
      source: this.activityA,
      target: this.activityBCA
    });
    this.jp.connect({
      source: this.activityBCA,
      target: this.activityXA
    });
    this.jp.connect({
      source: this.activityBA,
      target: this.activityC
    });
    this.jp.connect({
      source: this.activityBBC,
      target: this.activityC
    });
    this.jp.connect({
      source: this.activityBCB,
      target: this.activityC
    });
    this.jp.connect({
      source: this.activityXA,
      target: this.labelA
    });
    this.jp.connect({
      source: this.labelA,
      target: this.activityXBA
    });    
    this.jp.connect({
      source: this.activityXA,
      target: this.labelB
    });
    this.jp.connect({
      source: this.labelB,
      target: this.activityXBBA
    });

    this.jp.connect({
      source: this.activityXBBA,
      target: this.activityXBBB
    });
    this.jp.connect({
      source: this.activityXBBB,
      target: this.activityXBBC
    });

    this.jp.connect({
      source: this.activityXA,
      target: this.labelC
    });

    this.jp.connect({
      source: this.labelC,
      target: this.activityXBCA
    });    
    this.jp.connect({
      source: this.activityXA,
      target: this.labelD
    });

    this.jp.connect({
      source: this.labelD,
      target: this.activityXBDA
    });       
    this.jp.connect({
      source: this.activityXBDA,
      target: this.activityXBDB
    });   
    this.jp.connect({
      source: this.activityXBDB,
      target: this.activityXC
    });       
    this.jp.connect({
      source: this.activityXBCA,
      target: this.activityXBCB
    });
    this.jp.connect({
      source: this.activityXBA,
      target: this.activityXC
    });
    this.jp.connect({
      source: this.activityXBBC,
      target: this.activityXC
    });
    this.jp.connect({
      source: this.activityXBCB,
      target: this.activityXC
    });
    this.jp.connect({
      source: this.activityXC,
      target: this.activityC
    });

    console.log(this.root.clientWidth, this.root.offsetWidth);
  }

  setActivitySource(element) {
    this.jp.makeSource(element, {
      filter: ".rc-activity-icon",
      //anchor: ["Continuous", { faces: ["top", "bottom"] }],
      anchor: ["BottomCenter"],
      maxConnections: 100,
      onMaxConnections: function (info, e) {
        alert("Maximum connections (" + info.maxConnections + ") reached");
      }
    });
  }
  setActivityTarget(element, callback) {
    this.newConnectionCallback = callback;
    this.jp.makeTarget(element, {
      dropOptions: { hoverClass: "dragHover" },
      anchor: ["TopCenter"],
      beforeDrop: callback
    });
  }

  render() {
    let activityTask = { type: "Task", name: "Esto es una tearea de test para ver si funciona bien" };
    let activityInitial = { type: "Initial", name: "Inicio" };
    let activityFinal = { type: "Final", name: "Final" };
    return (
      <div className="flow-container" ref={(div) => { this.root = div }}>
        <table className="flow">
          <tbody>
            <tr>
              <td><Activity ref2={a => { this.activityA = a; }} activity={activityInitial} /></td>
            </tr>
            <tr>
              <td>
                <table className="flow">
                  <tbody>
                    <tr>
                      <td><Activity ref2={a => { this.activityBA = a; }} activity={activityTask} /></td>
                      <td>
                        <table className="flow">
                          <tbody>
                            <tr>
                              <td><Activity ref2={a => { this.activityBBA = a; }} activity={activityTask} /></td>
                            </tr>
                            <tr>
                              <td><Activity ref2={a => { this.activityBBB = a; }} activity={activityTask} /></td>
                            </tr>
                            <tr>
                              <td><Activity ref2={a => { this.activityBBC = a; }} activity={activityTask} /></td>
                            </tr>
                          </tbody>
                        </table>

                      </td>
                      <td>
                        <table className="flow">
                          <tbody>
                            <tr>
                              <td><Activity ref2={a => { this.activityBCA = a; }} activity={activityTask} /></td>
                            </tr>
                            <tr>
                              <td>
                                <table className="flow">
                                  <tbody>
                                    <tr>
                                      <td><Activity ref2={a => { this.activityXA = a; }} activity={activityTask} /></td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <table className="flow">
                                          <tbody>
                                            <tr>
                                              <td>

                                                <table className="flow" >
                                                  <tbody>
                                                  <tr>
                                                      <td>
                                                        <div className="hf-label" ref={lab => {this.labelA = lab}}>Esto es una etiqueta bastante larga par ver como se comporta al cambiar de linea </div>
                                                      </td>
                                                    </tr>                                                    
                                                    <tr>
                                                      <td>
                                                        <Activity ref2={a => { this.activityXBA = a; }} activity={activityTask} />
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td>
                                                <table className="flow">
                                                  <tbody>
                                                  <tr>
                                                      <td>
                                                      <div className="hf-label" ref={lab => {this.labelB = lab}}>Etiqueta B</div>
                                                      </td>
                                                    </tr>                                                    
                                                    <tr>
                                                      <td><Activity ref2={a => { this.activityXBBA = a; }} activity={activityTask} /></td>
                                                    </tr>
                                                    <tr>
                                                      <td><Activity ref2={a => { this.activityXBBB = a; }} activity={activityTask} /></td>
                                                    </tr>
                                                    <tr>
                                                      <td><Activity ref2={a => { this.activityXBBC = a; }} activity={activityTask} /></td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                              </td>
                                              <td>
                                                <table className="flow">
                                                  <tbody>
                                                  <tr>
                                                      <td>
                                                      <div className="hf-label" ref={lab => {this.labelC = lab}}>Etiqueta C</div>
                                                        </td>
                                                    </tr>                                                    
                                                    <tr>
                                                      <td><Activity ref2={a => { this.activityXBCA = a; }} activity={activityTask} /></td>
                                                    </tr>
                                                    <tr>
                                                      <td><Activity ref2={a => { this.activityXBCB = a; }} activity={activityTask} /></td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                              </td>
                                              <td>
                                              <table className="flow">
                                                  <tbody>
                                                  <tr>
                                                      <td>
                                                      <div className="hf-label" ref={lab => {this.labelD = lab}}>Etiqueta D</div>
                                                        </td>
                                                    </tr>                                                    
                                                    <tr>
                                                      <td><Activity ref2={a => { this.activityXBDA = a; }} activity={activityTask} /></td>
                                                    </tr>
                                                    <tr>
                                                      <td><Activity ref2={a => { this.activityXBDB = a; }} activity={activityTask} /></td>
                                                    </tr>
                                                  </tbody>
                                                </table>                                                
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td><Activity ref2={a => { this.activityXC = a; }} activity={activityTask} /></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td><Activity ref2={a => { this.activityC = a; }} activity={activityFinal} /></td>
            </tr>
          </tbody>
        </table>
        
      </div>
    );
  }
}

export default FlowTesst;