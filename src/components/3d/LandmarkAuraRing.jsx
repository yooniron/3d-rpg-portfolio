import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../../stores/useGameStore';

export const LandmarkAuraRing = () => {
    const nearbyBuilding = useGameStore((state) => state.nearbyBuilding);
    const ringRef = useRef();
    const innerRingRef = useRef();

    useFrame((state, delta) => {
        if (ringRef.current) {
            ringRef.current.rotation.z += delta * 0.8;
        }
        if (innerRingRef.current) {
            innerRingRef.current.rotation.z -= delta * 1.2;
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.08;
            innerRingRef.current.scale.set(pulse, pulse, 1);
        }
    });

    if (!nearbyBuilding || !nearbyBuilding.position) return null;

    const [bx, , bz] = nearbyBuilding.position;
    const ringColor = nearbyBuilding.color || '#38bdf8';

    return (
        <group position={[bx, 0.08, bz]} rotation={[-Math.PI / 2, 0, 0]}>
            {/* 외곽 회전 점선 링 */}
            <mesh ref={ringRef}>
                <ringGeometry args={[2.8, 3.2, 32]} />
                <meshBasicMaterial
                    color={ringColor}
                    transparent
                    opacity={0.65}
                    wireframe
                />
            </mesh>

            {/* 내측 부드럽게 숨쉬는 빛 링 */}
            <mesh ref={innerRingRef}>
                <ringGeometry args={[1.8, 2.2, 32]} />
                <meshBasicMaterial
                    color={ringColor}
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* 중앙 빛의 기둥 아우라 하이라이트 */}
            <mesh position={[0, 0, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[1.5, 2.5, 1.6, 16, 1, true]} />
                <meshBasicMaterial
                    color={ringColor}
                    transparent
                    opacity={0.15}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
};

export default LandmarkAuraRing;
