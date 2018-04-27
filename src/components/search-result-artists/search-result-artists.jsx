import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { searchArtist } from './../../api/api';
import { HashRouter, Link } from 'react-router-dom';
import { searchArtistData } from './../../models/search-artist.model';

export class SearchResultArtist extends Component {
  constructor (props) {
    super(props);
    this.state = {
      result: { ...searchArtistData }
    };
    this.getContent(searchArtist(props.phrase));
  }

  componentWillReceiveProps (props) {
    this.setState({
      result: { ...searchArtistData }
    });
    this.getContent(searchArtist(props.phrase));
  }


  getContent = url => {
    if (url) {
      fetch(url)
        .then(response => response.json(), error => error)
        .then(resolved => this.setState({ result: resolved }), error => this.setState({ result: error }));
    }
  }

  render () {
    if (this.state.result.results.artistmatches.artist) {
      return (
        <HashRouter>
          <div className="topArtists">
            <h2>
              Results for {'"' + this.props.phrase + '"'} in Artists
            </h2>
            {this.state.result.results.artistmatches.artist.length > 0 ?
              <span>
                {this.state.result.results.artistmatches.artist
                  .filter(
                    artist => artist.image[artist.image.length - 1]['#text'] !== ''
                  )
                  .map(
                    (artist, index) =>
                      (<Link to={'/artist-details/' + encodeURIComponent(artist.name)} key={index}>
                        <span className="artist">
                          <img
                            alt={artist.name}
                            src={artist.image[artist.image.length - 1]['#text'] !== '' ?
                              artist.image[artist.image.length - 1]['#text'] : 'assets/image/no-photo.jpg'} />
                          <span>
                            {artist.name}
                          </span>
                        </span>
                      </Link>
                      )
                  )}
              </span> :
              <span>
                <h3 className="text-center">
                  Nothing found
                </h3>
              </span>}
          </div>
        </HashRouter>
      );
    } else {
      return (
        <section className="topArtists noFlex">
          <br />
          <br />
          <br />
          <br />
          <p>Loading...</p>
          <p>{this.state.result.error ? 'ERROR : ' + this.state.result.error : ''} </p>
          <p>{this.state.result.message ? 'ERROR MESSAGE : ' + this.state.result.message : ''}</p>
        </section>
      );
    }
  }
}


SearchResultArtist.propTypes = {
  phrase: PropTypes.string.isRequired
};
