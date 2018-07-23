import ActivityChart from './ActivityLoop';
import Image from '../../images/activity-loop-32.png';
import T from 'i18n-react';

export default {
  type: "Loop",
  name: 'activity.loop',
  image: Image,
  ActivityChart,
  createConnections(manager, activity) {
    return manager.createConnectionsParallel(activity,true);
  },
  generateActivity: (manager) => {
    return {
      id: manager.newId(),
      name: T.translate("activity.newLoop"),
      type: "Loop",
      childrenActivities: [
        {
          id: manager.newId(),
          type: "Sequence",
          branchName: "loop",
        },
      ]
    }
  }
}