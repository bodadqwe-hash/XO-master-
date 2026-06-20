/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlayerProgress } from '../types';

const STORAGE_KEY = 'tic_tac_toe_xo_premium_progress';

export const DEFAULT_PROGRESS: PlayerProgress = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  coins: 1500, // Let's give some initial coins so players can try the shop easily!
  stats: {
    wins: 0,
    losses: 0,
    draws: 0,
    bestStreak: 0,
    currentStreak: 0,
    totalGames: 0
  },
  settings: {
    soundEnabled: true,
    musicEnabled: false,
    darkMode: true,
    skin: 'neon',
    language: 'en',
    xSkin: 'classic_cyan',
    oSkin: 'classic_rose'
  },
  unlockedAchievements: [],
  unlockedLevel: 1,
  unlockedBoardSkins: ['neon'],
  unlockedXSkins: ['classic_cyan'],
  unlockedOSkins: ['classic_rose']
};

export function loadProgress(): PlayerProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(data);
    
    // Fallback safe merging for existing entries
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      stats: {
        ...DEFAULT_PROGRESS.stats,
        ...(parsed.stats || {})
      },
      settings: {
        ...DEFAULT_PROGRESS.settings,
        xSkin: parsed.settings?.xSkin || 'classic_cyan',
        oSkin: parsed.settings?.oSkin || 'classic_rose',
        ...(parsed.settings || {})
      },
      unlockedAchievements: parsed.unlockedAchievements || [],
      unlockedBoardSkins: parsed.unlockedBoardSkins || ['neon'],
      unlockedXSkins: parsed.unlockedXSkins || ['classic_cyan'],
      unlockedOSkins: parsed.unlockedOSkins || ['classic_rose']
    };
  } catch (err) {
    console.error('Failed to load local storage progress:', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: PlayerProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save local storage progress:', err);
  }
}

export function resetProgressToDefault(): PlayerProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRESS));
  } catch (err) {
    console.error('Failed to reset progress:', err);
  }
  return DEFAULT_PROGRESS;
}
