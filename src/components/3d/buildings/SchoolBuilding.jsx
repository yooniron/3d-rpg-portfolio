import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TriggerZone } from '../TriggerZone';
import { useGameStore } from '../../../stores/useGameStore';

export const SchoolBuilding = ({ position = [-18, 0, -14], onInteract }) => {
    const roofCrystalRef = useRef();
    const nearbyBuilding = useGameStore((state) => state.nearbyBuilding);
    const isNear = nearbyBuilding?.id === 'school';

    useFrame((state, delta) => {
        if (roofCrystalRef.current) {
            roofCrystalRef.current.rotation.y += delta * 1.2;
            roofCrystalRef.current.position.y = 11.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
        }
    });

    return (
        <group position={position}>
            {/* Main Academy Building Base (Clean Ivory) */}
            <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[10, 7, 8]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.05} />
            </mesh>

            {/* Classical Stone Pillars (Front Entrance) */}
            {[-3.5, -1.2, 1.2, 3.5].map((x, i) => (
                <mesh key={i} position={[x, 3.5, 4.3]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.35, 0.45, 7, 16]} />
                    <meshStandardMaterial color="#f1f5f9" roughness={0.2} />
                </mesh>
            ))}

            {/* Classical Triangular Pediment Roof (Royal Violet / Sapphire) */}
            <mesh position={[0, 7.8, 0]} castShadow>
                <cylinderGeometry args={[0.2, 7.5, 1.8, 4]} rotation={[0, Math.PI / 4, 0]} />
                <meshStandardMaterial color="#6366f1" roughness={0.3} />
            </mesh>

            {/* Clock / Knowledge Tower */}
            <mesh position={[0, 9.2, 0]} castShadow>
                <boxGeometry args={[3, 3, 3]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>

            {/* Floating Magic Knowledge Crystal on Top */}
            <mesh ref={roofCrystalRef} position={[0, 11.5, 0]}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#a855f7" emissive="#c084fc" emissiveIntensity={0.6} roughness={0.1} />
            </mesh>

            {/* Glowing Warm Windows */}
            {[-2.5, 0, 2.5].map((x, i) => (
                <mesh key={i} position={[x, 5.2, 4.05]}>
                    <planeGeometry args={[1.4, 1.6]} />
                    <meshBasicMaterial color="#38bdf8" />
                </mesh>
            ))}

            {/* Entrance Doorway Arch */}
            <mesh position={[0, 1.8, 4.05]}>
                <planeGeometry args={[2.4, 3.6]} />
                <meshBasicMaterial color="#1e293b" />
            </mesh>

            {/* Building Signboard HTML Title */}
            <Html position={[0, 7.2, 4.5]} center distanceFactor={22}>
                <div
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1.5px solid #7c3aed',
                        color: '#4c1d95',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 16px rgba(124, 58, 237, 0.2)'
                    }}
                >
                    🎓 ACADEMY HALL (학력/교육)
                </div>
            </Html>

            {/* Entrance Trigger Zone */}
            <TriggerZone
                position={[0, 0, 4.8]}
                radius={3.8}
                color="#7c3aed"
                isNear={isNear}
                label="입장하기 (학력 & 이수내역)"
                onInteract={onInteract}
            />
        </group>
    );
};
