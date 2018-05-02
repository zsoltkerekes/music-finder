import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { tagTopAlbumsData } from './../../models/tag-top-albums.model';
import { tagTopAlbums } from './../../api/api';
import { HashRouter, Link } from 'react-router-dom';
import { banned } from './../../models/banned.model';

export class TagTopAlbumsDetails extends Component {
  constructor (props) {
    super();
    this.state = {
      result: { ...tagTopAlbumsData }
    };
    this.getContent(tagTopAlbums(props.tagName));
  }

  componentWillReceiveProps (props) {
    this.setState({
      result: { ...tagTopAlbumsData }
    });
    this.getContent(tagTopAlbums(props.tagName));
  }

  getContent = url => {
    if (url) {
      fetch(url)
        .then(response => response.json(), error => error)
        .then(resolved => this.setState({ result: resolved }), error => this.setState({ result: error }));
    }
  };

  albums = () => this.state.result.albums.album
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
          //  element.image[element.image.length - 1]['#text'].length > 0 &&
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
    if (this.state.result.albums.album) {
      return (
        <div>
          <h2 className="text-center">
            Top Albums
          </h2>
          <HashRouter>
            <section className="artistTopAlbumsDetails" onWheel={(event) => this.scroll(event)}>
              {
                this.albums().map(
                  (album, index) =>
                    (<Link to={'/album-details/' + encodeURIComponent(album.artist.name) +
                    '/' + encodeURIComponent(album.name)} key={index}>
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

TagTopAlbumsDetails.propTypes = {
  tagName: PropTypes.string.isRequired
};
