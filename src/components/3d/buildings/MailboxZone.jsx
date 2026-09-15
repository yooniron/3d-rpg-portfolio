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
            envelopeRef.current.position.y = 3.4 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
        }
    });

    return (
        <group position={position}>
            {/* 팔각 석조 데크 기단부 */}
            <mesh position={[0, 0.15, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[3.4, 3.8, 0.3, 8]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
            </mesh>

            {/* 메탈릭 우체통 지지 받침 기둥 */}
            <mesh position={[0, 1.2, 0]} castShadow>
                <cylinderGeometry args={[0.32, 0.45, 1.8, 12]} />
                <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.2} />
            </mesh>

            {/* 빈티지 에메랄드 우체통 본체 */}
            <group position={[0, 2.3, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[1.3, 1.0, 1.5]} />
                    <meshStandardMaterial color="#059669" metalness={0.4} roughness={0.2} />
                </mesh>
                {/* 둥근 곡면 지붕 캡 */}
                <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.65, 0.65, 1.3, 16, 1, false, 0, Math.PI]} />
                    <meshStandardMaterial color="#047857" metalness={0.4} roughness={0.2} />
                </mesh>
                {/* 우편함 투입구 골드 슬롯 */}
                <mesh position={[0, 0.15, 0.76]}>
                    <boxGeometry args={[0.8, 0.12, 0.04]} />
                    <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* 우체통 깃발 레버 */}
                <mesh position={[0.68, 0.2, 0]} rotation={[0, 0, 0.3]}>
                    <boxGeometry args={[0.04, 0.6, 0.1]} />
                    <meshStandardMaterial color="#ef4444" />
                </mesh>
            </group>

            {/* 상단 부유하는 편지 봉투 크리스탈 */}
            <group ref={envelopeRef} position={[0, 3.4, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[0.85, 0.55, 0.12]} />
                    <meshStandardMaterial color="#10b981" emissive="#34d399" emissiveIntensity={0.8} />
                </mesh>
            </group>

            {/* 휴식용 우든 파크 벤치 */}
            <group position={[-2.2, 0.45, 0]} rotation={[0, Math.PI / 2, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[1.6, 0.1, 0.6]} />
                    <meshStandardMaterial color="#78350f" roughness={0.6} />
                </mesh>
                <mesh position={[-0.6, -0.25, 0]}>
                    <boxGeometry args={[0.1, 0.4, 0.5]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                <mesh position={[0.6, -0.25, 0]}>
                    <boxGeometry args={[0.1, 0.4, 0.5]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
            </group>

            {/* 클래식 공원 가로등 기둥 */}
            {[-2.0, 2.0].map((x, i) => (
                <group key={`mailbox-lamp-${i}`} position={[x, 0, -1.8]}>
                    <mesh position={[0, 1.5, 0]} castShadow>
                        <cylinderGeometry args={[0.08, 0.12, 3.0, 8]} />
                        <meshStandardMaterial color="#1e293b" metalness={0.8} />
                    </mesh>
                    <mesh position={[0, 3.1, 0]}>
                        <sphereGeometry args={[0.28, 12, 12]} />
                        <meshBasicMaterial color="#fef08a" />
                    </mesh>
                    <pointLight position={[0, 3.1, 0]} color="#fef08a" intensity={0.8} distance={6} />
                </group>
            ))}

            {/* 건물 간판 HTML 배지 */}
            <Html position={[0, 4.4, 0]} center distanceFactor={20}>
                <div
                    style={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        backdropFilter: 'blur(8px)',
                        border: '1.5px solid #10b981',
                        color: '#ffffff',
                        padding: '5px 12px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)'
                    }}
                >
                    📮 TIMELINE MAILBOX (Contact)
                </div>
            </Html>

            {/* 상호작용 트리거 존 */}
            <TriggerZone
                position={[0, 0, 1.4]}
                radius={3.4}
                color="#059669"
                isNear={isNear}
                label="우체통 열기 (Contact & Coffee Chat)"
                onInteract={onInteract}
            />
        </group>
    );
};
