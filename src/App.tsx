/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  Home, 
  Coins, 
  Flame, 
  Sparkles, 
  Trophy, 
  Cpu, 
  User, 
  AlertCircle,
  HelpCircle,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { 
  CellValue, 
  BoardState, 
  Difficulty, 
  GameStatus, 
  PlayerProgress, 
  Achievement,
  GameSettings
} from './types';

// Importing custom sub-components
import ParticleBackground from './components/ParticleBackground';
import GameBoard from './components/GameBoard';
import HeaderProgress from './components/HeaderProgress';
import StatsModal from './components/StatsModal';
import AchievementsPanel from './components/AchievementsPanel';
import SettingsModal from './components/SettingsModal';
import ShopModal from './components/ShopModal';
import ConfettiCanvas from './components/ConfettiCanvas';

// Utilities
import { getAIMove, getWinningCombo } from './utils/ai';
import { loadProgress, saveProgress, resetProgressToDefault } from './utils/storage';
import { evaluateAchievements } from './utils/achievements';
import { sound } from './utils/audio';
import { TRANSLATIONS } from './utils/translations';
import MenuScreen from './components/MenuScreen';

export default function App() {
  // --- Persistent States ---
  const [progress, setProgress] = useState<PlayerProgress>(() => loadProgress());

  const activeLang = progress.settings.language || 'en';
  const t = TRANSLATIONS[activeLang] || TRANSLATIONS.en;

  // (Offline states active)

  // --- Active Match States ---
  const [board, setBoard] = useState<BoardState>(() => Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<'X' | 'O'>('X');
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);
  const [isAITurn, setIsAITurn] = useState(false);

  // --- Game Mode Selection Details ---
  const [activeMode, setActiveMode] = useState<'menu' | 'playing'>('menu');
  const [playingType, setPlayingType] = useState<'campaign' | 'freeplay' | 'local_pvp'>('freeplay');
  const [campaignLevel, setCampaignLevel] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');

  // --- Live Active Session Tally (Reset when returning to Menu) ---
  const [activeSessionScores, setActiveSessionScores] = useState({ playerWins: 0, aiWins: 0, draws: 0 });

  // --- Dashboard Modals Cues ---
  const [showStats, setShowStats] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showShop, setShowShop] = useState(false);

  // --- Developer monetization payment address ---
  const [developerPaymentEmail, setDeveloperPaymentEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tic_tac_toe_dev_payment_email') || 'bodadqwe@gmail.com';
    }
    return 'bodadqwe@gmail.com';
  });

  const handleUpdateDevEmail = (email: string) => {
    setDeveloperPaymentEmail(email);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tic_tac_toe_dev_payment_email', email);
    }
  };

  const handlePurchaseSkin = (type: 'board' | 'x' | 'o', id: string, coinsPrice: number) => {
    setProgress(prev => {
      let nextCoins = prev.coins;
      let nextUnlockedBoard = prev.unlockedBoardSkins ? [...prev.unlockedBoardSkins] : ['neon'];
      let nextUnlockedX = prev.unlockedXSkins ? [...prev.unlockedXSkins] : ['classic_cyan'];
      let nextUnlockedO = prev.unlockedOSkins ? [...prev.unlockedOSkins] : ['classic_rose'];

      if (coinsPrice > 0) {
        if (prev.coins < coinsPrice) return prev; // protect negative balance
        nextCoins -= coinsPrice;
      }

      if (type === 'board' && !nextUnlockedBoard.includes(id)) {
        nextUnlockedBoard.push(id);
      } else if (type === 'x' && !nextUnlockedX.includes(id)) {
        nextUnlockedX.push(id);
      } else if (type === 'o' && !nextUnlockedO.includes(id)) {
        nextUnlockedO.push(id);
      }

      const updated = {
        ...prev,
        coins: nextCoins,
        unlockedBoardSkins: nextUnlockedBoard,
        unlockedXSkins: nextUnlockedX,
        unlockedOSkins: nextUnlockedO
      };

      saveProgress(updated);
      return updated;
    });
  };

  const handleEquipSkin = (type: 'board' | 'x' | 'o', id: string) => {
    setProgress(prev => {
      const updatedSettings = { ...prev.settings };
      if (type === 'board') {
        updatedSettings.skin = id as any;
      } else if (type === 'x') {
        updatedSettings.xSkin = id;
      } else if (type === 'o') {
        updatedSettings.oSkin = id;
      }

      const updated = {
        ...prev,
        settings: updatedSettings
      };

      saveProgress(updated);
      return updated;
    });
  };

  // --- Achievement Popup Slide Alert Banner ---
  const [unlockedToast, setUnlockedToast] = useState<Achievement | null>(null);

  // --- Sync Music State ---
  useEffect(() => {
    if (progress.settings.musicEnabled) {
      sound.startAmbientMusic();
    } else {
      sound.stopAmbientMusic();
    }
    return () => {
      sound.stopAmbientMusic();
    };
  }, [progress.settings.musicEnabled]);

  // --- Sync Audio Context Activation on Core interaction ---
  const handleUserInteractionGesture = () => {
    // Web Audio API safety activation
    if (progress.settings.soundEnabled) {
      sound.playClick();
    }
  };

  // --- Start Campaign Level Match ---
  const handleStartCampaign = (levelNum: number) => {
    handleUserInteractionGesture();
    
    // Determine level difficulty for 500 levels
    let diff: Difficulty = 'easy';
    if (levelNum >= 16 && levelNum <= 70) diff = 'medium';
    else if (levelNum >= 71 && levelNum <= 200) diff = 'hard';
    else if (levelNum >= 201) diff = 'expert';

    setCampaignLevel(levelNum);
    setSelectedDifficulty(diff);
    setPlayingType('campaign');

    resetGameBoard();
    setActiveMode('playing');
    setActiveSessionScores({ playerWins: 0, aiWins: 0, draws: 0 });
  };

  // --- Start Free Play Practice Match ---
  const handleStartFreePlay = (diff: Difficulty) => {
    handleUserInteractionGesture();
    
    setCampaignLevel(null);
    setSelectedDifficulty(diff);
    setPlayingType('freeplay');

    resetGameBoard();
    setActiveMode('playing');
    setActiveSessionScores({ playerWins: 0, aiWins: 0, draws: 0 });
  };

  // --- Start Local PvP Match (f nfs tilifon) ---
  const handleStartLocalPvP = () => {
    handleUserInteractionGesture();
    
    setCampaignLevel(null);
    setPlayingType('local_pvp');

    resetGameBoard();
    setActiveMode('playing');
    setActiveSessionScores({ playerWins: 0, aiWins: 0, draws: 0 });
  };

  const handleExitToMenu = () => {
    handleUserInteractionGesture();
    setActiveMode('menu');
  };

  // --- Reset/Restart Active Board Grid ---
  const resetGameBoard = () => {
    setBoard(Array(9).fill(null));
    setCurrentTurn('X');
    setGameStatus('playing');
    setWinningCombo(null);
    setIsAITurn(false);
  };

  // --- Player click handler ---
  const handleCellClick = (index: number) => {
    if (board[index] || isAITurn || gameStatus !== 'playing') return;

    if (progress.settings.soundEnabled) {
      sound.playClick();
    }

    const nextBoard = [...board];

    // 1. LOCAL PVP (f nfs tilifon)
    if (playingType === 'local_pvp') {
      nextBoard[index] = currentTurn;
      
      const combo = getWinningCombo(nextBoard);
      if (combo) {
        setWinningCombo(combo);
        setBoard(nextBoard);
        setGameStatus(currentTurn === 'X' ? 'p1_won' : 'p2_won');
        if (progress.settings.soundEnabled) {
          sound.playWin();
        }
        setActiveSessionScores(prev => ({
          ...prev,
          playerWins: currentTurn === 'X' ? prev.playerWins + 1 : prev.playerWins,
          aiWins: currentTurn === 'O' ? prev.aiWins + 1 : prev.aiWins
        }));
      } else if (nextBoard.every(cell => cell !== null)) {
        setBoard(nextBoard);
        setGameStatus('draw');
        if (progress.settings.soundEnabled) {
          sound.playDraw();
        }
        setActiveSessionScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      } else {
        setBoard(nextBoard);
        setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');
      }
      return;
    }

    // 2. CAMPAIGN AND PRACTICE FREEPLAY (Player vs AI)
    nextBoard[index] = 'X';

    // Verify if player won
    const combo = getWinningCombo(nextBoard);
    if (combo) {
      setWinningCombo(combo);
      handleGameEnded(nextBoard, 'player_won', combo);
    } else if (nextBoard.every(cell => cell !== null)) {
      handleGameEnded(nextBoard, 'draw', null);
    } else {
      setBoard(nextBoard);
      setCurrentTurn('O');
      setIsAITurn(true);
    }
  };

  // --- AI / Simulated Peer Automated Move Execution ---
  useEffect(() => {
    if (activeMode === 'playing' && gameStatus === 'playing' && isAITurn) {
      const delayTime = 700;
      
      const timer = setTimeout(() => {
        const diff = selectedDifficulty;
        const aiIndex = getAIMove(board, diff);
        if (aiIndex === -1) return;

        const nextBoard = [...board];
        nextBoard[aiIndex] = 'O';

        const combo = getWinningCombo(nextBoard);
        if (combo) {
          setWinningCombo(combo);
          handleGameEnded(nextBoard, 'ai_won', combo);
        } else if (nextBoard.every(cell => cell !== null)) {
          handleGameEnded(nextBoard, 'draw', null);
        } else {
          setBoard(nextBoard);
          setCurrentTurn('X');
          setIsAITurn(false);
          if (progress.settings.soundEnabled) sound.playClick();
        }
      }, delayTime);

      return () => clearTimeout(timer);
    }
  }, [activeMode, gameStatus, isAITurn, board, selectedDifficulty]);

  // --- Process Match Ends (Scores, XP, Coins and Achievement evaluations) ---
  const handleGameEnded = (
    finalBoard: BoardState,
    outcome: 'player_won' | 'ai_won' | 'draw',
    combo: number[] | null
  ) => {
    setBoard(finalBoard);
    setGameStatus(outcome);
    setIsAITurn(false);

    // Initial tally adjustments
    let xpGained = 0;
    let coinsGained = 0;

    const currentStats = { ...progress.stats };
    currentStats.totalGames += 1;

    if (outcome === 'player_won') {
      if (progress.settings.soundEnabled) {
        sound.playWin();
      }

      currentStats.wins += 1;
      currentStats.currentStreak += 1;
      if (currentStats.currentStreak > currentStats.bestStreak) {
        currentStats.bestStreak = currentStats.currentStreak;
      }

      // Track active session wins count
      setActiveSessionScores(prev => ({ ...prev, playerWins: prev.playerWins + 1 }));

      // Distribute rewards depending on game type
      if (playingType === 'campaign' && campaignLevel !== null) {
        // Dynamically scaled campaign rewards to support 500 levels
        xpGained = Math.min(1000, 50 + campaignLevel * 3);
        coinsGained = Math.min(250, 15 + campaignLevel);

        // Unlock next Level Campaign (Up to 500 levels)
        if (campaignLevel === progress.unlockedLevel && progress.unlockedLevel < 500) {
          setProgress(prev => {
            const nextUnlocked = prev.unlockedLevel + 1;
            const nextProg = { ...prev, unlockedLevel: nextUnlocked };
            saveProgress(nextProg);
            return nextProg;
          });
        }
      } else {
        // Free Play Rewards
        const freePlayRewards = {
          easy: { xp: 15, coins: 5 },
          medium: { xp: 35, coins: 12 },
          hard: { xp: 60, coins: 25 },
          expert: { xp: 90, coins: 50 }
        };
        xpGained = freePlayRewards[selectedDifficulty].xp;
        coinsGained = freePlayRewards[selectedDifficulty].coins;
      }

    } else if (outcome === 'ai_won') {
      if (progress.settings.soundEnabled) {
        sound.playLose();
      }

      currentStats.losses += 1;
      currentStats.currentStreak = 0; // reset active winning streak
      setActiveSessionScores(prev => ({ ...prev, aiWins: prev.aiWins + 1 }));

      // Modest participation XP for trying
      xpGained = 4; 
      coinsGained = 1;

    } else { // Draw match
      if (progress.settings.soundEnabled) {
        sound.playDraw();
      }

      currentStats.draws += 1;
      currentStats.currentStreak = 0; // reset
      setActiveSessionScores(prev => ({ ...prev, draws: prev.draws + 1 }));

      xpGained = 10;
      coinsGained = 3;
    }

    // Save final stats and xp formulas safely
    addXPAndCoinsAndStats(xpGained, coinsGained, currentStats, outcome === 'player_won' ? selectedDifficulty : undefined);
  };

  // --- Add Gained items recursively & process levels ---
  const addXPAndCoinsAndStats = (
    xpGained: number,
    coinsGained: number,
    updatedStats: PlayerProgress['stats'],
    beatenAIDifficulty?: Difficulty
  ) => {
    setProgress((prev) => {
      let nextXP = prev.xp + xpGained;
      let nextLevel = prev.level;
      let nextXPToNext = prev.xpToNextLevel;

      // Handle levels calculation loops
      while (nextXP >= nextXPToNext) {
        nextXP -= nextXPToNext;
        nextLevel += 1;
        nextXPToNext = nextLevel * 100;
      }

      let nextCoins = prev.coins + coinsGained;

      // Prepare intermediate state to calculate Achievements
      const intermediateProgress: PlayerProgress = {
        ...prev,
        level: nextLevel,
        xp: nextXP,
        xpToNextLevel: nextXPToNext,
        coins: nextCoins,
        stats: updatedStats
      };

      // Check for freshly unlocked milestones
      const unlockedSet = new Set(prev.unlockedAchievements);
      const newlyEarnedList = evaluateAchievements(intermediateProgress, beatenAIDifficulty);
      const newIds = newlyEarnedList.map(a => a.id).filter(id => !unlockedSet.has(id));

      let finalXP = nextXP;
      let finalLevel = nextLevel;
      let finalXPToNext = nextXPToNext;
      let finalCoins = nextCoins;
      const finalAchievements = [...prev.unlockedAchievements];

      if (newIds.length > 0) {
        newIds.forEach((id) => {
          finalAchievements.push(id);
          const ach = newlyEarnedList.find(a => a.id === id);
          if (ach) {
            finalCoins += ach.coinReward;
            finalXP += ach.xpReward;
            
            // Queue up an in-game alert banner
            setUnlockedToast(ach);
          }
        });

        // Recalculate level transitions which could trigger from achievement rewards!
        while (finalXP >= finalXPToNext) {
          finalXP -= finalXPToNext;
          finalLevel += 1;
          finalXPToNext = finalLevel * 100;
        }
      }

      const finalProgress: PlayerProgress = {
        ...intermediateProgress,
        level: finalLevel,
        xp: finalXP,
        xpToNextLevel: finalXPToNext,
        coins: finalCoins,
        unlockedAchievements: finalAchievements
      };

      saveProgress(finalProgress);
      return finalProgress;
    });
  };

  // --- Close toast banner ---
  const handleDismissToast = () => {
    setUnlockedToast(null);
  };

  // --- Update system configurations ---
  const handleUpdateSettings = (updated: Partial<GameSettings>) => {
    setProgress((prev) => {
      const nextProgress = {
        ...prev,
        settings: {
          ...prev.settings,
          ...updated
        }
      };
      saveProgress(nextProgress);
      return nextProgress;
    });
  };

  // --- Reset/Wipe Profile ---
  const handleResetProgress = () => {
    const defaultData = resetProgressToDefault();
    setProgress(defaultData);
    setActiveMode('menu');
  };

  return (
    <div id="game-app-wrapper" className="min-h-screen text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* CPU friendly moving visual patterns backdrop */}
      <ParticleBackground />

      {/* Confetti canvas celebrate */}
      <ConfettiCanvas active={gameStatus === 'player_won'} />

      {/* Floating neon accent ambient decorations blur overlays */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-20" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-600/10  rounded-full blur-3xl pointer-events-none -z-20" />

      {/* Top Slide Up Achievement Unlock Toast */}
      <AnimatePresence>
        {unlockedToast && (
          <motion.div
            key={unlockedToast.id}
            id="achievement-popup-toast"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            onClick={handleDismissToast}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs md:max-w-sm bg-slate-900/95 border border-purple-500/40 rounded-2xl p-4 shadow-2xl flex items-start gap-3 cursor-pointer"
          >
            <div className="text-3xl p-1 shrink-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              {unlockedToast.icon}
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest block">
                Milestone Reached!
              </span>
              <h4 className="font-extrabold text-sm text-slate-100 mt-0.5">{unlockedToast.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{unlockedToast.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[9px] font-mono font-bold bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-400/10">
                  +{unlockedToast.xpReward} XP
                </span>
                <span className="text-[9px] font-mono font-bold bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/10 flex items-center gap-0.5">
                  <Coins size={8} />
                  +{unlockedToast.coinReward}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application core workspace frame centering */}
      <main id="app-main-frame" className="flex-grow flex items-center justify-center p-4">
        
        <div id="content-card-holder" className="w-full max-w-md flex flex-col gap-5">
          
          {/* Header Progress Dashboard Bar */}
          <HeaderProgress
            progress={progress}
            onOpenStats={() => { handleUserInteractionGesture(); setShowStats(true); }}
            onOpenAchievements={() => { handleUserInteractionGesture(); setShowAchievements(true); }}
            onOpenSettings={() => { handleUserInteractionGesture(); setShowSettings(true); }}
            onOpenShop={() => { handleUserInteractionGesture(); setShowShop(true); }}
          />

          {/* Active Screens router */}
          {activeMode === 'menu' ? (
            <MenuScreen
              unlockedLevel={progress.unlockedLevel}
              highestWins={progress.stats.wins}
              onStartCampaign={handleStartCampaign}
              onStartFreePlay={handleStartFreePlay}
              onStartLocalPvP={handleStartLocalPvP}
              language={progress.settings.language || 'en'}
            />
          ) : (
            // GAMEPLAY WORKSPACE VIEW
            <motion.div
              id="gameplay-viewport"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4 md:gap-5"
            >
              {/* Gameplay details top row stats */}
              <div id="active-match-header" className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-4 flex items-center justify-between shadow-lg">
                <button
                  id="active-quit-menu-btn"
                  onClick={handleExitToMenu}
                  className="p-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 rounded-lg text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono cursor-pointer"
                >
                  <Home size={14} />
                  <span>{t.back_to_menu || 'Menu'}</span>
                </button>

                <div className="text-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                    {playingType === 'campaign' && (t.campaign_progress || 'Campaign')}
                    {playingType === 'freeplay' && (t.freeplay_practice || 'Practice')}
                    {playingType === 'local_pvp' && (t.local_pvp_title || 'Same Phone')}
                  </span>
                  <span className="font-extrabold text-xs md:text-sm text-cyan-400">
                    {playingType === 'campaign' && `${t.level_word || 'Level'} ${campaignLevel}`}
                    {playingType === 'freeplay' && `${selectedDifficulty.toUpperCase()} AI`}
                    {playingType === 'local_pvp' && `${t.local_pvp_badge || 'PVP'} ⚔️`}
                  </span>
                </div>

                <button
                  id="active-reset-grid-btn"
                  onClick={() => { handleUserInteractionGesture(); resetGameBoard(); }}
                  className="p-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 rounded-lg text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>{t.play_again_btn || 'Restart'}</span>
                </button>
              </div>

              {/* Turn cues displays & think delays status */}
              <div id="active-turn-hud" className="text-center bg-slate-950/40 border border-slate-850 p-3 rounded-2xl">
                {gameStatus === 'playing' ? (
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span className="text-slate-400 font-mono">Status:</span>
                    {playingType === 'local_pvp' ? (
                      currentTurn === 'X' ? (
                        <span className="text-cyan-400 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                          <User size={12} />
                          {t.p1_turn || 'Friend 1 Turn (X)'}
                        </span>
                      ) : (
                        <span className="text-pink-400 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                          <User size={12} />
                          {t.p2_turn || 'Friend 2 Turn (O)'}
                        </span>
                      )
                    ) : (
                      isAITurn ? (
                        <span className="text-pink-500 font-bold flex items-center gap-1.5 animate-pulse uppercase tracking-wide">
                          <Cpu size={12} className="animate-spin" style={{ animationDuration: '3s' }} />
                          {t.ai_computing || 'AI is Computing...'}
                        </span>
                      ) : (
                        <span className="text-cyan-400 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                          <User size={12} />
                          {t.your_turn || 'Your Turn (Place X)'}
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    {playingType === 'local_pvp' ? (
                      gameStatus === 'p1_won' ? (
                        <h3 className="text-emerald-400 font-black tracking-wide text-sm flex items-center justify-center gap-1.5 animate-bounce uppercase font-sans">
                          <Trophy size={14} />
                          {t.p1_victory || 'Friend 1 (X) Wins! 🎉'}
                        </h3>
                      ) : gameStatus === 'p2_won' ? (
                        <h3 className="text-pink-400 font-black tracking-wide text-sm flex items-center justify-center gap-1.5 animate-bounce uppercase font-sans">
                          <Trophy size={14} />
                          {t.p2_victory || 'Friend 2 (O) Wins! 🎉'}
                        </h3>
                      ) : (
                        <h3 className="text-slate-400 font-black tracking-wide text-sm flex items-center justify-center gap-1.5 uppercase font-sans">
                          <HelpCircle size={14} />
                          {t.local_draw || 'Draw Match! 🤝'}
                        </h3>
                      )
                    ) : (
                      <>
                        {gameStatus === 'player_won' && (
                          <h3 className="text-emerald-400 font-black tracking-wide text-sm flex items-center justify-center gap-1.5 animate-bounce uppercase">
                            <Trophy size={14} />
                            {t.victory_achieved || 'VICTORY ACHIEVED! 🎉'}
                          </h3>
                        )}
                        {gameStatus === 'ai_won' && (
                          <h3 className="text-rose-500 font-black tracking-wide text-sm flex items-center justify-center gap-1.5 uppercase">
                            <AlertCircle size={14} />
                            {t.defeat_imposed || 'DEFEAT IMPOSED 🤖'}
                          </h3>
                        )}
                        {gameStatus === 'draw' && (
                          <h3 className="text-slate-400 font-black tracking-wide text-sm flex items-center justify-center gap-1.5 uppercase">
                            <HelpCircle size={14} />
                            {t.neutral_draw || 'NEUTRAL DRAW 🤝'}
                          </h3>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Score indicators */}
              <div id="session-score-card" className="grid grid-cols-3 gap-2 text-center bg-slate-950/20 border border-slate-900 rounded-2xl p-2.5">
                <div>
                  <span className="text-[9px] text-slate-550 font-bold tracking-wider uppercase block truncate">
                    {playingType === 'local_pvp' ? (t.score_p1_x || 'Friend 1 (X)') : (t.score_player_x || 'Player (X)')}
                  </span>
                  <span className="text-sm font-black font-mono text-cyan-400">{activeSessionScores.playerWins}</span>
                </div>
                <div className="border-x border-slate-900">
                  <span className="text-[9px] text-slate-550 font-bold tracking-wider uppercase block">
                    {t.score_draws || 'Draws'}
                  </span>
                  <span className="text-sm font-black font-mono text-slate-400">{activeSessionScores.draws}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-550 font-bold tracking-wider uppercase block truncate">
                    {playingType === 'local_pvp' ? (t.score_p2_o || 'Friend 2 (O)') : (t.score_ai_o || 'AI (O)')}
                  </span>
                  <span className="text-sm font-black font-mono text-pink-500">{activeSessionScores.aiWins}</span>
                </div>
              </div>

              {/* Interactive board visual frame */}
              <GameBoard
                board={board}
                onCellClick={handleCellClick}
                winningCombo={winningCombo}
                isAITurn={isAITurn}
                skin={progress.settings.skin}
                xSkin={progress.settings.xSkin}
                oSkin={progress.settings.oSkin}
              />

              {/* Game ending overlay indicators buttons */}
              {gameStatus !== 'playing' && gameStatus !== 'idle' && (
                <motion.div
                  id="ended-game-prompt-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-4 rounded-3xl flex flex-col items-center gap-3 shadow-xl"
                >
                  <div className="text-center">
                    <span className="text-xs text-slate-400 block mb-1">
                      {gameStatus === 'player_won' 
                        ? 'Great strategy! Gained rewards:' 
                        : gameStatus === 'ai_won' 
                          ? 'Better luck next time. Gained:' 
                          : 'Tied match. Gained:'
                      }
                    </span>
                    <div className="flex items-center justify-center gap-2.5">
                      <span className="text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/15">
                        +{gameStatus === 'player_won' ? (playingType === 'campaign' ? 'Multiplier' : 'XP') : (gameStatus === 'draw' ? '10' : '4')} XP
                      </span>
                      <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/15 flex items-center gap-0.5">
                        <Coins size={10} />
                        +{gameStatus === 'player_won' ? (playingType === 'campaign' ? 'Coins' : '5') : (gameStatus === 'draw' ? '3' : '1')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 w-full mt-1">
                    <button
                      id="gameover-quit-btn"
                      onClick={handleExitToMenu}
                      className="py-3 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl text-xs text-slate-300 font-bold transition-all cursor-pointer"
                    >
                      Exit to Menu
                    </button>
                    <button
                      id="gameover-play-btn"
                      onClick={() => {
                        handleUserInteractionGesture();
                        resetGameBoard();
                      }}
                      className="py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
                    >
                      Play Again
                    </button>
                  </div>
                </motion.div>
              )}

            </motion.div>
          )}

          {/* Bottom attribution labels */}
          <footer className="text-center py-2 text-slate-600 text-[10px] select-none font-mono">
            &copy; 2026 XO PREMIUM MATRIX WORKSPACE ALL RIGHTS RESERVED
          </footer>

        </div>
      </main>

      {/* --- Overlay Modals --- */}
      <StatsModal
        stats={progress.stats}
        isOpen={showStats}
        onClose={() => { handleUserInteractionGesture(); setShowStats(false); }}
      />

      <AchievementsPanel
        progress={progress}
        isOpen={showAchievements}
        onClose={() => { handleUserInteractionGesture(); setShowAchievements(false); }}
      />

      <SettingsModal
        settings={progress.settings}
        isOpen={showSettings}
        onClose={() => { handleUserInteractionGesture(); setShowSettings(false); }}
        onUpdateSettings={handleUpdateSettings}
        onResetProgress={handleResetProgress}
      />

      <ShopModal
        isOpen={showShop}
        onClose={() => { handleUserInteractionGesture(); setShowShop(false); }}
        progress={progress}
        onPurchaseSkin={handlePurchaseSkin}
        onEquipSkin={handleEquipSkin}
        onUpdateDeveloperPayment={handleUpdateDevEmail}
        developerPaymentEmail={developerPaymentEmail}
      />



    </div>
  );
}
