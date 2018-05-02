import React from 'react';
import PropTypes from 'prop-types';
import { TagDetails } from './../../components/tag-details/tag-details';
import { TagTopArtist } from './../../components/tag-top-artists/tag-top-artists';
import { TagTopTracksDetails } from './../../components/tag-top-tracks-details/tag-top-tracks-details';
import { TagTopAlbumsDetails } from './../../components/tag-top-albums-details/tag-top-albums-details';

export const TagDetailsPage = props => {
  document.title = 'Tags || Music Finder';
  document.documentElement.scrollTop = 0;
  const { tagName } = props.match.params;
  return (
    <section>
      <br />
      <br />
      <br />
      <br />
      <h2>
          Tag Details
      </h2>
      <TagDetails tagName={tagName}/>
      <TagTopTracksDetails tagName={tagName}/>
      <TagTopArtist tagName={tagName}/>
      <TagTopAlbumsDetails tagName={tagName}/>
    </section>
  );
};

TagDetailsPage.propTypes = {
  match: PropTypes.object.isRequired
};
