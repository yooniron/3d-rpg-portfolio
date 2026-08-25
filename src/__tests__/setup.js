import '@testing-library/jest-dom';

// Web Audio API Mock for soundEngine unit testing in JSDOM
if (typeof window !== 'undefined') {
    window.AudioContext = window.AudioContext || class {
        constructor() {
            this.state = 'running';
            this.currentTime = 0;
            this.destination = {};
        }
        createOscillator() {
            return {
                type: 'sine',
                frequency: { setValueAtTime: () => {} },
                connect: () => {},
                start: () => {},
                stop: () => {}
            };
        }
        createGain() {
            return {
                gain: {
                    setValueAtTime: () => {},
                    exponentialRampToValueAtTime: () => {}
                },
                connect: () => {}
            };
        }
        createBufferSource() {
            return {
                buffer: null,
                loop: false,
                connect: () => {},
                start: () => {},
                stop: () => {}
            };
        }
        createBuffer() {
            return {
                getChannelData: () => new Float32Array(44100)
            };
        }
        resume() {
            return Promise.resolve();
        }
    };
}
