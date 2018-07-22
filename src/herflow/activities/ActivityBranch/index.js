import ActivityChart from './ActivityBranch';
import Image from '../../images/activity-branch-32.png';
import T from 'i18n-react';

export default {
    type: "Branch",
    name: 'activity.branch',
    image: Image,
    ActivityChart,
    createConnections(manager, activity) {
      return manager.createConnectionsParallel(activity);
    },
    generateActivity: (manager) => {
      return {
        id: manager.newId(),
        name: T.translate("activity.newBranch"),
        type: "Branch",
        childrenActivities: [
          {
            id: manager.newId(),
            type: "Sequence",
            label: T.translate("activity.branchNumber", { branchNumber: 1 })
          },
          {
            id: manager.newId(),
            type: "Sequence",
            label: T.translate("activity.branchNumber", { branchNumber: 2 })
          }
        ]
      }
    }
  
}