import React, { Component } from 'react';
import { topTags } from './../../api/api';
import { HashRouter, Link } from 'react-router-dom';
import { topTagsData } from './../../models/top-tags.model';

export class TopTags extends Component {
  constructor () {
    super();
    this.state = {
      result: { ...topTagsData }
    };
    this.getContent(topTags());
  }

  getContent = url => {
    if (url) {
      fetch(url)
        .then(response => response.json(), error => error)
        .then(resolved => this.setState({ result: resolved }), error => this.setState({ result: error }));
    }
  }

  render () {
    if (this.state.result.toptags) {
      return (
        <HashRouter>
          <div className="topTags">
            {this.state.result.toptags.tag
              .map(
                (tag, index) => (
                  <Link to={'/tag-details/' + encodeURIComponent(tag.name)} key={index}>
                    <span>
                      [ {tag.name} ]
                    </span>
                  </Link>
                )
              )}
          </div>
        </HashRouter>
      );
    } else {
      return (
        <section className="topTags noFlex">
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
