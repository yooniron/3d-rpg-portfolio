/**
 * 🎵 Procedural Web Audio Sound Engine
 * Synthesizes crisp UI sounds, magical quest fanfares, footsteps, and gentle ambient BGM
 * without requiring any external audio asset downloads.
 */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.bgmOscs = [];
        this.bgmGain = null;
        this.bgmInterval = null;
        this.isPlayingBGM = false;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playClick() {
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);

            gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch {
            // Audio context error ignore
        }
    }

    playHover() {
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(750, this.ctx.currentTime + 0.04);

            gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.04);
        } catch {}
    }

    playModalOpen() {
        if (!this.ctx) return;
        try {
            const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const startTime = this.ctx.currentTime + idx * 0.04;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.08, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.25);
            });
        } catch {}
    }

    playModalClose() {
        if (!this.ctx) return;
        try {
            const notes = [783.99, 659.25, 523.25]; // G5, E5, C5
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const startTime = this.ctx.currentTime + idx * 0.03;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.06, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.15);
            });
        } catch {}
    }

    playQuestComplete() {
        if (!this.ctx) return;
        try {
            const fanfare = [
                { f: 523.25, d: 0.1 },  // C5
                { f: 659.25, d: 0.1 },  // E5
                { f: 783.99, d: 0.1 },  // G5
                { f: 1046.5, d: 0.35 }  // C6
            ];
            let offset = 0;
            fanfare.forEach((note) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const startTime = this.ctx.currentTime + offset;

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(note.f, startTime);

                gain.gain.setValueAtTime(0.15, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + note.d);
                offset += note.d * 0.8;
            });
        } catch {}
    }

    playTeleport() {
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.3);

            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.3);
        } catch {}
    }

    // Gentle RPG town lo-fi ambient melody
    startBGM() {
        if (!this.ctx || this.isPlayingBGM) return;
        this.isPlayingBGM = true;

        const chords = [
            [261.63, 329.63, 392.0, 493.88], // Cmaj7
            [220.0, 261.63, 329.63, 392.0],  // Am7
            [174.61, 220.0, 261.63, 329.63], // Fmaj7
            [196.0, 246.94, 293.66, 349.23]  // G7
        ];
        let chordIndex = 0;

        const playChordStep = () => {
            if (!this.isPlayingBGM || !this.ctx) return;
            const currentChord = chords[chordIndex % chords.length];
            chordIndex++;

            currentChord.forEach((freq, noteIdx) => {
                try {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    const noteStart = this.ctx.currentTime + noteIdx * 0.35;

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq * 1.0, noteStart);

                    gain.gain.setValueAtTime(0.015, noteStart);
                    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.8);

                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(noteStart);
                    osc.stop(noteStart + 1.8);
                } catch {}
            });
        };

        playChordStep();
        this.bgmInterval = setInterval(playChordStep, 2400);
    }

    stopBGM() {
        this.isPlayingBGM = false;
        if (this.bgmInterval) {
            clearInterval(this.bgmInterval);
            this.bgmInterval = null;
        }
    }
}

export const soundEngine = new SoundEngine();
