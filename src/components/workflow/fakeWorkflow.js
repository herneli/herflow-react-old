import {ObjectID} from 'bson';

let Workflow = {
  name: "Workflow de test",
  mainActivity: {
    id: ObjectID().toHexString(),
    type: "Sequence",
    isMain: true,
    childrenActivities: [
      {
        id: ObjectID().toHexString(),
        name: "Inicio",
        type: "Initial",
        status: "Closed"
      },
      {
        id: ObjectID().toHexString(),
        name: "Tarea de test",
        type: "Task",
        status: "Started"
      },      
      {
        id: ObjectID().toHexString(),
        name: "Final",
        type: "Final"
      }
    ]
  }
};

export default Workflow;