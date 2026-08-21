import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TriggerZone } from '../TriggerZone';
import { useGameStore } from '../../../stores/useGameStore';

export const ArcadeLab = ({ position = [-18, 0, 12], onInteract }) => {
    const holoRingRef = useRef();
    const nearbyBuilding = useGameStore((state) => state.nearbyBuilding);
    const isNear = nearbyBuilding?.id === 'arcade';

    useFrame((state, delta) => {
        if (holoRingRef.current) {
            holoRingRef.current.rotation.x += delta * 0.8;
            holoRingRef.current.rotation.y += delta * 1.2;
        }
    });

    return (
        <group position={position}>
            {/* 레트로 모던 아케이드 메인 구조물 (화이트/코랄) */}
            <mesh position={[0, 3, 0]} castShadow receiveShadow>
                <boxGeometry args={[9, 6, 8]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
            </mesh>

            {/* 네온 프레임 테두리 (엠버/코랄) */}
            <mesh position={[0, 6.1, 0]}>
                <boxGeometry args={[9.2, 0.3, 8.2]} />
                <meshStandardMaterial color="#f59e0b" />
            </mesh>

            {/* 옥상 부유 홀로그램 프로젝터 링 */}
            <group position={[0, 7.5, 0]}>
                <mesh ref={holoRingRef}>
                    <torusGeometry args={[1.5, 0.15, 16, 32]} />
                    <meshStandardMaterial color="#f59e0b" emissive="#fbbf24" emissiveIntensity={0.6} />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <dodecahedronGeometry args={[0.7, 0]} />
                    <meshStandardMaterial color="#f43f5e" emissive="#fb7185" emissiveIntensity={0.6} />
                </mesh>
            </group>

            {/* 전면 아케이드 게임기 캐비닛 미니어처 */}
            {[-2.5, 2.5].map((x, i) => (
                <group key={i} position={[x, 1.2, 4.3]}>
                    {/* 게임기 캐비닛 바디 */}
                    <mesh castShadow>
                        <boxGeometry args={[1.2, 2.4, 1.2]} />
                        <meshStandardMaterial color={i === 0 ? "#38bdf8" : "#f43f5e"} />
                    </mesh>
                    {/* 발광 아케이드 스크린 */}
                    <mesh position={[0, 0.4, 0.61]}>
                        <planeGeometry args={[0.9, 0.7]} />
                        <meshBasicMaterial color="#fef08a" />
                    </mesh>
                </group>
            ))}

            {/* 입구 아치문 */}
            <mesh position={[0, 1.5, 4.05]}>
                <planeGeometry args={[2.5, 3.0]} />
                <meshBasicMaterial color="#1e293b" />
            </mesh>

            {/* 간판 HTML 배지 */}
            <Html position={[0, 6.5, 4.5]} center distanceFactor={22}>
                <div
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1.5px solid #d97706',
                        color: '#b45309',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 16px rgba(217, 119, 6, 0.25)'
                    }}
                >
                    🕹️ PROJECT ARCADE & LAB
                </div>
            </Html>

            {/* 상호작용 트리거 존 */}
            <TriggerZone
                position={[0, 0, 5]}
                radius={3.8}
                color="#d97706"
                isNear={isNear}
                label="프로젝트 아케이드 플레이"
                onInteract={onInteract}
            />
        </group>
    );
};
