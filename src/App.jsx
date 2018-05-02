import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { HomePage } from './containers/home/home-page';
import { ArtistDetailsPage } from './containers/artist-details/artist-details-page';
import { Navigation } from './components/navigation/navigation';
import { TopArtistPage } from './containers/top-artists/top-artist-page';
import { AlbumDetailsPage } from './containers/album-details/album-details-page';
import { TopTagsPage } from './containers/top-tags/top-tags-page';
import { TagDetailsPage } from './containers/tags-details/tag-details-page';
import { TopTracksPage } from './containers/top-tracks/top-tracks-page';
import { SearchPage } from './containers/search/search-page';
import { ToTop } from './components/to-top/to-top';

export const App = () => {
  return (
    <section>
      <Navigation />
      <HashRouter>
        <div>
          <Route path="/" exact component={HomePage} />
          <Route path="/search/" exact component={SearchPage} />
          <Route path="/search/:phrase" exact component={SearchPage} />
          <Route path="/top-artists" exact component={TopArtistPage} />
          <Route path="/artist-details/:artistName" exact component={ArtistDetailsPage}/>
          <Route path="/album-details/:artistName/:albumName" exact component={AlbumDetailsPage}/>
          <Route path="/tag-details/:tagName" exact component={TagDetailsPage}/>
          <Route path="/top-tags" exact component={TopTagsPage}/>
          <Route path="/top-tracks" exact component={TopTracksPage} />
        </div>
      </HashRouter>
      <ToTop />
    </section>
  );
};

//export default App;
