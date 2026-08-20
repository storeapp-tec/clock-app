import React from 'react';
import { Smartphone, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onStart: () => void;
}

export const StartOverlay: React.FC<Props> = ({ isOpen, onStart }) => {
  if (!isOpen) return null;

  return (
    <div
      id="start-overlay"
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-white text-center transition-opacity duration-500 animate-in fade-in"
    >
      <div className="relative mb-8">
        <div className="w-14 h-20 rounded-xl border-2 border-white/80 flex items-center justify-center animate-[spin_4s_ease-in-out_infinite]">
          <Smartphone className="w-6 h-6 text-rose-500" />
        </div>
        <div className="absolute -inset-4 bg-rose-500/20 blur-xl rounded-full -z-10 animate-pulse" />
      </div>

      <h1
        className="text-4xl md:text-6xl font-black tracking-wider uppercase mb-2"
        style={{ fontFamily: "'Anton', sans-serif" }}
      >
        STUDIO CLOCK
      </h1>

      <p className="text-white/50 text-sm md:text-base max-w-md mb-8 font-light">
        Experiencia de reloj de mesa inmersiva. Desliza horizontalmente para cambiar de diseño o toca para abrir ajustes.
      </p>

      <button
        id="btn-start-app"
        onClick={onStart}
        className="px-10 py-4 bg-white text-black font-bold text-base md:text-lg rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
      >
        <Sparkles className="w-5 h-5 text-rose-500" />
        COMENZAR
      </button>

      <span className="mt-8 text-xs text-white/30 tracking-widest uppercase">
        Optimizado para Landscape & Ultra-Wide 21:9
      </span>
    </div>
  );
};
