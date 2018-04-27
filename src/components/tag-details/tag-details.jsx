import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { tagDetails } from './../../api/api';
import { tagData } from './../../models/tag.model';

export class TagDetails extends Component {
  constructor (props) {
    super();
    this.state = {
      result: { ...tagData }
    };
    this.getContent(tagDetails(props.tagName));
  }

  componentWillReceiveProps (props) {
    this.setState({
      result: { ...tagData }
    });
    this.getContent(tagDetails(props.tagName));
    this.hideFullTag();
  }

  getContent = url => {
    if (url) {
      fetch(url)
        .then(response => response.json(), error => error)
        .then(resolved => this.setState({ result: resolved }), error => this.setState({ result: error }));
    }
  }

  showFullTag = () => {
    document.getElementById('summary').className = 'htmlLike hidden';
    document.getElementById('content').className = 'htmlLike shown';
    document.getElementById('showButton').className = 'hidden';
  }

  hideFullTag = () => {
    document.getElementById('content').className = 'htmlLike hidden';
    document.getElementById('summary').className = 'htmlLike shown';
    document.getElementById('showButton').className = 'shown';
  }

  render () {
    if (this.state.result.tag) {
      document.title = this.state.result.tag.name + ' || Music Finder';
      document.documentElement.scrollTop = 0;
      return (
        <section className="tagDetails">

          <div className="bio">
            <h3>{this.state.result.tag.name}</h3>
            {this.state.result.tag.wiki.summary ?
              <div
                id="summary"
                className="htmlLike shown"
                dangerouslySetInnerHTML={{ __html: `${this.state.result.tag.wiki.summary.slice(0, -25)}` }} /> : null}
            {this.state.result.tag.wiki.content ?
              <div
                id="content"
                className="htmlLike hidden"
                dangerouslySetInnerHTML={{ __html: `${this.state.result.tag.wiki.content.slice(0, -130)}` }} /> : null}
            {this.state.result.tag.wiki.content &&
            this.state.result.tag.wiki.content.slice(0, -130) !== this.state.result.tag.wiki.summary.slice(0, -25) ?
              <button id="showButton" onClick={this.showFullTag}>Show Full Info</button> : null}

          </div>

        </section>
      );
    } else {
      return (
        <section className="tagDetails noFlex">
          <br/>
          <br/>
          <br/>
          <br/>
          <p>Loading...</p>
          <p>{this.state.result.error ? 'ERROR : ' + this.state.result.error : ''} </p>
          <p>{this.state.result.message ? 'ERROR MESSAGE : ' + this.state.result.message : ''}</p>
        </section>
      );
    }
  }
}


TagDetails.propTypes = {
  tagName: PropTypes.string.isRequired
};
