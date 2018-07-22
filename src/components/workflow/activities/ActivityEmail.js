import React, { Component } from 'react';
import ActivityBox from './ActivityBox';
import './ActivityEmail.css';
import T from 'i18n-react';
import Image from './images/activity-email-32.png';

class Activity extends Component {
    render() {
        return (
            <ActivityBox 
                activity={this.props.activity}
                onCut={this.props.onCut}
                onEdit={this.props.onEdit}
                onChange={this.props.onChange}/>
        );
    }
}

export default {
    type: "Email",
    name: 'activity.email',
    image: Image,
    ActivityChart: Activity,
    generateActivity: (manager) => {
            return {
            id: manager.newId(),
            name: T.translate("activity.newEmail"),
            type: 'Email'
        }
    }
}