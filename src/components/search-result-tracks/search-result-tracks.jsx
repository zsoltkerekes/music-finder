import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { searchTracks } from './../../api/api';
import { searchTrackData } from './../../models/search-track.model';

export class SearchResultTracks extends Component {
  constructor (props) {
    super();
    this.state = {
      result: { ...searchTrackData }
    };
    this.getContent(searchTracks(props.phrase));
  }

  componentWillReceiveProps (props) {
    this.setState({
      result: { ...searchTrackData }
    });
    this.getContent(searchTracks(props.phrase));
  }

  getContent = url => {
    if (url) {
      fetch(url)
        .then(response => response.json(), error => error)
        .then(resolved => this.setState({ result: resolved }), error => this.setState({ result: error }));
    }
  };

  listen (artist, name) {
    window.open('https://www.youtube.com/results?search_query=' + artist + ' ' + name);
  }

  render () {
    if (this.state.result.results.trackmatches.track) {
      return (
        <div>
          <h2 className="text-center">
          Results for {'"' + this.props.phrase + '"'} in Tracks
          </h2>
          <section className="artistTopTracksDetails">
            {
              this.state.result.results.trackmatches.track
                .map(
                  (track, index) =>
                    (<span key={index} onClick={() => this.listen(track.artist, track.name)}>
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

SearchResultTracks.propTypes = {
  phrase: PropTypes.string.isRequired
};
