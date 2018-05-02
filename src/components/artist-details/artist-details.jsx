import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { artistData } from './../../models/artist.model';
import { artistDetails } from './../../api/api';
import { HashRouter, Link } from 'react-router-dom';

export class ArtistDetails extends Component {
  constructor (props) {
    super();
    this.state = {
      result: { ...artistData }
    };
    this.getContent(artistDetails(props.artistName));
  }

  componentWillReceiveProps (props) {
    this.setState({
      result: { ...artistData }
    });
    this.getContent(artistDetails(props.artistName));
    this.hideFullBio();
  }

  getContent = url => {
    if (url) {
      fetch(url)
        .then(response => response.json(), error => error)
        .then(resolved => this.setState({ result: resolved }), error => this.setState({ result: error }));
    }
  }

  showFullBio = () => {
    document.getElementById('summary').className = 'htmlLike hidden';
    document.getElementById('content').className = 'htmlLike shown';
    document.getElementById('showButton').className = 'hidden';
    document.getElementById('hideButton').className = 'shown';
  }

  hideFullBio = () => {
    document.getElementById('content').className = 'htmlLike hidden';
    document.getElementById('summary').className = 'htmlLike shown';
    document.getElementById('showButton').className = 'shown';
    document.getElementById('hideButton').className = 'hidden';
    document.documentElement.scrollTop = 0;
  }

  render () {
    if (this.state.result.artist) {
      document.title = this.state.result.artist.name + ' || Music Finder';
      document.documentElement.scrollTop = 0;
      return (
        <section className="artistDetails">

          <div>

            <img
              src={this.state.result.artist.image[this.state.result.artist.image.length - 1]['#text'] ||
                'assets/image/no-photo.jpg'}
              alt={this.state.result.artist.name}
              className="profilePic" />

            <div className="upper">
              <h3>{this.state.result.artist.name}</h3>
              <span>
                (last updated: {this.state.result.artist.bio.published})
              </span>
            </div>

            <div>

              <h4>Tags</h4>
              <HashRouter>
                <span>
                  {this.state.result.artist.tags.tag
                    .map((tag, index) =>
                      (<Link to={'/tag-details/' + encodeURIComponent(tag.name)} key={index}>
                        <span>[ {tag.name} ]</span>
                      </Link>)
                    )}
                </span>
              </HashRouter>

              <h4>Similar Artists</h4>
              <HashRouter>
                <span>
                  {this.state.result.artist.similar.artist
                    .map(
                      (similarArtist, index) =>
                        (
                          <Link to={'/artist-details/' + encodeURIComponent(similarArtist.name)} key={index}>
                            <span>
                              [ {similarArtist.name} ]
                            </span>
                          </Link>
                        )
                    )}
                </span>
              </HashRouter>

            </div>

          </div>

          {(this.state.result.artist.bio.content.length > 0) ?
            <div className="bio">
              <h3>Biography</h3>
              {this.state.result.artist.bio.summary ?
                <div
                  id="summary"
                  className="htmlLike shown"
                  dangerouslySetInnerHTML={{ __html: `${this.state.result.artist.bio.summary}` }} /> :
                null}
              {this.state.result.artist.bio.content ?
                <div
                  id="content"
                  className="htmlLike hidden"
                  dangerouslySetInnerHTML={{ __html: `${this.state.result.artist.bio.content}` }} /> :
                null}
              {this.state.result.artist.bio.content &&
                this.state.result.artist.bio.content.slice(0, -130) !== this.state.result.artist.bio.summary.slice(0, -25) ?
                <button id="showButton" onClick={this.showFullBio}>Show Full Biography</button> : null}
              {this.state.result.artist.bio.content &&
                this.state.result.artist.bio.content.slice(0, -130) !== this.state.result.artist.bio.summary.slice(0, -25) ?
                <button id="hideButton" className="hidden" onClick={this.hideFullBio}>Hide Full Biography</button> : null}
            </div> : null}
        </section>
      );
    } else {
      return (
        <section className="artistDetails noFlex">
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

ArtistDetails.propTypes = {
  artistName: PropTypes.string.isRequired
};
