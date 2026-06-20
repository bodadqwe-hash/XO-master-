/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BarChart, Trophy, X, ShieldAlert, Award } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PlayerStats } from '../types';

interface StatsModalProps {
  stats: PlayerStats;
  isOpen: boolean;
  onClose: () => void;
}

export default function StatsModal({ stats, isOpen, onClose }: StatsModalProps) {
  if (!isOpen) return null;

  const totalMatches = stats.wins + stats.losses + stats.draws;
  const winRate = totalMatches > 0 ? Math.round((stats.wins / totalMatches) * 100) : 0;

  return (
    <div id="stats-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        id="stats-modal-card" 
        className="relative w-full max-w-sm overflow-hidden bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-6"
      >
        {/* Neon decorative background glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -ml-6 -mb-6 pointer-events-none" />

        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BarChart className="text-cyan-400 w-5 h-5 animate-pulse" />
            <h2 className="text-lg font-extrabold text-slate-100 uppercase tracking-wider">
              Battle Stats
            </h2>
          </div>
          <button
            id="stats-close-btn"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Circular Win Rate Meter */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-slate-950 border border-slate-800 shadow-inner">
            {/* SVG circle stroke background */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="#1e293b"// Slate 800
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="url(#win-glow-gradient)"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={2 * Math.PI * 46 * (1 - winRate / 100)}
                strokeLinecap="round"
                fill="transparent"
              />
              <defs>
                <linearGradient id="win-glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="text-center">
              <span className="text-2xl font-black font-mono text-cyan-400">{winRate}%</span>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                Win Rate
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic score card numbers */}
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/40">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Wins</span>
            <p className="text-lg font-black font-mono text-emerald-400 mt-0.5">{stats.wins}</p>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/40">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Losses</span>
            <p className="text-lg font-black font-mono text-rose-500 mt-0.5">{stats.losses}</p>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/40">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Draws</span>
            <p className="text-lg font-black font-mono text-slate-400 mt-0.5">{stats.draws}</p>
          </div>
        </div>

        {/* Wins, Losses, Draws Ratio Pie Chart */}
        {(() => {
          const isEmpty = totalMatches === 0;
          const chartData = isEmpty
            ? [{ name: 'No Games', value: 1, color: '#334155' }]
            : [
                { name: 'Wins', value: stats.wins, color: '#10b981' },
                { name: 'Losses', value: stats.losses, color: '#f43f5e' },
                { name: 'Draws', value: stats.draws, color: '#94a3b8' }
              ];

          const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              if (isEmpty) {
                return (
                  <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-mono font-semibold text-slate-400">
                    No matches played yet!
                  </div>
                );
              }
              const percent = totalMatches > 0 ? Math.round((data.value / totalMatches) * 100) : 0;
              return (
                <div className="bg-slate-950/95 border border-slate-800 p-2 rounded-xl shadow-2xl text-[10px] font-mono leading-normal">
                  <p className="font-extrabold" style={{ color: data.color }}>
                    {data.name.toUpperCase()}
                  </p>
                  <p className="text-slate-200">
                    Count: <span className="font-extrabold text-white">{data.value}</span>
                  </p>
                  <p className="text-slate-400">
                    Ratio: <span className="font-extrabold text-slate-300">{percent}%</span>
                  </p>
                </div>
              );
            }
            return null;
          };

          return (
            <div className="w-full h-32 relative mb-4 bg-slate-950/40 border border-slate-800/50 rounded-2xl flex items-center justify-start p-2 pr-4">
              <div className="w-[100px] h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={26}
                      outerRadius={42}
                      paddingAngle={isEmpty ? 0 : 3}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          stroke="#0f172a" 
                          strokeWidth={1.5}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex-1 flex flex-col gap-1 pl-4 text-left font-mono select-none">
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">Battle Ratio</span>
                {chartData.map((item, idx) => {
                  const pct = totalMatches > 0 && !isEmpty ? Math.round((item.value / totalMatches) * 100) : 0;
                  return (
                    <div key={idx} className="flex items-center justify-between text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="uppercase tracking-wider font-semibold">{item.name}</span>
                      </div>
                      <span className="font-extrabold text-slate-200">
                        {isEmpty ? '0%' : `${pct}%`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Detailed streak breakdown */}
        <div className="flex flex-col gap-2.5 bg-slate-950/40 border border-slate-850 p-4 rounded-2xl mb-6">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 font-mono">
              <Trophy size={14} className="text-yellow-500" />
              BEST WIN STREAK
            </span>
            <span className="font-extrabold text-slate-200 text-sm font-mono">{stats.bestStreak}</span>
          </div>
          <div className="h-[1px] bg-slate-850" />
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 font-mono">
              <ShieldAlert size={14} className="text-orange-500" />
              CURRENT WIN STREAK
            </span>
            <span className="font-extrabold text-slate-200 text-sm font-mono">{stats.currentStreak}</span>
          </div>
          <div className="h-[1px] bg-slate-850" />
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 font-mono">
              <Award size={14} className="text-cyan-500" />
              TOTAL MATCHES
            </span>
            <span className="font-extrabold text-slate-200 text-sm font-mono">{totalMatches}</span>
          </div>
        </div>

        <button
          id="stats-confirm-btn"
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-cyan-500/10 cursor-pointer text-center"
        >
          Close Log
        </button>
      </div>
    </div>
  );
}
