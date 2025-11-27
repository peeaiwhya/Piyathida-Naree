import React from 'react';
import { AIAnalysis, Song } from '../types';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song | null;
  analysis: AIAnalysis | null;
  isLoading: boolean;
}

const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, song, analysis, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden transform transition-all animate-fadeIn">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 p-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5a2.5 2.5 0 0 0 4.25 2.5"/><path d="M13 13l2 2"/></svg>
              AI Musician Analyst
            </h2>
            <p className="text-red-100 text-sm opacity-90">Analyzing: {song?.title}</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 animate-pulse">กำลังวิเคราะห์โครงสร้างดนตรี...</p>
            </div>
          ) : analysis ? (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-red-600 text-sm font-bold uppercase tracking-wider mb-2">Vibe Description</h3>
                <p className="text-gray-700 leading-relaxed">{analysis.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-red-600 text-xs font-bold uppercase tracking-wider mb-1">Key</h3>
                  <p className="text-xl font-mono text-gray-900">{analysis.musicalKey}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-red-600 text-xs font-bold uppercase tracking-wider mb-1">Tempo</h3>
                  <p className="text-xl font-mono text-gray-900">{analysis.tempo}</p>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <h3 className="text-orange-600 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                  Pro Tip for Musicians
                </h3>
                <p className="text-gray-700 italic">"{analysis.technicalTips}"</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-red-500 py-10">
                <p>ขออภัย ไม่สามารถดึงข้อมูลได้</p>
                <p className="text-sm text-gray-400 mt-2">โปรดตรวจสอบ API Key ของคุณ</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIModal;