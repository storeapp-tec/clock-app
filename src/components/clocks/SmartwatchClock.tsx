import React, { useState, useEffect } from 'react';
import { Heart, Zap, Navigation, CloudSun, Footprints } from 'lucide-react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
}

export const SmartwatchClock: React.FC<Props> = ({
  hours,
  minutes,
  seconds,
  colors,
  fontFamily,
  showSeconds
}) => {
  const [bpm, setBpm] = useState(72);
  const [secProgress, setSecProgress] = useState(0);

  const bg = colors.bg || '#000000';
  const timeColor = colors.time || '#ffffff';
  const ringAct = colors.ringActivity || '#ff2453';
  const ringExe = colors.ringExercise || '#a3e635';
  const ringStd = colors.ringStand || '#00f2fe';
  const accentColor = colors.accent || '#38bdf8';

  // Subtle simulated pulse fluctuation for authenticity
  useEffect(() => {
    const s = parseInt(seconds, 10) || 0;
    setSecProgress((s / 60) * 100);

    const interval = setInterval(() => {
      setBpm(Math.floor(70 + Math.random() * 6));
    }, 4000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div
      className="w-full h-full flex items-center justify-center p-3 sm:p-6 md:p-8 relative overflow-hidden transition-colors duration-300 select-none"
      style={{ backgroundColor: bg }}
    >
      {/* Subtle OLED ambient glow in the center */}
      <div
        className="absolute w-[80vw] max-w-4xl h-[60vh] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: accentColor }}
      />

      {/* Borderless Edge-to-Edge Layout */}
      <div
        className="relative w-full max-w-7xl h-full max-h-[92vh] flex flex-col justify-between"
      >
        {/* Top Status Bar: Weather + Battery + Optional Seconds Ring */}
        <div className="w-full flex items-center justify-between px-2 sm:px-4 pb-2 border-b border-white/5 flex-shrink-0">
          {/* Weather Widget */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-300">
            <CloudSun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            <span>24°C</span>
            <span className="text-[10px] sm:text-xs text-neutral-500 hidden sm:inline">Despejado</span>
          </div>

          {/* Optional Floating Seconds Complication Widget */}
          {showSeconds && (
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 shadow-inner"
              style={{ color: accentColor }}
            >
              <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
              <span className="font-mono font-bold text-xs sm:text-sm tracking-wider">
                {seconds}s
              </span>
            </div>
          )}

          {/* Battery Status Complication */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-300">
            <span className="text-[11px] sm:text-xs text-neutral-400 font-mono">92%</span>
            <div className="flex items-center text-emerald-400">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-emerald-400" />
            </div>
          </div>
        </div>

        {/* Main Central Watch Face Body */}
        <div className="flex items-center justify-between gap-3 sm:gap-6 py-2 sm:py-4 flex-1">
          {/* Left Complication: Distance Traveled Widget */}
          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex-shrink-0">
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-white/10 bg-black/40">
              <div className="flex flex-col items-center justify-center">
                <Navigation
                  className="w-5 h-5 sm:w-7 sm:h-7 text-sky-400"
                />
                <span className="font-mono font-black text-xs sm:text-lg text-white mt-1">
                  5.4
                </span>
                <span className="text-[8px] sm:text-[10px] text-sky-300 font-semibold uppercase">
                  KM
                </span>
              </div>
            </div>
            <span className="text-[9px] sm:text-xs font-bold text-neutral-400 mt-2 uppercase tracking-wider">
              DISTANCIA
            </span>
          </div>

          {/* Central Main Time Digits */}
          <div className="flex items-center justify-center font-black tracking-tight select-none flex-1">
            <span
              className="transition-colors duration-300"
              style={{
                fontFamily,
                color: timeColor,
                fontSize: 'clamp(85px, 34vh, 260px)',
                lineHeight: 0.82
              }}
            >
              {hours}
            </span>

            <span
              className="mx-1 sm:mx-3 transition-colors duration-300 animate-pulse font-sans"
              style={{
                color: accentColor,
                fontSize: 'clamp(60px, 26vh, 180px)',
                lineHeight: 0.82
              }}
            >
              :
            </span>

            <span
              className="transition-colors duration-300"
              style={{
                fontFamily,
                color: timeColor,
                fontSize: 'clamp(85px, 34vh, 260px)',
                lineHeight: 0.82
              }}
            >
              {minutes}
            </span>
          </div>

          {/* Right Complication: Live Heart Rate Gauge */}
          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex-shrink-0">
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-white/10 bg-black/40">
              <div className="flex flex-col items-center justify-center">
                <Heart
                  className="w-5 h-5 sm:w-7 sm:h-7 text-rose-500 fill-rose-500 animate-pulse"
                  style={{ animationDuration: '0.8s' }}
                />
                <span className="font-mono font-black text-xs sm:text-lg text-white mt-0.5">
                  {bpm}
                </span>
                <span className="text-[8px] sm:text-[10px] text-rose-400 font-semibold uppercase">
                  BPM
                </span>
              </div>
            </div>
            <span className="text-[9px] sm:text-xs font-bold text-neutral-400 mt-2 uppercase tracking-wider">
              PULSO
            </span>
          </div>
        </div>

        {/* Bottom Complications Row: Steps + Activity Metrics */}
        <div className="w-full flex items-center justify-between px-2 sm:px-4 pt-2 border-t border-white/5 flex-shrink-0 text-xs sm:text-sm font-semibold">
          {/* Steps */}
          <div className="flex items-center gap-1.5 text-neutral-300">
            <Footprints className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="font-mono font-bold">8,420</span>
            <span className="text-[10px] sm:text-xs text-neutral-500 hidden sm:inline">pasos hoy</span>
          </div>

          {/* Smart Ring Live Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ringExe }} />
            <span className="text-[10px] sm:text-xs text-neutral-400 font-medium uppercase tracking-wider">
              ACTIVO • 32 MIN
            </span>
          </div>

          {/* Goal % */}
          <div className="flex items-center gap-1.5" style={{ color: ringAct }}>
            <span className="font-mono font-bold text-xs sm:text-sm">96%</span>
            <span className="text-[10px] sm:text-xs text-neutral-500 hidden sm:inline">Meta Diaria</span>
          </div>
        </div>
      </div>
    </div>
  );
};
