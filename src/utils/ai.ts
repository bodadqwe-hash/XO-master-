/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CellValue, BoardState, Difficulty } from '../types';

// The winning combinations for a 3x3 grid
const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// Helper to determine if a specific player has won
function checkWinner(board: BoardState, player: CellValue): boolean {
  return WINNING_COMBOS.some(combo => 
    combo.every(index => board[index] === player)
  );
}

// Helper to get all open moves
function getEmptyIndices(board: BoardState): number[] {
  return board
    .map((val, idx) => val === null ? idx : -1)
    .filter(val => val !== -1);
}

// Checks if the board is completely full
function isBoardFull(board: BoardState): boolean {
  return board.every(val => val !== null);
}

// Minimax algorithm with depth optimization
function minimax(
  board: BoardState, 
  depth: number, 
  isMaximizing: boolean
): number {
  // 'O' is AI (maximizing), 'X' is Player (minimizing)
  if (checkWinner(board, 'O')) {
    return 10 - depth;
  }
  if (checkWinner(board, 'X')) {
    return depth - 10;
  }
  if (isBoardFull(board)) {
    return 0;
  }

  const emptyIndices = getEmptyIndices(board);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const index of emptyIndices) {
      board[index] = 'O';
      const score = minimax(board, depth + 1, false);
      board[index] = null;
      bestScore = Math.max(bestScore, score);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const index of emptyIndices) {
      board[index] = 'X';
      const score = minimax(board, depth + 1, true);
      board[index] = null;
      bestScore = Math.min(bestScore, score);
    }
    return bestScore;
  }
}

// Identify moves that would result in an immediate win
function findWinningMove(board: BoardState, player: CellValue): number | null {
  const emptyIndices = getEmptyIndices(board);
  for (const index of emptyIndices) {
    const tempBoard = [...board];
    tempBoard[index] = player;
    if (checkWinner(tempBoard, player)) {
      return index;
    }
  }
  return null;
}

// Main logic coordinator to select the AI's move based on difficulty
export function getAIMove(board: BoardState, difficulty: Difficulty): number {
  const emptyIndices = getEmptyIndices(board);
  
  // Guard clause
  if (emptyIndices.length === 0) return -1;

  switch (difficulty) {
    case 'easy': {
      // Direct random cell picking
      const randomIndex = Math.floor(Math.random() * emptyIndices.length);
      return emptyIndices[randomIndex];
    }

    case 'medium': {
      // 50% chance of playing smart (win or block), otherwise random
      const shouldPlaySmart = Math.random() < 0.50;
      if (shouldPlaySmart) {
        // First try to win
        const winMove = findWinningMove(board, 'O');
        if (winMove !== null) return winMove;

        // Second try to block Player (X)
        const blockMove = findWinningMove(board, 'X');
        if (blockMove !== null) return blockMove;
      }
      // Fallback to random
      const randomIndex = Math.floor(Math.random() * emptyIndices.length);
      return emptyIndices[randomIndex];
    }

    case 'hard': {
      // 85% chance of smart moves (win/block/corners), else random
      const shouldPlaySmart = Math.random() < 0.85;
      if (shouldPlaySmart) {
        // Check for winning movement
        const winMove = findWinningMove(board, 'O');
        if (winMove !== null) return winMove;

        // Check for blocking player
        const blockMove = findWinningMove(board, 'X');
        if (blockMove !== null) return blockMove;

        // Take center if available
        if (board[4] === null) return 4;

        // Take corners if available
        const corners = [0, 2, 6, 8].filter(idx => board[idx] === null);
        if (corners.length > 0) {
          const randomCorner = Math.floor(Math.random() * corners.length);
          return corners[randomCorner];
        }
      }
      const randomIndex = Math.floor(Math.random() * emptyIndices.length);
      return emptyIndices[randomIndex];
    }

    case 'expert': {
      // UNBEATABLE Minimax Algorithm
      let bestScore = -Infinity;
      let bestMoveIndex = emptyIndices[0];

      // If it's the first move of AI, and board is empty (AI starts first in some modes)
      // center is always optimal
      if (emptyIndices.length === 9) {
        return 4;
      }

      for (const index of emptyIndices) {
        board[index] = 'O';
        const score = minimax(board, 0, false);
        board[index] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMoveIndex = index;
        }
      }
      return bestMoveIndex;
    }

    default:
      return emptyIndices[0];
  }
}

// Get winning combo details to animate a line or outline glowing cells
export function getWinningCombo(board: BoardState): number[] | null {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo;
    }
  }
  return null;
}
