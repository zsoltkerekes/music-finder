import React from 'react';
import { TopTracksDetails } from '../../components/top-tracks-details/top-tracks-details';

export const TopTracksPage = () => {
  document.title = 'Top Tracks || Music Finder';
  document.documentElement.scrollTop = 0;
  return (
    <section>
      <br />
      <br />
      <br />
      <br />
      <h2>
          Top Tracks
      </h2>
      <TopTracksDetails />
    </section>
  );
};
