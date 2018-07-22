import ActivityType from '../classes/ActivityType';
import {ObjectID} from 'bson';

let Workflow = {
  name: "Workflow de test",
  mainActivity: {
    id: ObjectID().toHexString(),
    isMain: true,
    type: ActivityType.Sequence,
    childrenActivities: [
      {
        id: ObjectID().toHexString(),
        name: "Inicio",
        type: ActivityType.Initial
      },
      {
        id: ObjectID().toHexString(),
        name: "Final",
        type: ActivityType.Final
      }
    ]
  }
};

export default Workflow;