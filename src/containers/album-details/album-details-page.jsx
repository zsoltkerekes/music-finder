import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AlbumDetails } from './../../components/album-details/album-details';


export class AlbumDetailsPage extends Component {
  constructor (props) {
    super();
  }

  render () {
    document.title = 'Album || Music Finder';
    document.documentElement.scrollTop = 0;
    const { albumName } = this.props.match.params;
    const { artistName } = this.props.match.params;
    return (
      <section>
        <h2>
          Album Details
        </h2>
        <AlbumDetails albumName={albumName} artistName={artistName}/>

      </section>
    );
  }
}

AlbumDetailsPage.propTypes = {
  match: PropTypes.object.isRequired
};
