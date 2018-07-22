import ActivityChart from './ActivityInitial';
import Image from '../../images/activity-initial-32.png';
import T from 'i18n-react';

export default {
    type: "Initial",
    name: T.translate('activity.initial'),
    image: Image,
    excludeSelector: true,
    ActivityChart
}