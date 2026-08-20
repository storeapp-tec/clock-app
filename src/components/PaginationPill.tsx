import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ClockDesignDefinition } from '../types';

interface Props {
  currentDesign: ClockDesignDefinition;
  currentIndex: number;
  totalCount: number;
  visible: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

export const PaginationPill: React.FC<Props> = ({
  currentDesign,
  currentIndex,
  totalCount,
  visible,
  onPrev,
  onNext,
  onSelectIndex
}) => {
  return (
    <div
      id="pagination-pill"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-neutral-950/80 backdrop-blur-xl border border-white/10 px-3 py-2 rounded-full shadow-2xl transition-all duration-500 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <button
        id="btn-prev-clock"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        disabled={currentIndex === 0}
        aria-label="Reloj anterior"
        className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2 px-2">
        <span className="font-mono text-xs font-bold text-rose-400">
          {String(currentIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
        </span>
        <span className="text-white/30 text-xs">•</span>
        <span className="text-xs font-semibold text-white/90 max-w-[140px] truncate">
          {currentDesign.name}
        </span>
      </div>

      <div className="hidden sm:flex items-center gap-1 px-1">
        {Array.from({ length: totalCount }).map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              onSelectIndex(idx);
            }}
            aria-label={`Ir al diseño ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? 'w-5 bg-rose-500'
                : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      <button
        id="btn-next-clock"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        disabled={currentIndex === totalCount - 1}
        aria-label="Siguiente reloj"
        className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
