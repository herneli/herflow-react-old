import ActivityType from '../classes/ActivityType';
import {ObjectID} from 'bson';

let Workflow = {
  name: "Workflow de test",
  mainActivity: {
    _id: ObjectID().toHexString(),
    isMain: true,
    type: ActivityType.Sequence,
    childrenActivities: [
      {
        _id: ObjectID().toHexString(),
        name: "Inicio",
        type: ActivityType.Initial
      },
      {
        _id: ObjectID().toHexString(),
        name: "Final",
        type: ActivityType.Final
      }
    ]
  }
};

export default Workflow;