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
            roofCrystalRef.current.position.y = 11.8 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
        }
    });

    return (
        <group position={position}>
            {/* 입구 석조 계단 테라스 기단부 */}
            <mesh position={[0, 0.2, 4.8]} receiveShadow castShadow>
                <boxGeometry args={[7.2, 0.4, 2.5]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.4, 4.4]} receiveShadow castShadow>
                <boxGeometry args={[6.4, 0.4, 2.0]} />
                <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
            </mesh>

            {/* 아카데미 메인 건물 기단부 (아이보리 스톤 텍스처) */}
            <mesh position={[0, 3.8, 0]} castShadow receiveShadow>
                <boxGeometry args={[10.5, 7.2, 8.5]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.05} />
            </mesh>

            {/* 정면 입구 클래식 Corinthian 기둥 4본 */}
            {[-3.6, -1.2, 1.2, 3.6].map((x, i) => (
                <group key={`column-${i}`} position={[x, 3.8, 4.3]}>
                    {/* 기둥 주두 (Capital) */}
                    <mesh position={[0, 3.5, 0]} castShadow>
                        <boxGeometry args={[0.7, 0.25, 0.7]} />
                        <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
                    </mesh>
                    {/* 기둥 몸통 */}
                    <mesh castShadow receiveShadow>
                        <cylinderGeometry args={[0.32, 0.42, 6.8, 16]} />
                        <meshStandardMaterial color="#f1f5f9" roughness={0.25} metalness={0.1} />
                    </mesh>
                </group>
            ))}

            {/* 정면 아치형 유리창 6개 & 프레임 */}
            {[-3.2, 0, 3.2].map((x, i) => (
                <group key={`window-${i}`} position={[x, 5.2, 4.28]}>
                    {/* 유리창 불빛 */}
                    <mesh>
                        <planeGeometry args={[1.5, 2.2]} />
                        <meshStandardMaterial color="#fef08a" emissive="#fbcfe8" emissiveIntensity={0.6} />
                    </mesh>
                    {/* 프레임 외곽 테두리 */}
                    <mesh position={[0, 0, 0.01]}>
                        <planeGeometry args={[1.65, 2.35]} />
                        <meshBasicMaterial color="#1e293b" wireframe />
                    </mesh>
                </group>
            ))}

            {/* 클래식 지붕 박공 (Gable Front Pediment) */}
            <mesh position={[0, 7.8, 4.3]} rotation={[0, 0, 0]} castShadow>
                <coneGeometry args={[5.6, 2.0, 3]} rotation={[0, 0, 0]} />
                <meshStandardMaterial color="#475569" roughness={0.4} />
            </mesh>

            {/* 경사 기와 지붕 메인 (사파이어 틸) */}
            <mesh position={[0, 8.2, 0]} castShadow>
                <cylinderGeometry args={[0.2, 7.8, 2.2, 4]} rotation={[0, Math.PI / 4, 0]} />
                <meshStandardMaterial color="#0d9488" roughness={0.4} />
            </mesh>

            {/* 상부 중앙 시계탑 / 지식 타워 */}
            <mesh position={[0, 9.6, 0]} castShadow receiveShadow>
                <boxGeometry args={[3.2, 3.2, 3.2]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </mesh>
            {/* 시계탑 시계 다이얼 */}
            <mesh position={[0, 9.8, 1.62]}>
                <circleGeometry args={[0.7, 24]} />
                <meshStandardMaterial color="#fef3c7" emissive="#fbbf24" emissiveIntensity={0.5} />
            </mesh>

            {/* 상단 부유하는 지식의 크리스탈 */}
            <mesh ref={roofCrystalRef} position={[0, 11.8, 0]} castShadow>
                <octahedronGeometry args={[1.1, 0]} />
                <meshStandardMaterial color="#a855f7" emissive="#c084fc" emissiveIntensity={0.8} roughness={0.1} />
            </mesh>

            {/* 정면 입구 클래식 원목 이중문 */}
            <group position={[0, 2.0, 4.28]}>
                <mesh>
                    <boxGeometry args={[2.2, 3.2, 0.1]} />
                    <meshStandardMaterial color="#451a03" roughness={0.6} />
                </mesh>
                {/* 문 손잡이 */}
                <mesh position={[-0.15, 0, 0.08]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshStandardMaterial color="#fbbf24" metalness={0.8} />
                </mesh>
                <mesh position={[0.15, 0, 0.08]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshStandardMaterial color="#fbbf24" metalness={0.8} />
                </mesh>
            </group>

            {/* 건물 타이틀 HTML 배지 */}
            <Html position={[0, 7.8, 4.6]} center distanceFactor={22}>
                <div
                    style={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        backdropFilter: 'blur(8px)',
                        border: '1.5px solid #a855f7',
                        color: '#ffffff',
                        padding: '5px 12px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 20px rgba(168, 85, 247, 0.35)'
                    }}
                >
                    🎓 ACADEMY HALL (학력/교육)
                </div>
            </Html>

            {/* 입구 상호작용 트리거 존 */}
            <TriggerZone
                position={[0, 0, 4.8]}
                radius={4.0}
                color="#7c3aed"
                isNear={isNear}
                label="입장하기 (학력 & 이수내역)"
                onInteract={onInteract}
            />
        </group>
    );
};
