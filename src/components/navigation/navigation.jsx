import React from 'react';
import { HashRouter, Link } from 'react-router-dom';

export const Navigation = () => {
  const links = [
    { url: '/search', name: 'Search' },
    { url: '/top-artists', name: 'Top Artists' },
    { url: '/top-tags', name: 'Top Tags' },
    { url: '/top-tracks', name: 'Top Tracks' }
  ];

  return (
    <HashRouter>
      <nav>
        <Link to="/">
          <h1>Music Finder</h1>
        </Link>
        <ul>
          {links.map(
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
};

