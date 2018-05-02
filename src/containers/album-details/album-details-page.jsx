import React from 'react';
import PropTypes from 'prop-types';
import { AlbumDetails } from './../../components/album-details/album-details';


export const AlbumDetailsPage = props => {
  document.title = 'Album || Music Finder';
  document.documentElement.scrollTop = 0;
  const { albumName } = props.match.params;
  const { artistName } = props.match.params;

  return (
    <section>
      <h2>
        Album Details
      </h2>
      <AlbumDetails albumName={albumName} artistName={artistName} />
    </section>
  );
};

AlbumDetailsPage.propTypes = {
  match: PropTypes.object.isRequired
};
