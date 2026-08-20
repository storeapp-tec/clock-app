import React from 'react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
}

export const HauteCoutureClock: React.FC<Props> = ({
  hours,
  minutes,
  seconds,
  colors,
  fontFamily,
  showSeconds
}) => {
  const bg = colors.bg || '#050505';
  const hourColor = colors.hour || '#fdfbf7';
  const minColor = colors.min || '#38bdf8';
  const sepColor = colors.sep || '#fb7185';

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 select-none"
      style={{ backgroundColor: bg, fontFamily }}
    >
      <div className="flex items-center justify-center italic font-black tracking-tight select-none">
        <span
          className="transition-colors duration-300"
          style={{
            color: hourColor,
            fontSize: 'clamp(95px, 50vh, 420px)',
            lineHeight: 0.72
          }}
        >
          {hours}
        </span>

        <span
          className="mx-2 sm:mx-6 font-light transition-colors duration-300 opacity-80"
          style={{
            color: sepColor,
            fontSize: 'clamp(65px, 35vh, 300px)',
            lineHeight: 0.72
          }}
        >
          :
        </span>

        <span
          className="transition-colors duration-300"
          style={{
            color: minColor,
            fontSize: 'clamp(95px, 50vh, 420px)',
            lineHeight: 0.72
          }}
        >
          {minutes}
        </span>

        {showSeconds && (
          <div className="ml-3 sm:ml-6 self-end mb-4 sm:mb-8 not-italic">
            <span
              className="text-2xl sm:text-5xl md:text-7xl font-bold tracking-widest"
              style={{ color: sepColor }}
            >
              {seconds}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
