import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

/**
 * 3D Trigger Zone & Floating Indicator
 * Renders a glowing radial circle on the ground and an optional 3D HTML floating prompt
 */
export const TriggerZone = ({ position, radius = 3.5, color = "#38bdf8", isNear = false, label = "Enter", onInteract }) => {
    const ringRef = useRef();

    useFrame((state, delta) => {
        if (ringRef.current) {
            ringRef.current.rotation.z += delta * 0.8;
            const scale = isNear ? 1 + Math.sin(state.clock.elapsedTime * 4) * 0.08 : 1;
            ringRef.current.scale.set(scale, scale, 1);
        }
    });

    return (
        <group position={position}>
            {/* Ground Glowing Halo */}
            <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
                <ringGeometry args={[radius * 0.7, radius, 32]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={isNear ? 0.6 : 0.25}
                    depthWrite={false}
                />
            </mesh>

            {/* Floating 3D Text Badge when Player is Near */}
            {isNear && (
                <Html position={[0, 2.8, 0]} center distanceFactor={18} zIndexRange={[100, 0]}>
                    <div
                        onClick={onInteract}
                        style={{
                            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
                            border: `1.5px solid ${color}`,
                            color: '#fff',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            boxShadow: `0 0 16px ${color}88`,
                            whiteSpace: 'nowrap',
                            transform: 'scale(1)',
                            transition: 'transform 0.15s ease',
                            userSelect: 'none'
                        }}
                    >
                        <span
                            style={{
                                background: color,
                                color: '#090d16',
                                fontFamily: 'monospace',
                                fontWeight: 800,
                                fontSize: '11px',
                                padding: '2px 6px',
                                borderRadius: '4px'
                            }}
                        >
                            E
                        </span>
                        <span style={{ fontWeight: 700, fontSize: '12px' }}>{label}</span>
                    </div>
                </Html>
            )}
        </group>
    );
};
