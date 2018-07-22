import ActivityChart from './ActivityEmail';
import T from 'i18n-react';
import Image from '../../images/activity-email-32.png';

export default {
    type: "Email",
    name: 'activity.email',
    image: Image,
    ActivityChart,
    generateActivity: (manager) => {
            return {
            id: manager.newId(),
            name: T.translate("activity.newEmail"),
            type: 'Email'
        }
    }
}