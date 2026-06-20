/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BoardState, CellValue } from '../types';

const winningLinesMap: Record<string, { x1: number; y1: number; x2: number; y2: number }> = {
  '0,1,2': { x1: 5, y1: 16.7, x2: 95, y2: 16.7 },
  '3,4,5': { x1: 5, y1: 50, x2: 95, y2: 50 },
  '6,7,8': { x1: 5, y1: 83.3, x2: 95, y2: 83.3 },
  '0,3,6': { x1: 16.7, y1: 5, x2: 16.7, y2: 95 },
  '1,4,7': { x1: 50, y1: 5, x2: 50, y2: 95 },
  '2,5,8': { x1: 83.3, y1: 5, x2: 83.3, y2: 95 },
  '0,4,8': { x1: 10, y1: 10, x2: 90, y2: 90 },
  '2,4,6': { x1: 90, y1: 10, x2: 10, y2: 90 },
};

interface GameBoardProps {
  board: BoardState;
  onCellClick: (index: number) => void;
  winningCombo: number[] | null;
  isAITurn: boolean;
  skin: 'neon' | 'cyberpunk' | 'retro' | 'royal' | 'galaxy' | 'matrix' | 'lava' | 'gold' | 'aurora_nordic' | 'quantum_void';
  xSkin?: string;
  oSkin?: string;
}

const getXSkinStyles = (skinId: string, fallbackColor: string) => {
  switch (skinId) {
    case 'plasma_purple':
      return { color: '#c084fc', glow: 'drop-shadow-[0_0_10px_rgba(192,132,252,0.9)]' };
    case 'emerald_green':
      return { color: '#34d399', glow: 'drop-shadow-[0_0_8px_rgba(52,211,153,0.9)]' };
    case 'electric_yellow':
      return { color: '#facc15', glow: 'drop-shadow-[0_0_9px_rgba(250,204,21,0.95)]' };
    case 'blood_ruby':
      return { color: '#f43f5e', glow: 'drop-shadow-[0_0_10px_rgba(244,63,94,0.95)]' };
    case 'solid_gold':
      return { color: '#fbbf24', glow: 'drop-shadow-[0_0_14px_rgba(251,191,36,0.95)]' };
    case 'quantum_neon':
      return { color: '#a855f7', glow: 'drop-shadow-[0_0_15px_rgba(168,85,247,0.9)] rgb(34, 211, 238)' };
    case 'magma_spark':
      return { color: '#f97316', glow: 'drop-shadow-[0_0_15px_rgba(249,115,22,0.95)]' };
    case 'classic_cyan':
    default:
      return { color: '#22d3ee', glow: 'drop-shadow-[0_0_8px_rgba(34,211,238,0.85)]' };
  }
};

const getOSkinStyles = (skinId: string, fallbackColor: string) => {
  switch (skinId) {
    case 'cyber_indigo':
      return { color: '#818cf8', glow: 'drop-shadow-[0_0_10px_rgba(129,140,248,0.9)]' };
    case 'toxic_lime':
      return { color: '#a3e635', glow: 'drop-shadow-[0_0_8px_rgba(163,230,53,0.9)]' };
    case 'amber_blaze':
      return { color: '#fb923c', glow: 'drop-shadow-[0_0_9px_rgba(251,146,60,0.95)]' };
    case 'stellar_nexus':
      return { color: '#f472b6', glow: 'drop-shadow-[0_0_10px_rgba(244,114,182,0.9)]' };
    case 'imperial_gold':
      return { color: '#fbbf24', glow: 'drop-shadow-[0_0_14px_rgba(251,191,36,0.95)]' };
    case 'polar_wind':
      return { color: '#38bdf8', glow: 'drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]' };
    case 'divine_sun':
      return { color: '#f59e0b', glow: 'drop-shadow-[0_0_16px_rgba(245,158,11,0.95)]' };
    case 'classic_rose':
    default:
      return { color: '#f43f5e', glow: 'drop-shadow-[0_0_8px_rgba(244,63,94,0.85)]' };
  }
};

