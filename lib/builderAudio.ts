// lib/builderAudio.ts

export interface BuilderAudioApi {
  isMuted: boolean;
  getMuted?: () => boolean;
  playClick(): void;
  playSnap(): void;
  playPop(): void;
  playKeyClick(): void;
  playFrameSnap(): void;
  playStampPop(): void;
  playCounterBlip(): void;
  playWhoosh(durationMs?: number): void;
}

type AudioListener = (muted: boolean) => void;

class SoundEngine implements BuilderAudioApi {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  public isMuted: boolean = true; // Default muted until explicit user gesture or manual unmute
  private listeners: Set<AudioListener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('builder_sound_muted');
      // If user previously set preference, honor it; otherwise default to muted to respect autoplay
      this.isMuted = saved !== null ? saved === 'true' : false;
    }
  }

  public init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : 0.2;
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // MUST be called directly inside an onClick/onTouchStart event handler
  public async unlockAndToggle(): Promise<boolean> {
    this.init();
    if (!this.ctx || !this.masterGain) return this.isMuted;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    localStorage.setItem('builder_sound_muted', String(this.isMuted));

    // Instant hardware clamp
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.2, now);
    this.masterGain.gain.value = this.isMuted ? 0 : 0.2;

    this.notify();
    return this.isMuted;
  }

  public toggleMuted(): boolean {
    void this.unlockAndToggle();
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.init();
    this.isMuted = muted;
    localStorage.setItem('builder_sound_muted', String(muted));

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.2, now);
      this.masterGain.gain.value = muted ? 0 : 0.2;
    }
    this.notify();
  }

  public subscribe(fn: AudioListener) {
    this.listeners.add(fn);
    fn(this.isMuted);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isMuted));
  }

  // --- SOUND GENERATORS (HARD GUARD: zero execution if muted or context inactive) ---
  public playClick() {
    if (this.isMuted || !this.ctx || this.ctx.state !== 'running' || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.02);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.02);
  }

  public playSnap() {
    if (this.isMuted || !this.ctx || this.ctx.state !== 'running' || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  public playPop() {
    if (this.isMuted || !this.ctx || this.ctx.state !== 'running' || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Compatible aliases for builder engine
  public playKeyClick() {
    this.playClick();
  }

  public playFrameSnap() {
    this.playSnap();
  }

  public playStampPop() {
    this.playPop();
  }

  public playCounterBlip() {
    this.playClick();
  }

  public playWhoosh(_durationMs?: number) {
    this.playSnap();
  }
}

// Preserve singleton across Next.js HMR reloads
declare global {
  var __PORTFOLIO_AUDIO__: SoundEngine | undefined;
}

export const audioEngine = globalThis.__PORTFOLIO_AUDIO__ || new SoundEngine();
if (process.env.NODE_ENV !== 'production') {
  globalThis.__PORTFOLIO_AUDIO__ = audioEngine;
}

export const builderAudio = audioEngine;
