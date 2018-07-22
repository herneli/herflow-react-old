import { Component } from 'react';
import './ActivityFinal.css';


class ActivityFinal extends Component {
    render() {
        return (
            this.props.manager.renderActivityBox(this.props)
        );
    }
}

export default ActivityFinal;
