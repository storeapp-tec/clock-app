import React from 'react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
}

export const MonospaceClock: React.FC<Props> = ({
  hours,
  minutes,
  seconds,
  colors,
  showSeconds
}) => {
  const bg = colors.bg || '#050505';
  const hourColor = colors.hour || '#ffffff';
  const minColor = colors.min || '#ffffff';
  const sepColor = colors.sep || '#f43f5e';
  const barHColor = colors.barH || '#f43f5e';
  const barMColor = colors.barM || '#f43f5e';

  // Calculate percentage of hour and minute for bars
  const hNum = parseInt(hours, 10) || 0;
  const mNum = parseInt(minutes, 10) || 0;
  const sNum = parseInt(seconds, 10) || 0;

  const hourProgress = Math.round(((hNum % 24) / 24) * 100);
  const minProgress = Math.round((mNum / 60) * 100);
  const secProgress = Math.round((sNum / 60) * 100);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 transition-colors duration-300 select-none"
      style={{ backgroundColor: bg, fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Optional Terminal Status Seconds Badge (Non-distorting) */}
      {showSeconds && (
        <div className="absolute top-8 right-8 sm:top-10 sm:right-10 flex flex-col items-end gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-[10px] sm:text-xs text-white/50 font-bold">SEC</span>
            <span className="text-xs sm:text-base font-bold text-white/90">{seconds}</span>
            <span className="text-[10px] sm:text-xs text-white/40">({secProgress}%)</span>
          </div>
          <div className="w-24 sm:w-28 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.max(2, secProgress)}%`,
                backgroundColor: sepColor
              }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-4 md:gap-8 mb-10 sm:mb-12">
        {/* Hours group */}
        <div className="flex flex-col items-center">
          <span
            className="font-black tracking-tighter transition-colors duration-300"
            style={{
              color: hourColor,
              fontSize: 'clamp(70px, 32vh, 260px)',
              lineHeight: 0.85
            }}
          >
            {hours}
          </span>
          <div className="w-full max-w-[220px] h-2.5 bg-white/10 rounded-full mt-3 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${Math.max(5, hourProgress)}%`,
                backgroundColor: barHColor,
                boxShadow: `0 0 10px ${barHColor}`
              }}
            />
          </div>
        </div>

        {/* Colon */}
        <span
          className="font-black -translate-y-4 animate-pulse transition-colors duration-300"
          style={{
            color: sepColor,
            fontSize: 'clamp(50px, 26vh, 200px)',
            lineHeight: 0.85
          }}
        >
          :
        </span>

        {/* Minutes group */}
        <div className="flex flex-col items-center">
          <span
            className="font-black tracking-tighter transition-colors duration-300"
            style={{
              color: minColor,
              fontSize: 'clamp(70px, 32vh, 260px)',
              lineHeight: 0.85
            }}
          >
            {minutes}
          </span>
          <div className="w-full max-w-[220px] h-2.5 bg-white/10 rounded-full mt-3 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${Math.max(3, minProgress)}%`,
                backgroundColor: barMColor,
                boxShadow: `0 0 10px ${barMColor}`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
