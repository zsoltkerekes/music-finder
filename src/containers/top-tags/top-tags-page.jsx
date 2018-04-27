import React, { Component } from 'react';
import { TopTags } from '../../components/top-tags/top-tags';

export class TopTagsPage extends Component {
  constructor (props) {
    super();
  }

  render () {
    document.title = 'Top Tags || Music Finder';
    document.documentElement.scrollTop = 0;
    return (
      <section>
        <br />
        <br />
        <br />
        <br />
        <h2>
          Top Tags
        </h2>
        <TopTags />
      </section>
    );
  }
}
