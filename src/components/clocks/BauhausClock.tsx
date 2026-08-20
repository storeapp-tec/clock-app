import React from 'react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
}

export const BauhausClock: React.FC<Props> = ({
  hours,
  minutes,
  seconds,
  colors,
  fontFamily,
  showSeconds
}) => {
  const bg = colors.bg || '#000000';
  const d1 = colors.d1 || '#ff3b30';
  const d2 = colors.d2 || '#ff9500';
  const d3 = colors.d3 || '#34c759';
  const d4 = colors.d4 || '#007aff';
  const sep = colors.sep || '#ff2d55';

  const d1Char = hours.padStart(2, '0')[0];
  const d2Char = hours.padStart(2, '0')[1];
  const d3Char = minutes.padStart(2, '0')[0];
  const d4Char = minutes.padStart(2, '0')[1];

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: bg, fontFamily }}
    >
      {/* Optional Bauhaus Geometric Seconds Floating Badge (Non-distorting) */}
      {showSeconds && (
        <div className="absolute top-8 right-8 sm:top-10 sm:right-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm shadow-md">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff3b30] animate-ping" />
          <span className="font-bold text-sm sm:text-lg text-white/90">
            {seconds}s
          </span>
        </div>
      )}

      <div className="flex items-center justify-center font-black select-none tracking-tight mb-10 sm:mb-12">
        {/* D1 */}
        <span
          className="transition-all duration-300 hover:scale-105 inline-block"
          style={{
            color: d1,
            fontSize: 'clamp(80px, 42vh, 340px)',
            lineHeight: 0.8
          }}
        >
          {d1Char}
        </span>

        {/* D2 */}
        <span
          className="transition-all duration-300 hover:scale-105 inline-block"
          style={{
            color: d2,
            fontSize: 'clamp(80px, 42vh, 340px)',
            lineHeight: 0.8
          }}
        >
          {d2Char}
        </span>

        {/* Separator */}
        <span
          className="mx-1 md:mx-4 font-black transition-colors duration-300 opacity-90 animate-pulse"
          style={{
            color: sep,
            fontSize: 'clamp(40px, 20vh, 180px)',
            lineHeight: 0.8
          }}
        >
          :
        </span>

        {/* D3 */}
        <span
          className="transition-all duration-300 hover:scale-105 inline-block"
          style={{
            color: d3,
            fontSize: 'clamp(80px, 42vh, 340px)',
            lineHeight: 0.8
          }}
        >
          {d3Char}
        </span>

        {/* D4 */}
        <span
          className="transition-all duration-300 hover:scale-105 inline-block"
          style={{
            color: d4,
            fontSize: 'clamp(80px, 42vh, 340px)',
            lineHeight: 0.8
          }}
        >
          {d4Char}
        </span>
      </div>
    </div>
  );
};
