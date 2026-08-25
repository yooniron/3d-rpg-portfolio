import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useGameStore } from '../stores/useGameStore';

describe('Zustand Game State Engine (useGameStore.js)', () => {
    beforeEach(() => {
        // Reset Zustand store state before each test
        useGameStore.setState({
            mode: '3D',
            activeModal: null,
            modalData: null,
            cinematicTarget: null,
            nearbyBuilding: null,
            playerPos: [0, 0, 0],
            completedQuests: [],
            questPoints: 0
        });
        vi.useFakeTimers();
    });

    it('기본 초기 게임 상태가 올바르게 설정되어 있어야 한다', () => {
        const state = useGameStore.getState();
        expect(state.mode).toBe('3D');
        expect(state.activeModal).toBeNull();
        expect(state.cinematicTarget).toBeNull();
        expect(state.completedQuests).toEqual([]);
        expect(state.questPoints).toBe(0);
    });

    it('2D/3D 모드 전환이 정상 동작해야 한다', () => {
        useGameStore.getState().setMode('2D');
        expect(useGameStore.getState().mode).toBe('2D');

        useGameStore.getState().setMode('3D');
        expect(useGameStore.getState().mode).toBe('3D');
    });

    it('시네마틱 줌인 슬로우 글라이딩 및 모달 지연 시퀀서가 정밀하게 작동해야 한다', () => {
        const store = useGameStore.getState();
        store.triggerCinematicModal('school');

        // 1단계: 선행 카메라 줌인 시퀀스 트리거 확인
        expect(useGameStore.getState().cinematicTarget).toBe('school');
        expect(useGameStore.getState().activeModal).toBeNull();

        // 2단계: 650ms 지연 타이머 통과 후 모달 노출 확인
        vi.advanceTimersByTime(650);
        expect(useGameStore.getState().activeModal).toBe('school');
    });

    it('모달 닫기(closeModal) 시 모든 모달 및 카메라 상태가 초기화되어야 한다', () => {
        useGameStore.setState({ activeModal: 'school', cinematicTarget: 'school' });
        useGameStore.getState().closeModal();

        const state = useGameStore.getState();
        expect(state.activeModal).toBeNull();
        expect(state.cinematicTarget).toBeNull();
        expect(state.modalData).toBeNull();
    });

    it('텔레포트 명령 호출 시 좌표 및 이동 타겟이 지정되어야 한다', () => {
        useGameStore.getState().teleportTo([18, 0, -14]);
        const state = useGameStore.getState();
        expect(state.teleportTarget).toEqual([18, 0, -14]);
    });

    it('랜드마크 방문(visitLandmark) 시 퀘스트 완료 점수 및 달성 목록이 업데이트되어야 한다', () => {
        useGameStore.getState().visitLandmark('guide');

        const state = useGameStore.getState();
        expect(state.completedQuests).toContain('visit-guide');
        expect(state.questPoints).toBe(100);
    });
});
