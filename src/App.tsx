import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Settings } from 'lucide-react';
import { ClockDesignId, ClockConfigState } from './types';
import { CLOCK_DESIGNS, STORAGE_KEY_CONFIG } from './constants/clockDesigns';
import { SplitFlapClock } from './components/clocks/SplitFlapClock';
import { CyberClock } from './components/clocks/CyberClock';
import { BauhausClock } from './components/clocks/BauhausClock';
import { MonospaceClock } from './components/clocks/MonospaceClock';
import { NeoBrutalClock } from './components/clocks/NeoBrutalClock';
import { DualDepthClock } from './components/clocks/DualDepthClock';
import { BraunMinimalClock } from './components/clocks/BraunMinimalClock';
import { AuroraFluidClock } from './components/clocks/AuroraFluidClock';
import { ZenithSolarClock } from './components/clocks/ZenithSolarClock';
import { SmartwatchClock } from './components/clocks/SmartwatchClock';
import { QlocktwoSpanishClock } from './components/clocks/QlocktwoSpanishClock';
import { NeonClock } from './components/clocks/NeonClock';
import { CasioLcdClock } from './components/clocks/CasioLcdClock';
import { DateBadge } from './components/DateBadge';
import { PaginationPill } from './components/PaginationPill';
import { SettingsDrawer } from './components/SettingsDrawer';
import { StartOverlay } from './components/StartOverlay';

const DEFAULT_CONFIG: ClockConfigState = {
  currentDesign: 1,
  is12h: false,
  showDate: true,
  showSeconds: true,
  brightness: 1.0,
  keepAwake: true,
  designColors: CLOCK_DESIGNS.reduce((acc, d) => ({ ...acc, [d.id]: { ...d.defaultColors } }), {}),
  designFonts: CLOCK_DESIGNS.reduce((acc, d) => ({ ...acc, [d.id]: d.defaultFont || '' }), {})
};

