import { Component } from 'react';
import './ActivityTask.css';

class ActivityTask extends Component {
    render() {
        return (
            this.props.manager.renderActivityBox(this.props)
        );
    }
}

export default ActivityTask;