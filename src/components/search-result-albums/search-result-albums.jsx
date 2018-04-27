import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { searchAlbums } from './../../api/api';
import { searchAlbumData } from './../../models/search-album.model';
import { HashRouter, Link } from 'react-router-dom';

export class SearchResultAlbums extends Component {
  constructor (props) {
    super();
    this.state = {
      result: { ...searchAlbumData }
    };
    this.getContent(searchAlbums(props.phrase));
  }

  componentWillReceiveProps (props) {
    this.setState({
      result: { ...searchAlbumData }
    });
    this.getContent(searchAlbums(props.phrase));
  }

  getContent = url => {
    if (url) {
      fetch(url)
        .then(response => response.json(), error => error)
        .then(resolved => this.setState({ result: resolved }), error => this.setState({ result: error }));
    }
  };

  imageSrc = album => {
    const image = album.image[album.image.length - 1]['#text'];
    if (image !== '') {
      return image;
    } else {
      return 'assets/image/no-photo.jpg';
    }
  }

  scroll = event => {
    event.preventDefault();
    document.getElementsByClassName('artistTopAlbumsDetails')[0].scrollLeft += event.deltaY / 2;
  };

  render () {
    if (this.state.result.results.albummatches.album) {
      return (
        <div>
          <h2 className="text-center">
            Results for {'"' + this.props.phrase + '"'} in Albums
          </h2>
          <HashRouter>
            {this.state.result.results.albummatches.album.length > 0 ?
              <span>
                <section className="artistTopAlbumsDetails" onWheel={(event) => this.scroll(event)}>
                  {
                    this.state.result.results.albummatches.album
                      .map(
                        (album, index) =>
                          (<Link to={'/album-details/' + encodeURIComponent(album.artist) + '/' +
                          encodeURIComponent(album.name)} key={index}>
                            <span className="artist">
                              <img
                                src={this.imageSrc(album)}
                                alt={album.name}
                                className="albumPic" />
                              <span>
                                {album.name}
                              </span>
                            </span>
                          </Link>)
                      )
                  }
                </section>
              </span> :
              <span>
                <h3 className="text-center">
                  Nothing found
                </h3>
              </span>}
          </HashRouter>
        </div>
      );
    } else {
      return (
        <section className="artistTopAlbumsDetails noFlex">
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

SearchResultAlbums.propTypes = {
  phrase: PropTypes.string.isRequired
};
