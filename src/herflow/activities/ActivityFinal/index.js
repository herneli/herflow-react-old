import { Component } from 'react';
import './ActivityFinal.css';
import Image from '../../images/activity-final-32.png';

class Activity extends Component {
    constructor(props) {
        super(props);
        this.handleOnEdit = this.handleOnEdit.bind(this);
    }
    
    handleOnEdit(){

    }
    
    render() {
        return (
            this.props.manager.renderActivityBox(this.props)
        );
    }
}

export default {
    type: "Final",
    name: 'Final',
    image: Image,
    excludeSelector: true,
    ActivityChart: Activity
}