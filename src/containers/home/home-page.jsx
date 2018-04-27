import React, { Component } from 'react';

export class HomePage extends Component {
  render () {
    document.title = 'Home || Music Finder';
    document.documentElement.scrollTop = 0;
    return (
      <div>
        <div className="welcome"/>
      </div>
    );
  }
}
