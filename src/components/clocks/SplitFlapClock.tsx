import React, { useEffect, useState } from 'react';

interface DigitFlipProps {
  digit: string;
  boxBg: string;
  digitsColor: string;
  dividerColor: string;
  fontFamily: string;
  secondsTick: string; // changes every second to trigger continuous falling tick rhythm
}

// Mechanical Split Flap card with upper leaf falling downwards and bottom leaf unfolding downwards
const MechanicalFlapCard: React.FC<DigitFlipProps> = ({
  digit,
  boxBg,
  digitsColor,
  dividerColor,
  fontFamily,
  secondsTick
}) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [prevDigit, setPrevDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  // Trigger flip animation whenever the digit changes OR on the per-second drop tick
  useEffect(() => {
    setPrevDigit(currentDigit);
    setCurrentDigit(digit);
    setIsFlipping(true);

    const timer = setTimeout(() => {
      setIsFlipping(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [digit, secondsTick]);

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      style={{
        width: 'clamp(60px, 18vw, 190px)',
        height: 'clamp(130px, 46vh, 380px)',
        perspective: '1200px'
      }}
    >
      {/* Side Hinge Brackets */}
      <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-7 rounded-sm bg-neutral-900 border border-neutral-600 z-40 shadow-md flex items-center justify-center">
        <div className="w-1.5 h-2.5 rounded-full bg-neutral-400" />
      </div>
      <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-7 rounded-sm bg-neutral-900 border border-neutral-600 z-40 shadow-md flex items-center justify-center">
        <div className="w-1.5 h-2.5 rounded-full bg-neutral-400" />
      </div>

      {/* 1. TOP STATIC LEAF (Shows the current/new top half behind the falling flap) */}
      <div
        className="absolute top-0 inset-x-0 h-1/2 rounded-t-2xl sm:rounded-t-3xl overflow-hidden flex items-end justify-center border-t-2 border-x-2 border-white/10"
        style={{
          backgroundColor: boxBg,
          boxShadow: 'inset 0 6px 14px rgba(255,255,255,0.08)'
        }}
      >
        <span
          className="font-black leading-none translate-y-1/2"
          style={{
            fontFamily,
            color: digitsColor,
            fontSize: 'clamp(85px, 34vh, 300px)'
          }}
        >
          {currentDigit}
        </span>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* 2. BOTTOM STATIC LEAF (Shows bottom half) */}
      <div
        className="absolute bottom-0 inset-x-0 h-1/2 rounded-b-2xl sm:rounded-b-3xl overflow-hidden flex items-start justify-center border-b-2 border-x-2 border-white/10"
        style={{
          backgroundColor: boxBg,
          boxShadow: 'inset 0 -6px 14px rgba(0,0,0,0.6)'
        }}
      >
        <span
          className="font-black leading-none -translate-y-1/2"
          style={{
            fontFamily,
            color: digitsColor,
            fontSize: 'clamp(85px, 34vh, 300px)'
          }}
        >
          {isFlipping ? prevDigit : currentDigit}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* 3. FLIPPING LEAVES (Continuous falling downward mechanical motion) */}
      {isFlipping && (
        <>
          {/* Top Flap falling down */}
          <div
            key={`top-${secondsTick}-${digit}`}
            className="absolute top-0 inset-x-0 h-1/2 rounded-t-2xl sm:rounded-t-3xl overflow-hidden flex items-end justify-center z-30 origin-bottom border-t-2 border-x-2 border-white/10"
            style={{
              backgroundColor: boxBg,
              animation: 'flapFallingTop 0.28s cubic-bezier(0.4, 0, 0.9, 0.4) forwards',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
          >
            <span
              className="font-black leading-none translate-y-1/2"
              style={{
                fontFamily,
                color: digitsColor,
                fontSize: 'clamp(85px, 34vh, 300px)'
              }}
            >
              {prevDigit}
            </span>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70 pointer-events-none" />
          </div>

          {/* Bottom Flap landing downward */}
          <div
            key={`bottom-${secondsTick}-${digit}`}
            className="absolute bottom-0 inset-x-0 h-1/2 rounded-b-2xl sm:rounded-b-3xl overflow-hidden flex items-start justify-center z-30 origin-top border-b-2 border-x-2 border-white/10"
            style={{
              backgroundColor: boxBg,
              animation: 'flapFallingBottom 0.3s 0.26s cubic-bezier(0.15, 0.85, 0.35, 1) forwards',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(90deg)',
              backfaceVisibility: 'hidden'
            }}
          >
            <span
              className="font-black leading-none -translate-y-1/2"
              style={{
                fontFamily,
                color: digitsColor,
                fontSize: 'clamp(85px, 34vh, 300px)'
              }}
            >
              {currentDigit}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/35 pointer-events-none" />
          </div>
        </>
      )}

      {/* Center Division Seam Line */}
      <div
        className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 z-35 pointer-events-none"
        style={{
          backgroundColor: dividerColor,
          boxShadow: '0 1px 3px rgba(0,0,0,0.8)'
        }}
      />
    </div>
  );
};

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
}

export const SplitFlapClock: React.FC<Props> = ({
  hours,
  minutes,
  seconds,
  colors,
  fontFamily,
  showSeconds
}) => {
  const bg = colors.bg || '#0a0a0a';
  const boxBg = colors.box || '#18181b';
  const digitsColor = colors.digits || '#ffffff';
  const sepColor = colors.sep || '#ffffff';
  const dividerColor = colors.divider || '#09090b';

  const h1 = hours.padStart(2, '0')[0];
  const h2 = hours.padStart(2, '0')[1];
  const m1 = minutes.padStart(2, '0')[0];
  const m2 = minutes.padStart(2, '0')[1];

  return (
    <div
      className="w-full h-full flex items-center justify-center p-3 sm:p-6 md:p-8 transition-colors duration-300 relative select-none overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Split Flap 3D Gravity Rotation Animations */}
      <style>{`
        @keyframes flapFallingTop {
          0% {
            transform: rotateX(0deg);
            filter: brightness(1);
          }
          100% {
            transform: rotateX(-90deg);
            filter: brightness(0.55);
          }
        }
        @keyframes flapFallingBottom {
          0% {
            transform: rotateX(90deg);
            filter: brightness(0.65);
          }
          100% {
            transform: rotateX(0deg);
            filter: brightness(1);
          }
        }
      `}</style>

      {/* Dark Studio Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.92)_100%)] pointer-events-none" />

      {/* Borderless Edge-to-Edge Layout */}
      <div
        className="relative flex items-center justify-center gap-3 sm:gap-6 md:gap-10 transition-all duration-300 select-none"
      >
        {/* Floating Mechanical Seconds Tag (Non-distorting) */}
        {showSeconds && (
          <div className="absolute top-4 sm:top-6 right-6 sm:right-10 flex items-center gap-2 px-3 py-1 rounded-lg bg-black/60 border border-white/10 shadow-inner">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
              SEC
            </span>
            <span
              className="text-xs sm:text-base font-black font-mono"
              style={{ color: sepColor }}
            >
              {seconds}
            </span>
          </div>
        )}

        {/* Hours Pair (Cards 1 & 2) */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <MechanicalFlapCard
            digit={h1}
            boxBg={boxBg}
            digitsColor={digitsColor}
            dividerColor={dividerColor}
            fontFamily={fontFamily}
            secondsTick={seconds}
          />
          <MechanicalFlapCard
            digit={h2}
            boxBg={boxBg}
            digitsColor={digitsColor}
            dividerColor={dividerColor}
            fontFamily={fontFamily}
            secondsTick={seconds}
          />
        </div>

        {/* Center Colon Separator Dots */}
        <div className="flex flex-col gap-5 sm:gap-8 justify-center items-center px-1 sm:px-2">
          <div
            className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full shadow-lg transition-colors duration-300"
            style={{
              backgroundColor: sepColor,
              boxShadow: `0 0 10px ${sepColor}66`
            }}
          />
          <div
            className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full shadow-lg transition-colors duration-300"
            style={{
              backgroundColor: sepColor,
              boxShadow: `0 0 10px ${sepColor}66`
            }}
          />
        </div>

        {/* Minutes Pair (Cards 3 & 4) */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <MechanicalFlapCard
            digit={m1}
            boxBg={boxBg}
            digitsColor={digitsColor}
            dividerColor={dividerColor}
            fontFamily={fontFamily}
            secondsTick={seconds}
          />
          <MechanicalFlapCard
            digit={m2}
            boxBg={boxBg}
            digitsColor={digitsColor}
            dividerColor={dividerColor}
            fontFamily={fontFamily}
            secondsTick={seconds}
          />
        </div>
      </div>
    </div>
  );
};
