import React, { Component } from 'react';
import { TopTracksDetails } from '../../components/top-tracks-details/top-tracks-details';

export class TopTracksPage extends Component {
  constructor (props) {
    super();
  }

  render () {
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
  }
}
