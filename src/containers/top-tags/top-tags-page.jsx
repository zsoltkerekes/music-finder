import React from 'react';
import { TopTags } from '../../components/top-tags/top-tags';

export const TopTagsPage = () => {
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
};
