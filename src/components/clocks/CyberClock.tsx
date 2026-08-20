import React from 'react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
}

export const CyberClock: React.FC<Props> = ({
  hours,
  minutes,
  seconds,
  colors,
  fontFamily,
  showSeconds
}) => {
  const bg = colors.bg || '#030712';
  const hourColor = colors.hour || '#f8fafc';
  const minColor = colors.min || '#00f2ff';
  const sepColor = colors.sep || '#f43f5e';

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 select-none"
      style={{ backgroundColor: bg, fontFamily }}
    >
      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f2ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f2ff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Futuristic HUD corner marks */}
      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-cyan-500/30" />
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-cyan-500/30" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-cyan-500/30" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-cyan-500/30" />

      {/* Optional HUD Telemetry Seconds Corner Badge (Non-distorting) */}
      {showSeconds && (
        <div className="absolute top-8 right-8 sm:top-10 sm:right-10 z-20 flex items-center gap-2 px-3 py-1.5 rounded bg-black/60 border border-cyan-500/40 backdrop-blur-sm shadow-[0_0_15px_rgba(0,242,255,0.15)]">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400/70 tracking-widest">
            SEC //
          </span>
          <span
            className="text-sm sm:text-lg font-mono font-black text-cyan-300"
            style={{ textShadow: '0 0 10px rgba(0,242,255,0.6)' }}
          >
            {seconds}
          </span>
        </div>
      )}

      {/* Main Time display */}
      <div className="relative z-10 flex items-center justify-center tracking-wider font-black select-none mb-10 sm:mb-12">
        <span
          className="transition-colors duration-300 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          style={{
            color: hourColor,
            fontSize: 'clamp(85px, 44vh, 360px)',
            lineHeight: 0.85
          }}
        >
          {hours}
        </span>

        <span
          className="mx-2 sm:mx-4 transition-colors duration-300 animate-pulse"
          style={{
            color: sepColor,
            fontSize: 'clamp(60px, 32vh, 260px)',
            textShadow: `0 0 25px ${sepColor}`
          }}
        >
          :
        </span>

        <span
          className="transition-colors duration-300"
          style={{
            color: minColor,
            fontSize: 'clamp(85px, 44vh, 360px)',
            lineHeight: 0.85,
            textShadow: `0 0 35px ${minColor}66`
          }}
        >
          {minutes}
        </span>
      </div>
    </div>
  );
};
