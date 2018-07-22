import React, { Component } from 'react';
import ActivityBox from './ActivityBox';
import './ActivityFinal.css';
import Image from './images/activity-final-32.png';

class Activity extends Component {
    constructor(props) {
        super(props);
        this.handleOnEdit = this.handleOnEdit.bind(this);
    }
    
    handleOnEdit(){

    }
    
    render() {
        return (
            <ActivityBox 
                activity={this.props.activity}
                onCut={this.props.onCut}
                onEdit={this.handleOnEdit}
                onChange={this.props.onChange}/>
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