export default function GameBoard({
  board,
  onCellClick,
  winningCombo,
  isAITurn,
  skin,
  xSkin,
  oSkin
}: GameBoardProps) {
  
  // Theme styling dictionaries based on selected skin
  const skinStyles = {
    neon: {
      grid: 'border-slate-800 bg-slate-900/40 backdrop-blur-md rounded-2xl p-4 shadow-2xl shadow-cyan-500/5 border border-cyan-500/10',
      cell: 'bg-slate-950/60 hover:bg-slate-900/80 border border-slate-800/60 shadow-inner rounded-xl',
      lines: 'bg-slate-800/80',
      xColor: '#22d3ee', // Cyan 400
      xGlow: 'drop-shadow-[0_0_8px_rgba(34,211,238,0.85)]',
      oColor: '#f43f5e', // Rose 500
      oGlow: 'drop-shadow-[0_0_8px_rgba(244,63,94,0.85)]',
      winPulse: 'bg-cyan-500/20 shadow-[0_0_25px_rgba(34,211,238,0.5)] border-cyan-400'
    },
    cyberpunk: {
      grid: 'border-purple-950 bg-slate-950/80 rounded-none p-4 shadow-[0_0_20px_rgba(168,85,247,0.15)] border-2 border-purple-500',
      cell: 'bg-black hover:bg-purple-950/30 border border-purple-900/50 rounded-none',
      lines: 'bg-yellow-400',
      xColor: '#eab308', // Yellow 500
      xGlow: 'drop-shadow-[0_0_10px_rgba(234,179,8,0.95)]',
      oColor: '#a855f7', // Purple 500
      oGlow: 'drop-shadow-[0_0_10px_rgba(168,85,247,0.95)]',
      winPulse: 'bg-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.7)] border-yellow-400 border-2'
    },
    retro: {
      grid: 'border-emerald-950 bg-zinc-950 rounded-md p-4 shadow-[5px_5px_0px_0px_rgba(16,185,129,0.3)] border-4 border-emerald-500',
      cell: 'bg-black hover:bg-emerald-950/20 border-2 border-emerald-900 rounded-none font-mono',
      lines: 'bg-emerald-500',
      xColor: '#10b981', // Emerald 500
      xGlow: 'drop-shadow-[0_0_4px_rgba(16,185,129,0.9)]',
      oColor: '#f97316', // Orange 500
      oGlow: 'drop-shadow-[0_0_4px_rgba(249,115,22,0.9)]',
      winPulse: 'bg-emerald-500/20 shadow-none border-dashed border-2 border-emerald-400'
    },
    royal: {
      grid: 'border-slate-300 bg-slate-900/60 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border border-amber-500/20',
      cell: 'bg-slate-950/80 hover:bg-slate-900 border border-amber-500/10 rounded-2xl',
      lines: 'bg-amber-300/40',
      xColor: '#f59e0b', // Amber 500
      xGlow: 'drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]',
      oColor: '#e2e8f0', // Slate 200
      oGlow: 'drop-shadow-[0_0_12px_rgba(226,232,240,0.8)]',
      winPulse: 'bg-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.4)] border-amber-400'
    },
    galaxy: {
      grid: 'border-fuchsia-950 bg-slate-950/90 rounded-3xl p-4 shadow-[0_0_20px_rgba(139,92,246,0.2)] border border-fuchsia-500/30',
      cell: 'bg-slate-900/40 hover:bg-fuchsia-950/20 border border-fuchsia-900/30 rounded-2xl',
      lines: 'bg-fuchsia-500/60',
      xColor: '#c084fc', // purple
      xGlow: 'drop-shadow-[0_0_8px_rgba(192,132,252,0.85)]',
      oColor: '#818cf8', // indigo
      oGlow: 'drop-shadow-[0_0_8px_rgba(129,140,248,0.85)]',
      winPulse: 'bg-fuchsia-500/20 shadow-[0_0_25px_rgba(192,132,252,0.5)] border-fuchsia-400'
    },
    matrix: {
      grid: 'border-zinc-900 bg-[#061806] rounded-sm p-4 border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]',
      cell: 'bg-black/9y hover:bg-green-950/20 border border-green-900/40 rounded-none',
      lines: 'bg-green-500/80',
      xColor: '#22c55e', // green
      xGlow: 'drop-shadow-[0_0_6px_rgba(34,197,94,0.9)]',
      oColor: '#16a34a', // darker green
      oGlow: 'drop-shadow-[0_0_6px_rgba(22,163,74,0.9)]',
      winPulse: 'bg-green-500/20 border-dashed border-2 border-green-400'
    },
    lava: {
      grid: 'border-amber-950 bg-zinc-950 rounded-2xl p-4 border-2 border-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.25)]',
      cell: 'bg-black hover:bg-orange-950/20 border border-orange-900/50 rounded-xl',
      lines: 'bg-orange-600',
      xColor: '#ef4444', // fiery red
      xGlow: 'drop-shadow-[0_0_8px_rgba(239,68,68,0.95)]',
      oColor: '#f97316', // orange
      oGlow: 'drop-shadow-[0_0_8px_rgba(249,115,22,0.95)]',
      winPulse: 'bg-orange-500/20 shadow-[0_0_25px_rgba(249,115,22,0.4)] border-amber-500'
    },
    gold: {
      grid: 'border-yellow-700/60 bg-slate-900 p-4 rounded-3xl border-2 border-yellow-500 shadow-[0_0_25px_rgba(234,179,8,0.3)]',
      cell: 'bg-slate-950 hover:bg-yellow-950/10 border border-yellow-550/20 rounded-2xl',
      lines: 'bg-yellow-500/60',
      xColor: '#facc15', // shiny yellow
      xGlow: 'drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]',
      oColor: '#eab308', // dark gold
      oGlow: 'drop-shadow-[0_0_12px_rgba(234,179,8,0.9)]',
      winPulse: 'bg-yellow-500/10 shadow-[0_0_25px_rgba(250,204,21,0.5)] border-yellow-400'
    },
    aurora_nordic: {
      grid: 'border-teal-950 bg-slate-950 rounded-3xl p-4 border border-teal-500 shadow-[0_0_25px_rgba(20,184,166,0.25)]',
      cell: 'bg-slate-900/60 hover:bg-teal-950/20 border border-teal-900/35 rounded-xl',
      lines: 'bg-teal-500/50',
      xColor: '#2dd4bf', // Teal 400
      xGlow: 'drop-shadow-[0_0_10px_rgba(45,212,191,0.9)]',
      oColor: '#6366f1', // Indigo 500
      oGlow: 'drop-shadow-[0_0_10px_rgba(99,102,241,0.9)]',
      winPulse: 'bg-teal-500/10 shadow-[0_0_25px_rgba(45,212,191,0.4)] border-teal-400'
    },
    quantum_void: {
      grid: 'border-fuchsia-750 bg-black/95 rounded-3xl p-5 border-2 border-fuchsia-500 shadow-[0_0_40px_rgba(217,70,239,0.35)]',
      cell: 'bg-zinc-950 hover:bg-fuchsia-950/30 border border-fuchsia-500/20 rounded-2xl',
      lines: 'bg-cyan-500/70',
      xColor: '#f43f5e', // Rose 500
      xGlow: 'drop-shadow-[0_0_14px_rgba(244,63,94,0.95)]',
      oColor: '#22d3ee', // Cyan 400
      oGlow: 'drop-shadow-[0_0_14px_rgba(34,211,238,0.95)]',
      winPulse: 'bg-fuchsia-500/20 shadow-[0_0_35px_rgba(217,70,239,0.65)] border-cyan-400'
    }
  }[skin];

  const activeX = getXSkinStyles(xSkin || 'classic_cyan', skinStyles.xColor);
  const activeO = getOSkinStyles(oSkin || 'classic_rose', skinStyles.oColor);

  const renderSymbol = (value: CellValue, index: number) => {
    if (!value) return null;

    const isWinningCell = winningCombo?.includes(index);
    const pulseClass = isWinningCell ? 'scale-110' : '';

    if (value === 'X') {
      return (
        <motion.svg
          id={`cell-svg-x-${index}`}
          className={`w-14 h-14 md:w-16 md:h-16 ${activeX.glow} ${pulseClass} transition-transform duration-300`}
          viewBox="0 0 100 100"
          initial="hidden"
          animate="visible"
        >
          {/* Animated Draw Strokes */}
          <motion.line
            x1="25"
            y1="25"
            x2="75"
            y2="75"
            stroke={activeX.color}
            strokeWidth="10"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0 },
              visible: { pathLength: 1, transition: { duration: 0.35, ease: 'easeOut' } }
            }}
          />
          <motion.line
            x1="75"
            y1="25"
            x2="25"
            y2="75"
            stroke={activeX.color}
            strokeWidth="10"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0 },
              visible: { pathLength: 1, transition: { duration: 0.35, delay: 0.15, ease: 'easeOut' } }
            }}
          />
        </motion.svg>
      );
    } else {
      return (
        <motion.svg
          id={`cell-svg-o-${index}`}
          className={`w-14 h-14 md:w-16 md:h-16 ${activeO.glow} ${pulseClass} transition-transform duration-300`}
          viewBox="0 0 100 100"
          initial="hidden"
          animate="visible"
        >
          {/* Circle draw stroke */}
          <motion.circle
            cx="50"
            cy="50"
            r="26"
            stroke={activeO.color}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, rotate: -90 },
              visible: { 
                pathLength: 1, 
                rotate: 270, 
                transition: { duration: 0.45, ease: 'easeInOut' } 
              }
            }}
          />
        </motion.svg>
      );
    }
  };

  return (
    <div id="game-board-container" className="relative w-full max-w-sm mx-auto aspect-square">
      <div 
        id="board-grid" 
        className={`grid grid-cols-3 grid-rows-3 gap-3 w-full h-full ${skinStyles.grid}`}
      >
        {board.map((value, index) => {
          const isWinning = winningCombo?.includes(index);
          return (
            <motion.button
              key={index}
              id={`board-cell-${index}`}
              onClick={() => {
                if (!board[index] && !isAITurn) {
                  onCellClick(index);
                }
              }}
              disabled={board[index] !== null || isAITurn || winningCombo !== null}
              className={`relative flex items-center justify-center cursor-pointer select-none transition-all duration-300 ${skinStyles.cell}
                ${isWinning ? skinStyles.winPulse : ''}
                ${isAITurn ? 'cursor-not-allowed' : ''}
              `}
              whileHover={!value && !isAITurn ? { scale: 1.05 } : {}}
              whileTap={!value && !isAITurn ? { scale: 0.95 } : {}}
            >
              {renderSymbol(value, index)}
              {/* Optional cell indicator coordinate labels on Retro skin */}
              {skin === 'retro' && !value && (
                <span className="absolute bottom-1 right-1 text-[8px] opacity-20 pointer-events-none font-mono">
                  {Math.floor(index / 3)},{index % 3}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Dynamic Glow Overlay Strike Line */}
      {winningCombo && (() => {
        const comboKey = [...winningCombo].sort((a, b) => a - b).join(',');
        const coords = winningLinesMap[comboKey];
        const winnerSymbol = board[winningCombo[0]];
        if (!coords || !winnerSymbol) return null;

        const lineStroke = winnerSymbol === 'X' ? activeX.color : activeO.color;
        const lineGlowClass = winnerSymbol === 'X' ? activeX.glow : activeO.glow;

        return (
          <svg 
            id="winning-line-overlay-svg"
            className={`absolute inset-0 w-full h-full pointer-events-none z-20 ${lineGlowClass}`}
            viewBox="0 0 100 100"
          >
            <motion.line
              x1={coords.x1}
              y1={coords.y1}
              x2={coords.x2}
              y2={coords.y2}
              stroke={lineStroke}
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </svg>
        );
      })()}
    </div>
  );
}
