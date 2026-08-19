import React, { useMemo } from 'react';
import { useGameStore } from '../../stores/useGameStore';

export const TownEnvironment = () => {
    const dayNight = useGameStore((state) => state.dayNight);

    const envConfig = useMemo(() => {
        switch (dayNight) {
            case 'sunset':
                return {
                    fogColor: '#fed7aa',
                    ambientColor: '#ffedd5',
                    ambientIntensity: 0.9,
                    sunColor: '#f97316',
                    sunIntensity: 1.8,
                    sunPos: [25, 15, 20],
                    groundColor: '#bbf7d0',
                    roadColor: '#fef3c7'
                };
            case 'night':
                return {
                    fogColor: '#1e1b4b',
                    ambientColor: '#312e81',
                    ambientIntensity: 0.6,
                    sunColor: '#818cf8',
                    sunIntensity: 0.9,
                    sunPos: [15, 25, 15],
                    groundColor: '#0f172a',
                    roadColor: '#1e293b'
                };
            case 'day':
            default:
                return {
                    fogColor: '#bae6fd',
                    ambientColor: '#ffffff',
                    ambientIntensity: 1.4,
                    sunColor: '#fffbeb',
                    sunIntensity: 2.2,
                    sunPos: [20, 35, 20],
                    groundColor: '#86efac', // Fresh vibrant meadow green
                    roadColor: '#ffffff'     // Crisp white/ivory stone paved road
                };
        }
    }, [dayNight]);

    // Trees positions
    const treePositions = useMemo(() => [
        [-10, 0, -8], [-8, 0, -18], [-24, 0, -6], [-25, 0, -20],
        [10, 0, -8], [12, 0, -22], [25, 0, -6], [24, 0, -22],
        [-10, 0, 8], [-12, 0, 22], [-24, 0, 6], [-24, 0, 22],
        [10, 0, 8], [12, 0, 22], [26, 0, 20], [25, 0, 2]
    ], []);

    // Flower patches positions
    const flowerPatches = useMemo(() => [
        [-6, 0, -11], [6, 0, -11],
        [-6, 0, 8], [6, 0, 8],
        [-12, 0, 0], [12, 0, 0],
        [-4, 0, 16], [4, 0, 16]
    ], []);

    // Street lamp positions
    const lampPositions = useMemo(() => [
        [-6, 0, -6], [6, 0, -6],
        [-6, 0, 6], [6, 0, 6],
        [-14, 0, -10], [14, 0, -10],
        [-14, 0, 10], [14, 0, 10],
        [0, 0, 12], [0, 0, -10]
    ], []);

    return (
        <>
            {/* Sunny Sky Fog */}
            <fog attach="fog" args={[envConfig.fogColor, 25, 90]} />

            {/* Hemisphere & Ambient Lighting for Brightness */}
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

            {/* Lush Fresh Meadow Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[160, 160]} />
                <meshStandardMaterial color={envConfig.groundColor} roughness={0.7} />
            </mesh>

            {/* Paved Stone Road Network (Crisp Ivory) */}
            {/* North-South Main Boulevard */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
                <planeGeometry args={[5.2, 48]} />
                <meshStandardMaterial color={envConfig.roadColor} roughness={0.4} />
            </mesh>
            {/* East-West Avenue North */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -14]} receiveShadow>
                <planeGeometry args={[48, 5.2]} />
                <meshStandardMaterial color={envConfig.roadColor} roughness={0.4} />
            </mesh>
            {/* East-West Avenue South */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 11]} receiveShadow>
                <planeGeometry args={[48, 5.2]} />
                <meshStandardMaterial color={envConfig.roadColor} roughness={0.4} />
            </mesh>

            {/* Road Curbs (Subtle Slate Border) */}
            {/* North-South Curb Left */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.7, 0.025, 0]}>
                <planeGeometry args={[0.25, 48]} />
                <meshBasicMaterial color="#cbd5e1" />
            </mesh>
            {/* North-South Curb Right */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.7, 0.025, 0]}>
                <planeGeometry args={[0.25, 48]} />
                <meshBasicMaterial color="#cbd5e1" />
            </mesh>

            {/* Colorful Flower Patches */}
            {flowerPatches.map((pos, idx) => (
                <group key={`flower-${idx}`} position={pos}>
                    {[-0.6, 0, 0.6].map((fx, fi) =>
                        [-0.6, 0, 0.6].map((fz, fz_i) => (
                            <mesh key={`${fi}-${fz_i}`} position={[fx, 0.15, fz]}>
                                <sphereGeometry args={[0.18, 8, 8]} />
                                <meshStandardMaterial
                                    color={(fi + fz_i) % 3 === 0 ? '#f43f5e' : (fi + fz_i) % 3 === 1 ? '#fbbf24' : '#c084fc'}
                                />
                            </mesh>
                        ))
                    )}
                </group>
            ))}

            {/* Cheerful Low-Poly Birch/Pine Trees */}
            {treePositions.map((pos, idx) => (
                <group key={`tree-${idx}`} position={pos}>
                    {/* Birch White/Amber Trunk */}
                    <mesh position={[0, 1.2, 0]} castShadow>
                        <cylinderGeometry args={[0.25, 0.35, 2.4, 6]} />
                        <meshStandardMaterial color="#fef3c7" roughness={0.8} />
                    </mesh>
                    {/* Vibrant Foliage */}
                    <mesh position={[0, 3.2, 0]} castShadow>
                        <coneGeometry args={[1.8, 2.6, 6]} />
                        <meshStandardMaterial color="#10b981" roughness={0.5} />
                    </mesh>
                    <mesh position={[0, 4.6, 0]} castShadow>
                        <coneGeometry args={[1.3, 2.2, 6]} />
                        <meshStandardMaterial color="#34d399" roughness={0.5} />
                    </mesh>
                    <mesh position={[0, 5.8, 0]} castShadow>
                        <coneGeometry args={[0.8, 1.8, 6]} />
                        <meshStandardMaterial color="#6ee7b7" roughness={0.5} />
                    </mesh>
                </group>
            ))}

            {/* Elegant Modern White Streetlamps */}
            {lampPositions.map((pos, idx) => (
                <group key={`lamp-${idx}`} position={pos}>
                    <mesh position={[0, 1.8, 0]} castShadow>
                        <cylinderGeometry args={[0.08, 0.12, 3.6, 8]} />
                        <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 3.7, 0]}>
                        <sphereGeometry args={[0.3, 12, 12]} />
                        <meshBasicMaterial color="#38bdf8" />
                    </mesh>
                    <pointLight position={[0, 3.7, 0]} color="#38bdf8" intensity={0.6} distance={6} />
                </group>
            ))}
        </>
    );
};
