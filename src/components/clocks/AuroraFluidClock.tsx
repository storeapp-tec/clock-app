import React, { useState, useEffect } from 'react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
}

export const AuroraFluidClock: React.FC<Props> = ({
  hours,
  minutes,
  seconds,
  colors,
  fontFamily,
  showSeconds
}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const bg = colors.bg || '#000000';
  const neonLime = colors.text || '#ccff00';

  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const monthStr = months[date.getMonth()];
  const dayNum = date.getDate();
  const dayName = days[date.getDay()];

  const h1 = hours.padStart(2, '0')[0];
  const h2 = hours.padStart(2, '0')[1];
  const m1 = minutes.padStart(2, '0')[0];
  const m2 = minutes.padStart(2, '0')[1];

  return (
    <div
      className="w-full h-full flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden transition-colors duration-300 select-none"
      style={{ backgroundColor: bg }}
    >
      {/* Top Header: AUG.16 style date */}
      <div className="w-full flex justify-end items-center">
        <span
          className="font-mono font-bold tracking-widest text-sm sm:text-lg uppercase"
          style={{ color: neonLime, opacity: 0.85 }}
        >
          {monthStr}.{dayNum}
        </span>
      </div>

      {/* Center Giant Neon Lime Outline Digits */}
      <div className="flex items-center justify-center gap-2 sm:gap-6 my-auto">
        <div className="flex items-center">
          <span
            className="font-black tracking-tighter"
            style={{
              color: neonLime,
              fontSize: 'clamp(60px, 20vw, 220px)',
              lineHeight: 0.8,
              fontFamily: fontFamily || "'Syne', sans-serif",
              textShadow: `0 0 25px ${neonLime}44`
            }}
          >
            {h1}
          </span>
          <span
            className="font-black tracking-tighter"
            style={{
              color: neonLime,
              fontSize: 'clamp(60px, 20vw, 220px)',
              lineHeight: 0.8,
              fontFamily: fontFamily || "'Syne', sans-serif",
              textShadow: `0 0 25px ${neonLime}44`
            }}
          >
            {h2}
          </span>
        </div>

        <div className="flex items-center">
          <span
            className="font-black tracking-tighter"
            style={{
              color: neonLime,
              fontSize: 'clamp(60px, 20vw, 220px)',
              lineHeight: 0.8,
              fontFamily: fontFamily || "'Syne', sans-serif",
              textShadow: `0 0 25px ${neonLime}44`
            }}
          >
            {m1}
          </span>
          <span
            className="font-black tracking-tighter"
            style={{
              color: neonLime,
              fontSize: 'clamp(60px, 20vw, 220px)',
              lineHeight: 0.8,
              fontFamily: fontFamily || "'Syne', sans-serif",
              textShadow: `0 0 25px ${neonLime}44`
            }}
          >
            {m2}
          </span>
        </div>

        {showSeconds && (
          <div className="flex flex-col justify-end ml-3 font-mono font-bold">
            <span className="text-xl sm:text-3xl" style={{ color: neonLime, opacity: 0.7 }}>
              :{seconds}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Footer: Day name */}
      <div className="w-full flex justify-start items-center">
        <span
          className="font-sans font-bold tracking-wider text-sm sm:text-lg capitalize"
          style={{ color: neonLime, opacity: 0.85 }}
        >
          {dayName}
        </span>
      </div>
    </div>
  );
};