export default function App() {
  // Load config from localStorage
  const [config, setConfig] = useState<ClockConfigState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          designColors: {
            ...DEFAULT_CONFIG.designColors,
            ...(parsed.designColors || {})
          },
          designFonts: {
            ...DEFAULT_CONFIG.designFonts,
            ...(parsed.designFonts || {})
          }
        };
      }
    } catch (e) {
      console.error('Failed to load clock config from localStorage:', e);
    }
    return DEFAULT_CONFIG;
  });

  const [hasStarted, setHasStarted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uiVisible, setUiVisible] = useState(true);

  // Time state
  const [time, setTime] = useState(new Date());

  const sliderRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wakeLockRef = useRef<any>(null);

  // Persist config to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save clock config:', e);
    }
  }, [config]);

  // Keep screen awake using WakeLock API
  useEffect(() => {
    let released = false;

    const requestWakeLock = async () => {
      if ('wakeLock' in navigator && config.keepAwake && document.visibilityState === 'visible') {
        try {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        } catch (err) {
          console.warn('Wake Lock error:', err);
        }
      }
    };

    if (config.keepAwake) {
      requestWakeLock();
    } else if (wakeLockRef.current) {
      wakeLockRef.current.release().catch(() => {});
      wakeLockRef.current = null;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && config.keepAwake) {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      released = true;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
      }
    };
  }, [config.keepAwake]);

  // Real-time clock interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 250);
    return () => clearInterval(timer);
  }, []);

  // UI Auto-Hide behavior: show on user interaction, hide after 2.2s
  const showUI = useCallback(() => {
    setUiVisible(true);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    if (!isSettingsOpen) {
      hideTimerRef.current = setTimeout(() => {
        setUiVisible(false);
      }, 2200);
    }
  }, [isSettingsOpen]);

  useEffect(() => {
    showUI();
  }, [config.currentDesign, showUI]);

  // Scroll into initial design when mounted or changed
  useEffect(() => {
    if (sliderRef.current) {
      const targetIndex = config.currentDesign - 1;
      const width = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: targetIndex * width,
        behavior: 'auto'
      });
    }
  }, []);

  // Listen to slider scroll events with debounce to identify current visible design
  const handleScroll = () => {
    showUI();
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const width = sliderRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    const newDesignId = (newIndex + 1) as ClockDesignId;
    if (newDesignId >= 1 && newDesignId <= 10 && newDesignId !== config.currentDesign) {
      setConfig((prev) => ({ ...prev, currentDesign: newDesignId }));
    }
  };

  const scrollToDesign = (designId: number, smooth = true) => {
    if (!sliderRef.current) return;
    const index = designId - 1;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollTo({
      left: index * width,
      behavior: smooth ? 'smooth' : 'auto'
    });
    setConfig((prev) => ({ ...prev, currentDesign: designId as ClockDesignId }));
  };

  const handleStart = () => {
    setHasStarted(true);
    showUI();
    // Request fullscreen on user gesture
    toggleFullscreen();
  };

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      const rfs =
        elem.requestFullscreen ||
        (elem as any).webkitRequestFullScreen ||
        (elem as any).mozRequestFullScreen ||
        (elem as any).msRequestFullscreen;
      if (rfs) {
        rfs.call(elem).then(() => setIsFullscreen(true)).catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  // Format hours, minutes, seconds & date
  let hoursNum = time.getHours();
  const minutesStr = String(time.getMinutes()).padStart(2, '0');
  const secondsStr = String(time.getSeconds()).padStart(2, '0');

  let ampm: string | null = null;
  if (config.is12h) {
    ampm = hoursNum >= 12 ? 'PM' : 'AM';
    hoursNum = hoursNum % 12 || 12;
  }
  const hoursStr = String(hoursNum).padStart(2, '0');

  const dateString = time.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const activeDesignDef =
    CLOCK_DESIGNS.find((d) => d.id === config.currentDesign) || CLOCK_DESIGNS[0];

  const handleResetCurrentDesign = () => {
    setConfig((prev) => ({
      ...prev,
      designColors: {
        ...prev.designColors,
        [activeDesignDef.id]: { ...activeDesignDef.defaultColors }
      },
      designFonts: {
        ...prev.designFonts,
        [activeDesignDef.id]: activeDesignDef.defaultFont || ''
      }
    }));
  };

  const handleResetAll = () => {
    if (window.confirm('¿Deseas restablecer todos los 10 relojes a sus colores y tipografías originales?')) {
      setConfig({
        ...DEFAULT_CONFIG,
        currentDesign: config.currentDesign
      });
    }
  };

  // Resolve active font family for current design
  const getFontFamily = (designId: number) => {
    const def = CLOCK_DESIGNS.find((d) => d.id === designId);
    if (!def || !def.fontOptions) return undefined;
    const selectedFontId = config.designFonts[designId] || def.defaultFont;
    const fontOpt = def.fontOptions.find((f) => f.id === selectedFontId);
    return fontOpt ? fontOpt.fontFamily : undefined;
  };

  return (
    <div
      id="studio-clock-app"
      className="relative w-screen h-screen overflow-hidden bg-black text-white select-none"
      onMouseMove={showUI}
      onTouchStart={showUI}
      onClick={showUI}
    >
      {/* Start Onboarding overlay */}
      <StartOverlay isOpen={!hasStarted} onStart={handleStart} />

      {/* Date Header Badge */}
      <DateBadge
        dateString={dateString}
        ampm={ampm}
        showDate={config.showDate}
        is12h={config.is12h}
      />

      {/* Floating Settings Button (Gear) */}
      <button
        id="btn-open-settings"
        onClick={(e) => {
          e.stopPropagation();
          setIsSettingsOpen(true);
        }}
        aria-label="Abrir ajustes"
        className={`fixed top-5 right-5 z-40 w-11 h-11 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/90 active:scale-95 border border-white/15 text-white/80 hover:text-white backdrop-blur-xl shadow-xl transition-all duration-300 ${
          uiVisible || isSettingsOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <Settings className="w-5 h-5 hover:rotate-45 transition-transform duration-300" />
      </button>

      {/* Auto-Hiding Floating Navigation Pill */}
      <PaginationPill
        currentDesign={activeDesignDef}
        currentIndex={config.currentDesign - 1}
        totalCount={CLOCK_DESIGNS.length}
        visible={uiVisible && !isSettingsOpen}
        onPrev={() => scrollToDesign(Math.max(1, config.currentDesign - 1))}
        onNext={() => scrollToDesign(Math.min(CLOCK_DESIGNS.length, config.currentDesign + 1))}
        onSelectIndex={(idx) => scrollToDesign(idx + 1)}
      />

      {/* Horizontal Snap Slider for the 10 clocks */}
      <main
        ref={sliderRef}
        id="clock-slider"
        onScroll={handleScroll}
        className="w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* 1. Airport Split-Flap */}
        <section className="min-w-full w-full h-full snap-start relative flex-shrink-0">
          <SplitFlapClock
            hours={hoursStr}
            minutes={minutesStr}
            seconds={secondsStr}
            colors={config.designColors[1] || CLOCK_DESIGNS[0].defaultColors}
            fontFamily={getFontFamily(1) || "'Bebas Neue', sans-serif"}
            showSeconds={config.showSeconds}
          />
        </section>

        {/* 2. Cyberpunk HUD */}
        <section className="min-w-full w-full h-full snap-start relative flex-shrink-0">
          <CyberClock
            hours={hoursStr}
            minutes={minutesStr}
            seconds={secondsStr}
            colors={config.designColors[2] || CLOCK_DESIGNS[1].defaultColors}
            fontFamily={getFontFamily(2) || "'Orbitron', sans-serif"}
            showSeconds={config.showSeconds}
          />
        </section>

        {/* 3. Bauhaus Modern */}
        <section className="min-w-full w-full h-full snap-start relative flex-shrink-0">
          <BauhausClock
            hours={hoursStr}
            minutes={minutesStr}
            seconds={secondsStr}
            colors={config.designColors[3] || CLOCK_DESIGNS[2].defaultColors}
            fontFamily={getFontFamily(3) || "'Syne', sans-serif"}
            showSeconds={config.showSeconds}
          />
        </section>

        {/* 4. Braun Minimal Industrial */}
        <section className="min-w-full w-full h-full snap-start relative flex-shrink-0">
          <BraunMinimalClock
            hours={hoursStr}
            minutes={minutesStr}
            seconds={secondsStr}
            colors={config.designColors[4] || CLOCK_DESIGNS[3].defaultColors}
            fontFamily={getFontFamily(4) || "'Inter', sans-serif"}
            showSeconds={config.showSeconds}
          />
        </section>

        {/* 5. Aurora Fluid Glass */}
        <section className="min-w-full w-full h-full snap-start relative flex-shrink-0">
          <AuroraFluidClock
            hours={hoursStr}
            minutes={minutesStr}
            seconds={secondsStr}
            colors={config.designColors[5] || CLOCK_DESIGNS[4].defaultColors}
            fontFamily={getFontFamily(5) || "'Syne', sans-serif"}
            showSeconds={config.showSeconds}
          />
        </section>

        {/* 6. Zenith Solar Monolith */}
        <section className="min-w-full w-full h-full snap-start relative flex-shrink-0">
          <ZenithSolarClock
            hours={hoursStr}
            minutes={minutesStr}
            seconds={secondsStr}
            colors={config.designColors[6] || CLOCK_DESIGNS[5].defaultColors}
            fontFamily={getFontFamily(6) || "'Playfair Display', serif"}
            showSeconds={config.showSeconds}
          />
        </section>

        {/* 7. Smartwatch OLED Ultra */}
        <section className="min-w-full w-full h-full snap-start relative flex-shrink-0">
          <SmartwatchClock
            hours={hoursStr}
            minutes={minutesStr}
            seconds={secondsStr}
            colors={config.designColors[7] || CLOCK_DESIGNS[6].defaultColors}
            fontFamily={getFontFamily(7) || "'Syne', sans-serif"}
            showSeconds={config.showSeconds}
          />
        </section>

        {/* 8. Qlocktwo Español */}
        <section className="min-w-full w-full h-full snap-start relative flex-shrink-0">
          <QlocktwoSpanishClock
            hours={hoursStr}
            minutes={minutesStr}
            seconds={secondsStr}
            colors={config.designColors[8] || CLOCK_DESIGNS[7].defaultColors}
            fontFamily={getFontFamily(8) || "'Share Tech Mono', monospace"}
            showSeconds={config.showSeconds}
            isActive={config.currentDesign === 8}
          />
        </section>

        {/* 9. Neon Sign Atelier */}
        <section className="min-w-full w-full h-full snap-start relative flex-shrink-0">
          <NeonClock
            hours={hoursStr}
            minutes={minutesStr}
            seconds={secondsStr}
            colors={config.designColors[9] || CLOCK_DESIGNS[8].defaultColors}
            fontFamily={getFontFamily(9) || "'Dancing Script', cursive"}
            showSeconds={config.showSeconds}
            isActive={config.currentDesign === 9}
          />
        </section>

        {/* 10. Vintage Casio LCD Watch */}
        <section className="min-w-full w-full h-full snap-start relative flex-shrink-0">
          <CasioLcdClock
            hours={hoursStr}
            minutes={minutesStr}
            seconds={secondsStr}
            colors={config.designColors[10] || CLOCK_DESIGNS[9].defaultColors}
            fontFamily=""
            showSeconds={config.showSeconds}
          />
        </section>
      </main>

      {/* Night Dimmer / Brightness Overlay */}
      {config.brightness < 1 && (
        <div
          id="night-dimmer-overlay"
          className="fixed inset-0 pointer-events-none bg-black transition-opacity duration-300 z-30"
          style={{ opacity: 1 - config.brightness }}
        />
      )}

      {/* Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        activeDesign={activeDesignDef}
        onUpdateConfig={setConfig}
        onSelectDesign={(designId) => {
          scrollToDesign(designId);
        }}
        onResetCurrentDesign={handleResetCurrentDesign}
        onResetAll={handleResetAll}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
}
