import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../stores/useGameStore';

const MAX_PARTICLES = 30;

export const FootstepParticles = () => {
    const playerPos = useGameStore((state) => state.playerPos);
    const isMoving = useGameStore((state) => state.isMoving);
    const isRunning = useGameStore((state) => state.isRunning);

    const particlesRef = useRef([]);
    const groupRef = useRef();
    const spawnTimer = useRef(0);
    const lastPlayerPos = useRef(new THREE.Vector3(...playerPos));

    // 파티클 메시 참조 및 인스턴스 배열 관리
    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const currentPos = new THREE.Vector3(...playerPos);
        const distMoved = currentPos.distanceTo(lastPlayerPos.current);

        // 플레이어가 일정 거리 이상 이동했을 때 발자국 먼지 파티클 생성
        if (isMoving && distMoved > 0.05) {
            spawnTimer.current += delta;
            const spawnInterval = isRunning ? 0.08 : 0.15;

            if (spawnTimer.current >= spawnInterval) {
                spawnTimer.current = 0;
                lastPlayerPos.current.copy(currentPos);

                // 파티클 풀에서 사용할 인스턴스 찾기
                for (let i = 0; i < 2; i++) {
                    const offsetAngle = Math.random() * Math.PI * 2;
                    const offsetRadius = Math.random() * 0.25;

                    particlesRef.current.push({
                        x: currentPos.x + Math.cos(offsetAngle) * offsetRadius,
                        y: 0.05,
                        z: currentPos.z + Math.sin(offsetAngle) * offsetRadius,
                        vx: (Math.random() - 0.5) * 0.4,
                        vy: Math.random() * 0.6 + 0.2,
                        vz: (Math.random() - 0.5) * 0.4,
                        scale: Math.random() * 0.12 + 0.08,
                        alpha: 0.7,
                        life: 1.0, // 1초 간 지속
                        maxLife: Math.random() * 0.4 + 0.3
                    });
                }
            }
        }

        // 파티클 업데이트 및 렌더링
        const children = groupRef.current.children;
        let activeIdx = 0;

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.life -= delta / p.maxLife;

            if (p.life <= 0) {
                particlesRef.current.splice(i, 1);
                continue;
            }

            p.x += p.vx * delta;
            p.y += p.vy * delta;
            p.z += p.vz * delta;
            p.vy -= 1.2 * delta; // 중력 연산

            if (activeIdx < children.length) {
                const mesh = children[activeIdx];
                mesh.position.set(p.x, Math.max(0.02, p.y), p.z);
                const currentScale = p.scale * (p.life / 1.0);
                mesh.scale.set(currentScale, currentScale, currentScale);
                if (mesh.material) {
                    mesh.material.opacity = Math.max(0, (p.life / 1.0) * 0.6);
                }
                mesh.visible = true;
                activeIdx++;
            }
        }

        // 나머지 안쓰는 메시는 숨기기
        for (let j = activeIdx; j < children.length; j++) {
            children[j].visible = false;
        }

        // 최대 수 제한
        if (particlesRef.current.length > MAX_PARTICLES) {
            particlesRef.current.splice(0, particlesRef.current.length - MAX_PARTICLES);
        }
    });

    return (
        <group ref={groupRef}>
            {Array.from({ length: MAX_PARTICLES }).map((_, idx) => (
                <mesh key={idx} visible={false}>
                    <sphereGeometry args={[1, 6, 6]} />
                    <meshBasicMaterial
                        color="#d1d5db"
                        transparent
                        opacity={0.5}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </group>
    );
};

export default FootstepParticles;
