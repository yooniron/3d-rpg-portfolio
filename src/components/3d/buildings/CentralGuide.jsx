import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TriggerZone } from '../TriggerZone';
import { useGameStore } from '../../../stores/useGameStore';

export const CentralGuide = ({ position = [0, 0, 0], onInteract }) => {
    const crystalRef = useRef();
    const ringRef = useRef();
    const outerRingRef = useRef();
    const nearbyBuilding = useGameStore((state) => state.nearbyBuilding);
    const isNear = nearbyBuilding?.id === 'guide';

    useFrame((state, delta) => {
        if (crystalRef.current) {
            crystalRef.current.rotation.y += delta * 1.2;
            crystalRef.current.position.y = 2.6 + Math.sin(state.clock.elapsedTime * 2.5) * 0.15;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z -= delta * 0.8;
            ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
        }
        if (outerRingRef.current) {
            outerRingRef.current.rotation.z += delta * 0.5;
        }
    });

    return (
        <group position={position}>
            {/* 1단 하부 메인 기단 (대리석 & 브라스 림) */}
            <mesh position={[0, 0.1, 0]} receiveShadow>
                <cylinderGeometry args={[6.2, 6.5, 0.2, 32]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.1} />
            </mesh>

            {/* 2단 중부 옥타곤 기단 */}
            <mesh position={[0, 0.28, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[4.8, 5.2, 0.2, 8]} />
                <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.2} />
            </mesh>

            {/* 나침반 나침침 지면 나침반 조각 (Compass Emblem 4방위) */}
            {[-3.8, 3.8].map((offset, i) => (
                <group key={`compass-point-${i}`}>
                    <mesh position={[offset, 0.39, 0]}>
                        <boxGeometry args={[0.8, 0.02, 0.3]} />
                        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 0.39, offset]}>
                        <boxGeometry args={[0.3, 0.02, 0.8]} />
                        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
                    </mesh>
                </group>
            ))}

            {/* 3단 대리석 원형 탑 기단 & 청동 몰딩 */}
            <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[1.8, 2.2, 0.9, 16]} />
                <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.4} />
            </mesh>
            <mesh position={[0, 1.35, 0]}>
                <cylinderGeometry args={[1.4, 1.6, 0.15, 16]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* 부유하는 3D 코어 크리스탈 (Octahedron) */}
            <mesh ref={crystalRef} position={[0, 2.6, 0]} castShadow>
                <octahedronGeometry args={[0.75, 0]} />
                <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={0.9} roughness={0.1} />
            </mesh>

            {/* 내측 회전 홀로그램 링 */}
            <group position={[0, 2.6, 0]}>
                <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
                    <torusGeometry args={[1.25, 0.05, 16, 32]} />
                    <meshBasicMaterial color="#38bdf8" />
                </mesh>
            </group>

            {/* 외측 회전 황금 궤도 링 */}
            <group position={[0, 2.6, 0]}>
                <mesh ref={outerRingRef} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
                    <torusGeometry args={[1.65, 0.03, 16, 32]} />
                    <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} emissive="#f59e0b" emissiveIntensity={0.4} />
                </mesh>
            </group>

            {/* 정교한 4방향 이정표 안내 표지목 */}
            <group position={[2.5, 0, -2.5]}>
                <mesh position={[0, 1.2, 0]} castShadow>
                    <cylinderGeometry args={[0.08, 0.1, 2.4, 8]} />
                    <meshStandardMaterial color="#78350f" roughness={0.7} />
                </mesh>
                {/* 이정표 화살표 날개 1 */}
                <mesh position={[0.4, 1.9, 0]} rotation={[0, 0.2, 0]}>
                    <boxGeometry args={[0.8, 0.18, 0.05]} />
                    <meshStandardMaterial color="#fef3c7" />
                </mesh>
                {/* 이정표 화살표 날개 2 */}
                <mesh position={[-0.4, 1.6, 0]} rotation={[0, -0.4, 0]}>
                    <boxGeometry args={[0.8, 0.18, 0.05]} />
                    <meshStandardMaterial color="#38bdf8" />
                </mesh>
            </group>

            {/* 가이드 안내판 UI 배지 */}
            <Html position={[0, 4.0, 0]} center distanceFactor={18}>
                <div
                    style={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        backdropFilter: 'blur(8px)',
                        border: '1.5px solid #38bdf8',
                        color: '#ffffff',
                        padding: '6px 14px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <span>🧭</span>
                    <span>중앙 광장 안내판 (Start & Guide)</span>
                </div>
            </Html>

            {/* 트리거 존 */}
            <TriggerZone
                position={[0, 0, 0]}
                radius={4.2}
                color="#0284c7"
                isNear={isNear}
                label="안내판 읽기 (가이드 & 지도)"
                onInteract={onInteract}
            />
        </group>
    );
};
