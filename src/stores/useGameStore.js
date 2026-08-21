import { create } from 'zustand';
import { careerData } from '../data/careerData';
import { soundEngine } from '../utils/soundEngine';

export const useGameStore = create((set, get) => ({
    // 모드 설정: 3D RPG 타운 ↔ 2D 이력서 뷰
    mode: '3D', // '3D' | '2D'
    setMode: (mode) => {
        soundEngine.playClick();
        set({ mode });
    },

    // 활성 모달 다이얼로그 및 시네마틱 카메라 시퀀서
    activeModal: null, // null | 'guide' | 'school' | 'company-a' | 'company-b' | 'arcade' | 'mailbox' | 'quest' | 'badges'
    modalData: null,
    cinematicTarget: null, // 시네마틱 카메라 선행 타겟 ID
    openModal: (modalId, data = null) => {
        const isLandmark = careerData.landmarks.some((l) => l.id === modalId);
        if (isLandmark) {
            get().triggerCinematicModal(modalId, data);
        } else {
            soundEngine.playModalOpen();
            set({ activeModal: modalId, modalData: data, cinematicTarget: modalId });
        }
    },
    triggerCinematicModal: (modalId, data = null) => {
        soundEngine.playModalOpen();
        get().visitLandmark(modalId);

        // 1단계: 3D 카메라 줌인 시퀀스 선행 시작
        set({ cinematicTarget: modalId });

        // 2단계: 650ms 느긋한 카메라 줌인 글라이딩 후 모달 팝업 노출
        setTimeout(() => {
            set({ activeModal: modalId, modalData: data });
        }, 650);
    },
    closeModal: () => {
        soundEngine.playModalClose();
        set({ activeModal: null, modalData: null, cinematicTarget: null });
    },

    // 근접 감지 및 상호작용
    nearbyBuilding: null, // 플레이어가 건물 근처에 접근했을 때의 랜드마크 객체
    setNearbyBuilding: (building) => {
        const current = get().nearbyBuilding;
        if (building && (!current || current.id !== building.id)) {
            soundEngine.playHover();
        }
        set({ nearbyBuilding: building });
    },

    // 플레이어 네비게이션 및 이동 상태
    playerPos: [0, 0, 0],
    playerRotation: 0,
    isMoving: false,
    isRunning: false,
    targetMovePos: null, // 지면 클릭 시 이동 타겟 좌표 [x, y, z]
    setPlayerPos: (pos) => set({ playerPos: pos }),
    setPlayerRotation: (rot) => set({ playerRotation: rot }),
    setIsMoving: (isMoving) => set({ isMoving }),
    setIsRunning: (isRunning) => set({ isRunning }),
    setTargetMovePos: (pos) => set({ targetMovePos: pos }),

    // 텔레포트 (순간이동)
    teleportTarget: null,
    teleportTo: (pos) => {
        soundEngine.playTeleport();
        set({ teleportTarget: pos, targetMovePos: null });
    },
    clearTeleport: () => set({ teleportTarget: null }),

    // 퀘스트 및 탐험 달성도
    visitedLandmarks: [],
    completedQuests: [],
    questPoints: 0,
    visitLandmark: (id) => {
        if (!id) return;
        const { visitedLandmarks, completedQuests, questPoints } = get();
        if (!visitedLandmarks.includes(id)) {
            const newVisited = [...visitedLandmarks, id];
            const matchedQuest = careerData.quests.find((q) => q.target === id);
            let newCompleted = [...completedQuests];
            let newPoints = questPoints;

            if (matchedQuest && !completedQuests.includes(matchedQuest.id)) {
                newCompleted.push(matchedQuest.id);
                newPoints += matchedQuest.points;
                soundEngine.playQuestComplete();
            }

            set({
                visitedLandmarks: newVisited,
                completedQuests: newCompleted,
                questPoints: newPoints
            });
        }
    },

    // 사운드 제어
    soundEnabled: false,
    toggleSound: () => {
        const current = get().soundEnabled;
        const next = !current;
        if (next) {
            soundEngine.init();
            soundEngine.startBGM();
        } else {
            soundEngine.stopBGM();
        }
        set({ soundEnabled: next });
    },

    // 시간대 및 대기 환경 조명 (낮/노을/밤)
    dayNight: 'day', // 'day' | 'sunset' | 'night'
    cycleDayNight: () => {
        soundEngine.playClick();
        const modes = ['day', 'sunset', 'night'];
        const currentIdx = modes.indexOf(get().dayNight);
        const nextMode = modes[(currentIdx + 1) % modes.length];
        set({ dayNight: nextMode });
    },

    // 모바일 가상 조이스틱 입력
    virtualJoystick: { x: 0, y: 0, active: false },
    setVirtualJoystick: (val) => set({ virtualJoystick: val })
}));
