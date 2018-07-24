import ActivityChart from './ActivityTask';
import Image from '../../images/activity-task-32.png';
import T from 'i18n-react';

const generateActivity = (workflowManager) => {
  return {
    id: workflowManager.newId(),
    name: T.translate("activity.newTask"),
    type: 'Task'
  }
}

const form = {
  validate: (value,context) => {
    return null;
  },
  getFields: () => [
    {
      name: "name",
      label: T.translate("activity.name"),
      type: "string"
    }
  ]
}

export default {
  type: "Task",
  name: 'activity.task',
  image: Image,
  ActivityChart,
  generateActivity,
  form
}