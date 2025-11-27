import React from 'react';
import { Song } from '../types';

interface SongCardProps {
  song: Song;
  isCurrent: boolean;
  onPlay: (song: Song) => void;
  onAnalyze: (song: Song) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, isCurrent, onPlay, onAnalyze }) => {
  return (
    <div className={`group relative bg-white p-4 rounded-xl shadow-sm hover:shadow-xl transition-all border border-gray-100 ${isCurrent ? 'ring-2 ring-red-500 bg-red-50' : ''}`}>
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg cursor-pointer" onClick={() => onPlay(song)}>
        <img 
          src={song.coverUrl} 
          alt={song.title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
        />
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity ${isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
             <button className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
             </button>
        </div>
      </div>
      
      <div className="mb-2">
        <h3 className={`font-bold text-base truncate ${isCurrent ? 'text-red-600' : 'text-gray-900'}`}>{song.title}</h3>
        <p className="text-sm text-gray-500 truncate">{song.artist}</p>
      </div>
      
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium">{song.genre}</span>
        <button 
          onClick={(e) => { e.stopPropagation(); onAnalyze(song); }}
          className="text-xs flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          AI Insight
        </button>
      </div>
    </div>
  );
};

export default SongCard;