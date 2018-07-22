import ActivityChart from './ActivityCondition';
import Image from '../../images/activity-condition-32.png';
import T from 'i18n-react';

export default {
    type: "Condition",
    name: 'activity.condition',
    image: Image,
    ActivityChart,
    createConnections(manager, activity) {
      return manager.createConnectionsParallel(activity);
    },
    generateActivity: (manager) => {
      return {
        id: manager.newId(),
        name: T.translate("activity.newCondition"),
        type: "Condition",
        childrenActivities: [
          {
            id: manager.newId(),
            type: "Sequence",
            label: T.translate("activity.conditionTrue")
          },
          {
            id: manager.newId(),
            type: "Sequence",
            label: T.translate("activity.conditionFalse")
          }
        ]
      }
    }
  }