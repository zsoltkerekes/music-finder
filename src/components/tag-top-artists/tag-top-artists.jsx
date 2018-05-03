import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { tagTopArtists } from './../../api/api';
import { HashRouter, Link } from 'react-router-dom';
import { tagTopArtistData } from './../../models/tag-top-artists.model';

export class TagTopArtist extends Component {
  constructor (props) {
    super(props);
    this.state = {
      result: { ...tagTopArtistData }
    };
    this.getContent(tagTopArtists(props.tagName));
  }

  componentWillReceiveProps (props) {
    this.setState({
      result: { ...tagTopArtistData }
    });
    this.getContent(tagTopArtists(props.tagName));
  }


  getContent = url => {
    if (url) {
      fetch(url)
        .then(response => response.json(), error => error)
        .then(resolved => this.setState({ result: resolved }), error => this.setState({ result: error }));
    }
  }

  render () {
    if (this.state.result.topartists.artist) {
      return (
        <HashRouter>
          <div className="topArtists">
            <h2>
              Top Artists For {this.props.tagName}
            </h2>
            {this.state.result.topartists.artist
              .map(
                (artist, index) =>
                  (<Link to={'/artist-details/' + encodeURIComponent(artist.name)} key={index}>
                    <span className="artist">
                      <img
                        alt={artist.name}
                        src={artist.image[artist.image.length - 2] ?
                          artist.image[artist.image.length - 2]['#text'] : 'assets/image/no-photo.jpg'} />
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


TagTopArtist.propTypes = {
  tagName: PropTypes.string.isRequired
};
