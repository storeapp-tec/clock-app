import React from 'react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
}

export const DualDepthClock: React.FC<Props> = ({
  hours,
  minutes,
  seconds,
  colors,
  fontFamily,
  showSeconds
}) => {
  const bgL = colors.bgL || '#000000';
  const bgR = colors.bgR || '#ffffff';
  const textL = bgR; // Contrast pairing
  const textR = bgL;
  const sepColor = colors.sep || '#ff2d55';
  const shadowColor = colors.shadow || '#64748b';

  return (
    <div
      className="w-full h-full flex flex-row relative overflow-hidden select-none"
      style={{ fontFamily }}
    >
      {/* Left Screen (Hours) */}
      <div
        className="w-1/2 h-full flex items-center justify-center transition-colors duration-300 relative"
        style={{
          backgroundColor: bgL,
          perspective: '1200px'
        }}
      >
        <div
          className="font-black leading-none tracking-tight transition-all duration-300"
          style={{
            color: textL,
            fontSize: 'clamp(80px, 38vh, 320px)',
            transform: 'rotateX(12deg)',
            textShadow: `0 1.5vh 0 ${shadowColor}`
          }}
        >
          {hours}
        </div>
      </div>

      {/* Center 3D Floating Colon */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 font-black pointer-events-none animate-pulse"
        style={{
          color: sepColor,
          fontSize: 'clamp(50px, 25vh, 200px)',
          textShadow: `0 1vh 0 rgba(0,0,0,0.5)`
        }}
      >
        :
      </div>

      {/* Right Screen (Minutes) */}
      <div
        className="w-1/2 h-full flex items-center justify-center transition-colors duration-300 relative"
        style={{
          backgroundColor: bgR,
          perspective: '1200px'
        }}
      >
        <div
          className="font-black leading-none tracking-tight transition-all duration-300"
          style={{
            color: textR,
            fontSize: 'clamp(80px, 38vh, 320px)',
            transform: 'rotateX(12deg)',
            textShadow: `0 1.5vh 0 ${shadowColor}`
          }}
        >
          {minutes}
        </div>

        {showSeconds && (
          <div
            className="absolute top-8 right-8 font-mono font-bold text-xs sm:text-base px-3 py-1.5 rounded-lg opacity-90 shadow-md transition-all z-20"
            style={{
              backgroundColor: textR,
              color: bgR
            }}
          >
            {seconds}s
          </div>
        )}
      </div>
    </div>
  );
};
