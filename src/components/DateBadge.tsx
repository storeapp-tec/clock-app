import React from 'react';

interface Props {
  dateString: string;
  ampm: string | null;
  showDate: boolean;
  is12h: boolean;
}

export const DateBadge: React.FC<Props> = ({ dateString, ampm, showDate, is12h }) => {
  if (!showDate) return null;

  return (
    <div
      id="date-badge"
      className="fixed top-5 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-2 shadow-lg transition-all duration-300 pointer-events-none"
    >
      <span className="capitalize">{dateString}</span>
      {is12h && ampm && (
        <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 font-bold text-xs">
          {ampm}
        </span>
      )}
    </div>
  );
};
