import React, { useState, useEffect } from 'react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
  isActive: boolean;
}

export const QlocktwoSpanishClock: React.FC<Props> = ({
  colors,
  fontFamily,
  showSeconds
}) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 200);
    return () => clearInterval(timer);
  }, []);

  const bg = colors.bg || '#0b0c10';
  const activeColor = colors.digit || '#ffffff';

  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const ms = now.getMilliseconds();

  // Smooth progress for the ultra-thin second line (0 to 100%)
  const secondProgress = ((s + ms / 1000) / 60) * 100;

  const hoursMap: Record<number, string> = {
    0: 'las doce',
    1: 'la una',
    2: 'las dos',
    3: 'las tres',
    4: 'las cuatro',
    5: 'las cinco',
    6: 'las seis',
    7: 'las siete',
    8: 'las ocho',
    9: 'las nueve',
    10: 'las diez',
    11: 'las once',
    12: 'las doce'
  };

  const nextHoursMap: Record<number, string> = {
    0: 'las una',
    1: 'las dos',
    2: 'las tres',
    3: 'las cuatro',
    4: 'las cinco',
    5: 'las seis',
    6: 'las siete',
    7: 'las ocho',
    8: 'las nueve',
    9: 'las diez',
    10: 'las once',
    11: 'las doce',
    12: 'la una'
  };

  const currentHourNum = h % 12;

  const unitsText = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiún', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];

  // Natural Mexican Spanish phrasing generator
  const getNaturalMexicanTime = (hourNum: number, minutes: number): { line1: string; line2: string } => {
    const currentH = hoursMap[hourNum];
    const nextH = nextHoursMap[hourNum];

    if (minutes === 0) {
      const prefix = hourNum === 1 ? 'es' : 'son';
      return {
        line1: `${prefix} ${currentH}`,
        line2: 'en punto'
      };
    }

    if (minutes === 15) {
      return {
        line1: currentH,
        line2: 'y cuarto'
      };
    }

    if (minutes === 30) {
      return {
        line1: currentH,
        line2: 'y media'
      };
    }

    if (minutes === 45) {
      return {
        line1: 'faltan quince',
        line2: `para ${nextH}`
      };
    }

    if (minutes === 50) {
      return {
        line1: 'faltan diez',
        line2: `para ${nextH}`
      };
    }

    if (minutes === 55) {
      return {
        line1: 'falta cinco',
        line2: `para ${nextH}`
      };
    }

    if (minutes > 30) {
      const rem = 60 - minutes;
      if (rem === 1) {
        return {
          line1: 'falta un minuto',
          line2: `para ${nextH}`
        };
      }
      const remText = unitsText[rem] || rem;
      return {
        line1: `faltan ${remText} minutos`,
        line2: `para ${nextH}`
      };
    }

    if (minutes === 1) {
      return {
        line1: currentH,
        line2: 'con un minuto'
      };
    }

    return {
      line1: currentH,
      line2: `con ${unitsText[minutes] || minutes} minutos`
    };
  };

  const { line1, line2 } = getNaturalMexicanTime(currentHourNum, m);

  // Check if current font is cursive/handwriting to slightly scale up size
  const isCursive = fontFamily?.includes('cursive') || fontFamily?.includes('Pacifico') || fontFamily?.includes('Caveat');

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden select-none"
      style={{ backgroundColor: bg }}
    >
      {/* Central Natural Language Clock Container */}
      <div className="w-full max-w-5xl flex flex-col items-center justify-center text-center my-auto px-4">
        <div 
          className="lowercase tracking-normal transition-all duration-500 font-normal"
          style={{
            fontFamily: fontFamily || "'Pacifico', cursive",
            fontSize: isCursive ? 'clamp(52px, min(16vw, 13vh), 165px)' : 'clamp(44px, min(14vw, 11vh), 140px)',
            color: activeColor,
            textShadow: `0 0 35px ${activeColor}88, 0 0 70px ${activeColor}33`,
            lineHeight: 1.15
          }}
        >
          {line1}
        </div>
        <div 
          className="lowercase tracking-normal mt-2 sm:mt-5 transition-all duration-500 font-normal"
          style={{
            fontFamily: fontFamily || "'Pacifico', cursive",
            fontSize: isCursive ? 'clamp(46px, min(14vw, 11vh), 145px)' : 'clamp(40px, min(12vw, 9.5vh), 120px)',
            color: activeColor,
            textShadow: `0 0 35px ${activeColor}88, 0 0 70px ${activeColor}33`,
            lineHeight: 1.15,
            opacity: 0.95
          }}
        >
          {line2}
        </div>
      </div>

      {/* Ultra-thin second progress line at the very bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10 overflow-hidden">
        <div 
          className="h-full transition-all duration-200 ease-linear"
          style={{
            width: `${secondProgress}%`,
            backgroundColor: activeColor,
            boxShadow: `0 0 10px ${activeColor}`
          }}
        />
      </div>

      {showSeconds && (
        <div className="absolute bottom-4 font-mono text-[11px] sm:text-xs tracking-[0.3em] text-white/50">
          {now.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};
