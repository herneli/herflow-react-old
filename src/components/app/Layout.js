import React, { Component } from 'react';
import './Layout.css';

class Layout extends Component {

  render() {
    return (
      <div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;