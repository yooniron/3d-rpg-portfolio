import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TriggerZone } from '../TriggerZone';
import { useGameStore } from '../../../stores/useGameStore';

export const CentralGuide = ({ position = [0, 0, 0], onInteract }) => {
    const crystalRef = useRef();
    const ringRef = useRef();
    const nearbyBuilding = useGameStore((state) => state.nearbyBuilding);
    const isNear = nearbyBuilding?.id === 'guide';

    useFrame((state, delta) => {
        if (crystalRef.current) {
            crystalRef.current.rotation.y += delta * 1.0;
            crystalRef.current.position.y = 2.4 + Math.sin(state.clock.elapsedTime * 2.5) * 0.15;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z -= delta * 0.6;
        }
    });

    return (
        <group position={position}>
            {/* Central Plaza Circular White Marble Platform */}
            <mesh position={[0, 0.1, 0]} receiveShadow>
                <cylinderGeometry args={[5.5, 5.8, 0.2, 32]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
            </mesh>

            {/* Decorative Gold Outer Ring */}
            <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[5.0, 5.3, 32]} />
                <meshBasicMaterial color="#38bdf8" />
            </mesh>

            {/* Center Fountain / Monument Pedestal (Ivory Marble) */}
            <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[1.5, 1.8, 1.2, 16]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.1} />
            </mesh>

            {/* Floating Center Core Crystal (Vibrant Cyan) */}
            <mesh ref={crystalRef} position={[0, 2.4, 0]}>
                <octahedronGeometry args={[0.7, 0]} />
                <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={0.6} />
            </mesh>

            {/* Orbiting Tech Ring */}
            <group position={[0, 2.4, 0]}>
                <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
                    <torusGeometry args={[1.2, 0.05, 16, 32]} />
                    <meshBasicMaterial color="#0284c7" />
                </mesh>
            </group>

            {/* Guide Signboard (Bright Frosted) */}
            <Html position={[0, 3.8, 0]} center distanceFactor={18}>
                <div
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1.5px solid #0284c7',
                        color: '#0f172a',
                        padding: '6px 14px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 16px rgba(2, 132, 199, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <span>🧭</span>
                    <span>중앙 광장 안내판 (Start & Guide)</span>
                </div>
            </Html>

            {/* Trigger Zone */}
            <TriggerZone
                position={[0, 0, 0]}
                radius={3.8}
                color="#0284c7"
                isNear={isNear}
                label="안내판 읽기 (가이드 & 지도)"
                onInteract={onInteract}
            />
        </group>
    );
};
