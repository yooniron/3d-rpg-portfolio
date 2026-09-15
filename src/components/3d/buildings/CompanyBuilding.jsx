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
    const dishRef = useRef();
    const nearbyBuilding = useGameStore((state) => state.nearbyBuilding);
    const isNear = nearbyBuilding?.id === id;

    useFrame((state, delta) => {
        if (beaconRef.current) {
            beaconRef.current.rotation.y += delta * 1.5;
        }
        if (dishRef.current) {
            dishRef.current.rotation.y += delta * 0.4;
        }
    });

    return (
        <group position={position}>
            {/* 타워 석조 림 기초 기단 */}
            <mesh position={[0, 0.2, 0]} receiveShadow castShadow>
                <boxGeometry args={[width + 0.8, 0.4, depth + 0.8]} />
                <meshStandardMaterial color="#334155" roughness={0.4} />
            </mesh>

            {/* 고층 타워 메인 유리 커튼월 메인 바디 */}
            <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                    color="#0f172a"
                    metalness={0.85}
                    roughness={0.15}
                />
            </mesh>

            {/* 메인 모서리 메탈 기둥 프레임 */}
            {[-width / 2, width / 2].map((x, xi) =>
                [-depth / 2, depth / 2].map((z, zi) => (
                    <mesh key={`${xi}-${zi}`} position={[x, height / 2, z]}>
                        <boxGeometry args={[0.35, height + 0.4, 0.35]} />
                        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
                    </mesh>
                ))
            )}

            {/* 커튼월 층별 파사드 유리 창문 그리드 패널 */}
            {Array.from({ length: floors }).map((_, f) => (
                <group key={`floor-${f}`} position={[0, 2.2 + f * ((height - 2) / floors), depth / 2 + 0.04]}>
                    {/* 발광 창문 밴드 */}
                    <mesh>
                        <planeGeometry args={[width * 0.88, (height - 3) / floors]} />
                        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.1} />
                    </mesh>
                    {/* 수직 분할 윈도우 그릴 프레임 */}
                    {[-width * 0.28, 0, width * 0.28].map((gx, gi) => (
                        <mesh key={`grille-${gi}`} position={[gx, 0, 0.01]}>
                            <boxGeometry args={[0.08, (height - 3) / floors, 0.04]} />
                            <meshBasicMaterial color="#0284c7" />
                        </mesh>
                    ))}
                </group>
            ))}

            {/* 상단 자발광 브랜드 LOGO 3D 파사드 간판 */}
            <mesh position={[0, height - 1.2, depth / 2 + 0.1]}>
                <boxGeometry args={[width * 0.7, 0.9, 0.15]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
            </mesh>

            {/* 옥상 헬리패드 구조물 & 'H' 데칼 */}
            <group position={[0, height + 0.3, 0]}>
                <mesh receiveShadow>
                    <boxGeometry args={[width * 0.85, 0.6, depth * 0.85]} />
                    <meshStandardMaterial color="#475569" roughness={0.5} />
                </mesh>
                {/* 'H' 헬리패드 노란색 표시 */}
                <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[2.2, 2.2]} />
                    <meshBasicMaterial color="#f59e0b" />
                </mesh>
            </group>

            {/* 옥상 위성 안테나 디쉬 & 안테나 비콘 */}
            <group position={[-width * 0.25, height + 1.2, -depth * 0.2]}>
                <mesh position={[0, 0.8, 0]} castShadow>
                    <cylinderGeometry args={[0.08, 0.12, 1.6, 8]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.8} />
                </mesh>
                {/* 회전하는 위성 파라볼라 안테나 */}
                <mesh ref={dishRef} position={[0, 1.6, 0]} rotation={[Math.PI / 4, 0, 0]}>
                    <sphereGeometry args={[0.6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 3]} />
                    <meshStandardMaterial color="#f8fafc" metalness={0.5} side={2} />
                </mesh>
            </group>

            {/* 옥상 회전 안테나 크리스탈 비콘 */}
            <group position={[width * 0.25, height + 1.2, depth * 0.2]}>
                <mesh position={[0, 1.2, 0]}>
                    <cylinderGeometry args={[0.08, 0.16, 2.4, 8]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.8} />
                </mesh>
                <mesh ref={beaconRef} position={[0, 2.5, 0]}>
                    <sphereGeometry args={[0.5, 16, 16]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
                </mesh>
            </group>

            {/* 모던 메탈 입구 캐노피 & 이중 회전문 프레임 */}
            <group position={[0, 0, depth / 2 + 0.05]}>
                {/* 유리 캐노피 */}
                <mesh position={[0, 2.4, 1.2]} castShadow>
                    <boxGeometry args={[4.2, 0.2, 2.4]} />
                    <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.1} />
                </mesh>
                {/* 캐노피 메탈 지지대 강철 와이어 */}
                <mesh position={[-1.8, 3.2, 1.1]} rotation={[0.4, 0, 0]}>
                    <cylinderGeometry args={[0.04, 0.04, 1.8, 8]} />
                    <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
                </mesh>
                <mesh position={[1.8, 3.2, 1.1]} rotation={[0.4, 0, 0]}>
                    <cylinderGeometry args={[0.04, 0.04, 1.8, 8]} />
                    <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
                </mesh>
                {/* 입구 메탈 로비 전면 유리 */}
                <mesh position={[0, 1.1, 0]}>
                    <planeGeometry args={[3.6, 2.2]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
                </mesh>
            </group>

            {/* 건물 간판 HTML 배지 */}
            <Html position={[0, height + 1.2, depth / 2 + 0.2]} center distanceFactor={22}>
                <div
                    style={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        backdropFilter: 'blur(8px)',
                        border: `1.5px solid ${color}`,
                        color: '#ffffff',
                        padding: '5px 12px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        boxShadow: `0 8px 24px ${color}55`
                    }}
                >
                    🏢 {name}
                </div>
            </Html>

            {/* 상호작용 트리거 존 */}
            <TriggerZone
                position={[0, 0, depth / 2 + 2.2]}
                radius={4.0}
                color={color}
                isNear={isNear}
                label={label}
                onInteract={onInteract}
            />
        </group>
    );
};
