import React, { Component } from 'react';
import { topArtists } from './../../api/api';
import { HashRouter, Link } from 'react-router-dom';
import { topArtistData } from './../../models/top-artists.model';

export class TopArtist extends Component {
  constructor () {
    super();
    this.state = {
      result: { ...topArtistData }
    };
    this.getContent(topArtists());
  }

  getContent = url => {
    if (url) {
      fetch(url)
        .then(response => response.json(), error => error)
        .then(resolved => this.setState({ result: resolved }), error => this.setState({ result: error }));
    }
  }

  render () {
    if (this.state.result.artists) {
      return (
        <HashRouter>
          <div className="topArtists">
            {this.state.result.artists.artist.map(
              (artist, index) =>
                (<Link to={'/artist-details/' + artist.name} key={index}>
                  <span className="artist">
                    <img
                      alt={artist.name}
                      src={artist.image[artist.image.length - 1]['#text']} />
                    <span>
                      {artist.name}
                    </span>
                  </span>
                </Link>
                )
            )}
          </div>
        </HashRouter>
      );
    } else {
      return (
        <section className="topArtists noFlex">
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
