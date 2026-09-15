import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TriggerZone } from '../TriggerZone';
import { useGameStore } from '../../../stores/useGameStore';

export const ArcadeLab = ({ position = [-18, 0, 12], onInteract }) => {
    const holoRingRef = useRef();
    const neonSignRef = useRef();
    const nearbyBuilding = useGameStore((state) => state.nearbyBuilding);
    const isNear = nearbyBuilding?.id === 'arcade';

    useFrame((state, delta) => {
        if (holoRingRef.current) {
            holoRingRef.current.rotation.x += delta * 0.8;
            holoRingRef.current.rotation.y += delta * 1.2;
        }
        if (neonSignRef.current) {
            neonSignRef.current.material.emissiveIntensity = 1.0 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
        }
    });

    return (
        <group position={position}>
            {/* 입구 데크 기단부 */}
            <mesh position={[0, 0.15, 4.5]} receiveShadow castShadow>
                <boxGeometry args={[9.4, 0.3, 2.2]} />
                <meshStandardMaterial color="#334155" roughness={0.5} />
            </mesh>

            {/* 레트로 사이버 아케이드 메인 구조물 */}
            <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
                <boxGeometry args={[9.2, 6.4, 8.2]} />
                <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.2} />
            </mesh>

            {/* 픽셀 아트 상부 캐노피 및 핑크 네온 몰딩 */}
            <mesh position={[0, 6.4, 0]}>
                <boxGeometry args={[9.6, 0.4, 8.6]} />
                <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.8} />
            </mesh>

            {/* 정면 커스텀 네온 튜브 마퀴 간판 (Cyber Arcade Neon) */}
            <group position={[0, 5.8, 4.18]}>
                <mesh castShadow>
                    <boxGeometry args={[7.2, 1.2, 0.2]} />
                    <meshStandardMaterial color="#1e1b4b" metalness={0.8} />
                </mesh>
                {/* 3D 발광 네온 글자 스트립 */}
                <mesh ref={neonSignRef} position={[0, 0, 0.12]}>
                    <boxGeometry args={[6.8, 0.8, 0.05]} />
                    <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={1.2} />
                </mesh>
            </group>

            {/* 옥상 부유 홀로그램 픽셀 프로젝터 링 */}
            <group position={[0, 7.8, 0]}>
                <mesh ref={holoRingRef}>
                    <torusGeometry args={[1.6, 0.16, 16, 32]} />
                    <meshStandardMaterial color="#f59e0b" emissive="#fbbf24" emissiveIntensity={0.8} />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <dodecahedronGeometry args={[0.75, 0]} />
                    <meshStandardMaterial color="#ec4899" emissive="#f43f5e" emissiveIntensity={0.9} />
                </mesh>
            </group>

            {/* 정면 아케이드 게임기 캐비닛 미니어처 2기 */}
            {[-2.8, 2.8].map((x, i) => (
                <group key={`arcade-cab-${i}`} position={[x, 1.35, 4.4]}>
                    {/* 게임기 바디 */}
                    <mesh castShadow>
                        <boxGeometry args={[1.2, 2.5, 1.1]} />
                        <meshStandardMaterial color={i === 0 ? "#0284c7" : "#d946ef"} metalness={0.3} />
                    </mesh>
                    {/* 발광 아케이드 CRT 스크린 */}
                    <mesh position={[0, 0.45, 0.56]}>
                        <planeGeometry args={[0.95, 0.75]} />
                        <meshBasicMaterial color={i === 0 ? "#38bdf8" : "#fef08a"} />
                    </mesh>
                    {/* 조이스틱 조작 패널 */}
                    <mesh position={[0, -0.05, 0.6]}>
                        <boxGeometry args={[0.9, 0.1, 0.3]} />
                        <meshStandardMaterial color="#fbbf24" />
                    </mesh>
                </group>
            ))}

            {/* 야외 사이버 소다 자판기 (Outdoor Vending Machine) */}
            <group position={[-4.2, 1.35, 2.0]} rotation={[0, Math.PI / 2, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[1.4, 2.6, 1.0]} />
                    <meshStandardMaterial color="#0284c7" metalness={0.4} />
                </mesh>
                {/* 자판기 음료 디스플레이 라벨 */}
                <mesh position={[0, 0.4, 0.51]}>
                    <planeGeometry args={[1.1, 1.2]} />
                    <meshBasicMaterial color="#38bdf8" />
                </mesh>
            </group>

            {/* 야외 벤치 의자 */}
            <group position={[4.2, 0.4, 2.0]} rotation={[0, -Math.PI / 2, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[1.8, 0.1, 0.6]} />
                    <meshStandardMaterial color="#78350f" />
                </mesh>
                <mesh position={[-0.7, -0.2, 0]}>
                    <boxGeometry args={[0.1, 0.4, 0.5]} />
                    <meshStandardMaterial color="#334155" />
                </mesh>
                <mesh position={[0.7, -0.2, 0]}>
                    <boxGeometry args={[0.1, 0.4, 0.5]} />
                    <meshStandardMaterial color="#334155" />
                </mesh>
            </group>

            {/* 입구 아치문 */}
            <mesh position={[0, 1.5, 4.15]}>
                <planeGeometry args={[2.6, 3.1]} />
                <meshBasicMaterial color="#020617" />
            </mesh>

            {/* 간판 HTML 배지 */}
            <Html position={[0, 6.8, 4.5]} center distanceFactor={22}>
                <div
                    style={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        backdropFilter: 'blur(8px)',
                        border: '1.5px solid #ec4899',
                        color: '#ffffff',
                        padding: '5px 12px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 8px 24px rgba(236, 72, 153, 0.35)'
                    }}
                >
                    🕹️ PROJECT ARCADE & LAB
                </div>
            </Html>

            {/* 상호작용 트리거 존 */}
            <TriggerZone
                position={[0, 0, 5.0]}
                radius={4.0}
                color="#d97706"
                isNear={isNear}
                label="프로젝트 아케이드 플레이"
                onInteract={onInteract}
            />
        </group>
    );
};
