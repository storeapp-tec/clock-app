import React, { useState, useEffect } from 'react';
import { Lock, Wifi, BatteryCharging, Camera, Flashlight } from 'lucide-react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
}

export const ZenithSolarClock: React.FC<Props> = ({
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

  const daysList = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthsList = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
  const dayName = daysList[date.getDay()];
  const dayNum = date.getDate();
  const monthName = monthsList[date.getMonth()];

  return (
    <div
      className="w-full h-full flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden select-none font-sans"
      style={{
        backgroundColor: '#030712',
        backgroundImage: `
          radial-gradient(circle at 50% 25%, rgba(29, 78, 216, 0.45) 0%, rgba(3, 7, 18, 0.9) 60%),
          radial-gradient(circle at 30% 70%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.25) 0%, transparent 50%)
        `
      }}
    >
      {/* Landscape Top Status Bar with Dynamic Island Notch */}
      <div className="w-full flex items-center justify-between px-4 sm:px-10 pt-1 z-20 text-white text-xs sm:text-sm font-semibold tracking-wide">
        <div className="flex items-center gap-2">
          <span>AT&T</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10">5G</span>
        </div>

        {/* Dynamic Island Notch (Centered at Top for Landscape StandBy) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-2 bg-black h-7 sm:h-8 w-32 sm:w-40 rounded-full flex items-center justify-between px-3 shadow-xl border border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-900/40 border border-blue-500/30 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
          </div>
          <Lock className="w-3.5 h-3.5 text-zinc-400" />
          <div className="w-3 h-3 rounded-full bg-zinc-900" />
        </div>

        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          <div className="flex items-center gap-1 font-mono">
            <span>95%</span>
            <BatteryCharging className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Landscape Center Content (Date + Giant StandBy Time) */}
      <div className="flex flex-col items-center justify-center my-auto z-10 py-4">
        {/* Date Display in Spanish */}
        <div className="text-white/90 text-sm sm:text-xl font-medium tracking-wide mb-1 drop-shadow-md capitalize">
          {dayName}, {dayNum} de {monthName}
        </div>

        {/* Giant Landscape iOS StandBy Time Display */}
        <div
          className="flex items-center font-bold tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          style={{
            fontFamily: fontFamily || "system-ui, -apple-system, sans-serif",
            fontSize: 'clamp(90px, 30vw, 340px)',
            lineHeight: 0.92,
            color: '#f8fafc'
          }}
        >
          <span>{hours}</span>
          <span className="animate-pulse mx-2 sm:mx-4 text-white/80">:</span>
          <span>{minutes}</span>
        </div>

        {showSeconds && (
          <div className="mt-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 font-mono text-xs sm:text-sm tracking-widest border border-white/15">
            SEGUNDOS : {seconds}
          </div>
        )}
      </div>

      {/* Landscape Bottom Bar (Shortcuts placed cleanly at bottom-left and bottom-right for landscape mode) */}
      <div className="w-full flex items-center justify-between px-6 sm:px-12 pb-2 z-20">
        <div className="w-10 h-10 rounded-full bg-black/55 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white/90 shadow-xl cursor-pointer hover:bg-black/70 transition-all">
          <Flashlight className="w-4 h-4" />
        </div>

        {/* Landscape Home Indicator Bar */}
        <div className="w-36 sm:w-48 h-1 bg-white/50 rounded-full shadow-md" />

        <div className="w-10 h-10 rounded-full bg-black/55 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white/90 shadow-xl cursor-pointer hover:bg-black/70 transition-all">
          <Camera className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
