/* Urban Clothing — Premium Sound Design (opt-in)
 * Web Audio API procedural sounds. Zero asset downloads.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
    } catch {
      // Web Audio not supported
    }
  }

  toggle() {
    this.init();
    this.enabled = !this.enabled;
    if (this.enabled && this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  _playTone({ freq, type = 'sine', attack = 0.01, decay = 0.1, volume = 0.15 }) {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, now + attack + decay);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + attack + decay + 0.05);
  }

  play(type) {
    if (!this.enabled || !this.ctx) return;
    switch (type) {
      case 'addToCart':
        // Warm woodblock-like chime
        this._playTone({ freq: 523, type: 'sine', duration: 0.12, attack: 0.005, decay: 0.15, volume: 0.12 });
        setTimeout(() => this._playTone({ freq: 784, type: 'sine', duration: 0.1, attack: 0.005, decay: 0.2, volume: 0.08 }), 60);
        break;
      case 'success':
        // Ascending chime
        this._playTone({ freq: 440, type: 'sine', duration: 0.1, attack: 0.01, decay: 0.12, volume: 0.1 });
        setTimeout(() => this._playTone({ freq: 554, type: 'sine', duration: 0.1, attack: 0.01, decay: 0.12, volume: 0.1 }), 80);
        setTimeout(() => this._playTone({ freq: 659, type: 'sine', duration: 0.15, attack: 0.01, decay: 0.25, volume: 0.12 }), 160);
        break;
      case 'click':
        this._playTone({ freq: 880, type: 'triangle', duration: 0.03, attack: 0.002, decay: 0.04, volume: 0.05 });
        break;
      case 'hover':
        // Very subtle
        this._playTone({ freq: 1200, type: 'sine', duration: 0.02, attack: 0.002, decay: 0.03, volume: 0.02 });
        break;
      case 'error':
        this._playTone({ freq: 200, type: 'sawtooth', duration: 0.2, attack: 0.01, decay: 0.15, volume: 0.08 });
        break;
      case 'transition':
        // Subtle whoosh
        this._playTone({ freq: 300, type: 'sine', duration: 0.3, attack: 0.05, decay: 0.25, volume: 0.06 });
        break;
      default:
        break;
    }
  }
}

export const soundEngine = new SoundEngine();

// React hook
export function useSound() {
  return {
    play: (type) => soundEngine.play(type),
    toggle: () => soundEngine.toggle(),
    isEnabled: () => soundEngine.isEnabled(),
  };
}
