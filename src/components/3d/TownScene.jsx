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

    // 지면 클릭 시 마우스 이동(Click-to-Move) 핸들러
    const handleGroundPointerDown = (e) => {
        // 모달이 열려있는 경우 지면 클릭 무시
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
                {/* 대기 환경, 하늘 및 조명 렌더러 */}
                <TownEnvironment />

                {/* 마우스 지면 클릭 이동 감지 레이캐스트 평면 */}
                <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0.01, 0]}
                    visible={false}
                    onPointerDown={handleGroundPointerDown}
                >
                    <planeGeometry args={[140, 140]} />
                    <meshBasicMaterial />
                </mesh>

                {/* 1. 중앙 광장 및 가이드 안내판 */}
                <CentralGuide
                    position={[0, 0, 0]}
                    onInteract={() => openModal('guide')}
                />

                {/* 2. 아카데미 도서관 건물 */}
                <SchoolBuilding
                    position={[-18, 0, -14]}
                    onInteract={() => openModal('school')}
                />

                {/* 3. 회사 직무 경력 건물 */}
                {/* A회사: A-Tech HQ */}
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

                {/* B회사: B-Next Labs */}
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

                {/* 4. 프로젝트 아케이드 랩 */}
                <ArcadeLab
                    position={[-18, 0, 12]}
                    onInteract={() => openModal('arcade')}
                />

                {/* 5. 타임라인 우체통 */}
                <MailboxZone
                    position={[0, 0, 18]}
                    onInteract={() => openModal('mailbox')}
                />

                {/* 플레이어 아바타 및 컨트롤러 */}
                <Player />
            </Canvas>
        </div>
    );
};
