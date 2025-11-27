import React, { useState } from 'react';
import { MOCK_SONGS } from './constants';
import { Song, AIAnalysis } from './types';
import MusicPlayer from './components/MusicPlayer';
import SongCard from './components/SongCard';
import AIModal from './components/AIModal';
import { analyzeSongForMusician, recommendSongs } from './services/geminiService';

const App: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [displayedSongs, setDisplayedSongs] = useState<Song[]>(MOCK_SONGS);
  
  // AI Modal State
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [analyzingSong, setAnalyzingSong] = useState<Song | null>(null);
  const [analysisData, setAnalysisData] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Search/Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeneratingPlaylist, setIsGeneratingPlaylist] = useState(false);

  // Playback Control (Modified for Spotify Embed)
  const handlePlaySong = (song: Song) => {
    // For Spotify Embed, we just set the current song, the iframe will reload with the new track
    setCurrentSong(song);
  };

  // AI Analysis Handler
  const handleAnalyzeSong = async (song: Song) => {
    setAnalyzingSong(song);
    setIsAIModalOpen(true);
    setAnalysisData(null);
    setIsAnalyzing(true);

    const result = await analyzeSongForMusician(song);
    setAnalysisData(result);
    setIsAnalyzing(false);
  };

  // AI Playlist Generator
  const handleAIPlaylistGen = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
        setDisplayedSongs(MOCK_SONGS);
        return;
    }

    setIsGeneratingPlaylist(true);
    
    try {
        // Use AI to find song IDs based on mood/query
        const recommendedIds = await recommendSongs(searchQuery, MOCK_SONGS);
        
        if (recommendedIds && recommendedIds.length > 0) {
            const filtered = MOCK_SONGS.filter(s => recommendedIds.includes(s.id));
            setDisplayedSongs(filtered);
        } else {
            // Fallback to local search if AI returns nothing or fails
            const filtered = MOCK_SONGS.filter(s => 
                s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.genre.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setDisplayedSongs(filtered);
        }
    } catch (err) {
        console.error("Search failed", err);
    } finally {
        setIsGeneratingPlaylist(false);
    }
  };

  const resetFilter = () => {
    setSearchQuery('');
    setDisplayedSongs(MOCK_SONGS);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28 text-gray-900 font-sans selection:bg-red-200 selection:text-red-900">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Harmonix
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
          <a href="#" className="text-red-600 transition">Discover</a>
          <a href="#" className="hover:text-red-600 transition">Library</a>
          <a href="#" className="hover:text-red-600 transition">Radio</a>
        </div>

        <div className="flex items-center gap-4">
           {/* Mock User Profile */}
           <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
             <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-full h-full object-cover" />
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* AI Search Section */}
        <section className="mb-12">
          <div className="relative bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-8 shadow-2xl overflow-hidden text-white">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">AI DJ & Smart Discovery</h2>
              <p className="text-red-50 mb-6 font-light text-lg">
                ค้นหาเพลงตามอารมณ์ กิจกรรม หรือสไตล์ดนตรีที่คุณต้องการ ด้วยพลังของ Gemini AI
              </p>
              
              <form onSubmit={handleAIPlaylistGen} className="flex gap-2">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="เช่น 'เพลงร็อคยุค 90 สำหรับแกะกีตาร์' หรือ 'เพลงฟังสบายๆ ตอนเช้า'..." 
                  className="flex-1 bg-white text-gray-900 placeholder-gray-400 rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-red-400/50 shadow-inner transition-all"
                />
                <button 
                  type="submit" 
                  disabled={isGeneratingPlaylist}
                  className="bg-gray-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-black transition-all flex items-center gap-2 disabled:opacity-70 shadow-lg hover:shadow-xl"
                >
                  {isGeneratingPlaylist ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  )}
                  ค้นหา
                </button>
                {searchQuery && (
                    <button type="button" onClick={resetFilter} className="bg-white/20 px-4 rounded-xl hover:bg-white/30 text-white transition">
                        ล้าง
                    </button>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Featured Tracks */}
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-2 h-6 bg-red-600 rounded-full"></span>
                    Featured Tracks
                </h2>
                <span className="text-sm text-gray-500">{displayedSongs.length} songs found</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {displayedSongs.map((song) => (
                    <SongCard 
                        key={song.id} 
                        song={song} 
                        isCurrent={currentSong?.id === song.id}
                        onPlay={handlePlaySong}
                        onAnalyze={handleAnalyzeSong}
                    />
                ))}
            </div>

            {displayedSongs.length === 0 && (
                <div className="text-center py-20 text-gray-400 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-lg">ไม่พบเพลงที่คุณค้นหา</p>
                    <button onClick={resetFilter} className="mt-4 text-red-600 hover:text-red-700 font-medium">กลับไปหน้าหลัก</button>
                </div>
            )}
        </section>

      </main>

      {/* Modals & Overlays */}
      <AIModal 
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        song={analyzingSong}
        analysis={analysisData}
        isLoading={isAnalyzing}
      />

      {/* Music Player Bar */}
      <MusicPlayer currentSong={currentSong} />
    </div>
  );
};

export default App;