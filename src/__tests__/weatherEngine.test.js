import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '../stores/useGameStore';

describe('Dynamic 3D Weather & Time-of-Day Engine (useGameStore)', () => {
    beforeEach(() => {
        useGameStore.setState({
            timeOfDay: 'day',
            weather: 'sunny'
        });
    });

    it('기본 시간대 및 날씨 상태가 올바르게 초기화되어야 한다', () => {
        expect(useGameStore.getState().timeOfDay).toBe('day');
        expect(useGameStore.getState().weather).toBe('sunny');
    });

    it('시간대 변경 (day ➔ sunset ➔ night) 액션이 정상 작동해야 한다', () => {
        useGameStore.getState().setTimeOfDay('sunset');
        expect(useGameStore.getState().timeOfDay).toBe('sunset');

        useGameStore.getState().setTimeOfDay('night');
        expect(useGameStore.getState().timeOfDay).toBe('night');

        useGameStore.getState().setTimeOfDay('day');
        expect(useGameStore.getState().timeOfDay).toBe('day');
    });

    it('날씨 변경 (sunny ➔ rain ➔ snow ➔ sakura) 액션이 정상 작동해야 한다', () => {
        useGameStore.getState().setWeather('rain');
        expect(useGameStore.getState().weather).toBe('rain');

        useGameStore.getState().setWeather('snow');
        expect(useGameStore.getState().weather).toBe('snow');

        useGameStore.getState().setWeather('sakura');
        expect(useGameStore.getState().weather).toBe('sakura');

        useGameStore.getState().setWeather('sunny');
        expect(useGameStore.getState().weather).toBe('sunny');
    });
});
