import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../stores/useGameStore';

/**
 * 3D NPC 아바타 메시 컴포넌트
 * npcTemplates 객체를 전달받아 3D 월드 상에 렌더링하고, 플레이어 근접 감지 및 대화 팝업을 트리거합니다.
 */
export function NPC({ npc }) {
    const groupRef = useRef();
    const headRef = useRef();
    const [hovered, setHovered] = useState(false);

    const playerPos = useGameStore((state) => state.playerPos);
    const setNearbyNPC = useGameStore((state) => state.setNearbyNPC);
    const openNPCModal = useGameStore((state) => state.openNPCModal);
    const talkedNPCs = useGameStore((state) => state.talkedNPCs);

    const isTalked = talkedNPCs.includes(npc.id);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // 1. 머리 부분 부드러운 위아래 둥둥 부유 애니메이션
        if (headRef.current) {
            headRef.current.position.y = 1.6 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
        }

        // 2. 플레이어와의 실시간 3D 거리 센서
        const npcVector = new THREE.Vector3(...npc.position);
        const playerVector = new THREE.Vector3(...playerPos);
        const dist = npcVector.distanceTo(playerVector);

        // 3.5유닛 이내로 접근 시 근접 NPC 등록
        if (dist < 3.5) {
            setNearbyNPC(npc);
        }
    });

    const handleClick = (e) => {
        e.stopPropagation();
        openNPCModal(npc);
    };

    return (
        <group
            ref={groupRef}
            position={npc.position}
            onClick={handleClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* 상단 부유 HTML 말풍선 & 이름표 */}
            <Html
                position={[0, 2.6, 0]}
                center
                distanceFactor={18}
                style={{
                    pointerEvents: 'none',
                    userSelect: 'none',
                    whiteSpace: 'nowrap'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        transform: hovered ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.2s ease'
                    }}
                >
                    <div
                        style={{
                            background: 'rgba(15, 23, 42, 0.85)',
                            backdropFilter: 'blur(8px)',
                            border: `1.5px solid ${npc.color}`,
                            borderRadius: '20px',
                            padding: '4px 12px',
                            color: '#ffffff',
                            fontSize: '12px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: `0 0 12px ${npc.color}40`
                        }}
                    >
                        <span style={{ fontSize: '14px' }}>{npc.avatar}</span>
                        <span>{npc.name}</span>
                        {isTalked && (
                            <span style={{ color: '#10b981', fontSize: '10px' }}>✓ 대화완료</span>
                        )}
                    </div>
                    <div
                        style={{
                            background: 'rgba(0, 0, 0, 0.6)',
                            color: '#94a3b8',
                            fontSize: '10px',
                            padding: '2px 8px',
                            borderRadius: '10px'
                        }}
                    >
                        {npc.role}
                    </div>
                </div>
            </Html>

            {/* 3D 아바타 몸통 (Low-Poly Cylinder) */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.3, 0.45, 1.5, 16]} />
                <meshStandardMaterial
                    color={hovered ? '#ffffff' : npc.color}
                    roughness={0.3}
                    metalness={0.2}
                />
            </mesh>

            {/* 3D 아바타 머리 (Sphere) */}
            <mesh ref={headRef} position={[0, 1.6, 0]} castShadow>
                <sphereGeometry args={[0.35, 16, 16]} />
                <meshStandardMaterial
                    color={hovered ? '#ffffff' : '#f8fafc'}
                    roughness={0.2}
                />
            </mesh>

            {/* 발밑 글로우 링 (Ring) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <ringGeometry args={[0.5, 0.7, 32]} />
                <meshBasicMaterial
                    color={npc.color}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={hovered ? 0.8 : 0.4}
                />
            </mesh>
        </group>
    );
}
