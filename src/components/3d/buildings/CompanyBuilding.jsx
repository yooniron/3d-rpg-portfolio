import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TriggerZone } from '../TriggerZone';
import { useGameStore } from '../../../stores/useGameStore';

export const CompanyBuilding = ({
    id = "company-a",
    name = "A-Tech Tower",
    label = "A 테크 HQ (재직 경력)",
    color = "#0284c7",
    position = [18, 0, -14],
    height = 14,
    width = 8,
    depth = 7,
    floors = 5,
    onInteract
}) => {
    const beaconRef = useRef();
    const nearbyBuilding = useGameStore((state) => state.nearbyBuilding);
    const isNear = nearbyBuilding?.id === id;

    useFrame((state, delta) => {
        if (beaconRef.current) {
            beaconRef.current.rotation.y += delta * 1.5;
        }
    });

    return (
        <group position={position}>
            {/* 고층 타워 메인 글래스 메인 바디 */}
            <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                    color="#f0f9ff"
                    metalness={0.4}
                    roughness={0.1}
                />
            </mesh>

            {/* 메인 외곽 기둥 파사드 */}
            {[-width / 2, width / 2].map((x, xi) =>
                [-depth / 2, depth / 2].map((z, zi) => (
                    <mesh key={`${xi}-${zi}`} position={[x, height / 2, z]}>
                        <boxGeometry args={[0.3, height + 0.5, 0.3]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                ))
            )}

            {/* 층별 사무실 창문 밴드 */}
            {Array.from({ length: floors }).map((_, f) => (
                <mesh key={f} position={[0, 2.5 + f * (height / floors), depth / 2 + 0.05]}>
                    <planeGeometry args={[width * 0.85, 1.3]} />
                    <meshBasicMaterial color={f % 2 === 0 ? "#bae6fd" : "#38bdf8"} />
                </mesh>
            ))}

            {/* 옥상 헬리패드 구조물 */}
            <mesh position={[0, height + 0.3, 0]} receiveShadow>
                <boxGeometry args={[width * 0.85, 0.6, depth * 0.85]} />
                <meshStandardMaterial color="#e2e8f0" />
            </mesh>

            {/* 옥상 안테나 크리스탈 비콘 */}
            <group position={[0, height + 1.2, 0]}>
                <mesh position={[0, 1.2, 0]}>
                    <cylinderGeometry args={[0.1, 0.2, 2.4, 8]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.8} />
                </mesh>
                <mesh ref={beaconRef} position={[0, 2.5, 0]}>
                    <sphereGeometry args={[0.5, 16, 16]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
                </mesh>
            </group>

            {/* 모던 캐노피 입구 */}
            <mesh position={[0, 2.2, depth / 2 + 1.2]} castShadow>
                <boxGeometry args={[4, 0.3, 2.2]} />
                <meshStandardMaterial color="#ffffff" metalness={0.2} />
            </mesh>
            <mesh position={[0, 1.1, depth / 2 + 0.05]}>
                <planeGeometry args={[3, 2.2]} />
                <meshBasicMaterial color="#38bdf8" />
            </mesh>

            {/* 건물 간판 HTML 배지 */}
            <Html position={[0, height + 0.8, depth / 2 + 0.2]} center distanceFactor={22}>
                <div
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: `1.5px solid ${color}`,
                        color: '#0f172a',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        boxShadow: `0 4px 14px ${color}44`
                    }}
                >
                    🏢 {name}
                </div>
            </Html>

            {/* 상호작용 트리거 존 */}
            <TriggerZone
                position={[0, 0, depth / 2 + 2.2]}
                radius={3.8}
                color={color}
                isNear={isNear}
                label={label}
                onInteract={onInteract}
            />
        </group>
    );
};
