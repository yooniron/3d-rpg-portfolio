import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '../stores/useGameStore';

describe('3D Visual Enhancement & PostProcessing State Tests', () => {
    beforeEach(() => {
        useGameStore.setState({
            postProcessingEnabled: true,
            nearbyBuilding: null
        });
    });

    it('should have postProcessingEnabled initialized to true by default', () => {
        const state = useGameStore.getState();
        expect(state.postProcessingEnabled).toBe(true);
    });

    it('should toggle postProcessingEnabled state via togglePostProcessing', () => {
        const { togglePostProcessing } = useGameStore.getState();

        togglePostProcessing();
        expect(useGameStore.getState().postProcessingEnabled).toBe(false);

        togglePostProcessing();
        expect(useGameStore.getState().postProcessingEnabled).toBe(true);
    });

    it('should set nearbyBuilding for LandmarkAuraRing rendering', () => {
        const mockBuilding = { id: 'company-a', name: 'A-Tech HQ', position: [18, 0, -14], color: '#38bdf8' };
        const { setNearbyBuilding } = useGameStore.getState();

        setNearbyBuilding(mockBuilding);
        expect(useGameStore.getState().nearbyBuilding).toEqual(mockBuilding);
    });
});
