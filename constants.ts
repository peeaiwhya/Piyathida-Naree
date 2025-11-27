import { Song } from './types';

// Real Spotify Tracks data
export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: 'Divide',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    duration: 233,
    genre: 'Pop',
    spotifyId: '7qiZfU4dY1lWllzX7mPmi3',
    mood: ['Happy', 'Party', 'Dance']
  },
  {
    id: '2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c8ea321f5b9f7308313369b0',
    duration: 200,
    genre: 'Synthwave',
    spotifyId: '0VjIjW4GlUZAMYd2vXMi3b',
    mood: ['Energetic', 'Night', 'Driving']
  },
  {
    id: '3',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273ce4f1737bc8a646c8c4bd25a',
    duration: 354,
    genre: 'Rock',
    spotifyId: '3z8h0TU7ReDPLIbEnYhWzb',
    mood: ['Classic', 'Drama', 'Rock']
  },
  {
    id: '4',
    title: 'Cruel Summer',
    artist: 'Taylor Swift',
    album: 'Lover',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647',
    duration: 178,
    genre: 'Pop',
    spotifyId: '1BxfuPKGuaTgP7aM0BBDwq',
    mood: ['Summer', 'Energetic', 'Love']
  },
  {
    id: '5',
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e175a19e530c898d018da029',
    duration: 301,
    genre: 'Grunge',
    spotifyId: '1f3yAtsJtY87CTmM8RLnxf',
    mood: ['Aggressive', 'Classic', 'Rock']
  },
  {
    id: '6',
    title: 'As It Was',
    artist: 'Harry Styles',
    album: 'Harry\'s House',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14',
    duration: 167,
    genre: 'Pop',
    spotifyId: '4LRPiXqCikLlN15c3yImP7',
    mood: ['Happy', 'Nostalgic']
  }
];

export const INITIAL_VOLUME = 0.5;