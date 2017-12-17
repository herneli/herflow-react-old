import React, { Component } from 'react';
import Workflow from "../flow/Workflow";
import ActivityType from '../flow/ActivityType';

class FlowTest extends Component {
  getWorkflow(){
    return {
      name: "Workflow de test",
      mainActivity: {
        _id: 1,
        type: ActivityType.Sequence,
        childrenActivities: [
          {
            _id: 2,
            name: "Inicio",
            type: ActivityType.Task
          },
          {
            _id: 3,
            name: "Tarea de test",
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
            name: "Inicio",
            type: ActivityType.Final
          }                    
        ]
      }
    };
  }
  render() {
    return (
      <div>
        <Workflow workflow={this.getWorkflow()} />
      </div>
    );
  }
}

export default FlowTest;