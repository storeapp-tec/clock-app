import React, { useState, useEffect } from 'react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
  showDate?: boolean;
}

const LCD_SEGMENTS: Record<string, boolean[]> = {
  '0': [true, true, true, true, true, true, false],
  '1': [false, true, true, false, false, false, false],
  '2': [true, true, false, true, true, false, true],
  '3': [true, true, true, true, false, false, true],
  '4': [false, true, true, false, false, true, true],
  '5': [true, false, true, true, false, true, true],
  '6': [true, false, true, true, true, true, true],
  '7': [true, true, true, false, false, false, false],
  '8': [true, true, true, true, true, true, true],
  '9': [true, true, true, true, false, true, true],
  ' ': [false, false, false, false, false, false, false],
  '-': [false, false, false, false, false, false, true]
};

const CasioLcdDigit: React.FC<{
  digit: string;
  activeColor: string;
  ghostColor: string;
  isSmall?: boolean;
}> = ({
  digit,
  activeColor,
  ghostColor,
  isSmall = false
}) => {
  const segs = LCD_SEGMENTS[digit] || LCD_SEGMENTS['8'];

  return (
    <div
      className="relative flex items-center justify-center transform -skew-x-6 select-none flex-shrink-0"
      style={{
        width: isSmall ? 'clamp(18px, 5vh, 40px)' : 'clamp(50px, 14vw, 150px)',
        height: isSmall ? 'clamp(36px, 10vh, 85px)' : 'clamp(100px, 30vh, 280px)'
      }}
    >
      <svg
        viewBox="0 0 100 180"
        className="w-full h-full overflow-visible"
        fill="currentColor"
      >
        <polygon points="18,14 82,14 70,28 30,28" fill={segs[0] ? activeColor : ghostColor} />
        <polygon points="14,18 28,32 28,78 14,90" fill={segs[5] ? activeColor : ghostColor} />
        <polygon points="86,18 86,90 72,78 72,32" fill={segs[1] ? activeColor : ghostColor} />
        <polygon points="20,92 80,92 86,98 80,104 20,104 14,98" fill={segs[6] ? activeColor : ghostColor} />
        <polygon points="14,106 28,118 28,164 14,176" fill={segs[4] ? activeColor : ghostColor} />
        <polygon points="86,106 86,176 72,164 72,118" fill={segs[2] ? activeColor : ghostColor} />
        <polygon points="30,166 70,166 82,180 18,180" fill={segs[3] ? activeColor : ghostColor} />
      </svg>
    </div>
  );
};

export const CasioLcdClock: React.FC<Props> = ({
  hours,
  minutes,
  seconds,
  colors,
  showSeconds,
  showDate = true
}) => {
  const [date, setDate] = useState(new Date());
  const [isLightOn, setIsLightOn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const days = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const currentDayIdx = date.getDay();
  const dateDay = date.getDate().toString().padStart(2, '0');
  const dateMonth = months[date.getMonth()];

  const bg = colors.bg || '#050608';
  
  // EL Backlight colors vs Normal vintage LCD colors
  const lcdBg = isLightOn ? '#22d3ee' : (colors.lcdBg || '#9cb894');
  const lcdDark = isLightOn ? '#042f2e' : (colors.lcdDark || '#0b110a');
  const lcdGhost = isLightOn ? 'rgba(4, 47, 46, 0.18)' : (colors.lcdGhost || 'rgba(11, 17, 10, 0.12)');

  const h1 = hours.padStart(2, '0')[0];
  const h2 = hours.padStart(2, '0')[1];
  const m1 = minutes.padStart(2, '0')[0];
  const m2 = minutes.padStart(2, '0')[1];
  const s1 = seconds.padStart(2, '0')[0];
  const s2 = seconds.padStart(2, '0')[1];

  return (
    <div
      className="w-full h-full flex items-center justify-center p-2 sm:p-3 relative overflow-hidden transition-colors duration-300 select-none font-mono"
      style={{ backgroundColor: bg }}
    >
      {/* Edge-to-Edge Minimal Landscape LCD Panel */}
      <div
        className="w-full max-w-7xl h-full max-h-[92vh] p-3 sm:p-5 rounded-2xl flex flex-col justify-between shadow-2xl relative border border-black/15 transition-all duration-300"
        style={{
          backgroundColor: lcdBg,
          boxShadow: isLightOn
            ? '0 0 50px rgba(34, 211, 238, 0.5), inset 0 0 25px rgba(255, 255, 255, 0.6)'
            : 'inset 0 2px 12px rgba(0, 0, 0, 0.25), inset 0 -2px 8px rgba(255, 255, 255, 0.25)'
        }}
      >
        {/* Top Status Bar: Days + Month/Date + Light Button */}
        {showDate && (
          <div
            className="flex items-center justify-between pb-1.5 border-b flex-shrink-0"
            style={{ borderColor: lcdGhost }}
          >
            <div className="flex items-center gap-1 sm:gap-2.5 font-bold text-xs sm:text-sm">
              {days.map((day, idx) => (
                <span
                  key={day}
                  className={`px-1 py-0.5 rounded ${
                    idx === currentDayIdx ? 'border border-current font-black bg-black/10' : 'opacity-25'
                  }`}
                  style={{ color: lcdDark }}
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm" style={{ color: lcdDark }}>
                <span className="tracking-wider">{dateMonth} {dateDay}</span>
              </div>
              {/* Classic Casio LIGHT Button */}
              <button
                onClick={() => setIsLightOn(!isLightOn)}
                className="px-2.5 py-1 rounded text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-transform active:scale-95 shadow-md border"
                style={{
                  backgroundColor: isLightOn ? '#0e7490' : '#1f2937',
                  color: '#ffffff',
                  borderColor: isLightOn ? '#06b6d4' : '#374151'
                }}
              >
                LIGHT {isLightOn ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        )}

        {/* Central Giant Time Display (Tighter spacing) */}
        <div className="relative flex items-center justify-center gap-1.5 sm:gap-4 my-auto py-1">
          <div className="flex items-center gap-0.5">
            <CasioLcdDigit digit={h1} activeColor={lcdDark} ghostColor={lcdGhost} />
            <CasioLcdDigit digit={h2} activeColor={lcdDark} ghostColor={lcdGhost} />
          </div>

          <div className="flex flex-col gap-4 sm:gap-8 justify-center items-center px-0.5 transform -skew-x-6">
            <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-sm" style={{ backgroundColor: lcdDark }} />
            <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-sm" style={{ backgroundColor: lcdDark }} />
          </div>

          <div className="flex items-center gap-0.5">
            <CasioLcdDigit digit={m1} activeColor={lcdDark} ghostColor={lcdGhost} />
            <CasioLcdDigit digit={m2} activeColor={lcdDark} ghostColor={lcdGhost} />
          </div>

          {showSeconds && (
            <div className="flex items-center gap-0.5 ml-2 sm:ml-4">
              <CasioLcdDigit digit={s1} activeColor={lcdDark} ghostColor={lcdGhost} isSmall />
              <CasioLcdDigit digit={s2} activeColor={lcdDark} ghostColor={lcdGhost} isSmall />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
