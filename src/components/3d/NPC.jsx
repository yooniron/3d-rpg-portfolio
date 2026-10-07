import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../stores/useGameStore';

/**
 * 3D NPC 아바타 컴포넌트 (자율 배회 AI 및 앰비언트 말풍선 적용)
 * 
 * - 자율 배회(Autonomous Wander AI): 기준 스폰 위치 중심 반경 내 무작위 이동
 * - 플레이어 근접 감지 및 바라보기(Look-At)
 * - 앰비언트 혼잣말 말풍선 주기적 노출
 */
export function NPC({ npc }) {
    const groupRef = useRef();
    const headRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [ambientQuote, setAmbientQuote] = useState(null);

    const playerPos = useGameStore((state) => state.playerPos);
    const setNearbyNPC = useGameStore((state) => state.setNearbyNPC);
    const openNPCModal = useGameStore((state) => state.openNPCModal);
    const activeNPC = useGameStore((state) => state.activeNPC);
    const talkedNPCs = useGameStore((state) => state.talkedNPCs);

    const isTalked = talkedNPCs.includes(npc.id);
    const isInteractingWithMe = activeNPC && activeNPC.id === npc.id;

    // AI 자율 배회 상태 레퍼런스
    const aiState = useRef({
        state: 'IDLE', // 'IDLE' | 'WANDERING' | 'INTERACTING'
        originPos: new THREE.Vector3(...npc.position),
        currentPos: new THREE.Vector3(...npc.position),
        targetPos: new THREE.Vector3(...npc.position),
        rotationY: 0,
        idleTimer: 0,
        idleDuration: 2.0 + Math.random() * 3.0
    });

    // 앰비언트 혼잣말 말풍선 타이머
    useEffect(() => {
        if (!npc.ambientQuotes || npc.ambientQuotes.length === 0) return;

        const quoteInterval = setInterval(() => {
            // 40% 확률로 무작위 앰비언트 대사 팝업
            if (Math.random() < 0.6) {
                const randomIdx = Math.floor(Math.random() * npc.ambientQuotes.length);
                setAmbientQuote(npc.ambientQuotes[randomIdx]);
                
                // 3.5초 후 말풍선 닫기
                setTimeout(() => {
                    setAmbientQuote(null);
                }, 3500);
            }
        }, 8000 + Math.random() * 4000);

        return () => clearInterval(quoteInterval);
    }, [npc.ambientQuotes]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const ai = aiState.current;
        const speed = (npc.speed || 1.2) * delta;
        const radius = npc.patrolRadius || 4.0;

        // 1. 머리 부분 부드러운 위아래 둥둥 부유 애니메이션
        if (headRef.current) {
            headRef.current.position.y = 1.6 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
        }

        // 2. 플레이어와의 거리 계산
        const playerVector = new THREE.Vector3(...playerPos);
        const distToPlayer = ai.currentPos.distanceTo(playerVector);

        // 3.5유닛 이내로 접근 시 근접 NPC 등록
        if (distToPlayer < 3.5) {
            setNearbyNPC(npc);
        }

        // 3. AI 자율 배회 & Look-At 상태 머신
        if (isInteractingWithMe || distToPlayer < 2.5) {
            // 플레이어와 대화 중이거나 매우 가까울 때: 플레이어를 바라보고 정지
            ai.state = 'INTERACTING';
            const dx = playerVector.x - ai.currentPos.x;
            const dz = playerVector.z - ai.currentPos.z;
            const targetRot = Math.atan2(dx, dz);
            
            // 회전각 각도 보간 (Lerp)
            const diff = Math.atan2(Math.sin(targetRot - ai.rotationY), Math.cos(targetRot - ai.rotationY));
            ai.rotationY += diff * 0.1;
            groupRef.current.rotation.y = ai.rotationY;
        } else {
            // 자유 배회 모드
            if (ai.state === 'IDLE' || ai.state === 'INTERACTING') {
                ai.idleTimer += delta;
                if (ai.idleTimer >= ai.idleDuration) {
                    // IDLE 종료 -> 무작위 새로운 목표 위치 설정
                    const randomAngle = Math.random() * Math.PI * 2;
                    const randomDist = Math.random() * radius;
                    ai.targetPos.set(
                        ai.originPos.x + Math.cos(randomAngle) * randomDist,
                        ai.originPos.y,
                        ai.originPos.z + Math.sin(randomAngle) * randomDist
                    );
                    ai.state = 'WANDERING';
                    ai.idleTimer = 0;
                    ai.idleDuration = 3.0 + Math.random() * 4.0;
                }
            } else if (ai.state === 'WANDERING') {
                const distToTarget = ai.currentPos.distanceTo(ai.targetPos);

                if (distToTarget < 0.3) {
                    // 목표 도착 -> IDLE로 전환
                    ai.state = 'IDLE';
                } else {
                    // 목표 위치 방향으로 이동 및 회전
                    const dx = ai.targetPos.x - ai.currentPos.x;
                    const dz = ai.targetPos.z - ai.currentPos.z;
                    const targetRot = Math.atan2(dx, dz);

                    const diff = Math.atan2(Math.sin(targetRot - ai.rotationY), Math.cos(targetRot - ai.rotationY));
                    ai.rotationY += diff * 0.1;
                    groupRef.current.rotation.y = ai.rotationY;

                    // 스텝 단위 이동
                    const dir = new THREE.Vector3(dx, 0, dz).normalize();
                    ai.currentPos.addScaledVector(dir, speed);
                    groupRef.current.position.copy(ai.currentPos);
                }
            }
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
            {/* 상단 부유 HTML 말풍선 & 이름표 & 앰비언트 대사 */}
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
                        gap: '6px',
                        transform: hovered ? 'scale(1.08)' : 'scale(1)',
                        transition: 'transform 0.2s ease'
                    }}
                >
                    {/* 앰비언트 대사 말풍선 (팝업 시 표시) */}
                    {ambientQuote && (
                        <div
                            style={{
                                background: 'rgba(15, 23, 42, 0.92)',
                                color: '#f8fafc',
                                padding: '6px 12px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: 500,
                                border: `1.5px solid ${npc.color}`,
                                boxShadow: `0 4px 15px ${npc.color}50`,
                                animation: 'fadeIn 0.3s ease',
                                maxWidth: '200px',
                                whiteSpace: 'normal',
                                textCenter: 'center'
                            }}
                        >
                            💬 "{ambientQuote}"
                        </div>
                    )}

                    {/* NPC 이름표 & 뱃지 */}
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

                    {/* NPC 역할 표식 */}
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
