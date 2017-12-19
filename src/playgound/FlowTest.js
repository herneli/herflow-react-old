import React, { Component } from 'react';
import Workflow from "../flow/Workflow";
import ActivityType from '../flow/ActivityType';
import {connect2} from '../flow/connectionManager';
import _ from 'lodash';

class FlowTest extends Component {
  constructor(props){
    super(props);
    this.changeWorkflow = this.changeWorkflow.bind(this);
    let   workflow = {
      name: "Workflow de test",
      mainActivity: {
        _id: 1,
        type: ActivityType.Sequence,
        childrenActivities: [
          {
            _id: 2,
            name: "Inicio",
            type: ActivityType.Initial
          },
          {
            _id: 3,
            name: "Change NODES",
            type: ActivityType.Task
          },
          {
            _id: 4,
            name: "Varias",
            type: ActivityType.Branch,
            childrenActivities: [
              {
                _id: 41,
                name: "Seq 1",
                label: "Etiqueta 1",
                type: ActivityType.Sequence,
                childrenActivities: [
                  {
                    _id: 411,
                    name: "Tarea 1",
                    type: ActivityType.Task
                  }
                ]
              },
              {
                _id: 42,
                name: "Seq 2",
                label: "Etiqueta 2",
                type: ActivityType.Sequence,
                childrenActivities: [
                  {
                    _id: 421,
                    name: "Tarea 1",
                    type: ActivityType.Task
                  }
                ]
              },
              {
                _id: 43,
                name: "Tarea 3",
                type: ActivityType.Branch,
                childrenActivities: [
                  {
                    _id: 431,
                    name: "Tarea 1",
                    type: ActivityType.Task
                  },
                  {
                    _id: 432,
                    name: "Tarea 2",
                    type: ActivityType.Task
                  }
                ]
              }
            ]
          },
          {
            _id: 5,
            name: "Final",
            type: ActivityType.Final
          }
        ]
      }
    };
    this.state = { workflow };
  }
  componentDidMount() {
    connect2("activity-2","activity-3");
    connect2("activity-3","activity-4");
    connect2("activity-4","activity-41-label");
    connect2("activity-4","activity-42-label");
    connect2("activity-4","activity-43");
    connect2("activity-41-label","activity-411");
    connect2("activity-42-label","activity-421");
    connect2("activity-4","activity-43");
    connect2("activity-43","activity-431");
    connect2("activity-43","activity-432");
    connect2("activity-431","activity-43-final");
    connect2("activity-432","activity-43-final");
    connect2("activity-43-final","activity-4-final");
    connect2("activity-411","activity-4-final");
    connect2("activity-421","activity-4-final");
    connect2("activity-4-final","activity-5");
  }
  
  changeWorkflow(){
    let newWorkflow = _.cloneDeep(this.state.workflow);
    newWorkflow.mainActivity.childrenActivities.splice(1,1);
    this.setState({workflow: newWorkflow});
  }

  render() {
    return (
      <div>
        <button onClick={this.changeWorkflow}>Add node</button>
        <Workflow workflow={this.state.workflow} />
      </div>
    );
  }
}

export default FlowTest;