/**
 * Procedural Web Audio synthesizer for the cursor-builder choreography.
 *
 * Zero audio files: every sound is generated from oscillators and a shared
 * white-noise buffer routed through one master gain node (which is also the
 * mute switch).
 *
 * Browsers refuse to start an AudioContext before a user gesture, so the
 * context is created lazily on the first pointer/key/touch interaction and
 * every `play*` call is a silent no-op until then.
 */

const MUTE_KEY = 'portfolio_builder_muted';
const MASTER_LEVEL = 0.6;

type MuteListener = (muted: boolean) => void;

export interface BuilderAudioApi {
  playKeyClick(): void;
  playFrameSnap(): void;
  playStampPop(): void;
  playCounterBlip(): void;
  playWhoosh(durationMs?: number): void;
}

class BuilderAudio implements BuilderAudioApi {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private muted = false;
  private unlocked = false;
  private lastKeyAt = 0;
  private listeners = new Set<MuteListener>();

  constructor() {
    if (typeof window === 'undefined') return;

    try {
      this.muted = window.localStorage.getItem(MUTE_KEY) === 'true';
    } catch {
      this.muted = false;
    }

    const events = ['pointerdown', 'keydown', 'touchstart'] as const;
    const unlock = () => {
      this.unlocked = true;
      this.ensureContext();
      events.forEach((name) => window.removeEventListener(name, unlock));
    };
    events.forEach((name) => window.addEventListener(name, unlock, { passive: true }));
  }

  /* ------------------------------------------------------------------ */
  /* Mute state                                                          */
  /* ------------------------------------------------------------------ */

  isMuted(): boolean {
    return this.muted;
  }

  setMuted(next: boolean): void {
    this.muted = next;
    try {
      window.localStorage.setItem(MUTE_KEY, String(next));
    } catch {
      // storage unavailable: mute still applies for this page view
    }
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(next ? 0 : MASTER_LEVEL, this.ctx.currentTime, 0.015);
    }
    this.listeners.forEach((listener) => listener(next));
  }

  toggleMuted(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  subscribe(listener: MuteListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /* ------------------------------------------------------------------ */
  /* Context plumbing                                                    */
  /* ------------------------------------------------------------------ */

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined' || !this.unlocked) return null;

    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;

      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : MASTER_LEVEL;
      this.master.connect(this.ctx.destination);

      // One second of white noise, reused by every noise-based voice.
      const length = this.ctx.sampleRate;
      this.noise = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
      const data = this.noise.getChannelData(0);
      for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume().catch(() => undefined);
    }
    return this.ctx;
  }

  /** Returns a running context, or null when sound should stay silent. */
  private ready(): AudioContext | null {
    if (this.muted) return null;
    const ctx = this.ensureContext();
    if (!ctx || !this.master || !this.noise || ctx.state !== 'running') return null;
    return ctx;
  }

  /* ------------------------------------------------------------------ */
  /* Voices                                                              */
  /* ------------------------------------------------------------------ */

  /** 25ms band-passed noise burst (~2.4kHz): a tactile mechanical key. */
  playKeyClick(): void {
    const ctx = this.ready();
    if (!ctx) return;

    const now = ctx.currentTime;
    if (now - this.lastKeyAt < 0.018) return; // never stack faster than ~55/s
    this.lastKeyAt = now;

    const source = ctx.createBufferSource();
    source.buffer = this.noise;
    source.playbackRate.value = 0.9 + Math.random() * 0.25;

    const band = ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 2400 * (0.92 + Math.random() * 0.16);
    band.Q.value = 1.4;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.9, now + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    source.connect(band).connect(gain).connect(this.master!);
    source.start(now, Math.random() * 0.5, 0.03);
  }

  /** Sine sweep 900Hz -> 180Hz in 50ms: a dragged frame snapping solid. */
  playFrameSnap(): void {
    const ctx = this.ready();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.55, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(gain).connect(this.master!);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  /** Resonant low pop 180Hz -> 55Hz over 70ms with exponential decay. */
  playStampPop(): void {
    const ctx = this.ready();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.07);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.95, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

    osc.connect(gain).connect(this.master!);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  /** 12ms micro-tick at 1.2kHz, fired on each counter integer step. */
  playCounterBlip(): void {
    const ctx = this.ready();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 1200;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    osc.connect(gain).connect(this.master!);
    osc.start(now);
    osc.stop(now + 0.016);
  }

  /** Filtered noise sweep for long cursor transits between sections. */
  playWhoosh(durationMs = 420): void {
    const ctx = this.ready();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = Math.min(0.8, Math.max(0.2, durationMs / 1000));

    const source = ctx.createBufferSource();
    source.buffer = this.noise;
    source.loop = true;

    const band = ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.Q.value = 0.9;
    band.frequency.setValueAtTime(260, now);
    band.frequency.exponentialRampToValueAtTime(3200, now + duration * 0.65);
    band.frequency.exponentialRampToValueAtTime(700, now + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.32, now + duration * 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    source.connect(band).connect(gain).connect(this.master!);
    source.start(now);
    source.stop(now + duration + 0.02);
  }
}

export const builderAudio = new BuilderAudio();

