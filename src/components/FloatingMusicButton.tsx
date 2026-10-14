import React from 'react';
import { Music, Play, Pause } from 'lucide-react';

interface FloatingMusicButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const FloatingMusicButton: React.FC<FloatingMusicButtonProps> = ({ isPlaying, onToggle }) => {
  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 select-none">
      <button
        onClick={onToggle}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'Click to Pause Music' : 'Click to Play Music'}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-[0_8px_30px_rgba(236,72,153,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-pink-300/60"
      >
        {/* Constant Round Outer Rotating Ring (Pink Theme) */}
        <div 
          className="absolute -inset-1.5 rounded-full border-2 border-dashed border-pink-400/80 animate-[spin_8s_linear_infinite] pointer-events-none"
        />

        {/* Constant Round Pulsing Aura (Pink Theme) */}
        <div 
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-400 opacity-60 blur-[3px] animate-pulse pointer-events-none"
          style={{ animationDuration: '2.5s' }}
        />

        {/* Secondary Delicate Spinning Dashed Ring (Counter-clockwise) */}
        <div 
          className="absolute -inset-0.5 rounded-full border border-pink-200/50 animate-[spin_12s_linear_infinite_reverse] pointer-events-none" 
        />

        {/* Main Circular Pink Theme Button Body */}
        <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#db2777] via-[#ec4899] to-[#f43f5e] border-2 border-pink-200/50 p-2 flex items-center justify-center overflow-hidden">
          {/* Subtle concentric rings */}
          <div className="absolute inset-1.5 rounded-full border border-white/25 pointer-events-none" />
          <div className="absolute inset-3 rounded-full border border-white/15 pointer-events-none" />

          {/* Music Icon on Button (Constant round animation when playing) */}
          <div 
            className={`flex items-center justify-center w-full h-full text-white transition-all duration-300 ${
              isPlaying ? 'animate-[spin_6s_linear_infinite]' : 'opacity-85'
            }`}
          >
            <Music className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-md" />
          </div>

          {/* Tiny Status Badge at bottom-right corner of the button */}
          <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-white/95 text-pink-600 shadow-sm flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-2.5 h-2.5 fill-pink-600 stroke-none" />
            ) : (
              <Play className="w-2.5 h-2.5 fill-pink-600 stroke-none translate-x-[0.5px]" />
            )}
          </div>

          {/* Hover Overlay indicating Pause/Play action */}
          <div className="absolute inset-0 bg-pink-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full backdrop-blur-[1px]">
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white fill-white drop-shadow" />
            ) : (
              <Play className="w-5 h-5 text-white fill-white translate-x-0.5 drop-shadow" />
            )}
          </div>
        </div>

        {/* Floating Tooltip Bubble on Desktop */}
        <span className="hidden sm:inline-block absolute right-full mr-3 px-3 py-1 bg-pink-950/85 backdrop-blur-md text-pink-100 text-[11px] font-serif tracking-wider uppercase rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-pink-400/30">
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </span>
      </button>
    </div>
  );
};
