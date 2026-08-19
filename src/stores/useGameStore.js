import { create } from 'zustand';
import { careerData } from '../data/careerData';
import { soundEngine } from '../utils/soundEngine';

export const useGameStore = create((set, get) => ({
    // Mode: 3D RPG Town vs 2D Traditional Resume
    mode: '3D', // '3D' | '2D'
    setMode: (mode) => {
        soundEngine.playClick();
        set({ mode });
    },

    // Active UI Modal
    activeModal: null, // null | 'guide' | 'school' | 'company-a' | 'company-b' | 'arcade' | 'mailbox' | 'quest' | 'badges'
    modalData: null,
    openModal: (modalId, data = null) => {
        soundEngine.playModalOpen();
        get().visitLandmark(modalId);
        set({ activeModal: modalId, modalData: data });
    },
    closeModal: () => {
        soundEngine.playModalClose();
        set({ activeModal: null, modalData: null });
    },

    // Proximity & Interaction
    nearbyBuilding: null, // landmark object when player is close
    setNearbyBuilding: (building) => {
        const current = get().nearbyBuilding;
        if (building && (!current || current.id !== building.id)) {
            soundEngine.playHover();
        }
        set({ nearbyBuilding: building });
    },

    // Player Navigation & State
    playerPos: [0, 0, 0],
    playerRotation: 0,
    isMoving: false,
    isRunning: false,
    targetMovePos: null, // [x, y, z] when clicked on ground
    setPlayerPos: (pos) => set({ playerPos: pos }),
    setPlayerRotation: (rot) => set({ playerRotation: rot }),
    setIsMoving: (isMoving) => set({ isMoving }),
    setIsRunning: (isRunning) => set({ isRunning }),
    setTargetMovePos: (pos) => set({ targetMovePos: pos }),

    // Teleportation
    teleportTarget: null,
    teleportTo: (pos) => {
        soundEngine.playTeleport();
        set({ teleportTarget: pos, targetMovePos: null });
    },
    clearTeleport: () => set({ teleportTarget: null }),

    // Quests & Exploration Progress
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

    // Audio Controls
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

    // Atmosphere / Day-Night Cycle
    dayNight: 'day', // 'day' | 'sunset' | 'night'
    cycleDayNight: () => {
        soundEngine.playClick();
        const modes = ['day', 'sunset', 'night'];
        const currentIdx = modes.indexOf(get().dayNight);
        const nextMode = modes[(currentIdx + 1) % modes.length];
        set({ dayNight: nextMode });
    },

    // Mobile virtual joystick input
    virtualJoystick: { x: 0, y: 0, active: false },
    setVirtualJoystick: (val) => set({ virtualJoystick: val })
}));
