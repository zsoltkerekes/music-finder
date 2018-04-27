import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from './../../components/search-box/search-box';
import { SearchResultArtist } from './../../components/search-result-artists/search-result-artists';
import { SearchResultAlbums } from './../../components/search-result-albums/search-result-albums';
import { SearchResultTracks } from './../../components/search-result-tracks/search-result-tracks';

export class SearchPage extends Component {
  constructor () {
    super();
    this.state = {
      phrase: ''
    };
  }
  setPhrase = (input) => {
    this.setState({
      phrase: input
    });
  }
  render () {
    document.title = 'Search || Music Finder';
    document.documentElement.scrollTop = 0;
    return (
      <section>
        <br />
        <br />
        <br />
        <br />
        <h2>
          {this.state.phrase ? 'Searched for "' + this.state.phrase + '"' : 'Search'}
        </h2>
        <SearchBox setPhrase={this.setPhrase}/>
        { this.state.phrase ? <SearchResultArtist phrase={this.state.phrase} /> : null }
        { this.state.phrase ? <SearchResultTracks phrase={this.state.phrase} /> : null }
        { this.state.phrase ? <SearchResultAlbums phrase={this.state.phrase} /> : null }
      </section>
    );
  }
}

SearchPage.propTypes = {
  match: PropTypes.object.isRequired
};
