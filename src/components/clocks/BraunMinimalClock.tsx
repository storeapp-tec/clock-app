import React, { useState, useEffect } from 'react';
import { Bell, Thermometer } from 'lucide-react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
}

export const BraunMinimalClock: React.FC<Props> = ({
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

  const days = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const jsDay = date.getDay();
  const currentDayIdx = jsDay === 0 ? 6 : jsDay - 1;
  const currentMonth = months[date.getMonth()];

  const bg = colors.bg || '#090a0f';
  const panelBg = colors.casing || '#121318';
  const digitColor = colors.digit || '#ffffff';
  const greenAccent = colors.green || '#00ff66';

  return (
    <div
      className="w-full h-full flex items-center justify-center p-4 sm:p-8 relative overflow-hidden transition-colors duration-300 select-none font-mono"
      style={{ backgroundColor: bg }}
    >
      {/* Immersive 21:9 Landscape Panel */}
      <div
        className="w-full max-w-7xl h-full max-h-[92vh] p-6 sm:p-10 rounded-3xl flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.9)] border border-white/10 relative"
        style={{
          backgroundColor: panelBg,
          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.6) 100%)'
        }}
      >
        {/* Top Section: Days of the week horizontally + Day Number & Month below */}
        <div className="flex flex-col items-center gap-1.5 pt-2">
          <div className="flex items-center gap-2 sm:gap-4">
            {days.map((day, idx) => {
              const isActive = idx === currentDayIdx;
              return (
                <div
                  key={day}
                  className={`px-3 py-1 rounded text-xs sm:text-sm font-bold tracking-widest transition-all duration-300 ${
                    isActive ? 'scale-105 shadow-md' : 'opacity-30'
                  }`}
                  style={{
                    color: isActive ? greenAccent : digitColor,
                    backgroundColor: isActive ? 'rgba(0,255,102,0.1)' : 'transparent',
                    border: isActive ? `1px solid ${greenAccent}55` : '1px solid transparent'
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-sm sm:text-lg font-mono font-black"
              style={{ color: digitColor }}
            >
              {date.getDate()}
            </span>
            <span
              className="text-xs sm:text-sm font-sans tracking-[0.3em] font-bold uppercase opacity-80"
              style={{ color: greenAccent }}
            >
              {currentMonth}
            </span>
          </div>
        </div>

        {/* Center: Giant White Time Digits */}
        <div className="flex-1 flex items-center justify-center gap-4 sm:gap-8 my-auto">
          <span
            className="font-black tracking-tighter"
            style={{
              color: digitColor,
              fontSize: 'clamp(70px, 22vw, 240px)',
              lineHeight: 0.8,
              fontFamily: fontFamily || "'Orbitron', sans-serif",
              textShadow: '0 0 30px rgba(255,255,255,0.2)'
            }}
          >
            {hours}
          </span>

          <span
            className="animate-pulse font-light"
            style={{
              color: greenAccent,
              fontSize: 'clamp(50px, 18vw, 190px)',
              lineHeight: 0.8,
              textShadow: `0 0 20px ${greenAccent}`
            }}
          >
            :
          </span>

          <span
            className="font-black tracking-tighter"
            style={{
              color: digitColor,
              fontSize: 'clamp(70px, 22vw, 240px)',
              lineHeight: 0.8,
              fontFamily: fontFamily || "'Orbitron', sans-serif",
              textShadow: '0 0 30px rgba(255,255,255,0.2)'
            }}
          >
            {minutes}
          </span>
        </div>

        {/* Bottom Section: Temperature & Seconds */}
        <div className="w-full flex items-center justify-between pb-2 px-4">
          <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-2xl border border-white/10">
            <Thermometer className="w-4 h-4 text-amber-400" />
            <span
              className="text-lg sm:text-2xl font-black font-mono"
              style={{ color: greenAccent, textShadow: `0 0 15px ${greenAccent}66` }}
            >
              22°C
            </span>
          </div>

          {showSeconds && (
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-2xl border border-white/10 font-mono">
              <span className="text-xs text-zinc-400 uppercase font-sans">SEG</span>
              <span
                className="text-lg sm:text-2xl font-black"
                style={{ color: greenAccent, textShadow: `0 0 15px ${greenAccent}55` }}
              >
                {seconds}s
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
