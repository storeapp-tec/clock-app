import React from 'react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
}

export const NeoBrutalClock: React.FC<Props> = ({
  hours,
  minutes,
  seconds,
  colors,
  showSeconds
}) => {
  const bg = colors.bg || '#09090b';
  const boxH = colors.boxH || '#ffffff';
  const boxM = colors.boxM || '#ffffff';
  const shadowH = colors.shadowH || '#ff2d55';
  const shadowM = colors.shadowM || '#00f2ff';
  const textH = colors.textH || '#000000';
  const textM = colors.textM || '#000000';

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 transition-colors duration-300 select-none overflow-hidden"
      style={{ backgroundColor: bg, fontFamily: "'Bebas Neue', 'Alfa Slab One', sans-serif" }}
    >
      {/* Optional Neo-Brutal Floating Seconds Sticker (Non-distorting) */}
      {showSeconds && (
        <div
          className="absolute top-8 right-8 sm:top-10 sm:right-10 flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 transition-all duration-300 rotate-3 z-20"
          style={{
            backgroundColor: shadowH,
            color: '#ffffff',
            boxShadow: '4px 4px 0 #000000',
            border: '3px solid #000000'
          }}
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">SEC</span>
          <span className="font-black text-base sm:text-2xl">{seconds}</span>
        </div>
      )}

      <div className="flex items-center justify-center gap-4 md:gap-8 mb-10 sm:mb-12">
        {/* Hours Box */}
        <div
          className="flex items-center justify-center rounded-xl md:rounded-2xl transition-all duration-300 -rotate-2 hover:rotate-0"
          style={{
            backgroundColor: boxH,
            color: textH,
            boxShadow: `14px 14px 0 ${shadowH}`,
            height: 'clamp(150px, 48vh, 380px)',
            minWidth: 'clamp(120px, 28vw, 320px)',
            border: '4px solid #000000'
          }}
        >
          <span
            className="font-black tracking-tight"
            style={{
              fontSize: 'clamp(80px, 38vh, 280px)',
              lineHeight: 0.8
            }}
          >
            {hours}
          </span>
        </div>

        {/* Minutes Box */}
        <div
          className="flex items-center justify-center rounded-xl md:rounded-2xl transition-all duration-300 rotate-2 hover:rotate-0"
          style={{
            backgroundColor: boxM,
            color: textM,
            boxShadow: `-14px 14px 0 ${shadowM}`,
            height: 'clamp(150px, 48vh, 380px)',
            minWidth: 'clamp(120px, 28vw, 320px)',
            border: '4px solid #000000'
          }}
        >
          <span
            className="font-black tracking-tight"
            style={{
              fontSize: 'clamp(80px, 38vh, 280px)',
              lineHeight: 0.8
            }}
          >
            {minutes}
          </span>
        </div>
      </div>
    </div>
  );
};
