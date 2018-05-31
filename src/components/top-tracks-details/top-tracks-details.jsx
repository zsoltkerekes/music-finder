import React, { Component } from 'react';
import { tagTopTracksData } from './../../models/tag-top-tracks.model';
import { topTracks } from './../../api/api';

export class TopTracksDetails extends Component {
  constructor () {
    super();
    this.state = {
      result: { ...tagTopTracksData }
    };
    this.getContent(topTracks());
  }

  componentWillReceiveProps () {
    this.setState({
      result: { ...tagTopTracksData }
    });
    this.getContent(topTracks());
  }

  getContent = url => {
    if (url) {
      fetch(url)
        .then(response => response.json(), error => error)
        .then(resolved => this.setState({ result: resolved }), error => this.setState({ result: error }));
    }
  };

  listen (name) {
    window.open('https://www.youtube.com/results?search_query=' + name);
  }

  render () {
    if (this.state.result.tracks.track) {
      return (
        <div>
          <section className="topTracksDetails">
            {
              this.state.result.tracks.track.map(
                (track, index) =>
                  (<span key={index} onClick={() => this.listen(track.artist.name + ' ' + track.name)}>
                    [ {track.artist.name} - {track.name} ]
                  </span>)
              )
            }
          </section>
        </div>
      );
    } else {
      return (
        <section className="topTracksDetails noFlex">
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
