import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ArtistDetails } from './../../components/artist-details/artist-details';
import { ArtistTopAlbumsDetails } from './../../components/artist-top-albums-details/artist-top-albums-details';
import { ArtistTopTracksDetails } from './../../components/artist-top-tracks-details/artist-top-tracks-details';

export class ArtistDetailsPage extends Component {
  constructor (props) {
    super();
  }

  render () {
    document.title = 'Artist || Music Finder';
    document.documentElement.scrollTop = 0;
    const { artistName } = this.props.match.params;
    return (
      <section>
        <h2>
          Artist Details
        </h2>
        <ArtistDetails artistName={artistName}/>
        <ArtistTopTracksDetails artistName={artistName}/>
        <ArtistTopAlbumsDetails artistName={artistName}/>
      </section>
    );
  }
}

ArtistDetailsPage.propTypes = {
  match: PropTypes.object.isRequired
};
