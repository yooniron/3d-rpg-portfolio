import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { useGameStore } from '../stores/useGameStore';

describe('Player Movement Physics & Motion Engine (playerMovement.test.js)', () => {
    beforeEach(() => {
        useGameStore.setState({
            playerPos: [0, 0, 4],
            playerRotation: 0,
            isMoving: false,
            isRunning: false
        });
    });

    it('이동 입력 활성화 시 관성 가속도(Velocity Lerp)가 원활히 수렴해야 한다', () => {
        const velocity = new THREE.Vector3(0, 0, 0);
        const inputDir = new THREE.Vector3(1, 0, 0).normalize();
        const maxSpeed = 6.8;
        const targetVelocity = inputDir.clone().multiplyScalar(maxSpeed);

        const delta = 0.016; // ~60fps
        const accelDamp = 1 - Math.exp(-14.0 * delta);

        velocity.lerp(targetVelocity, accelDamp);

        expect(velocity.x).toBeGreaterThan(0);
        expect(velocity.x).toBeLessThan(maxSpeed);

        // 10 프레임 수행 후 가속 수렴 테스트
        for (let i = 0; i < 10; i++) {
            velocity.lerp(targetVelocity, accelDamp);
        }
        expect(velocity.x).toBeGreaterThan(5.0);
    });

    it('이동 정지 시 마찰 감속에 의해 속도 벡터가 0으로 정상 감소해야 한다', () => {
        const velocity = new THREE.Vector3(6.8, 0, 0);
        const targetVelocity = new THREE.Vector3(0, 0, 0);

        const delta = 0.016;
        const frictionDamp = 1 - Math.exp(-10.0 * delta);

        for (let i = 0; i < 20; i++) {
            velocity.lerp(targetVelocity, frictionDamp);
        }

        expect(velocity.length()).toBeLessThan(0.8);
    });

    it('급회전 각도 차이(Angle Diff) 계산 시 -PI ~ PI 범위로 정상 래핑되어야 한다', () => {
        const currentRotation = Math.PI * 0.9;
        const targetAngle = -Math.PI * 0.9;

        let angleDiff = targetAngle - currentRotation;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        expect(angleDiff).toBeGreaterThan(-Math.PI);
        expect(angleDiff).toBeLessThan(Math.PI);
        expect(Math.abs(angleDiff)).toBeCloseTo(Math.PI * 0.2, 5);
    });

    it('Zustand store의 이동 및 런닝 플래그가 전역 상태와 동기화되어야 한다', () => {
        useGameStore.getState().setIsMoving(true);
        useGameStore.getState().setIsRunning(true);

        expect(useGameStore.getState().isMoving).toBe(true);
        expect(useGameStore.getState().isRunning).toBe(true);
    });
});
