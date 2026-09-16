import React, { useMemo } from 'react';
import { useGameStore } from '../../stores/useGameStore';

export const TownEnvironment = () => {
    const timeOfDay = useGameStore((state) => state.timeOfDay);
    const weather = useGameStore((state) => state.weather);

    const envConfig = useMemo(() => {
        let base = {
            fogColor: '#bae6fd',
            ambientColor: '#ffffff',
            ambientIntensity: 1.4,
            sunColor: '#fffbeb',
            sunIntensity: 2.2,
            sunPos: [20, 35, 20],
            groundColor: '#86efac',
            roadColor: '#ffffff'
        };

        // 1. 시간대별 조명 및 안개 설정
        switch (timeOfDay) {
            case 'sunset':
                base = {
                    fogColor: '#fdba74',
                    ambientColor: '#ffedd5',
                    ambientIntensity: 0.95,
                    sunColor: '#f97316',
                    sunIntensity: 1.9,
                    sunPos: [35, 12, 20],
                    groundColor: '#bbf7d0',
                    roadColor: '#fef3c7'
                };
                break;
            case 'night':
                base = {
                    fogColor: '#0f172a',
                    ambientColor: '#1e1b4b',
                    ambientIntensity: 0.5,
                    sunColor: '#818cf8',
                    sunIntensity: 0.7,
                    sunPos: [15, 25, 15],
                    groundColor: '#090d16',
                    roadColor: '#1e293b'
                };
                break;
            case 'day':
            default:
                break;
        }

        // 2. 날씨별 조명 보정
        if (weather === 'rain') {
            base.fogColor = timeOfDay === 'night' ? '#020617' : '#94a3b8';
            base.ambientIntensity *= 0.65;
            base.sunIntensity *= 0.5;
            base.roadColor = '#475569'; // 비에 젖은 어두운 보도블록
        } else if (weather === 'snow') {
            base.fogColor = timeOfDay === 'night' ? '#1e293b' : '#e2e8f0';
            base.groundColor = '#f8fafc'; // 흰 눈이 덮인 잔디밭
            base.roadColor = '#cbd5e1';
        } else if (weather === 'sakura') {
            base.fogColor = timeOfDay === 'sunset' ? '#f472b6' : (timeOfDay === 'night' ? '#4c1d95' : '#fbcfe8');
        }

        return base;
    }, [timeOfDay, weather]);

    // 나무 위치 배열
    const treePositions = useMemo(() => [
        [-10, 0, -8], [-8, 0, -18], [-24, 0, -6], [-25, 0, -20],
        [10, 0, -8], [12, 0, -22], [25, 0, -6], [24, 0, -22],
        [-10, 0, 8], [-12, 0, 22], [-24, 0, 6], [-24, 0, 22],
        [10, 0, 8], [12, 0, 22], [26, 0, 20], [25, 0, 2]
    ], []);

    // 화단 및 꽃 화분 위치 배열
    const flowerPatches = useMemo(() => [
        [-6, 0, -11], [6, 0, -11],
        [-6, 0, 8], [6, 0, 8],
        [-12, 0, 0], [12, 0, 0],
        [-4, 0, 16], [4, 0, 16]
    ], []);

    // 가로등 위치 배열
    const lampPositions = useMemo(() => [
        [-6, 0, -6], [6, 0, -6],
        [-6, 0, 6], [6, 0, 6],
        [-14, 0, -10], [14, 0, -10],
        [-14, 0, 10], [14, 0, 10],
        [0, 0, 12], [0, 0, -10]
    ], []);

    return (
        <>
            {/* 대기 하늘 안개 효과 */}
            <fog attach="fog" args={[envConfig.fogColor, 25, 90]} />

            {/* 조명 및 환경광 */}
            <hemisphereLight args={['#bae6fd', '#86efac', 0.8]} />
            <ambientLight color={envConfig.ambientColor} intensity={envConfig.ambientIntensity} />

            <directionalLight
                position={envConfig.sunPos}
                intensity={envConfig.sunIntensity}
                color={envConfig.sunColor}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-near={0.5}
                shadow-camera-far={100}
                shadow-camera-left={-35}
                shadow-camera-right={35}
                shadow-camera-top={35}
                shadow-camera-bottom={-35}
                shadow-bias={-0.0004}
            />

            {/* 잔디 지형 평면 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[160, 160]} />
                <meshStandardMaterial color={envConfig.groundColor} roughness={0.7} />
            </mesh>

            {/* 보도블록 도로 경계망 */}
            {/* 남북 방향 메인 도로 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
                <planeGeometry args={[5.2, 48]} />
                <meshStandardMaterial color={envConfig.roadColor} roughness={0.4} />
            </mesh>
            {/* 동서 방향 북측 도로 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -14]} receiveShadow>
                <planeGeometry args={[48, 5.2]} />
                <meshStandardMaterial color={envConfig.roadColor} roughness={0.4} />
            </mesh>
            {/* 동서 방향 남측 도로 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 11]} receiveShadow>
                <planeGeometry args={[48, 5.2]} />
                <meshStandardMaterial color={envConfig.roadColor} roughness={0.4} />
            </mesh>

            {/* 도로 3D 보도블록 경계석 Curb Blocks */}
            <mesh position={[-2.7, 0.05, 0]}>
                <boxGeometry args={[0.3, 0.08, 48]} />
                <meshStandardMaterial color="#94a3b8" roughness={0.3} />
            </mesh>
            <mesh position={[2.7, 0.05, 0]}>
                <boxGeometry args={[0.3, 0.08, 48]} />
                <meshStandardMaterial color="#94a3b8" roughness={0.3} />
            </mesh>

            {/* 정교한 화단 오컬트 & 우든 울타리 펜스 */}
            {flowerPatches.map((pos, idx) => (
                <group key={`flower-${idx}`} position={pos}>
                    {/* 화단 원목 울타리 테두리 */}
                    <mesh position={[0, 0.1, 0]}>
                        <boxGeometry args={[2.2, 0.2, 2.2]} />
                        <meshStandardMaterial color="#78350f" roughness={0.7} />
                    </mesh>
                    <mesh position={[0, 0.12, 0]}>
                        <boxGeometry args={[1.9, 0.22, 1.9]} />
                        <meshStandardMaterial color="#451a03" roughness={0.8} />
                    </mesh>

                    {/* 삼차원 꽃 송이 */}
                    {[-0.5, 0, 0.5].map((fx, fi) =>
                        [-0.5, 0, 0.5].map((fz, fz_i) => (
                            <group key={`${fi}-${fz_i}`} position={[fx, 0.22, fz]}>
                                <mesh castShadow>
                                    <sphereGeometry args={[0.18, 8, 8]} />
                                    <meshStandardMaterial
                                        color={(fi + fz_i) % 3 === 0 ? '#f43f5e' : (fi + fz_i) % 3 === 1 ? '#fbbf24' : '#c084fc'}
                                        roughness={0.3}
                                    />
                                </mesh>
                                {/* 줄기 및 잎사귀 */}
                                <mesh position={[0, -0.1, 0]}>
                                    <cylinderGeometry args={[0.02, 0.03, 0.2, 6]} />
                                    <meshStandardMaterial color="#10b981" />
                                </mesh>
                            </group>
                        ))
                    )}
                </group>
            ))}

            {/* 디테일 로우폴리 나무 식생 오브젝트 */}
            {treePositions.map((pos, idx) => (
                <group key={`tree-${idx}`} position={pos}>
                    {/* 기둥 */}
                    <mesh position={[0, 1.2, 0]} castShadow>
                        <cylinderGeometry args={[0.25, 0.38, 2.4, 8]} />
                        <meshStandardMaterial color="#78350f" roughness={0.8} />
                    </mesh>
                    {/* 나뭇잎 3단 옥타곤 코일 */}
                    <mesh position={[0, 3.2, 0]} castShadow>
                        <coneGeometry args={[1.9, 2.6, 8]} />
                        <meshStandardMaterial color="#059669" roughness={0.4} />
                    </mesh>
                    <mesh position={[0, 4.6, 0]} castShadow>
                        <coneGeometry args={[1.4, 2.2, 8]} />
                        <meshStandardMaterial color="#10b981" roughness={0.4} />
                    </mesh>
                    <mesh position={[0, 5.8, 0]} castShadow>
                        <coneGeometry args={[0.9, 1.8, 8]} />
                        <meshStandardMaterial color="#34d399" roughness={0.4} />
                    </mesh>
                </group>
            ))}

            {/* 모던 라이트 가로등 & 갓 장식 */}
            {lampPositions.map((pos, idx) => (
                <group key={`lamp-${idx}`} position={pos}>
                    {/* 가로등 베이스 */}
                    <mesh position={[0, 0.2, 0]}>
                        <cylinderGeometry args={[0.25, 0.35, 0.4, 8]} />
                        <meshStandardMaterial color="#0f172a" metalness={0.8} />
                    </mesh>
                    {/* 기둥 */}
                    <mesh position={[0, 1.8, 0]} castShadow>
                        <cylinderGeometry args={[0.08, 0.14, 3.6, 8]} />
                        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.2} />
                    </mesh>
                    {/* 가로등 갓 */}
                    <mesh position={[0, 3.8, 0]}>
                        <coneGeometry args={[0.45, 0.2, 8]} />
                        <meshStandardMaterial color="#0f172a" metalness={0.8} />
                    </mesh>
                    {/* 발광 구체 */}
                    <mesh position={[0, 3.65, 0]}>
                        <sphereGeometry args={[0.26, 12, 12]} />
                        <meshBasicMaterial color="#38bdf8" />
                    </mesh>
                    <pointLight position={[0, 3.65, 0]} color="#38bdf8" intensity={0.7} distance={7} />
                </group>
            ))}
        </>
    );
};
