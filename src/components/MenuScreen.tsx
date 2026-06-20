/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, Trophy, Lock, Zap, Award, Target, HelpCircle, Users, Globe } from 'lucide-react';
import { Difficulty, Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface MenuScreenProps {
  unlockedLevel: number;
  highestWins: number;
  onStartCampaign: (level: number) => void;
  onStartFreePlay: (difficulty: Difficulty) => void;
  onStartLocalPvP: () => void;
  language: Language;
}

export default function MenuScreen({
  unlockedLevel,
  highestWins,
  onStartCampaign,
  onStartFreePlay,
  onStartLocalPvP,
  language
}: MenuScreenProps) {
  
  const t = TRANSLATIONS[language || 'en'] || TRANSLATIONS.en;
  const isRtl = language === 'ar';

  // Dynamically generated 500 levels procedural details
  const maxLevels = 500;
  const levelNamesList = [
    'Training Drone', 'Bit Sentinel', 'Node Operator', 'Matrix Phantom', 
    'Hyper Glitch', 'Vector Overseer', 'Cortex Interceptor', 'Deep Mind V8', 
    'Unbeaten Nexus', 'Zero Point Null', 'Glow Guardian', 'Neon Knight',
    'Laser Lynx', 'Pixel Paladin', 'Grid Glider', 'Cyber Cobra',
    'Quantum Quark', 'Static Striker', 'Pulse Panther', 'Vortex Viper',
    'Data Demon', 'Binary Beast', 'Signal Spectre', 'Frequency Fox',
    'Router Ranger', 'Switch Seeker', 'Cache Hunter', 'Stack Weaver',
    'Buffer Buster', 'Queue Kaiser', 'Hash Herald', 'Tree Tracker'
  ];

  const getLevelDetail = (num: number) => {
    let diff: Difficulty = 'easy';
    if (num >= 16 && num <= 70) diff = 'medium';
    else if (num >= 71 && num <= 200) diff = 'hard';
    else if (num >= 201) diff = 'expert';

    const baseName = levelNamesList[(num - 1) % levelNamesList.length];
    const tier = Math.ceil(num / levelNamesList.length);
    const suffix = tier > 1 ? ` v${tier}` : '';
    const name = `${baseName}${suffix}`;

    const xp = Math.min(1000, 50 + num * 3);
    const coins = Math.min(250, 15 + num);

    return { num, name, diff, xp, coins };
  };

  const PAGE_SIZE = 20;
  const totalPages = 25; // 25 pages * 20 levels/page = 500 levels
  const pageOfUnlocked = Math.min(totalPages, Math.ceil(unlockedLevel / PAGE_SIZE)) || 1;
  const [currentPage, setCurrentPage] = useState(pageOfUnlocked);

  // Auto-pagination on unlockedLevel change
  useEffect(() => {
    setCurrentPage(pageOfUnlocked);
  }, [unlockedLevel]);

  const startLevelNum = (currentPage - 1) * PAGE_SIZE + 1;
  const pageLevels = Array.from({ length: PAGE_SIZE }, (_, i) => {
    const num = startLevelNum + i;
    return getLevelDetail(num);
  });

  const coreDifficulties: Array<{ id: Difficulty; label: string; desc: string; color: string }> = [
    { id: 'easy', label: t.cadet_drone, desc: t.cadet_drone_desc, color: 'from-cyan-400 to-teal-500' },
    { id: 'medium', label: t.tactical_core, desc: t.tactical_core_desc, color: 'from-emerald-400 to-indigo-500' },
    { id: 'hard', label: t.grand_sentinel, desc: t.grand_sentinel_desc, color: 'from-purple-500 to-indigo-600' },
    { id: 'expert', label: t.unbeatable_oracle, desc: t.unbeatable_oracle_desc, color: 'from-rose-500 to-purple-600' }
  ];

  return (
    <div id="menu-screen-content" className={`flex flex-col gap-6 md:gap-7 items-center max-w-md mx-auto py-1.5 px-0.5 ${isRtl ? 'rtl text-right font-sans' : 'ltr text-left'}`}>
      
      {/* Animated Glowing Game Logo */}
      <div id="game-logo-wrapper" className="flex flex-col items-center select-none pt-2 text-center">
        <motion.div
          id="logo-spinning-orb"
          className="relative flex items-center justify-center w-20 h-20 rounded-full bg-slate-900/60 border border-indigo-500/20 shadow-2xl shadow-indigo-500/10 mb-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <svg className="w-12 h-12" viewBox="0 0 100 100">
            <line x1="15" y1="35" x2="85" y2="35" stroke="rgba(99,102,241,0.25)" strokeWidth="6" />
            <line x1="15" y1="65" x2="85" y2="65" stroke="rgba(99,102,241,0.25)" strokeWidth="6" />
            <line x1="35" y1="15" x2="35" y2="85" stroke="rgba(99,102,241,0.25)" strokeWidth="6" />
            <line x1="65" y1="15" x2="65" y2="85" stroke="rgba(99,102,241,0.25)" strokeWidth="6" />

            <line x1="20" y1="20" x2="30" y2="30" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round" />
            <line x1="30" y1="20" x2="20" y2="30" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round" />

            <circle cx="80" cy="80" r="7" stroke="#f43f5e" strokeWidth="8" fill="none" />
          </svg>
        </motion.div>
        
        <h1 className="text-2xl md:text-3xl font-black tracking-widest text-slate-100 flex items-center gap-2 drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]">
          TIC <span className="text-cyan-400">TAC</span> <span className="text-pink-500">TOE</span>
        </h1>
        <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">
          {t.cyber_grid}
        </p>
      </div>

      {/* Mode Select Tab Slider (Unified visually into a solid elegant design) */}
      <div id="game-mode-panel" className="w-full bg-slate-900/45 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-5 shadow-xl">
        
        {/* Campaign challenge progression mapping */}
        <div className="mb-6">
          <div className={`flex justify-between items-center mb-3 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <h2 className={`text-[11px] md:text-xs font-bold text-slate-400 font-mono tracking-wider flex items-center gap-1.5 uppercase ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="flex h-2 w-2 rounded-full bg-amber-500 shrink-0" />
              <span>{t.campaign_progress}</span>
            </h2>
            <span className="text-[10px] font-mono font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/15">
              {t.current_level}: {unlockedLevel} / {maxLevels}
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4 leading-normal">
            {t.campaign_desc}
          </p>

          {/* Chapters Sub Bar */}
          <div id="campaign-chapters" className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x mb-3 -mx-2 px-2 mask-linear">
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              const startLvl = (pageNum - 1) * PAGE_SIZE + 1;
              const endLvl = pageNum * PAGE_SIZE;
              const isPageSelected = currentPage === pageNum;
              const isPageAccessible = startLvl <= unlockedLevel;

              return (
                <button
                  key={pageNum}
                  id={`chapter-tab-${pageNum}`}
                  onClick={() => isPageAccessible && setCurrentPage(pageNum)}
                  disabled={!isPageAccessible}
                  className={`snap-center shrink-0 px-3 py-1.5 rounded-xl border text-[10px] font-bold font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap
                    ${isPageSelected
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-md shadow-amber-500/5'
                      : isPageAccessible
                        ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-755 hover:text-slate-200'
                        : 'bg-slate-950/25 border-slate-900/50 text-slate-700 cursor-not-allowed opacity-40'
                    }
                  `}
                >
                  {startLvl}-{endLvl}
                </button>
              );
            })}
          </div>

          {/* Target boss card indicator */}
          <div className={`mb-3.5 bg-slate-950/60 border border-slate-850/50 p-2.5 rounded-2xl flex items-center justify-between text-xs font-sans ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-slate-500 font-mono text-[10px]">{language === 'ar' ? 'الزعيم الحالي:' : language === 'fr' ? 'Boss Ciblé:' : 'Target Boss:'}</span>
            <div className={`text-right ${isRtl ? 'text-left' : 'text-right'}`}>
              <span className="font-extrabold text-cyan-400 uppercase tracking-wide block">
                {getLevelDetail(unlockedLevel).name}
              </span>
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border uppercase mt-0.5 inline-block
                ${getLevelDetail(unlockedLevel).diff === 'easy' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                  getLevelDetail(unlockedLevel).diff === 'medium' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  getLevelDetail(unlockedLevel).diff === 'hard' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                  'bg-rose-500/10 text-rose-450 border-rose-500/20'
                }
              `}>
                {getLevelDetail(unlockedLevel).diff}
              </span>
            </div>
          </div>

          <div id="campaign-grid" className="grid grid-cols-5 gap-2.5">
            {pageLevels.map((lvl) => {
              const isUnlocked = lvl.num <= unlockedLevel;
              const isCurrent = lvl.num === unlockedLevel;

              return (
                <button
                  key={lvl.num}
                  id={`campaign-select-btn-lvl-${lvl.num}`}
                  disabled={!isUnlocked}
                  onClick={() => onStartCampaign(lvl.num)}
                  style={{ contentVisibility: 'auto' }}
                  className={`aspect-square w-full rounded-xl flex flex-col items-center justify-center relative cursor-pointer border transition-all duration-300
                    ${isCurrent 
                      ? 'bg-amber-600 border-amber-400 text-slate-950 font-black shadow-[0_0_12px_rgba(245,158,11,0.4)] hover:bg-amber-500' 
                      : isUnlocked 
                        ? 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-amber-500/40 hover:bg-slate-900' 
                        : 'bg-slate-950/20 border-slate-900 text-slate-600 cursor-not-allowed opacity-50'
                    }
                  `}
                >
                  <span className="text-[10px] font-mono">{t.level_word}</span>
                  <span className="text-sm md:text-base font-extrabold font-mono mt-0.5">{lvl.num}</span>

                  {!isUnlocked && (
                    <div className="absolute top-1 right-1">
                      <Lock size={10} className="text-slate-600" />
                    </div>
                  )}

                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Grid pagination control arrows */}
          <div className="flex items-center justify-between gap-3 bg-slate-950/40 p-2 rounded-2xl border border-slate-850/50 mt-4">
            <button
              id="prev-campaign-page-btn"
              disabled={currentPage === 1}
              onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); }}
              className={`p-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 font-mono
                ${currentPage === 1 
                  ? 'bg-slate-950/10 border-slate-900 text-slate-700 cursor-not-allowed border-transparent'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
            >
              ◀ {isRtl ? 'التالي' : 'Prev'}
            </button>
            <span className="text-[10px] font-mono text-slate-400 font-bold">
              {isRtl ? 'فصل' : 'Page'} {currentPage} / {totalPages}
            </span>
            <button
              id="next-campaign-page-btn"
              disabled={currentPage === totalPages || (currentPage * PAGE_SIZE) >= unlockedLevel}
              onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); }}
              className={`p-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 font-mono
                ${(currentPage === totalPages || (currentPage * PAGE_SIZE) >= unlockedLevel)
                  ? 'bg-slate-950/10 border-slate-900 text-slate-700 cursor-not-allowed border-transparent'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
            >
              {isRtl ? 'السابق' : 'Next'} ▶
            </button>
          </div>
        </div>

        {/* PVP Modes Section */}
        <div className="mb-6">
          <h2 className={`text-xs font-bold text-slate-400 font-mono tracking-wider flex items-center gap-1.5 uppercase mb-3 text-pink-500 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="flex h-2 w-2 rounded-full bg-pink-500 shrink-0 animate-pulse" />
            <span>{t.multiplayer_modes}</span>
          </h2>
          
          <div className="grid grid-cols-1">
            {/* Local PVP Button */}
            <button
              id="local-pvp-btn"
              onClick={onStartLocalPvP}
              className={`flex-row md:flex-col justify-between p-3.5 bg-slate-950/70 hover:bg-slate-900 border border-pink-500/10 hover:border-pink-500/40 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] duration-300 relative group overflow-hidden ${isRtl ? 'text-right' : 'text-left'}`}
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-pink-500/5 blur-xl group-hover:bg-pink-500/10 rounded-full" />
              <div className={`flex items-center gap-2 mb-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
                  <Users size={16} />
                </div>
                <span className="text-[9px] font-mono text-pink-400 font-bold uppercase tracking-wider bg-pink-500/10 px-1.5 py-0.5 rounded">
                  {t.local_pvp_badge}
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-slate-200 text-xs tracking-wider uppercase mb-0.5">
                  {t.local_pvp_title}
                </h3>
                <p className="text-[9px] text-slate-500 font-mono leading-tight">
                  {t.local_pvp_desc}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Separator */}
        <div id="menu-section-divider" className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-slate-800" />
          <span className="flex-shrink mx-4 text-[9px] text-slate-500 font-mono tracking-widest uppercase">
            {isRtl ? 'أو تدريب منفرد' : 'OR PRACTICE'}
          </span>
          <div className="flex-grow border-t border-slate-800" />
        </div>

        {/* Free play grid selection */}
        <div>
          <h2 className={`text-xs font-bold text-slate-400 font-mono tracking-wider flex items-center gap-1.5 uppercase mb-3 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
            <span>{t.freeplay_practice}</span>
          </h2>

          <div id="free-play-grid" className="flex flex-col gap-2">
            {coreDifficulties.map((diff) => (
              <button
                key={diff.id}
                id={`freeplay-select-btn-${diff.id}`}
                onClick={() => onStartFreePlay(diff.id)}
                className={`w-full flex items-center justify-between p-3.5 bg-slate-950/60 hover:bg-slate-900/80 border border-slate-850 hover:border-indigo-500/30 rounded-2xl cursor-pointer transition-all ${isRtl ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
              >
                <div>
                  <h3 className="font-bold text-slate-200 text-xs tracking-wider flex items-center gap-1.5 uppercase mb-0.5">
                    {diff.label}
                  </h3>
                  <p className="text-[9px] md:text-[10px] text-slate-500 font-mono">{diff.desc}</p>
                </div>
                <div className={`p-2 rounded-xl bg-gradient-to-br ${diff.color} text-slate-950 cursor-pointer`}>
                  <Play size={12} fill="currentColor" />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      <p className="text-[9px] md:text-[10px] text-slate-600 font-mono flex items-center gap-1.5 p-1 select-none text-center justify-center w-full">
        <Target size={11} className="text-emerald-500 animate-pulse" />
        Saves statistics, level milestones & rewards instantly.
      </p>
    </div>
  );
}
