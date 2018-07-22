import { Component } from 'react';
import './ActivityTask.css';
import T from 'i18n-react';
import Image from '../../images/activity-task-32.png';

class Activity extends Component {
    render() {
        return (
            this.props.manager.renderActivityBox(this.props)
        );
    }
}

export default {
    type: "Task",
    name: 'activity.task',
    image: Image,
    ActivityChart: Activity,
    generateActivity: (manager) => {
            return {
            id: manager.newId(),
            name: "", //T.translate("activity.newTask"),
            type: 'Task'
        }
    },
    validate: (manager, activity) => {
        const errors = [];
        if (!activity.name){
            errors.push({message: T.translate('required')});
        }
        return errors.length > 0 ? errors : null;
    }
}