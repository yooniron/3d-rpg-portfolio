import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '../stores/useGameStore';

describe('3D Player Avatar Customizer & Dressroom System (useGameStore)', () => {
    beforeEach(() => {
        useGameStore.setState({
            outfit: 'developer',
            hat: 'none',
            activeModal: null
        });
    });

    it('기본 아바타 의상 및 헤드기어 상태가 올바르게 초기화되어야 한다', () => {
        expect(useGameStore.getState().outfit).toBe('developer');
        expect(useGameStore.getState().hat).toBe('none');
    });

    it('의상 변경 액션 (developer ➔ hoodie ➔ ninja ➔ cyber)이 정상 작동해야 한다', () => {
        useGameStore.getState().setOutfit('hoodie');
        expect(useGameStore.getState().outfit).toBe('hoodie');

        useGameStore.getState().setOutfit('ninja');
        expect(useGameStore.getState().outfit).toBe('ninja');

        useGameStore.getState().setOutfit('cyber');
        expect(useGameStore.getState().outfit).toBe('cyber');

        useGameStore.getState().setOutfit('developer');
        expect(useGameStore.getState().outfit).toBe('developer');
    });

    it('헤드기어 변경 액션 (none ➔ cap ➔ headphones ➔ crown)이 정상 작동해야 한다', () => {
        useGameStore.getState().setHat('cap');
        expect(useGameStore.getState().hat).toBe('cap');

        useGameStore.getState().setHat('headphones');
        expect(useGameStore.getState().hat).toBe('headphones');

        useGameStore.getState().setHat('crown');
        expect(useGameStore.getState().hat).toBe('crown');

        useGameStore.getState().setHat('none');
        expect(useGameStore.getState().hat).toBe('none');
    });

    it('드레스룸 모달 오픈 및 클로즈 상태가 정상 동작해야 한다', () => {
        useGameStore.getState().openModal('dressroom');
        expect(useGameStore.getState().activeModal).toBe('dressroom');

        useGameStore.getState().closeModal();
        expect(useGameStore.getState().activeModal).toBeNull();
    });
});
