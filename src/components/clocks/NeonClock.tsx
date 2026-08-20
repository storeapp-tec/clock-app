import React, { useEffect, useState } from 'react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
  isActive: boolean;
}

export const NeonClock: React.FC<Props> = ({
  hours,
  minutes,
  seconds,
  colors,
  fontFamily,
  showSeconds,
  isActive
}) => {
  const [flickerState, setFlickerState] = useState(0);
  const bg = colors.bg || '#040406';
  const neonColor = colors.neon || '#ff2d55';

  // Authentic periodic subtle neon gas fluctuation
  useEffect(() => {
    if (!isActive) return;

    const triggerFlicker = () => {
      setFlickerState(1);
      setTimeout(() => {
        setFlickerState(2);
        setTimeout(() => {
          setFlickerState(1);
          setTimeout(() => {
            setFlickerState(0);
          }, 50);
        }, 40);
      }, 35);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        triggerFlicker();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive]);

  const opacityLevel = flickerState === 1 ? 0.4 : flickerState === 2 ? 1.25 : 1.0;

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 select-none"
      style={{ backgroundColor: bg }}
    >
      {/* Background Subtle Dark Room Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none" />

      {/* Atmospheric Wall Glow Dispersion */}
      <div
        className="absolute w-[95vw] max-w-6xl h-[65vh] rounded-full blur-[120px] pointer-events-none transition-all duration-300"
        style={{
          backgroundColor: neonColor,
          opacity: flickerState === 1 ? 0.12 : 0.25
        }}
      />

      {/* Optional Glowing Neon Seconds Floating Badge (Non-distorting) */}
      {showSeconds && (
        <div
          className="absolute top-8 right-8 sm:top-10 sm:right-10 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border backdrop-blur-sm"
          style={{
            borderColor: neonColor,
            boxShadow: `0 0 15px ${neonColor}66, inset 0 0 10px ${neonColor}33`
          }}
        >
          <div
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: neonColor, boxShadow: `0 0 8px ${neonColor}` }}
          />
          <span
            className="font-mono font-bold text-sm sm:text-lg text-white"
            style={{
              textShadow: `0 0 8px ${neonColor}, 0 0 16px ${neonColor}`
            }}
          >
            {seconds}s
          </span>
        </div>
      )}

      {/* Floating Borderless Neon Tubes Time Display */}
      <div
        className="relative z-10 flex items-center justify-center select-none font-normal tracking-wide transition-opacity duration-75 mb-10 sm:mb-12"
        style={{
          fontFamily,
          opacity: opacityLevel
        }}
      >
        {/* Hours */}
        <span
          className="transition-colors duration-300 inline-block transform hover:scale-105 transition-transform"
          style={{
            color: '#ffffff',
            fontSize: 'clamp(95px, 46vh, 380px)',
            lineHeight: 0.85,
            textShadow: `
              0 0 4px #ffffff,
              0 0 10px #ffffff,
              0 0 20px ${neonColor},
              0 0 40px ${neonColor},
              0 0 80px ${neonColor},
              0 0 120px ${neonColor}dd,
              0 0 160px ${neonColor}88
            `,
            WebkitTextStroke: `1.5px ${neonColor}`
          }}
        >
          {hours}
        </span>

        {/* Neon Colon Dots */}
        <span
          className="mx-3 sm:mx-8 transition-colors duration-300 inline-block font-sans animate-pulse"
          style={{
            color: '#ffffff',
            fontSize: 'clamp(70px, 34vh, 280px)',
            lineHeight: 0.85,
            textShadow: `
              0 0 4px #ffffff,
              0 0 12px ${neonColor},
              0 0 30px ${neonColor},
              0 0 60px ${neonColor},
              0 0 100px ${neonColor}
            `
          }}
        >
          :
        </span>

        {/* Minutes */}
        <span
          className="transition-colors duration-300 inline-block transform hover:scale-105 transition-transform"
          style={{
            color: '#ffffff',
            fontSize: 'clamp(95px, 46vh, 380px)',
            lineHeight: 0.85,
            textShadow: `
              0 0 4px #ffffff,
              0 0 10px #ffffff,
              0 0 20px ${neonColor},
              0 0 40px ${neonColor},
              0 0 80px ${neonColor},
              0 0 120px ${neonColor}dd,
              0 0 160px ${neonColor}88
            `,
            WebkitTextStroke: `1.5px ${neonColor}`
          }}
        >
          {minutes}
        </span>
      </div>
    </div>
  );
};
