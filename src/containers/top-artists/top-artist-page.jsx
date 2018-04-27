import React, { Component } from 'react';
import { TopArtist } from './../../components/top-artists/top-artists';

export class TopArtistPage extends Component {
  constructor (props) {
    super();
  }

  render () {
    document.title = 'Artist || Music Finder';
    document.documentElement.scrollTop = 0;
    return (
      <section>
        <br />
        <br />
        <br />
        <br />
        <h2>
          Top Artist
        </h2>
        <TopArtist />
      </section>
    );
  }
}
