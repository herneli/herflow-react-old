import {ObjectID} from 'bson';

let Workflow = {
  name: "Workflow de test",
  mainActivity: {
    id: ObjectID().toHexString(),
    isMain: true,
    type: "Sequence",
    childrenActivities: [
      {
        id: ObjectID().toHexString(),
        name: "Inicio",
        type: "Initial"
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