import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { artistTopTracksData } from './../../models/artist-top-tracks.model';
import { artistTopTracks } from './../../api/api';
import { banned } from './../../models/banned.model';

export class ArtistTopTracksDetails extends Component {
  constructor (props) {
    super();
    this.state = {
      result: { ...artistTopTracksData }
    };
    this.getContent(artistTopTracks(props.artistName, 200));
  }

  componentWillReceiveProps (props) {
    this.setState({
      result: { ...artistTopTracksData }
    });
    this.getContent(artistTopTracks(props.artistName, 200));
  }

  getContent = url => {
    if (url) {
      fetch(url)
        .then(response => response.json(), error => error)
        .then(resolved => this.setState({ result: resolved }), error => this.setState({ result: error }));
    }
  };

  tracks = () => this.state.result.toptracks.track
    .sort(
      (a, b) => {
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1; }
        return 0;
      }
    )
    .filter(
      (element, index, array) => {
        if (index > 0) {
          if ((element.name.replace(/[^bcdfghjklmnpqrstvwxyz]/ig, '') !==
            array[index - 1].name.replace(/[^bcdfghjklmnpqrstvwxyz]/ig, '')) &&
            element.name.replace(/[^bcdfghjklmnpqrstvwxyz]/ig, '').length !== 0 &&
            element.name.indexOf('Ismeretlen album') === -1 &&
            banned.findIndex(name => name.toUpperCase() === element.name.toUpperCase()) === -1) {
            return true;
          }
        }
        return false;
      }
    )
    .sort(
      (a, b) => {
        if (a.url > b.url) { return 1; }
        if (a.url < b.url) { return -1; }
        return 0;
      }
    )
    .filter(
      (element, index, array) => {
        if (index > 0) {
          if (element.url !== array[index - 1].url) {
            return true;
          }
        }
        return false;
      }
    )
    .sort(
      (a, b) => {
        if (a.playcount > b.playcount) { return -1; }
        if (a.playcount < b.playcount) { return 1; }
        return 0;
      }
    );

  listen (name) {
    window.open('https://www.youtube.com/results?search_query=' + this.props.artistName + ' ' + name);
  }

  render () {
    if (this.state.result.toptracks) {
      return (
        <div>
          <h2 className="text-center">
            Top Tracks
          </h2>
          <section className="artistTopTracksDetails">
            {
              this.tracks().map(
                (track, index) =>
                  (<span key={index} onClick={() => this.listen(track.name)}>
                    {track.name}
                  </span>)
              )
            }
          </section>
        </div>
      );
    } else {
      return (
        <section className="artistTopTracksDetails noFlex">
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

ArtistTopTracksDetails.propTypes = {
  artistName: PropTypes.string.isRequired
};
