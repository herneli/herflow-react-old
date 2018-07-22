import { Component} from 'react';
import './ActivityInitial.css';
import Image from '../../images/activity-initial-32.png';

class Activity extends Component {
    render() {
        return (
            this.props.manager.renderActivityBox(this.props)
        );
    }
}

export default {
    type: "Initial",
    name: 'Initial',
    image: Image,
    excludeSelector: true,
    ActivityChart: Activity
}