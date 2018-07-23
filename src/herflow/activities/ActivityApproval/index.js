import React from 'react';
import ActivityChart from './ActivityTask';
import Image from '../../images/activity-task-32.png';
import T from 'i18n-react';

const generateActivity = (manager) => {
  return {
    id: manager.newId(),
    name: T.translate("activity.newTask"),
    type: 'Task'
  }
}

const validate = (manager, activity) => {
  const errors = [];
  if (!activity.name) {
    errors.push({
      message: T.translate('required')
    });
  }
  return errors.length > 0 ? errors : null;
}

class Editor extends React.Component {
  render() {
    return (
      <div>
        <h1>HelloWorld</h1>
      </div>
    );
  }
}

export default {
  type: "Task",
  name: 'activity.task',
  image: Image,
  ActivityChart,
  ActivityEditor: Editor,
  generateActivity,
  validate
}