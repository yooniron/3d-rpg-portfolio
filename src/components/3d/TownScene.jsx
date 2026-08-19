import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { TownEnvironment } from './Environment';
import { Player } from './Player';
import { CentralGuide } from './buildings/CentralGuide';
import { SchoolBuilding } from './buildings/SchoolBuilding';
import { CompanyBuilding } from './buildings/CompanyBuilding';
import { ArcadeLab } from './buildings/ArcadeLab';
import { MailboxZone } from './buildings/MailboxZone';
import { useGameStore } from '../../stores/useGameStore';

export const TownScene = () => {
    const openModal = useGameStore((state) => state.openModal);
    const setTargetMovePos = useGameStore((state) => state.setTargetMovePos);
    const activeModal = useGameStore((state) => state.activeModal);

    // Ground click handler for Click-to-Move
    const handleGroundPointerDown = (e) => {
        // If clicking on UI or modal is active, ignore
        if (activeModal) return;
        e.stopPropagation();
        if (e.point) {
            setTargetMovePos([e.point.x, 0, e.point.z]);
        }
    };

    return (
        <div className="canvas-container">
            <Canvas
                shadows
                camera={{ position: [0, 14, 18], fov: 48, near: 0.1, far: 150 }}
                gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            >
                {/* Environment, Sky & Lighting */}
                <TownEnvironment />

                {/* Raycast Target Plane for Click-to-Move */}
                <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0.01, 0]}
                    visible={false}
                    onPointerDown={handleGroundPointerDown}
                >
                    <planeGeometry args={[140, 140]} />
                    <meshBasicMaterial />
                </mesh>

                {/* 1. Central Plaza & Guide */}
                <CentralGuide
                    position={[0, 0, 0]}
                    onInteract={() => openModal('guide')}
                />

                {/* 2. School / Academy Building */}
                <SchoolBuilding
                    position={[-18, 0, -14]}
                    onInteract={() => openModal('school')}
                />

                {/* 3. Company Town Buildings */}
                {/* Company A: A-Tech HQ */}
                <CompanyBuilding
                    id="company-a"
                    name="A-Tech HQ"
                    label="A 테크 (재직 경력 & 핀테크)"
                    color="#38bdf8"
                    position={[18, 0, -14]}
                    height={15}
                    floors={6}
                    onInteract={() => openModal('company-a')}
                />

                {/* Company B: B-Next Labs */}
                <CompanyBuilding
                    id="company-b"
                    name="B-Next Labs"
                    label="B 솔루션즈 (WebGL 3D 시각화)"
                    color="#06b6d4"
                    position={[20, 0, 10]}
                    height={11}
                    floors={4}
                    onInteract={() => openModal('company-b')}
                />

                {/* 4. Project Arcade & Lab */}
                <ArcadeLab
                    position={[-18, 0, 12]}
                    onInteract={() => openModal('arcade')}
                />

                {/* 5. Timeline Mailbox */}
                <MailboxZone
                    position={[0, 0, 18]}
                    onInteract={() => openModal('mailbox')}
                />

                {/* Player Avatar */}
                <Player />
            </Canvas>
        </div>
    );
};
