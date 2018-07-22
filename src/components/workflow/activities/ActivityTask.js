import React, { Component } from 'react';
import ActivityBox from './ActivityBox';
import './ActivityTask.css';
import T from 'i18n-react';
import Image from './images/activity-task-32.png';

class Activity extends Component {
    render() {
        return (
            <ActivityBox 
                activity={this.props.activity}
                onCut={this.props.onCut}
                onEdit={this.props.onEdit}
                onChange={this.props.onChange}
                errors={this.props.errors}/>
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