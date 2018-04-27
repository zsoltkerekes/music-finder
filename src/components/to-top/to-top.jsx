import React, { Component } from 'react';

export class ToTop extends Component {
  toTop = () => {
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const scrollVelocity = height * (1 / 60);
    const interval = setInterval(
      () => {
        document.body.scrollTop -= scrollVelocity;
        document.documentElement.scrollTop -= scrollVelocity;
        if (window.pageYOffset <= 0) {
          clearInterval(interval);
        }
      });
  }

  render () {
    return (
      <div className="toTop" onClick={this.toTop}>&#8593;</div>
    );
  }
}
