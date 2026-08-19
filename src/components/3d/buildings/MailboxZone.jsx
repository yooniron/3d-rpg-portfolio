import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TriggerZone } from '../TriggerZone';
import { useGameStore } from '../../../stores/useGameStore';

export const MailboxZone = ({ position = [0, 0, 18], onInteract }) => {
    const envelopeRef = useRef();
    const nearbyBuilding = useGameStore((state) => state.nearbyBuilding);
    const isNear = nearbyBuilding?.id === 'mailbox';

    useFrame((state, delta) => {
        if (envelopeRef.current) {
            envelopeRef.current.rotation.y += delta * 1.2;
            envelopeRef.current.position.y = 3.2 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
        }
    });

    return (
        <group position={position}>
            {/* White Stone Gazebo Base */}
            <mesh position={[0, 0.2, 0]} receiveShadow>
                <cylinderGeometry args={[3, 3.2, 0.4, 8]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Mailbox Pedestal */}
            <mesh position={[0, 1.2, 0]} castShadow>
                <cylinderGeometry args={[0.3, 0.4, 1.8, 12]} />
                <meshStandardMaterial color="#cbd5e1" />
            </mesh>

            {/* Cheerful Emerald Mailbox Box */}
            <mesh position={[0, 2.2, 0]} castShadow>
                <boxGeometry args={[1.2, 0.9, 1.4]} />
                <meshStandardMaterial color="#10b981" metalness={0.2} roughness={0.2} />
            </mesh>

            {/* Mailbox Curved Cap */}
            <mesh position={[0, 2.65, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.6, 0.6, 1.2, 16, 1, false, 0, Math.PI]} />
                <meshStandardMaterial color="#059669" />
            </mesh>

            {/* Floating Glowing Envelope Icon */}
            <group ref={envelopeRef} position={[0, 3.2, 0]}>
                <mesh>
                    <boxGeometry args={[0.8, 0.5, 0.1]} />
                    <meshStandardMaterial color="#10b981" emissive="#34d399" emissiveIntensity={0.6} />
                </mesh>
            </group>

            {/* Lantern Posts */}
            {[-1.8, 1.8].map((x, i) => (
                <group key={i} position={[x, 0, 0]}>
                    <mesh position={[0, 1.4, 0]}>
                        <cylinderGeometry args={[0.08, 0.1, 2.8, 8]} />
                        <meshStandardMaterial color="#94a3b8" />
                    </mesh>
                    <mesh position={[0, 2.6, 0]}>
                        <sphereGeometry args={[0.25, 8, 8]} />
                        <meshBasicMaterial color="#f59e0b" />
                    </mesh>
                </group>
            ))}

            {/* Signboard (Bright) */}
            <Html position={[0, 4.2, 0]} center distanceFactor={20}>
                <div
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1.5px solid #059669',
                        color: '#065f46',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 14px rgba(5, 150, 105, 0.25)'
                    }}
                >
                    📮 TIMELINE MAILBOX (Contact)
                </div>
            </Html>

            {/* Interaction Proximity Zone */}
            <TriggerZone
                position={[0, 0, 1.2]}
                radius={3.2}
                color="#059669"
                isNear={isNear}
                label="우체통 열기 (Contact & Coffee Chat)"
                onInteract={onInteract}
            />
        </group>
    );
};
