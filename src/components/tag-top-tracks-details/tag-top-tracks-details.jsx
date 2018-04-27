import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { tagTopTracksData } from './../../models/tag-top-tracks.model';
import { tagTopTracks } from './../../api/api';

export class TagTopTracksDetails extends Component {
  constructor (props) {
    super();
    this.state = {
      result: { ...tagTopTracksData }
    };
    this.getContent(tagTopTracks(props.tagName));
  }

  componentWillReceiveProps (props) {
    this.setState({
      result: { ...tagTopTracksData }
    });
    this.getContent(tagTopTracks(props.tagName));
  }

  getContent = url => {
    if (url) {
      fetch(url)
        .then(response => response.json(), error => error)
        .then(resolved => this.setState({ result: resolved }), error => this.setState({ result: error }));
    }
  };

  banned = [
    // 'Keresés', '(null)', 'Other', '0ther', 'Music', 'Zene', '<unknown>', 'converto.io', 'MusicDownloader',
    // 'title', 'undefined'
  ];

  tracks = () => this.state.result.tracks.track
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
            // element.image[element.image.length - 1]['#text'].length > 0 &&
            // element.name.indexOf('Ismeretlen album') === -1 &&
            this.banned.findIndex(name => name.toUpperCase() === element.name.toUpperCase()) === -1) {
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
        if (a['@attr'].rank > b['@attr'].rank) { return 1; }
        if (a['@attr'].rank < b['@attr'].rank) { return -1; }
        return 0;
      }
    );

  listen (name) {
    window.open('https://www.youtube.com/results?search_query=' + name);
  }

  render () {
    if (this.state.result.tracks.track) {
      return (
        <div>
          <h2 className="text-center">
            Top Tracks for {this.props.tagName}
          </h2>
          <section className="artistTopTracksDetails">
            {
              this.tracks().map(
                (track, index) =>
                  (<span key={index} onClick={() => this.listen(track.artist.name + ' ' + track.name)}>
                    {track.artist.name} - {track.name}
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

TagTopTracksDetails.propTypes = {
  tagName: PropTypes.string.isRequired
};
