import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { albumData } from './../../models/album.model';
import { albumFromArtist } from './../../api/api';
import { HashRouter, Link } from 'react-router-dom';

export class AlbumDetails extends Component {
  constructor (props) {
    super();
    this.state = {
      result: { ...albumData }
    };
    this.getContent(albumFromArtist(props.artistName, props.albumName));
  }

  componentWillReceiveProps (props) {
    this.setState({
      result: { ...albumData }
    });
    this.getContent(albumFromArtist(props.artistName, props.albumName));
    this.hideFullInfo();
  }

  getContent = url => {
    if (url) {
      fetch(url)
        .then(response => response.json(), error => error)
        .then(resolved => this.setState({ result: resolved }), error => this.setState({ result: error }));
    }
  }

  showFullInfo = () => {
    document.getElementById('summary').className = 'htmlLike hidden';
    document.getElementById('content').className = 'htmlLike shown';
    document.getElementById('showButton').className = 'hidden';
    document.getElementById('hideButton').className = 'shown';
  }

  hideFullInfo = () => {
    document.getElementById('content').className = 'htmlLike hidden';
    document.getElementById('summary').className = 'htmlLike shown';
    document.getElementById('showButton').className = 'shown';
    document.getElementById('hideButton').className = 'hidden';
    document.documentElement.scrollTop = 0;
  }

  listenAlbum () {
    window.open('https://www.youtube.com/results?search_query=' + this.props.artistName + ' ' + this.props.albumName);
  }

  listenTrack (name) {
    window.open('https://www.youtube.com/results?search_query=' + this.props.artistName + ' ' + this.props.albumName + ' ' + name);
  }

  render () {
    if (this.state.result.album) {
      document.title = this.state.result.album.name + ' || ' + this.state.result.album.artist + ' || Music Finder';
      document.documentElement.scrollTop = 0;
      return (
        <section className="albumDetails">

          <div>

            <img
              src={this.state.result.album.image[this.state.result.album.image.length - 1]['#text'] ||
                'assets/image/no-photo.jpg'}
              alt={this.state.result.album.name}
              className="profilePic" />

            <div className="upper">
              <span>
                {this.state.result.album.artist}
              </span>
              <br />
              <br />
              <span onClick={this.listenAlbum.bind(this)}>
                {this.state.result.album.name}
              </span>
            </div>

            {this.state.result.album.tags.tag.length > 0 ?
              <HashRouter>
                <div>
                  <h4>Tags</h4>
                  {this.state.result.album.tags.tag
                    .map((tag, index) =>
                      (<Link to={'/tag-details/' + encodeURIComponent(tag.name)} key={index}>
                        <span>[ {tag.name} ]</span>
                      </Link>)
                    )}
                </div>
              </HashRouter> : null}


            {(this.state.result.album.tracks && this.state.result.album.tracks.track.length > 0) ?
              <div className="tracks">
                <h3>
                  Tracks:
                </h3>
                <ol>
                  {this.state.result.album.tracks.track
                    .map((song, index) =>
                      (<li key={index} onClick={() => this.listenTrack(song.name)}>
                        {song.name} {song.duration ?
                          // eslint-disable-next-line
                          '(' + Math.floor(song.duration / 60) + '\'' + song.duration % 60 + '\'\'' + ')' : ''}
                      </li>)
                    )}
                </ol>
              </div> : null}

          </div>


          {this.state.result.album.wiki ?
            <div className="bio">
              <h3>
                Published: {this.state.result.album.wiki.published ? this.state.result.album.wiki.published : 'N/A'}
              </h3>
              <div
                id="summary"
                className="htmlLike shown"
                dangerouslySetInnerHTML={{
                  __html:
                    this.state.result.album.wiki.summary ?
                      `${this.state.result.album.wiki.summary.slice(0, -25)}` : 'N/A'
                }} />
              <div
                id="content"
                className="htmlLike hidden"
                dangerouslySetInnerHTML={{
                  __html:
                    this.state.result.album.wiki.content ?
                      `${this.state.result.album.wiki.content.slice(0, -130)}` : 'N/A'
                }} />
              {this.state.result.album.wiki.content &&
                this.state.result.album.wiki.content.slice(0, -130) !== this.state.result.album.wiki.summary.slice(0, -25) ?
                <button id="showButton" onClick={this.showFullInfo}>Show Full Info</button> : null}
              {this.state.result.album.wiki.content &&
                this.state.result.album.wiki.content.slice(0, -130) !== this.state.result.album.wiki.summary.slice(0, -25) ?
                <button id="hideButton" className="hidden" onClick={this.hideFullInfo}>Hide Full Info</button> : null}
            </div> : null}

        </section>
      );
    } else {
      return (
        <section className="albumDetails noFlex">
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


AlbumDetails.propTypes = {
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired
};
