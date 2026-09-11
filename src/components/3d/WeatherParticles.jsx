import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../stores/useGameStore';

/**
 * 동적 3D 파티클 날씨 에미터 컴포넌트
 * weather 상태(sunny | rain | snow | sakura)에 맞춰 3D 공간 상에 빗줄기, 눈송이, 벚꽃잎, 먼지 파티클을 시뮬레이션합니다.
 */
export function WeatherParticles() {
    const weather = useGameStore((state) => state.weather);

    const rainRef = useRef();
    const snowRef = useRef();
    const sakuraRef = useRef();
    const sunnyRef = useRef();

    // 1. 빗줄기 파티클 초기 포지션 및 딜레이 배열 (300개)
    const rainParticles = useMemo(() => {
        const count = 300;
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 70;
            positions[i * 3 + 1] = Math.random() * 30 + 2;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 70;
            velocities[i] = Math.random() * 0.4 + 0.5;
        }
        return { count, positions, velocities };
    }, []);

    // 2. 눈송이 파티클 초기 포지션 및 스웨이 파라미터 (250개)
    const snowParticles = useMemo(() => {
        const count = 250;
        const positions = new Float32Array(count * 3);
        const offsets = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 70;
            positions[i * 3 + 1] = Math.random() * 25 + 1;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 70;
            offsets[i] = Math.random() * Math.PI * 2;
        }
        return { count, positions, offsets };
    }, []);

    // 3. 벚꽃잎 파티클 초기 포지션 및 회전 파라미터 (180개)
    const sakuraParticles = useMemo(() => {
        const count = 180;
        const positions = new Float32Array(count * 3);
        const rotations = new Float32Array(count * 3);
        const speeds = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 65;
            positions[i * 3 + 1] = Math.random() * 22 + 1;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 65;
            rotations[i * 3] = Math.random() * Math.PI;
            rotations[i * 3 + 1] = Math.random() * Math.PI;
            rotations[i * 3 + 2] = Math.random() * Math.PI;
            speeds[i] = Math.random() * 0.08 + 0.04;
        }
        return { count, positions, rotations, speeds };
    }, []);

    // 4. 맑은 날 공기 먼지 입자 (120개)
    const sunnyParticles = useMemo(() => {
        const count = 120;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 1] = Math.random() * 15 + 1;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
        }
        return { count, positions };
    }, []);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();

        // 🌧️ 빗줄기 프레임 애니메이션
        if (weather === 'rain' && rainRef.current) {
            const geo = rainRef.current.geometry;
            const posAttr = geo.attributes.position;
            for (let i = 0; i < rainParticles.count; i++) {
                let y = posAttr.getY(i);
                y -= rainParticles.velocities[i] * delta * 55;
                if (y < 0) {
                    y = Math.random() * 10 + 25;
                }
                posAttr.setY(i, y);
            }
            posAttr.needsUpdate = true;
        }

        // ❄️ 눈송이 프레임 애니메이션 (바람 스웨이)
        if (weather === 'snow' && snowRef.current) {
            const geo = snowRef.current.geometry;
            const posAttr = geo.attributes.position;
            for (let i = 0; i < snowParticles.count; i++) {
                let x = posAttr.getX(i);
                let y = posAttr.getY(i);
                let z = posAttr.getZ(i);

                y -= delta * 3.5;
                x += Math.sin(time * 1.5 + snowParticles.offsets[i]) * 0.03;
                z += Math.cos(time * 1.2 + snowParticles.offsets[i]) * 0.02;

                if (y < 0) {
                    y = Math.random() * 5 + 25;
                    x = (Math.random() - 0.5) * 70;
                    z = (Math.random() - 0.5) * 70;
                }
                posAttr.setXYZ(i, x, y, z);
            }
            posAttr.needsUpdate = true;
        }

        // 🌸 벚꽃잎 프레임 애니메이션 (살랑살랑 회전 및 수평 드리프트)
        if (weather === 'sakura' && sakuraRef.current) {
            const geo = sakuraRef.current.geometry;
            const posAttr = geo.attributes.position;
            for (let i = 0; i < sakuraParticles.count; i++) {
                let x = posAttr.getX(i);
                let y = posAttr.getY(i);
                let z = posAttr.getZ(i);

                y -= sakuraParticles.speeds[i] * delta * 25;
                x += Math.sin(time * 2.0 + i) * 0.05;
                z += Math.cos(time * 1.5 + i) * 0.04;

                if (y < 0) {
                    y = Math.random() * 5 + 22;
                    x = (Math.random() - 0.5) * 65;
                    z = (Math.random() - 0.5) * 65;
                }
                posAttr.setXYZ(i, x, y, z);
            }
            posAttr.needsUpdate = true;
        }

        // ☀️ 맑은 날 먼지 입자 부유
        if (weather === 'sunny' && sunnyRef.current) {
            const geo = sunnyRef.current.geometry;
            const posAttr = geo.attributes.position;
            for (let i = 0; i < sunnyParticles.count; i++) {
                let y = posAttr.getY(i);
                y += Math.sin(time * 1.2 + i) * 0.01;
                posAttr.setY(i, y);
            }
            posAttr.needsUpdate = true;
        }
    });

    return (
        <group>
            {/* ☀️ 맑음: 황금빛 엠비언트 Dust */}
            {weather === 'sunny' && (
                <points ref={sunnyRef}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[sunnyParticles.positions, 3]}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.15}
                        color="#fef08a"
                        transparent
                        opacity={0.6}
                        blending={THREE.AdditiveBlending}
                    />
                </points>
            )}

            {/* 🌧️ 비: 3D 빗줄기 Lines */}
            {weather === 'rain' && (
                <points ref={rainRef}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[rainParticles.positions, 3]}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.25}
                        color="#38bdf8"
                        transparent
                        opacity={0.75}
                        blending={THREE.AdditiveBlending}
                    />
                </points>
            )}

            {/* ❄️ 눈: 부드러운 3D 눈송이 Flakes */}
            {weather === 'snow' && (
                <points ref={snowRef}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[snowParticles.positions, 3]}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.35}
                        color="#ffffff"
                        transparent
                        opacity={0.85}
                        blending={THREE.AdditiveBlending}
                    />
                </points>
            )}

            {/* 🌸 벚꽃: 분홍빛 3D 벚꽃잎 Petals */}
            {weather === 'sakura' && (
                <points ref={sakuraRef}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[sakuraParticles.positions, 3]}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.4}
                        color="#f472b6"
                        transparent
                        opacity={0.9}
                        blending={THREE.NormalBlending}
                    />
                </points>
            )}
        </group>
    );
}
