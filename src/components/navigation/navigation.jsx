import React, { Component } from 'react';
import { HashRouter, Link } from 'react-router-dom';

export class Navigation extends Component {
  links = [
    { url: '/', name: 'Home' },
    { url: '/search', name: 'Search' },
    { url: '/top-artists', name: 'Top Artists' },
    { url: '/top-tags', name: 'Top Tags' },
    { url: '/top-tracks', name: 'Top Tracks' }
  ]

  render () {
    return (
      <HashRouter>
        <nav>
          <Link to="/">
            <h1>Music Finder</h1>
          </Link>
          <ul>
            {this.links.map(
              (link, index) =>
                (<Link to={link.url} key={index}>
                  <li>
                    {link.name}
                  </li>
                </Link>)
            )}
          </ul>
          <div className="clear" />
        </nav>
      </HashRouter>
    );
  }
}
