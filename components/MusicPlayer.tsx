import React from 'react';
import { Song } from '../types';

interface MusicPlayerProps {
  currentSong: Song | null;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentSong }) => {
  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="max-w-4xl mx-auto">
         {/* Spotify Embed Player */}
         <iframe 
            style={{ borderRadius: '12px' }}
            src={`https://open.spotify.com/embed/track/${currentSong.spotifyId}?utm_source=generator&theme=0`} 
            width="100%" 
            height="80" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            className="border-0"
         ></iframe>
      </div>
    </div>
  );
};

export default MusicPlayer;