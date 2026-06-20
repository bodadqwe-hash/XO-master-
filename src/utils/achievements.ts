/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Achievement, PlayerProgress } from '../types';

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'wins_1',
    title: 'First Blood',
    description: 'Win your first match against any AI.',
    xpReward: 50,
    coinReward: 15,
    icon: '🏆'
  },
  {
    id: 'wins_5',
    title: 'Slayer',
    description: 'Win 5 matches against any AI.',
    xpReward: 100,
    coinReward: 30,
    icon: '⚔️'
  },
  {
    id: 'wins_10',
    title: 'Tactician',
    description: 'Win 10 matches against any AI.',
    xpReward: 200,
    coinReward: 50,
    icon: '⚡'
  },
  {
    id: 'wins_25',
    title: 'Grandmaster',
    description: 'Win 25 matches against any AI.',
    xpReward: 500,
    coinReward: 100,
    icon: '🌋'
  },
  {
    id: 'wins_50',
    title: 'Legend',
    description: 'Win 50 matches and dominate the grid!',
    xpReward: 1000,
    coinReward: 250,
    icon: '👑'
  },
  {
    id: 'win_streak_5',
    title: 'On Fire!',
    description: 'Achieve a winning streak of 5 matches.',
    xpReward: 150,
    coinReward: 40,
    icon: '🔥'
  },
  {
    id: 'expert_win',
    title: 'Unbeatable Champion',
    description: 'Defeat the unbeatable Expert difficulty AI.',
    xpReward: 300,
    coinReward: 80,
    icon: '🧠'
  },
  {
    id: 'level_5',
    title: 'Elite Rising',
    description: 'Reach Player Level 5.',
    xpReward: 200,
    coinReward: 50,
    icon: '⭐'
  },
  {
    id: 'level_10',
    title: 'Ascended Master',
    description: 'Reach maximum Level 10.',
    xpReward: 500,
    coinReward: 150,
    icon: '✨'
  }
];

// Returns any newly unlocked achievements based on current player stats/progress
export function evaluateAchievements(
  progress: PlayerProgress,
  lastBeatenAIDifficulty?: string
): Achievement[] {
  const newlyUnlocked: Achievement[] = [];
  const currentUnlocked = new Set(progress.unlockedAchievements);

  // Wins conditions
  if (progress.stats.wins >= 1 && !currentUnlocked.has('wins_1')) {
    newlyUnlocked.push(ALL_ACHIEVEMENTS.find(a => a.id === 'wins_1')!);
  }
  if (progress.stats.wins >= 5 && !currentUnlocked.has('wins_5')) {
    newlyUnlocked.push(ALL_ACHIEVEMENTS.find(a => a.id === 'wins_5')!);
  }
  if (progress.stats.wins >= 10 && !currentUnlocked.has('wins_10')) {
    newlyUnlocked.push(ALL_ACHIEVEMENTS.find(a => a.id === 'wins_10')!);
  }
  if (progress.stats.wins >= 25 && !currentUnlocked.has('wins_25')) {
    newlyUnlocked.push(ALL_ACHIEVEMENTS.find(a => a.id === 'wins_25')!);
  }
  if (progress.stats.wins >= 50 && !currentUnlocked.has('wins_50')) {
    newlyUnlocked.push(ALL_ACHIEVEMENTS.find(a => a.id === 'wins_50')!);
  }

  // Win streak
  if (progress.stats.bestStreak >= 5 && !currentUnlocked.has('win_streak_5')) {
    newlyUnlocked.push(ALL_ACHIEVEMENTS.find(a => a.id === 'win_streak_5')!);
  }

  // Expert win
  if (lastBeatenAIDifficulty === 'expert' && !currentUnlocked.has('expert_win')) {
    newlyUnlocked.push(ALL_ACHIEVEMENTS.find(a => a.id === 'expert_win')!);
  }

  // Level achievements
  if (progress.level >= 5 && !currentUnlocked.has('level_5')) {
    newlyUnlocked.push(ALL_ACHIEVEMENTS.find(a => a.id === 'level_5')!);
  }
  if (progress.level >= 10 && !currentUnlocked.has('level_10')) {
    newlyUnlocked.push(ALL_ACHIEVEMENTS.find(a => a.id === 'level_10')!);
  }

  return newlyUnlocked;
}
