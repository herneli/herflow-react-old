import React, { Component } from 'react';

class ActivityInsert extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  
  handleOnClick(){
    this.props.onClick && this.props.onClick(this.props.activity,this.props.insertFirst || false);
  }

  render() {
    return (
      <div className="hf-insert" onClick={this.handleOnClick}></div>
    );
  }
}

export default ActivityInsert;