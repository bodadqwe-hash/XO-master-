/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Logo & Slogan
    game_title: 'TIC TAC TOE',
    cyber_grid: 'Premium Cyber Grid System',
    
    // Campaign Progress
    campaign_progress: 'Campaign Progress (Levels 1-10)',
    current_level: 'Current Level',
    campaign_desc: 'Defeat the progressive robotic nodes in sequence to unlock new levels and earn massive coins and XP multipliers!',
    level_word: 'Lvl',
    
    // Practice free play
    freeplay_practice: 'Practice Arena (Free Play)',
    freeplay_desc: 'Pick your challenge level to trigger single play training against our tactical engine.',
    cadet_drone: 'Cadet Drone',
    cadet_drone_desc: 'Fires completely random moves',
    tactical_core: 'Tactical Core',
    tactical_core_desc: 'Occasional blocks and wins',
    grand_sentinel: 'Grand Sentinel',
    grand_sentinel_desc: 'Aggressive lines & corners tactic',
    unbeatable_oracle: 'Unbeatable Oracle',
    unbeatable_oracle_desc: 'Minimax strategy. Zero defects.',

    // Multiplayer Modes
    multiplayer_modes: 'Multiplayer Modes',
    local_pvp_title: 'Local Match',
    local_pvp_desc: 'Pass & Play with your friend on this screen!',
    local_pvp_badge: 'Same Phone',
    online_pvp_title: 'Online Matchup',
    online_pvp_desc: 'Simulate interactive PVP matchup with active chat!',
    online_pvp_badge: 'En Ligne',

    // Game Room View Header Info
    playing_header_campaign: 'Campaign Battle',
    playing_header_freeplay: 'Practice Fight',
    playing_header_local_pvp: 'Same Phone Game',
    playing_header_online_pvp: 'Online Match',
    gate_word: 'Gate',
    drone_word: 'Drone',
    searching_word: 'Searching...',
    status_word: 'Status',
    ai_computing: 'AI is Computing...',
    your_turn: 'Your Turn (Place X)',
    p1_turn: 'Friend 1 Turn (X)',
    p2_turn: 'Friend 2 Turn (O)',
    online_opp_thinking: 'Opponent is thinking...',
    
    // Game Over Outcomes
    victory_achieved: 'VICTORY ACHIEVED! 🎉',
    defeat_imposed: 'DEFEAT IMPOSED 🤖',
    neutral_draw: 'NEUTRAL DRAW 🤝',
    p1_victory: 'FRIEND 1 (X) WINS! 🎉',
    p2_victory: 'FRIEND 2 (O) WINS! 🎉',
    local_draw: 'DRAW MATCH! 🤝',
    online_victory: 'OUTSTANDING VICTORY! 🏆',
    online_defeat: 'OPPONENT WON! 🎲',

    // Score Panel
    score_player_x: 'Player (X)',
    score_you_x: 'You (X)',
    score_p1_x: 'Friend 1 (X)',
    score_draws: 'Draws',
    score_ai_o: 'AI (O)',
    score_p2_o: 'Friend 2 (O)',

    // Lobby Matchmaker
    lobby_searching_opp: 'Searching for Opponents',
    lobby_connecting: 'Connecting to Morocco Lobby...',
    lobby_init_socket: '$ initiating matrix matchmaking socket...',
    lobby_ping_ok: '✓ ping test: 21ms Rabat_Node_Safe',
    lobby_sync_profiles: '✓ syncing profiles. matching gold tier...',
    lobby_opp_found: '✓ opponent found. syncing board state!',

    // Common Interaction Buttons
    back_to_menu: 'Back to Menu',
    play_again: 'Play Again',
    change_lang: 'Language',
    login_gmail: 'Sign in with Google',
    login_gmail_desc: 'Sync progress, track rank, unlock online tiers!',
    logout_gmail: 'Disconnect',
    logged_in_as: 'Signed in as',
    guest_user: 'Guest',
    morocco_title: 'Moroccan Premium Champion Cup',
    
    // Chat Keys
    chat_hello_btn: '💬 Hello!',
    chat_hello_say_1: 'Hello friend! 👋',
    chat_hello_say_2: 'Hi! Let\'s have a fine match!',
    chat_gg_btn: '💬 GG!',
    chat_gg_say: 'GG bro! Nice plays!',
    chat_mid_1: 'Nice line, but blocked! 😉',
    chat_mid_2: 'Tricky grid! You play well',
    chat_mid_3: 'Focus friend! ✨',
    chat_mid_4: 'Nice block! 😂',
    chat_mid_5: 'Where are you trying to go? 🤔'
  },
  fr: {
    // Logo & Slogan
    game_title: 'MORPION (XO)',
    cyber_grid: 'Système Cyber-Grille Premium',
    
    // Campaign Progress
    campaign_progress: 'Campagne de Progrès (Niveaux 1-10)',
    current_level: 'Niveau Actuel',
    campaign_desc: 'Battez les nœuds robotiques progressifs pour débloquer de nouveaux niveaux et gagner des multiplicateurs de pièces et d\'XP !',
    level_word: 'Niv',
    
    // Practice free play
    freeplay_practice: 'Arène d\'Entraînement (Match Amical)',
    freeplay_desc: 'Choisissez votre niveau de défi pour lancer un entraînement en solo contre notre moteur tactique.',
    cadet_drone: 'Drone Cadet',
    cadet_drone_desc: 'Effectue des mouvements complètement aléatoires',
    tactical_core: 'Cœur Tactique',
    tactical_core_desc: 'Bloque et gagne de temps en temps',
    grand_sentinel: 'Grand Sentinelle',
    grand_sentinel_desc: 'Stratégie agressive d\'angles et de lignes',
    unbeatable_oracle: 'Oracle Imbattable',
    unbeatable_oracle_desc: 'Algorithme Minimax. Zéro défaut.',

    // Multiplayer Modes
    multiplayer_modes: 'Modes Multijoueur',
    local_pvp_title: 'Match Local',
    local_pvp_desc: 'Jouez avec un ami côte à côte sur le même écran !',
    local_pvp_badge: 'Même Tél',
    online_pvp_title: 'Match en Ligne',
    online_pvp_desc: 'Simulez un affrontement en ligne interactif avec chat !',
    online_pvp_badge: 'En Ligne',

    // Game Room View Header Info
    playing_header_campaign: 'Combat de Campagne',
    playing_header_freeplay: 'Match Amical',
    playing_header_local_pvp: 'Partie Local',
    playing_header_online_pvp: 'Match en Ligne',
    gate_word: 'Porte',
    drone_word: 'Drone',
    searching_word: 'Recherche...',
    status_word: 'Statut',
    ai_computing: 'L\'IA réfléchit...',
    your_turn: 'Votre tour (Jouez X)',
    p1_turn: 'Ami 1 (X)',
    p2_turn: 'Ami 2 (O)',
    online_opp_thinking: 'L\'adversaire réfléchit...',
    
    // Game Over Outcomes
    victory_achieved: 'VICTOIRE ACQUISE ! 🎉',
    defeat_imposed: 'DÉFAITE IMPOSÉE 🤖',
    neutral_draw: 'MATCH NUL 🤝',
    p1_victory: 'L\'AMI 1 (X) A GAGNÉ ! 🎉',
    p2_victory: 'L\'AMI 2 (O) A GAGNÉ ! 🎉',
    local_draw: 'MATCH NUL ! 🤝',
    online_victory: 'VICTOIRE MAGNIFIQUE ! 🏆',
    online_defeat: 'L\'ADVERSAIRE A GAGNÉ ! 🎲',

    // Score Panel
    score_player_x: 'Joueur (X)',
    score_you_x: 'Vous (X)',
    score_p1_x: 'Ami 1 (X)',
    score_draws: 'Nuls',
    score_ai_o: 'IA (O)',
    score_p2_o: 'Ami 2 (O)',

    // Lobby Matchmaker
    lobby_searching_opp: 'Recherche d\'adversaires',
    lobby_connecting: 'Connexion au salon du Maroc...',
    lobby_init_socket: '$ connexion au socket de matchmaking...',
    lobby_ping_ok: '✓ test de ping: 21ms Rabat_Node_Safe',
    lobby_sync_profiles: '✓ synchronisation des profils d\'or...',
    lobby_opp_found: '✓ adversaire trouvé. synchronisation de la grille !',

    // Common Interaction Buttons
    back_to_menu: 'Retour au Menu',
    play_again: 'Rejouer',
    change_lang: 'Langues',
    login_gmail: 'Se connecter avec Google',
    login_gmail_desc: 'Sauvegardez vos progrès et débloquez des bonus !',
    logout_gmail: 'Déconnexion',
    logged_in_as: 'Connecté en tant que',
    guest_user: 'Invité',
    morocco_title: 'Coupe des Champions Maroc',
    
    // Chat Keys
    chat_hello_btn: '💬 Salut !',
    chat_hello_say_1: 'Salut l\'ami ! 👋',
    chat_hello_say_2: 'Salut ! Que le meilleur gagne !',
    chat_gg_btn: '💬 GG !',
    chat_gg_say: 'GG mon pote ! Super jeu !',
    chat_mid_1: 'Jolie ligne, mais bloquée ! 😉',
    chat_mid_2: 'Grille astucieuse ! Tu joues bien',
    chat_mid_3: 'Concentre-toi l\'ami ! ✨',
    chat_mid_4: 'Beau blocage ! 😂',
    chat_mid_5: 'Où espères-tu aller ? 🤔'
  },
  ar: {
    // Logo & Slogan
    game_title: 'لعبة X-O المتميزة',
    cyber_grid: 'نظام الشبكة البصرية المتطورة',
    
    // Campaign Progress
    campaign_progress: 'بطولة المستويات (١ - ١٠)',
    current_level: 'المستوى الحالي',
    campaign_desc: 'اهزم الحراس السيبرانيين لفتح المراحل والحصول على الكوينز والجوائز!',
    level_word: 'مرحلة',
    
    // Practice free play
    freeplay_practice: 'اللعب الودي ضد الكمبيوتر',
    freeplay_desc: 'تحدي الذكاء الاصطناعي في جولة تدريب متقدمة.',
    cadet_drone: 'روبوت مبتدئ',
    cadet_drone_desc: 'يلعب بشكل عشوائي تماماً وبسيط',
    tactical_core: 'العقل التكتيكي',
    tactical_core_desc: 'يقوم بحركات هجوم ودفاع جيدة',
    grand_sentinel: 'الحارس المطور',
    grand_sentinel_desc: 'يبني الهجمات عبر الأطراف والزوايا',
    unbeatable_oracle: 'الذكاء الخارق',
    unbeatable_oracle_desc: 'استراتيجية كاملة خالية من الأخطاء',

    // Multiplayer Modes
    multiplayer_modes: 'أنماط اللعب الثنائي',
    local_pvp_title: 'في نفس الهاتف',
    local_pvp_desc: 'العب مع صديقك دور بدور على نفس الهاتف الخاص بك!',
    local_pvp_badge: 'نفس الهاتف',
    online_pvp_title: 'مباراة أونلاين',
    online_pvp_desc: 'تحدي لاعبين نشطين أونلاين مع محادثات تفاعلية!',
    online_pvp_badge: 'أونلاين',

    // Game Room View Header Info
    playing_header_campaign: 'معركة المستويات',
    playing_header_freeplay: 'قتال ودي تدريبي',
    playing_header_local_pvp: 'دور صديقين محلي',
    playing_header_online_pvp: 'تحدي أونلاين مباشر',
    gate_word: 'بوابة',
    drone_word: 'روبوت',
    searching_word: 'جاري البحث عن خصم...',
    status_word: 'الحالة',
    ai_computing: 'جاري التفكير...',
    your_turn: 'دورك الآن (ضع X)',
    p1_turn: 'دور الصديق الأول (X)',
    p2_turn: 'دور الصديق الثاني (O)',
    online_opp_thinking: 'المنافس يفكر حالياً...',
    
    // Game Over Outcomes
    victory_achieved: 'تم تحقيق النصر! 🎉',
    defeat_imposed: 'هزيمة من الروبوت 🤖',
    neutral_draw: 'تعادل عادل! 🤝',
    p1_victory: 'فاز الصديق الأول (X)! 🎉',
    p2_victory: 'فاز الصديق الثاني (O)! 🎉',
    local_draw: 'تعادل! 🤝',
    online_victory: 'نصر بطل خارق! 🏆',
    online_defeat: 'المنافس فاز عليك! 🎲',

    // Score Panel
    score_player_x: 'اللاعب (X)',
    score_you_x: 'أنت (X)',
    score_p1_x: 'الصديق الأول (X)',
    score_draws: 'تعادلات',
    score_ai_o: 'الذكاء (O)',
    score_p2_o: 'الصديق الثاني (O)',

    // Lobby Matchmaker
    lobby_searching_opp: 'البحث عن منافسين',
    lobby_connecting: 'الاتصال بسيرفر المغرب الموحد...',
    lobby_init_socket: '$ جاري بناء بروتوكول البينغ الموجه...',
    lobby_ping_ok: '✓ بينغ الاتصال: 21ms الرباط',
    lobby_sync_profiles: '✓ تهيئة تحدي النخبة وربط اللاعبين...',
    lobby_opp_found: '✓ خصم متصل! مزامنة اللعبة حالياً...',

    // Common Interaction Buttons
    back_to_menu: 'العودة للرئيسية',
    play_again: 'لعب مرة أخرى',
    change_lang: 'اللغة',
    login_gmail: 'تسجيل بـ Google',
    login_gmail_desc: 'حفظ سجلّ أرقامك القياسية وفتح ميزات الترتيب الصعدي!',
    logout_gmail: 'تسجيل خروج',
    logged_in_as: 'متصل كـ',
    guest_user: 'زائر',
    morocco_title: 'كأس النخبة المغربي لـ XO',
    
    // Chat Keys
    chat_hello_btn: '💬 السلام عليكم!',
    chat_hello_say_1: 'السلام عليكم صديقي! 👋',
    chat_hello_say_2: 'أهلاً! أتمنى لك جولة ممتازة ههه!',
    chat_gg_btn: '💬 لعب رائع!',
    chat_gg_say: 'مباراة رائعة يا صديقي! لعب ممتاز!',
    chat_mid_1: 'خط رائع، ولكن مغلق! 😉',
    chat_mid_2: 'حركة ذكية! إنك تلعب بشكل ممتاز',
    chat_mid_3: 'ركز يا صديقي! ✨',
    chat_mid_4: 'دفاع رائع ههه! 😂',
    chat_mid_5: 'إلى أين تريد الذهاب بهذه الحركة؟ 🤔'
  }
};
