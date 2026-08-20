import React from 'react';
import {
  X,
  RotateCcw,
  Sun,
  Maximize,
  Minimize,
  Moon,
  Type,
  Palette,
  Sliders
} from 'lucide-react';
import { ClockDesignDefinition, ClockConfigState } from '../types';
import { CLOCK_DESIGNS } from '../constants/clockDesigns';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: ClockConfigState;
  activeDesign: ClockDesignDefinition;
  onUpdateConfig: (updater: (prev: ClockConfigState) => ClockConfigState) => void;
  onSelectDesign: (designId: number) => void;
  onResetCurrentDesign: () => void;
  onResetAll: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const SettingsDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  config,
  activeDesign,
  onUpdateConfig,
  onSelectDesign,
  onResetCurrentDesign,
  onResetAll,
  isFullscreen,
  onToggleFullscreen
}) => {
  if (!isOpen) return null;

  const currentColors = config.designColors[activeDesign.id] || activeDesign.defaultColors;
  const currentFont = config.designFonts[activeDesign.id] || activeDesign.defaultFont;

  const handleColorChange = (key: string, value: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      designColors: {
        ...prev.designColors,
        [activeDesign.id]: {
          ...(prev.designColors[activeDesign.id] || activeDesign.defaultColors),
          [key]: value
        }
      }
    }));
  };

  const handleFontChange = (fontId: string) => {
    onUpdateConfig((prev) => ({
      ...prev,
      designFonts: {
        ...prev.designFonts,
        [activeDesign.id]: fontId
      }
    }));
  };

  return (
    <div
      id="settings-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="settings-panel"
        className="w-full max-w-md h-full bg-neutral-950/95 border-l border-white/10 text-white flex flex-col shadow-2xl backdrop-blur-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-rose-500" />
            <h2 className="font-bold text-lg tracking-tight">Ajustes del Reloj</h2>
          </div>
          <button
            id="btn-close-settings"
            onClick={onClose}
            aria-label="Cerrar ajustes"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Color Customization */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-rose-400" />
                Colores de {activeDesign.name}
              </label>
              <button
                id="btn-reset-design-colors"
                onClick={onResetCurrentDesign}
                title="Restablecer colores de este reloj"
                className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                Restablecer
              </button>
            </div>

            <div className="space-y-3">
              {activeDesign.colorFields.map((field) => {
                const currentColor = currentColors[field.key] || field.defaultColor;
                return (
                  <div
                    key={field.key}
                    className="flex items-center justify-between py-1 border-b border-white/5 last:border-0"
                  >
                    <span className="text-xs text-white/80 font-medium">
                      {field.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-white/40 uppercase">
                        {currentColor}
                      </span>
                      <input
                        type="color"
                        value={currentColor}
                        onChange={(e) => handleColorChange(field.key, e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-2 border-white/20 p-0.5"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Font Selector if available */}
          {activeDesign.fontOptions && activeDesign.fontOptions.length > 0 && (
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-rose-400" />
                Familia Tipográfica
              </label>
              <div className="grid grid-cols-2 gap-2">
                {activeDesign.fontOptions.map((font) => {
                  const isSelected = currentFont === font.id;
                  return (
                    <button
                      key={font.id}
                      onClick={() => handleFontChange(font.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-500/10 text-white'
                          : 'border-white/10 bg-white/[0.02] text-white/60 hover:text-white'
                      }`}
                      style={{ fontFamily: font.fontFamily }}
                    >
                      {font.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* General Toggles */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-white/70 block mb-1">
              Preferencias del Reloj
            </label>

            {/* 12h / 24h */}
            <div className="flex items-center justify-between py-1">
              <span className="text-xs text-white/80">Formato de 12 Horas (AM/PM)</span>
              <input
                type="checkbox"
                id="toggle-12h"
                checked={config.is12h}
                onChange={(e) =>
                  onUpdateConfig((prev) => ({ ...prev, is12h: e.target.checked }))
                }
                className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
              />
            </div>

            {/* Show Date */}
            <div className="flex items-center justify-between py-1">
              <span className="text-xs text-white/80">Mostrar Fecha y Día</span>
              <input
                type="checkbox"
                id="toggle-show-date"
                checked={config.showDate}
                onChange={(e) =>
                  onUpdateConfig((prev) => ({ ...prev, showDate: e.target.checked }))
                }
                className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
              />
            </div>

            {/* Show Seconds */}
            <div className="flex items-center justify-between py-1">
              <span className="text-xs text-white/80">Mostrar Segundos</span>
              <input
                type="checkbox"
                id="toggle-show-seconds"
                checked={config.showSeconds}
                onChange={(e) =>
                  onUpdateConfig((prev) => ({ ...prev, showSeconds: e.target.checked }))
                }
                className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
              />
            </div>

            {/* Keep Awake Screen */}
            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col">
                <span className="text-xs text-white/80">Mantener Pantalla Activa</span>
                <span className="text-[10px] text-white/40">Evita que el celular o tablet se bloquee</span>
              </div>
              <input
                type="checkbox"
                id="toggle-keep-awake"
                checked={config.keepAwake}
                onChange={(e) =>
                  onUpdateConfig((prev) => ({ ...prev, keepAwake: e.target.checked }))
                }
                className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Brightness Dimmer */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Atenuador de Brillo / Modo Noche
              </label>
              <span className="text-xs font-mono text-white/50">
                {Math.round(config.brightness * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-white/40" />
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={config.brightness}
                onChange={(e) =>
                  onUpdateConfig((prev) => ({
                    ...prev,
                    brightness: parseFloat(e.target.value)
                  }))
                }
                className="w-full accent-rose-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
              />
              <Sun className="w-4 h-4 text-amber-400" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <button
              id="btn-toggle-fullscreen"
              onClick={onToggleFullscreen}
              className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 active:scale-[0.99] font-medium text-xs flex items-center justify-center gap-2 transition-all"
            >
              {isFullscreen ? (
                <>
                  <Minimize className="w-4 h-4" />
                  Salir de Pantalla Completa
                </>
              ) : (
                <>
                  <Maximize className="w-4 h-4" />
                  Pantalla Completa
                </>
              )}
            </button>

            <button
              id="btn-reset-all-clocks"
              onClick={onResetAll}
              className="w-full py-2.5 px-4 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 font-medium text-xs flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restablecer Todos los Relojes de Fábrica
            </button>
          </div>
        </div>

        {/* Footer Done */}
        <div className="p-4 border-t border-white/10 bg-neutral-950">
          <button
            id="btn-apply-settings"
            onClick={onClose}
            className="w-full py-3.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-neutral-200 active:scale-[0.98] transition-all"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
