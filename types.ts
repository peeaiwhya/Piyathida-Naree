export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number; // in seconds
  genre: string;
  spotifyId: string; // Required for Spotify Embed
  mood?: string[];
}

export enum PlaybackState {
  PAUSED = 'PAUSED',
  PLAYING = 'PLAYING',
  LOADING = 'LOADING'
}

export interface AIAnalysis {
  description: string;
  musicalKey: string;
  tempo: string;
  technicalTips: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  songs: Song[];
}