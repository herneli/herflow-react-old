import React from 'react';
import './ActivityTask.css';

class ActivityTask extends React.Component {
  render() {
    return (
      this.props.manager.renderActivityBox(this.props)
    );
  }
}

export default ActivityTask;