/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Native HTML5 Web Audio API synthesizer for offline premium sounds
class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private currentVolumeNode: GainNode | null = null;
  private musicOscillators: OscillatorNode[] = [];
  private musicGainNodes: GainNode[] = [];
  private isMusicPlaying: boolean = false;
  private activeMusicTimeout: NodeJS.Timeout | null = null;

  // Lazily get or create audio context upon user gesture
  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    // Resume context if suspended (browser security autoplays)
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Frequency pitch sweep
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  }

  playWin() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
    notes.forEach((freq, idx) => {
      const time = ctx.currentTime + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.01, time + 0.3);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.15, time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.45);
    });
  }

  playLose() {
    const ctx = this.getContext();
    if (!ctx) return;

    const mainTime = ctx.currentTime;
    // Lower descending minor sweep
    const notes = [220.00, 196.00, 174.61, 146.83]; // A3, G3, F3, D3
    notes.forEach((freq, idx) => {
      const time = mainTime + idx * 0.15;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      
      // Filter sweep to make it warm, electronic
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.setValueAtTime(8, time);
      filter.frequency.setValueAtTime(1200, time);
      filter.frequency.exponentialRampToValueAtTime(300, time + 0.4);

      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.12, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.55);
    });
  }

  playDraw() {
    const ctx = this.getContext();
    if (!ctx) return;

    // Two rapid neutral high notes
    const times = [ctx.currentTime, ctx.currentTime + 0.12];
    times.forEach((time) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, time); // A4

      gain.gain.setValueAtTime(0.08, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.11);
    });
  }

  startAmbientMusic() {
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.playAmbientLoop();
  }

  stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.activeMusicTimeout) {
      clearTimeout(this.activeMusicTimeout);
      this.activeMusicTimeout = null;
    }
    this.fadeOutAndStopActiveMusic();
  }

  private fadeOutAndStopActiveMusic() {
    const ctx = this.getContext();
    if (!ctx) return;

    this.musicGainNodes.forEach((gainNode) => {
      try {
        gainNode.gain.cancelScheduledValues(ctx.currentTime);
        gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.25);
      } catch (e) {
        // Safe play
      }
    });

    setTimeout(() => {
      this.musicOscillators.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {}
      });
      this.musicOscillators = [];
      this.musicGainNodes = [];
    }, 1300);
  }

  // Plays synthesized generative ambient cyberpunk pads in loops
  private playAmbientLoop() {
    if (!this.isMusicPlaying) return;

    const ctx = this.getContext();
    if (!ctx) {
      this.activeMusicTimeout = setTimeout(() => this.playAmbientLoop(), 2000);
      return;
    }

    // Progression of soft electronic pads
    // Am7, Fmaj7, Cmaj7, G6
    const chords = [
      [110.00, 220.00, 261.63, 329.63, 392.00], // A2, A3, C4, E4, G4 (Am7)
      [87.31,  174.61, 261.63, 349.23, 440.00], // F2, F3, C4, F4, A4 (Fmaj7)
      [130.81, 261.63, 329.63, 392.00, 523.25], // C3, C4, E4, G4, C5 (Cmaj7)
      [98.00,  196.00, 293.66, 392.00, 493.88]  // G2, G3, D4, G4, B4 (G6)
    ];

    const chordIndex = Math.floor(Math.random() * chords.length);
    const chord = chords[chordIndex];
    const duration = 6500; // 6.5 seconds long chords overlap

    const localOscs: OscillatorNode[] = [];
    const localGains: GainNode[] = [];

    const now = ctx.currentTime;

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      // Subtle pitch drift for vinyl/ambient swell warmth
      osc.frequency.linearRampToValueAtTime(freq * (1 + (Math.random() * 0.002 - 0.001)), now + duration / 1000);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, now);

      // Long fade-in (attack) and fade-out (decay)
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.015, now + 1.8); // Ultra quiet background vibe
      gain.gain.setValueAtTime(0.015, now + duration / 1000 - 2.0);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration / 1000);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration / 1000);

      localOscs.push(osc);
      localGains.push(gain);
    });

    this.musicOscillators.push(...localOscs);
    this.musicGainNodes.push(...localGains);

    // Keep active list trim after completion
    setTimeout(() => {
      this.musicOscillators = this.musicOscillators.filter(item => !localOscs.includes(item));
      this.musicGainNodes = this.musicGainNodes.filter(item => !localGains.includes(item));
    }, duration + 200);

    // Schedule next overlapping loop chord transition
    this.activeMusicTimeout = setTimeout(() => {
      if (this.isMusicPlaying) {
        this.playAmbientLoop();
      }
    }, duration - 1500); // 1.5 seconds overlap
  }
}

export const sound = new SoundSynthesizer();
