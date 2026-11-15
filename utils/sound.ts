/**
 * Pure Web Audio API Sound Synthesizer
 * Zero-dependency procedural sound engine providing tactile click and interaction feedback.
 * Single source of truth for all audio states across the entire portfolio.
 */

const STORAGE_KEY = 'portfolio_sound_enabled';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private unlocked: boolean = false;
  private listeners: Set<(enabled: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        // Default to true (ON) unless visitor explicitly muted ('false')
        this.enabled = stored !== 'false';
      } catch {
        this.enabled = true;
      }

      // Auto-unlock AudioContext on first user interaction gesture (W3C Autoplay Policy)
      const events = [
        'pointerdown',
        'click',
        'keydown',
        'touchstart',
        'wheel',
        'scroll',
      ] as const;

      const unlock = () => {
        this.unlocked = true;
        if (this.ctx && this.ctx.state === 'suspended') {
          void this.ctx.resume().catch(() => undefined);
        }
        events.forEach((name) => window.removeEventListener(name, unlock));
      };

      events.forEach((name) => window.addEventListener(name, unlock, { passive: true }));
    }
  }

  public initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended' && this.unlocked) {
      void this.ctx.resume().catch(() => undefined);
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public isUnlocked(): boolean {
    return this.unlocked;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, String(this.enabled));
      } catch {
        // Ignore storage errors
      }
    }
    if (this.enabled) {
      this.unlocked = true;
      const ctx = this.initContext();
      if (ctx && ctx.state === 'suspended') {
        void ctx.resume().catch(() => undefined);
      }
      this.playChime();
    }
    this.notify();
    return this.enabled;
  }

  public subscribe(listener: (enabled: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn(this.enabled));
  }

  /**
   * Crisp micro-click for buttons and navigation items
   */
  public playClick(): void {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio playback failsafe
    }
  }

  /**
   * Subtle pop for modal openings and toggles
   */
  public playPop(): void {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Audio playback failsafe
    }
  }

  /**
   * Harmonic dual-tone chime for success / activation
   */
  public playChime(): void {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      [523.25, 659.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.04, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.2);
      });
    } catch {
      // Audio playback failsafe
    }
  }

  public playSuccess(): void {
    this.playChime();
  }
}

export const sound = new SoundEngine();
