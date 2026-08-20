import React, { useEffect, useRef } from 'react';

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  colors: Record<string, string>;
  fontFamily: string;
  showSeconds: boolean;
  isActive: boolean;
}

export const MatrixClock: React.FC<Props> = ({
  hours,
  minutes,
  seconds,
  colors,
  fontFamily,
  showSeconds,
  isActive
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bg = colors.bg || '#000000';
  const digitColor = colors.digit || '#00ff41';

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const columns = Math.floor(width / 22);
    const drops = Array(columns).fill(1);
    const chars = '0123456789ABCDEF010101ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'.split('');

    let frameCount = 0;
    const render = () => {
      frameCount++;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = digitColor;
      ctx.font = '16px monospace';

      // Update drops every 2 frames for a slower, graceful Matrix rain
      if (frameCount % 2 === 0) {
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * 22;
          const y = drops[i] * 22;

          ctx.fillText(text, x, y);

          if (y > height && Math.random() > 0.985) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive, digitColor]);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 select-none"
      style={{ backgroundColor: bg, fontFamily }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-45 pointer-events-none"
      />

      {/* Optional Matrix Cyber Stream Seconds Telemetry (Non-distorting) */}
      {showSeconds && (
        <div className="absolute top-8 right-8 sm:top-10 sm:right-10 z-20 flex items-center gap-2 px-3 py-1.5 rounded border border-[#00ff41]/40 bg-black/70 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.2)]">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-[#00ff41]/60 tracking-wider">
            SEC_T+
          </span>
          <span
            className="text-sm sm:text-lg font-mono font-black text-[#00ff41]"
            style={{ textShadow: `0 0 10px ${digitColor}` }}
          >
            {seconds}s
          </span>
        </div>
      )}

      <div className="relative z-10 flex items-center justify-center tracking-widest font-black select-none mb-10 sm:mb-12">
        <span
          className="transition-colors duration-300"
          style={{
            WebkitTextStroke: `2.5px ${digitColor}`,
            color: 'transparent',
            fontSize: 'clamp(85px, 44vh, 360px)',
            lineHeight: 0.8,
            filter: `drop-shadow(0 0 16px ${digitColor}88)`
          }}
        >
          {hours}
        </span>

        <span
          className="mx-2 sm:mx-6 animate-pulse transition-colors duration-300"
          style={{
            WebkitTextStroke: `2.5px ${digitColor}`,
            color: 'transparent',
            fontSize: 'clamp(60px, 32vh, 260px)',
            lineHeight: 0.8
          }}
        >
          :
        </span>

        <span
          className="transition-colors duration-300"
          style={{
            WebkitTextStroke: `2.5px ${digitColor}`,
            color: 'transparent',
            fontSize: 'clamp(85px, 44vh, 360px)',
            lineHeight: 0.8,
            filter: `drop-shadow(0 0 16px ${digitColor}88)`
          }}
        >
          {minutes}
        </span>
      </div>
    </div>
  );
};
