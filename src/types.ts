/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type Language = 'en' | 'fr' | 'ar';

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  darkMode: boolean;
  skin: 'neon' | 'cyberpunk' | 'retro' | 'royal' | 'galaxy' | 'matrix' | 'lava' | 'gold' | 'aurora_nordic' | 'quantum_void';
  language: Language;
  xSkin: string;
  oSkin: string;
}

export interface PlayerStats {
  wins: number;
  losses: number;
  draws: number;
  bestStreak: number;
  currentStreak: number;
  totalGames: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  coinReward: number;
  icon: string;
  unlockedAt?: string; // Date string or null
}

export interface PlayerProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  stats: PlayerStats;
  settings: GameSettings;
  unlockedAchievements: string[];
  unlockedLevel: number;
  unlockedBoardSkins: string[];
  unlockedXSkins: string[];
  unlockedOSkins: string[];
}

export type CellValue = 'X' | 'O' | null;

export type BoardState = CellValue[];

export type GameStatus = 'idle' | 'playing' | 'player_won' | 'ai_won' | 'draw' | 'p1_won' | 'p2_won';
