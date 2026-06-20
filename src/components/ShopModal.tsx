/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Coins, Check, X } from 'lucide-react';
import { PlayerProgress } from '../types';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: PlayerProgress;
  onPurchaseSkin: (type: 'board' | 'x' | 'o', id: string, coinsPrice: number) => void;
  onEquipSkin: (type: 'board' | 'x' | 'o', id: string) => void;
  onUpdateDeveloperPayment: (email: string) => void;
  developerPaymentEmail: string;
}

export default function ShopModal({
  isOpen,
  onClose,
  progress,
  onPurchaseSkin,
  onEquipSkin,
}: ShopModalProps) {
  const { coins, unlockedBoardSkins, unlockedXSkins, unlockedOSkins, settings } = progress;
  const lang = settings.language || 'en';
  const isRtl = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'board' | 'x' | 'o'>('board');

  if (!isOpen) return null;

  // Catalog definition
  const boardSkinsList = [
    { id: 'neon', name: 'Neon Grid', nameAr: 'شبكة النيون', nameFr: 'Grille Néon', price: 0, colors: ['bg-cyan-500', 'bg-rose-500'], desc: 'Standard cyber theme' },
    { id: 'cyberpunk', name: 'Cyberpunk Red', nameAr: 'السايبربانك', nameFr: 'Cyberpunk Rouge', price: 1500, colors: ['bg-yellow-500', 'bg-purple-600'], desc: 'High tech, low life' },
    { id: 'retro', name: '8-Bit Matrix', nameAr: 'المصفوفة الكلاسيكية', nameFr: 'Matrice 8-Bit', price: 2500, colors: ['bg-emerald-500', 'bg-orange-500'], desc: 'Vintage pixel hardware' },
    { id: 'royal', name: 'Royal Gold', nameAr: 'الذهب الملكي', nameFr: 'Or Royal', price: 4000, colors: ['bg-amber-500', 'bg-slate-300'], desc: 'Luxurious aristocratic style' },
    { id: 'galaxy', name: 'Cosmic Galaxy', nameAr: 'المجرة الكونية', nameFr: 'Galaxie Cosmique', price: 6000, colors: ['bg-indigo-500', 'bg-fuchsia-500'], desc: 'Interstellar nebulas' },
    { id: 'matrix', name: 'Digital Rain', nameAr: 'مطر الأرقام', nameFr: 'Pluie Digitale', price: 9000, colors: ['bg-green-500', 'bg-zinc-800'], desc: 'System level binary rain' },
    { id: 'lava', name: 'Magma Lava', nameAr: 'صهارة الحمم', nameFr: 'Lave de Magma', price: 12000, colors: ['bg-red-500', 'bg-orange-600'], desc: 'Fiery burning active lava' },
    { id: 'gold', name: 'Imperial Platin', nameAr: 'البلاتين الإمبراطوري', nameFr: 'Platine Impérial', price: 18000, colors: ['bg-yellow-400', 'bg-cyan-300'], desc: 'Shiny metal platinum gold' },
    { id: 'aurora_nordic', name: 'Aurora Nordic', nameAr: 'الشفق القطبي الممتاز', nameFr: 'Aurore Nordique', price: 25000, colors: ['bg-teal-400', 'bg-indigo-600'], desc: 'Ethereal northern cyan polar lights' },
    { id: 'quantum_void', name: 'Quantum Void', nameAr: 'الفراغ الكمي الاحترافي', nameFr: 'Vide Quantique', price: 35000, colors: ['bg-fuchsia-600', 'bg-cyan-400'], desc: 'Ultimate premium dark cyberpunk fusion' },
  ];

  const xSkinsList = [
    { id: 'classic_cyan', name: 'Neon Cyan', nameAr: 'العلامة الزرقاء', nameFr: 'Cyan Néon', price: 0, color: 'bg-cyan-400', glow: 'shadow-cyan-500/50' },
    { id: 'plasma_purple', name: 'Plasma Violet', nameAr: 'البلازما البنفسجية', nameFr: 'Plasma Violet', price: 2000, color: 'bg-purple-500', glow: 'shadow-purple-500/50' },
    { id: 'emerald_green', name: 'Toxic Emerald', nameAr: 'الزمرد السام', nameFr: 'Émeraude Toxique', price: 3500, color: 'bg-emerald-400', glow: 'shadow-emerald-500/50' },
    { id: 'electric_yellow', name: 'Storm Lightning', nameAr: 'البرق الأصفر', nameFr: 'Éclair Jaune', price: 5500, color: 'bg-yellow-400', glow: 'shadow-yellow-500/50' },
    { id: 'blood_ruby', name: 'Crimson Blood', nameAr: 'روبي الدماء', nameFr: 'Rubis Sanglant', price: 8000, color: 'bg-rose-600', glow: 'shadow-rose-600/50' },
    { id: 'solid_gold', name: 'Golden Glyph', nameAr: 'الرمز الذهبي', nameFr: 'Glyphe Doré', price: 15000, color: 'bg-amber-400', glow: 'shadow-amber-500/50' },
    { id: 'quantum_neon', name: 'Quantum Cyan-Violet', nameAr: 'الكم النيوني الممتاز', nameFr: 'Neon Quantum', price: 22000, color: 'bg-purple-600', glow: 'shadow-cyan-400/50' },
    { id: 'magma_spark', name: 'Magma Spark Plasma', nameAr: 'شرارة الماجما النارية', nameFr: 'Étincelle Magma', price: 30000, color: 'bg-orange-500', glow: 'shadow-orange-600/50' },
  ];

  const oSkinsList = [
    { id: 'classic_rose', name: 'Neon Rose', nameAr: 'الدائرة الوردية', nameFr: 'Rose Néon', price: 0, color: 'bg-rose-500', glow: 'shadow-rose-500/50' },
    { id: 'cyber_indigo', name: 'Cyber Indigo', nameAr: 'إنديجو سايبر', nameFr: 'Indigo Cyber', price: 2000, color: 'bg-indigo-500', glow: 'shadow-indigo-500/50' },
    { id: 'toxic_lime', name: 'Acid Lime', nameAr: 'الليمون الحامض', nameFr: 'Lime Acide', price: 3500, color: 'bg-lime-400', glow: 'shadow-lime-500/50' },
    { id: 'amber_blaze', name: 'Nova Blaze', nameAr: 'النجم المستعر', nameFr: 'Nova Flamboyant', price: 5500, color: 'bg-orange-500', glow: 'shadow-orange-500/50' },
    { id: 'stellar_nexus', name: 'Void Cosmic', nameAr: 'نجم الفراغ', nameFr: 'Vide Cosmique', price: 8000, color: 'bg-fuchsia-500', glow: 'shadow-fuchsia-500/50' },
    { id: 'imperial_gold', name: 'Queen Crown', nameAr: 'تاج الملكة', nameFr: 'Couronne Reine', price: 15000, color: 'bg-yellow-400', glow: 'shadow-yellow-500/50' },
    { id: 'polar_wind', name: 'Polar Wind Mist', nameAr: 'رياح القطب الثلجية', nameFr: 'Vent Polaire', price: 22000, color: 'bg-sky-400', glow: 'shadow-sky-400/50' },
    { id: 'divine_sun', name: 'Divine Golden Sun', nameAr: 'الشمس الذهبية المقدسة', nameFr: 'Soleil Divin', price: 30000, color: 'bg-amber-400', glow: 'shadow-amber-500/70' },
  ];

  const handleBuyWithCoins = (type: 'board' | 'x' | 'o', id: string, price: number) => {
    if (coins >= price) {
      onPurchaseSkin(type, id, price);
    }
  };

  return (
    <div id="shop-modal-container" className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        id="shop-modal-wrapper"
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-5 shadow-2xl relative max-h-[88vh] overflow-y-auto flex flex-col scrollbar-none"
      >
        {/* Header */}
        <div className={`flex items-center justify-between border-b border-slate-800 pb-3 mb-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <ShoppingBag size={18} />
            </span>
            <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
              <h2 className="text-sm md:text-base font-extrabold text-slate-100 uppercase tracking-widest">
                {isRtl ? 'متجر المظهر' : lang === 'fr' ? 'Boutique Cosmétique' : 'Classic Cosme Shop'}
              </h2>
              <span className="text-[9px] text-slate-500 uppercase tracking-wide block">Customize Board Elements</span>
            </div>
          </div>

          <button
            id="shop-close-btn"
            onClick={onClose}
            className="p-1 px-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer font-bold text-sm"
          >
            <X size={16} />
          </button>
        </div>

        {/* Currency summary balance info */}
        <div className={`p-3 bg-slate-950 border border-slate-850 rounded-2xl flex items-center justify-between mb-4 text-xs font-sans ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <Coins size={14} className="text-amber-400" />
            <span className="text-slate-400 font-semibold">{isRtl ? 'رصيد القطع النقود' : lang === 'fr' ? 'Solde de Coins' : 'Your Coins Bank'}</span>
          </div>
          <span className="text-sm font-black font-mono text-amber-400 bg-amber-500/10 px-3 py-0.5 rounded-full border border-amber-500/15">
            {coins} <span className="text-[10px]">COINS</span>
          </span>
        </div>

        {/* Tab Headers */}
        <div id="shop-tabs" className="flex border-b border-slate-800/60 pb-2.5 gap-1 mb-4 select-none">
          <button
            onClick={() => setActiveTab('board')}
            className={`flex-grow py-2 px-1 rounded-xl text-center text-xs uppercase font-extrabold font-mono tracking-wider transition-all cursor-pointer
              ${activeTab === 'board'
                ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.1)]'
                : 'text-slate-500 hover:text-slate-300'
              }
            `}
          >
            {isRtl ? 'الطاولة 🔲' : lang === 'fr' ? 'Grilles 🔲' : 'Grids 🔲'}
          </button>
          <button
            onClick={() => setActiveTab('x')}
            className={`flex-grow py-2 px-1 rounded-xl text-center text-xs uppercase font-extrabold font-mono tracking-wider transition-all cursor-pointer
              ${activeTab === 'x'
                ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-500 hover:text-slate-300'
              }
            `}
          >
            {isRtl ? 'الرمز X' : 'Skins X'}
          </button>
          <button
            onClick={() => setActiveTab('o')}
            className={`flex-grow py-2 px-1 rounded-xl text-center text-xs uppercase font-extrabold font-mono tracking-wider transition-all cursor-pointer
              ${activeTab === 'o'
                ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 text-rose-400 border border-rose-500/30'
                : 'text-slate-500 hover:text-slate-300'
              }
            `}
          >
            {isRtl ? 'الرمز O' : 'Skins O'}
          </button>
        </div>

        {/* Skins Products catalog list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[48vh] overflow-y-auto pr-1">
          {activeTab === 'board' && (
            boardSkinsList.map((item) => {
              const isUnlocked = unlockedBoardSkins.includes(item.id);
              const isEquipped = settings.skin === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-slate-950/60 transition-all border p-3 rounded-2xl flex flex-col justify-between hover:bg-slate-950/80
                    ${isEquipped 
                      ? 'border-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.1)]' 
                      : isUnlocked 
                        ? 'border-slate-800' 
                        : 'border-slate-850 opacity-90'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-200">
                        {isRtl ? item.nameAr : lang === 'fr' ? item.nameFr : item.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{item.desc}</p>
                    </div>
                    {/* Visual Color Previews */}
                    <div className="flex gap-1">
                      {item.colors.map((cls, j) => (
                        <span key={j} className={`w-2.5 h-2.5 rounded-full ${cls} border border-slate-900 shadow-sm`} />
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-1.5 border-t border-slate-900 flex items-center justify-between gap-1">
                    {isEquipped ? (
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-cyan-400 flex items-center gap-1">
                        <Check size={10} /> {isRtl ? 'مجهز حالياً' : 'Equipped'}
                      </span>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => onEquipSkin('board', item.id)}
                        className="w-full py-1.5 bg-slate-900 border border-slate-800 text-[10px] uppercase tracking-wider font-extrabold text-slate-200 rounded-lg hover:border-slate-650 cursor-pointer active:scale-95 transition-all"
                      >
                        {isRtl ? 'تجهيز' : 'Equip Skin'}
                      </button>
                    ) : (
                      <button
                        disabled={coins < item.price}
                        onClick={() => handleBuyWithCoins('board', item.id, item.price)}
                        className={`w-full py-1.5 flex items-center justify-center gap-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider select-none active:scale-[0.98] transition-all cursor-pointer
                          ${coins >= item.price
                            ? 'bg-amber-500 text-slate-950 border border-amber-400 hover:bg-amber-400'
                            : 'bg-slate-950/50 text-slate-600 border border-slate-900 cursor-not-allowed'
                          }
                        `}
                      >
                        <Coins size={10} />
                        {item.price} Coins
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {activeTab === 'x' && (
            xSkinsList.map((item) => {
              const isUnlocked = unlockedXSkins.includes(item.id);
              const isEquipped = settings.xSkin === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-slate-950/60 transition-all border p-3 rounded-2xl flex flex-col justify-between hover:bg-slate-950/80
                    ${isEquipped 
                      ? 'border-indigo-500' 
                      : isUnlocked 
                        ? 'border-slate-800' 
                        : 'border-slate-850 opacity-90'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-200">
                        {isRtl ? item.nameAr : item.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">X Custom Accent Glow</p>
                    </div>
                    {/* Visual Preview */}
                    <div className="w-6 h-6 flex items-center justify-center relative bg-slate-900 border border-slate-850 rounded-lg">
                      <span className={`w-3.5 h-1 rounded-full ${item.color} rotate-45 absolute ${item.glow}`} />
                      <span className={`w-3.5 h-1 rounded-full ${item.color} -rotate-45 absolute ${item.glow}`} />
                    </div>
                  </div>

                  <div className="mt-4 pt-1.5 border-t border-slate-900 flex items-center justify-between gap-1">
                    {isEquipped ? (
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-indigo-400 flex items-center gap-1">
                        <Check size={10} /> {isRtl ? 'مجهز حالياً' : 'Equipped'}
                      </span>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => onEquipSkin('x', item.id)}
                        className="w-full py-1.5 bg-slate-900 border border-slate-800 text-[10px] uppercase tracking-wider font-extrabold text-indigo-300 rounded-lg hover:border-slate-650 cursor-pointer active:scale-95 transition-all"
                      >
                        {isRtl ? 'تجهيز' : 'Equip Skin'}
                      </button>
                    ) : (
                      <button
                        disabled={coins < item.price}
                        onClick={() => handleBuyWithCoins('x', item.id, item.price)}
                        className={`w-full py-1.5 flex items-center justify-center gap-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider select-none active:scale-[0.98] transition-all cursor-pointer
                          ${coins >= item.price
                            ? 'bg-amber-500 text-slate-950 border border-amber-400 hover:bg-amber-400'
                            : 'bg-slate-950/50 text-slate-600 border border-slate-900 cursor-not-allowed'
                          }
                        `}
                      >
                        <Coins size={10} />
                        {item.price} Coins
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {activeTab === 'o' && (
            oSkinsList.map((item) => {
              const isUnlocked = unlockedOSkins.includes(item.id);
              const isEquipped = settings.oSkin === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-slate-950/60 transition-all border p-3 rounded-2xl flex flex-col justify-between hover:bg-slate-950/80
                    ${isEquipped 
                      ? 'border-rose-500' 
                      : isUnlocked 
                        ? 'border-slate-800' 
                        : 'border-slate-850 opacity-90'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-200">
                        {isRtl ? item.nameAr : item.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">O Custom Ring Design</p>
                    </div>
                    {/* Visual Preview */}
                    <div className="w-6 h-6 flex items-center justify-center relative bg-slate-900 border border-slate-850 rounded-lg">
                      <span className={`w-3.5 h-3.5 rounded-full border-2 border-dashed border-red-400 ${item.color} ${item.glow}`} />
                    </div>
                  </div>

                  <div className="mt-4 pt-1.5 border-t border-slate-900 flex items-center justify-between gap-1">
                    {isEquipped ? (
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-rose-500 flex items-center gap-1">
                        <Check size={10} /> {isRtl ? 'مجهز حالياً' : 'Equipped'}
                      </span>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => onEquipSkin('o', item.id)}
                        className="w-full py-1.5 bg-slate-900 border border-slate-800 text-[10px] uppercase tracking-wider font-extrabold text-rose-300 rounded-lg hover:border-slate-650 cursor-pointer active:scale-95 transition-all"
                      >
                        {isRtl ? 'تجهيز' : 'Equip Skin'}
                      </button>
                    ) : (
                      <button
                        disabled={coins < item.price}
                        onClick={() => handleBuyWithCoins('o', item.id, item.price)}
                        className={`w-full py-1.5 flex items-center justify-center gap-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider select-none active:scale-[0.98] transition-all cursor-pointer
                          ${coins >= item.price
                            ? 'bg-amber-500 text-slate-950 border border-amber-400 hover:bg-amber-400'
                            : 'bg-slate-950/50 text-slate-600 border border-slate-900 cursor-not-allowed'
                          }
                        `}
                      >
                        <Coins size={10} />
                        {item.price} Coins
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}
