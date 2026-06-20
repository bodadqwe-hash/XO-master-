/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Award, Check, Lock, X, Coins } from 'lucide-react';
import { ALL_ACHIEVEMENTS } from '../utils/achievements';
import { PlayerProgress } from '../types';

interface AchievementsPanelProps {
  progress: PlayerProgress;
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementsPanel({
  progress,
  isOpen,
  onClose
}: AchievementsPanelProps) {
  if (!isOpen) return null;

  const unlockedSet = new Set(progress.unlockedAchievements);

  return (
    <div id="achieve-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        id="achieve-modal-card" 
        className="relative w-full max-w-md overflow-hidden bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-6 h-4/5 flex flex-col"
      >
        {/* Neon ambient glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="text-purple-400 w-5 h-5 animate-pulse" />
            <h2 className="text-lg font-extrabold text-slate-100 uppercase tracking-wider">
              Unlocked Achievements
            </h2>
          </div>
          <button
            id="achieve-close-btn"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* List scroll section */}
        <div 
          id="achievements-scroll-area" 
          className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 custom-scrollbar"
        >
          {ALL_ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = unlockedSet.has(achievement.id);

            return (
              <div
                key={achievement.id}
                id={`achievement-card-${achievement.id}`}
                className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all duration-300 relative
                  ${isUnlocked 
                    ? 'bg-purple-950/20 border-purple-500/20 shadow-lg shadow-purple-500/5' 
                    : 'bg-slate-950/40 border-slate-900 opacity-60'
                  }
                `}
              >
                {/* Visual badge icon */}
                <div 
                  className={`flex items-center justify-center w-12 h-12 rounded-xl text-xl select-none relative shrink-0
                    ${isUnlocked 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-md shadow-pink-500/10' 
                      : 'bg-slate-800 text-slate-500'
                    }
                  `}
                >
                  {isUnlocked ? achievement.icon : <Lock size={16} className="text-slate-500" />}
                </div>

                {/* Achievement info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className={`font-bold text-sm truncate ${isUnlocked ? 'text-slate-100' : 'text-slate-400'}`}>
                      {achievement.title}
                    </h3>
                    {isUnlocked ? (
                      <span className="flex items-center gap-0.5 text-emerald-400 text-[10px] font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded-full font-mono">
                        <Check size={10} strokeWidth={3} />
                        UNLOCKED
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider font-mono">
                        LOCKED
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    {achievement.description}
                  </p>
                  
                  {/* Rewards badges */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-mono font-extrabold bg-indigo-500/10 text-indigo-400 border border-indigo-400/20 px-2 py-0.5 rounded-md">
                      +{achievement.xpReward} XP
                    </span>
                    <span className="text-[10px] font-mono font-extrabold bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      <Coins size={10} />
                      +{achievement.coinReward}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800">
          <button
            id="achieve-confirm-btn"
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-500/10 cursor-pointer"
          >
            Close Achievements
          </button>
        </div>
      </div>
    </div>
  );
}
