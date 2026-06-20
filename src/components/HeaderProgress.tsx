/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Coins, Flame, Sparkles, Trophy, Award, BarChart2, ShoppingBag } from 'lucide-react';
import { PlayerProgress } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface HeaderProgressProps {
  progress: PlayerProgress;
  onOpenStats: () => void;
  onOpenAchievements: () => void;
  onOpenSettings: () => void;
  onOpenShop: () => void;
}

export default function HeaderProgress({
  progress,
  onOpenStats,
  onOpenAchievements,
  onOpenSettings,
  onOpenShop
}: HeaderProgressProps) {
  const { level, xp, xpToNextLevel, coins, stats, settings } = progress;
  const xpPercentage = Math.min(100, Math.max(0, (xp / xpToNextLevel) * 100));
  
  const lang = settings.language || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const isRtl = lang === 'ar';

  return (
    <div id="header-progress-card" className={`w-full bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-4 md:p-5 shadow-xl flex flex-col gap-4 ${isRtl ? 'rtl text-right' : 'ltr text-left'}`}>
      {/* Top section: Player name, rank & settings controllers */}
      <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <div id="player-tag" className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <div
            id="header-guest-avatar"
            className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 shadow-[0_0_12px_rgba(99,102,241,0.25)] shrink-0 group"
          >
            <Sparkles className="text-white w-6 h-6 animate-pulse" />
          </div>
          <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
            <h3 className="font-bold text-slate-100 flex items-center gap-1 text-xs md:text-sm uppercase tracking-wide">
              {t.guest_user}
            </h3>
            <span className="text-[10px] md:text-xs text-cyan-400 font-mono flex items-center gap-1 mt-0.5">
              {t.level_word} {level}
            </span>
          </div>
        </div>

        {/* Floating dashboard menu controls */}
        <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <button
            id="header-shop-btn"
            onClick={onOpenShop}
            title={lang === 'ar' ? 'المتجر' : lang === 'fr' ? 'Boutique' : 'Skins Shop'}
            className="px-2.5 py-1.5 bg-gradient-to-r from-amber-500/25 to-yellow-500/25 hover:from-amber-500/40 hover:to-yellow-500/40 border border-amber-500/40 rounded-lg text-amber-400 hover:text-amber-300 font-mono text-[9px] font-black uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.1)] active:scale-95"
          >
            <ShoppingBag size={14} className="shrink-0 animate-pulse" />
            <span>Store</span>
          </button>
          <button
            id="header-stats-btn"
            onClick={onOpenStats}
            title="Statistics"
            className="p-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white cursor-pointer transition-colors"
          >
            <BarChart2 size={18} />
          </button>
          <button
            id="header-achieve-btn"
            onClick={onOpenAchievements}
            title="Achievements"
            className="p-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white cursor-pointer transition-colors"
          >
            <Award size={18} />
          </button>
          <button
            id="header-settings-btn"
            onClick={onOpenSettings}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[10px] md:text-xs rounded-lg text-slate-300 hover:text-white font-mono cursor-pointer transition-colors font-bold uppercase tracking-wide"
          >
            {t.change_lang}
          </button>
        </div>
      </div>

      {/* Progress XP details with smooth animation */}
      <div className="flex flex-col gap-1.5">
        <div className={`flex items-center justify-between text-[10px] md:text-xs text-slate-400 font-mono ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <span>XP PROGRESSION</span>
          <span className="text-cyan-400">{xp} / {xpToNextLevel} XP</span>
        </div>
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <motion.div
            id="xp-progress-bar-fill"
            className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${xpPercentage}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Tally Stats summary row */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-slate-950/40 border border-slate-800/40 rounded-xl p-2 flex flex-col justify-center items-center">
          <span className="text-[9px] text-slate-500 font-mono uppercase">Coins</span>
          <div className="flex items-center gap-1 mt-1 text-amber-400 font-bold font-mono text-xs md:text-sm">
            <Coins size={12} className="text-amber-400 shrink-0" />
            <span>{coins}</span>
          </div>
        </div>

        <div className="bg-slate-950/40 border border-slate-800/40 rounded-xl p-2 flex flex-col justify-center items-center">
          <span className="text-[9px] text-slate-500 font-mono uppercase">Wins</span>
          <div className="flex items-center gap-1 mt-1 text-emerald-400 font-bold font-mono text-xs md:text-sm">
            <Trophy size={12} className="shrink-0" />
            <span>{stats.wins}</span>
          </div>
        </div>

        <div className="bg-slate-950/40 border border-slate-800/40 rounded-xl p-2 flex flex-col justify-center items-center">
          <span className="text-[9px] text-slate-500 font-mono uppercase">Streak</span>
          <div className="flex items-center gap-1 mt-1 text-orange-400 font-bold font-mono text-xs md:text-sm">
            <Flame size={12} className="animate-bounce shrink-0" />
            <span>{stats.currentStreak}</span>
          </div>
        </div>

        <div className="bg-slate-950/40 border border-slate-800/40 rounded-xl p-2 flex flex-col justify-center items-center">
          <span className="text-[9px] text-slate-500 font-mono uppercase">W/L Ratio</span>
          <span className="text-violet-400 font-bold font-mono mt-1 text-xs md:text-sm truncate w-full">
            {stats.losses === 0 
              ? `${stats.wins}x` 
              : (stats.wins / stats.losses).toFixed(1)
            }
          </span>
        </div>
      </div>
    </div>
  );
}
