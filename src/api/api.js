
const baseUrl = () => 'https://ws.audioscrobbler.com/2.0/?';

const artistMethod = () => 'method=artist.getinfo';
const topArtistMethod = () => 'method=chart.gettopartists';
const topTracksMethod = () => 'method=chart.gettoptracks';
const topArtistAlbumsMethod = () => 'method=artist.gettopalbums';
const topArtistTracksMethod = () => 'method=artist.gettoptracks';
const albumFromArtistMethod = () => 'method=album.getinfo';
const topTagsMethod = () => 'method=tag.getTopTags';
const tagMethod = () => 'method=tag.getinfo';
const tagTopArtistsMethod = () => 'method=tag.gettopartists';
const tagTopTracksMethod = () => 'method=tag.gettoptracks';
const tagTopAlbumsMethod = () => 'method=tag.gettopalbums';
const searchArtistMethod = () => 'method=artist.search';
const searchAlbumMethod = () => 'method=album.search';
const searchTracksMethod = () => 'method=track.search';

const queryArtist = query => `&artist=${query}`;
const queryAlbum = query => `&album=${query}`;
const queryTag = query => `&tag=${query}`;
const queryTrack = query => `&track=${query}`;

const autocorrect = (option = 1) => `&autocorrect[${option}]`;
const limit = (option = 50) => `&limit=${option}`;
const page = (option = 1) => `&page=${option}`;
const apiKey = () => '&api_key=468ede76a78690130e40cf4be9c6e11e';
const format = () => '&format=json';

export const artistDetails = artist =>
  artist ? `${baseUrl()}${artistMethod()}${queryArtist(artist)}${apiKey()}${format()}${autocorrect()}` : null;

export const topArtists = () =>
  `${baseUrl()}${topArtistMethod()}${apiKey()}${format()}${autocorrect()}${limit(500)}${page(1)}`;

export const topTracks = () =>
  `${baseUrl()}${topTracksMethod()}${apiKey()}${format()}${autocorrect()}`;

export const artistTopAlbums = (artist, albums) =>
  artist ? `${baseUrl()}${topArtistAlbumsMethod()}${queryArtist(artist)}${apiKey()}${format()
  }${autocorrect()}${limit(albums)}${page(1)}` : null;

export const artistTopTracks = (artist, albums) =>
  artist ? `${baseUrl()}${topArtistTracksMethod()}${queryArtist(artist)}${apiKey()}${format()
  }${autocorrect()}${limit(albums)}${page(1)}` : null;

export const albumFromArtist = (artist, album) =>
  (artist && album) ? `${baseUrl()}${albumFromArtistMethod()}${queryArtist(artist)}${queryAlbum(album)}${
    apiKey()}${format()}${autocorrect()}` : null;

export const topTags = () =>
  `${baseUrl()}${topTagsMethod()}${apiKey()}${format()}`;

export const tagDetails = (tag) =>
  `${baseUrl()}${tagMethod()}${queryTag(tag)}${apiKey()}${format()}`;

export const tagTopArtists = (tag) =>
  `${baseUrl()}${tagTopArtistsMethod()}${queryTag(tag)}${apiKey()}${format()}${limit(300)}${page(1)}`;

export const tagTopTracks = (tag) =>
  `${baseUrl()}${tagTopTracksMethod()}${queryTag(tag)}${apiKey()}${format()}`;

export const tagTopAlbums = (tag) =>
  `${baseUrl()}${tagTopAlbumsMethod()}${queryTag(tag)}${apiKey()}${format()}`;

export const searchArtist = (artist) =>
  `${baseUrl()}${searchArtistMethod()}${queryArtist(artist)}${apiKey()}${format()}${limit(100)}`;

export const searchAlbums = (album) =>
  `${baseUrl()}${searchAlbumMethod()}${queryAlbum(album)}${apiKey()}${format()}${limit(100)}`;

export const searchTracks = (track) =>
  `${baseUrl()}${searchTracksMethod()}${queryTrack(track)}${apiKey()}${format()}${limit(100)}`;

