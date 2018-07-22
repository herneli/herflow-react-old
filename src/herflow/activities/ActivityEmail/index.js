import { Component } from 'react';
import './ActivityEmail.css';
import T from 'i18n-react';
import Image from '../../images/activity-email-32.png';
import './ActivityEmail.css';

class Activity extends Component {
    render() {
        return (
            this.props.manager.renderActivityBox(this.props)
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