import { Component} from 'react';
import './ActivityInitial.css';

class ActivityInitial extends Component {
    render() {
        return (
            this.props.manager.renderActivityBox(this.props)
        );
    }
}

export default ActivityInitial;
