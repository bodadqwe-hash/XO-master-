/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Volume2, VolumeX, Music, Settings, X, RefreshCw, Palette, Globe } from 'lucide-react';
import { GameSettings } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface SettingsModalProps {
  settings: GameSettings;
  isOpen: boolean;
  onClose: () => void;
  onUpdateSettings: (settings: Partial<GameSettings>) => void;
  onResetProgress: () => void;
}

export default function SettingsModal({
  settings,
  isOpen,
  onClose,
  onUpdateSettings,
  onResetProgress
}: SettingsModalProps) {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  const activeLang = settings.language || 'en';
  const t = TRANSLATIONS[activeLang] || TRANSLATIONS.en;
  const isRtl = activeLang === 'ar';

  const skins: Array<{ id: GameSettings['skin']; label: string; accentClass: string }> = [
    { id: 'neon', label: 'Neon Glow', accentClass: 'bg-gradient-to-r from-cyan-400 to-rose-500' },
    { id: 'cyberpunk', label: 'Cyber Red', accentClass: 'bg-gradient-to-r from-yellow-400 to-purple-500' },
    { id: 'retro', label: '8-Bit Matrix', accentClass: 'bg-emerald-600 border border-emerald-400' },
    { id: 'royal', label: 'Royal Gold', accentClass: 'bg-gradient-to-r from-amber-500 to-slate-200' },
    { id: 'galaxy', label: 'Cosmic Galaxy', accentClass: 'bg-gradient-to-r from-indigo-500 to-fuchsia-500' },
    { id: 'matrix', label: 'Digital Rain', accentClass: 'bg-green-500' },
    { id: 'lava', label: 'Magma Lava', accentClass: 'bg-gradient-to-r from-red-500 to-orange-600' },
    { id: 'gold', label: 'Imperial Platin', accentClass: 'bg-gradient-to-r from-yellow-400 to-cyan-300' },
    { id: 'aurora_nordic', label: 'Aurora Nordic', accentClass: 'bg-gradient-to-r from-teal-400 to-indigo-600' },
    { id: 'quantum_void', label: 'Quantum Void', accentClass: 'bg-gradient-to-r from-fuchsia-600 to-cyan-400' }
  ];

  return (
    <div id="settings-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        id="settings-modal-card" 
        className={`relative w-full max-w-sm overflow-hidden bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-6 ${isRtl ? 'rtl text-right' : 'ltr text-left'}`}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />

        <div className={`flex items-center justify-between mb-5 pb-2 border-b border-slate-800 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <Settings className="text-zinc-400 w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            <h2 className="text-sm md:text-base font-extrabold text-slate-100 uppercase tracking-wider">
              {t.change_lang || 'Settings'}
            </h2>
          </div>
          <button
            id="settings-close-btn"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Language selector section */}
        <div className="flex flex-col gap-3 mb-6">
          <h3 className={`text-xs font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <Globe size={13} className="text-cyan-400" />
            <span>{t.change_lang || 'Game Language'}</span>
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {(['en', 'fr', 'ar'] as const).map((lang) => (
              <button
                key={lang}
                id={`lang-select-btn-${lang}`}
                onClick={() => onUpdateSettings({ language: lang })}
                className={`py-2 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer select-none
                  ${activeLang === lang 
                    ? 'border-cyan-500 bg-cyan-950/30 text-cyan-400 font-extrabold' 
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }
                `}
              >
                {lang === 'en' ? 'English' : lang === 'fr' ? 'Français' : 'العربية'}
              </button>
            ))}
          </div>
        </div>

        {/* Audio controls */}
        <div className="flex flex-col gap-4 mb-6">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
            Audio Configuration
          </h3>

          {/* Sound toggle */}
          <div className={`flex items-center justify-between bg-slate-950/40 border border-slate-850 p-3 rounded-2xl ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              {settings.soundEnabled ? (
                <Volume2 className="text-cyan-400 w-4.5 h-4.5" />
              ) : (
                <VolumeX className="text-slate-500 w-4.5 h-4.5" />
              )}
              <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
                <span className="text-xs md:text-sm font-bold text-slate-200 block">Sound FX</span>
                <span className="text-[9px] text-slate-500 font-mono">Special FX synths</span>
              </div>
            </div>
            <button
              id="settings-toggle-sf-btn"
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-11 h-5.5 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                settings.soundEnabled ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  settings.soundEnabled ? (isRtl ? '-translate-x-5' : 'translate-x-5') : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Music loops toggle */}
          <div className={`flex items-center justify-between bg-slate-950/40 border border-slate-850 p-3 rounded-2xl ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              <Music className={`w-4.5 h-4.5 ${settings.musicEnabled ? 'text-purple-400' : 'text-slate-500'}`} />
              <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
                <span className="text-xs md:text-sm font-bold text-slate-200 block">Ambient Pad</span>
                <span className="text-[9px] text-slate-500 font-mono">Sci-fi background track</span>
              </div>
            </div>
            <button
              id="settings-toggle-music-btn"
              onClick={() => onUpdateSettings({ musicEnabled: !settings.musicEnabled })}
              className={`w-11 h-5.5 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                settings.musicEnabled ? 'bg-purple-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  settings.musicEnabled ? (isRtl ? '-translate-x-5' : 'translate-x-5') : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Skin selects wrapper */}
        <div className="flex flex-col gap-3 mb-6">
          <h3 className={`text-xs font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <Palette size={13} className="text-purple-400" />
            <span>Board Skin Accent</span>
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {skins.map((s) => (
              <button
                key={s.id}
                id={`skin-select-btn-${s.id}`}
                onClick={() => onUpdateSettings({ skin: s.id })}
                className={`p-2 rounded-xl border flex flex-col gap-1 transition-all text-[11px] cursor-pointer
                  ${settings.skin === s.id 
                    ? 'border-indigo-500 bg-indigo-950/40 text-slate-100 shadow-md font-bold' 
                    : 'border-slate-800/60 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }
                `}
              >
                <div id={`skin-container-${s.id}`} className={`flex items-center justify-between w-full ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span>{s.label}</span>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${s.accentClass}`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Erase button */}
        <div className="border-t border-slate-850 pt-4">
          {showConfirmReset ? (
            <div id="reset-confirm-prompt" className="flex flex-col gap-2 p-3 bg-rose-950/30 border border-rose-500/20 rounded-2xl mb-4 text-center">
              <span className="text-rose-450 text-[10px] font-bold uppercase tracking-wider">
                Erase progress database?
              </span>
              <p className="text-slate-400 text-[9px] leading-relaxed">
                Confirming deletes all custom level progressions, streaks, and coins earned.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  id="reset-cancel-btn"
                  onClick={() => setShowConfirmReset(false)}
                  className="py-1.5 bg-slate-800 hover:bg-slate-755 text-slate-300 text-xs font-bold rounded-lg cursor-pointer select-none"
                >
                  Keep Data
                </button>
                <button
                  id="reset-confirm-del-btn"
                  onClick={() => {
                    onResetProgress();
                    setShowConfirmReset(false);
                  }}
                  className="py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg cursor-pointer select-none animate-pulse"
                >
                  Yes, Format
                </button>
              </div>
            </div>
          ) : (
            <button
              id="reset-trigger-btn"
              onClick={() => setShowConfirmReset(true)}
              className="w-full py-2 bg-slate-950/60 hover:bg-slate-900 border border-slate-850 hover:border-rose-500/30 text-rose-400 hover:text-rose-300 text-[10px] font-mono rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer mb-3"
            >
              <RefreshCw size={11} className="animate-spin" style={{ animationDuration: '10s' }} />
              Reset Stats & Level Progression
            </button>
          )}

          <button
            id="settings-save-confirm-btn"
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl transition-all cursor-pointer text-center text-xs uppercase tracking-wide select-none"
          >
            {t.back_to_menu || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
