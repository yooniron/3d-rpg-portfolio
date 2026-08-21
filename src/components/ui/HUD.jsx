import React, { useState, useRef } from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { developerProfile, careerData } from '../../data/careerData';
import {
    Volume2,
    VolumeX,
    Sun,
    Moon,
    Sunset,
    Compass,
    Trophy,
    FileText,
    RotateCcw,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

export const HUD = () => {
    const mode = useGameStore((state) => state.mode);
    const setMode = useGameStore((state) => state.setMode);
    const soundEnabled = useGameStore((state) => state.soundEnabled);
    const toggleSound = useGameStore((state) => state.toggleSound);
    const dayNight = useGameStore((state) => state.dayNight);
    const cycleDayNight = useGameStore((state) => state.cycleDayNight);
    const nearbyBuilding = useGameStore((state) => state.nearbyBuilding);
    const openModal = useGameStore((state) => state.openModal);
    const teleportTo = useGameStore((state) => state.teleportTo);
    const playerPos = useGameStore((state) => state.playerPos);
    const completedQuests = useGameStore((state) => state.completedQuests);
    const questPoints = useGameStore((state) => state.questPoints);
    const setVirtualJoystick = useGameStore((state) => state.setVirtualJoystick);

    const [questWidgetOpen, setQuestWidgetOpen] = useState(true);
    const joystickTouchId = useRef(null);
    const joystickStartPos = useRef({ x: 0, y: 0 });

    // 모바일 터치 가상 조이스틱 핸들러
    const handleTouchStart = (e) => {
        const touch = e.changedTouches[0];
        joystickTouchId.current = touch.identifier;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        joystickStartPos.current = { x: centerX, y: centerY };
    };

    const handleTouchMove = (e) => {
        if (joystickTouchId.current === null) return;
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            if (touch.identifier === joystickTouchId.current) {
                const dx = touch.clientX - joystickStartPos.current.x;
                const dy = touch.clientY - joystickStartPos.current.y;
                const maxDist = 45;
                const dist = Math.min(maxDist, Math.sqrt(dx * dx + dy * dy));
                const angle = Math.atan2(dy, dx);
                const normX = (Math.cos(angle) * dist) / maxDist;
                const normY = (Math.sin(angle) * dist) / maxDist;
                setVirtualJoystick({ x: normX, y: normY, active: true });
                break;
            }
        }
    };

    const handleTouchEnd = (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === joystickTouchId.current) {
                joystickTouchId.current = null;
                setVirtualJoystick({ x: 0, y: 0, active: false });
                break;
            }
        }
    };

    const totalQuests = careerData.quests.length;
    const completedCount = completedQuests.length;

    return (
        <div className="hud-overlay">
            {/* 상단 컨트롤 바 */}
            <div className="hud-top-bar hud-interactive">
                {/* 좌측: 플레이어 프로필 카드 */}
                <div className="player-card-badge">
                    <div className="avatar-circle">Y</div>
                    <div className="player-info-text">
                        <div className="player-info-title">
                            <span>{developerProfile.name}</span>
                            <span className="lvl-tag">Lv.99</span>
                        </div>
                        <div className="player-info-sub">{developerProfile.title}</div>
                    </div>
                </div>

                {/* 우측: 컨트롤 버튼 액션 모음 */}
                <div className="hud-actions">
                    {/* 시간대 조명 전환 (낮/노을/밤) */}
                    <button
                        className="glass-btn icon-btn"
                        onClick={cycleDayNight}
                        title={`현재 테마: ${dayNight.toUpperCase()} (클릭하여 변경)`}
                    >
                        {dayNight === 'day' && <Sun size={17} color="#d97706" />}
                        {dayNight === 'sunset' && <Sunset size={17} color="#ea580c" />}
                        {dayNight === 'night' && <Moon size={17} color="#4f46e5" />}
                    </button>

                    {/* 오디오 BGM 및 사운드 효과음 토글 */}
                    <button
                        className="glass-btn icon-btn"
                        onClick={toggleSound}
                        title={soundEnabled ? '사운드 끄기' : '사운드 켜기 (Lo-Fi BGM & SFX)'}
                    >
                        {soundEnabled ? <Volume2 size={17} color="#059669" /> : <VolumeX size={17} color="#64748b" />}
                    </button>

                    {/* 타운 가이드 모달 */}
                    <button className="glass-btn" onClick={() => openModal('guide')}>
                        <Compass size={15} color="#0284c7" />
                        <span>타운 가이드</span>
                    </button>

                    {/* 퀘스트 업적 모달 */}
                    <button className="glass-btn" onClick={() => openModal('quest')}>
                        <Trophy size={15} color="#d97706" />
                        <span>퀘스트 ({completedCount}/{totalQuests})</span>
                    </button>

                    {/* 스폰 지점 리셋 귀환 */}
                    <button
                        className="glass-btn icon-btn"
                        onClick={() => teleportTo([0, 0, 4])}
                        title="스폰 지점(중앙 광장)으로 귀환"
                    >
                        <RotateCcw size={16} color="#0f172a" />
                    </button>

                    {/* 2D 이력서 모드 전환 */}
                    <button className="glass-btn primary" onClick={() => setMode('2D')}>
                        <FileText size={15} />
                        <span>2D 이력서 뷰</span>
                    </button>
                </div>
            </div>

            {/* 중앙 근접 상호작용 프롬프트 */}
            {nearbyBuilding && (
                <div className="interaction-prompt-container hud-interactive" onClick={() => openModal(nearbyBuilding.id)}>
                    <div className="interaction-pill">
                        <span className="key-badge">E</span>
                        <span className="interaction-text">
                            {nearbyBuilding.name} 입장하기
                        </span>
                    </div>
                </div>
            )}

            {/* 하단 컨트롤 바 */}
            <div className="hud-bottom-bar hud-interactive">
                {/* 좌측: 미니맵 레이더 */}
                <div className="minimap-card">
                    <div className="minimap-radar">
                        <div className="minimap-grid" />
                        {/* 플레이어 위치 블루 블립 */}
                        <div
                            className="minimap-center-cross"
                            style={{
                                top: `${50 + (playerPos[2] / 60) * 50}%`,
                                left: `${50 + (playerPos[0] / 60) * 50}%`
                            }}
                        />

                        {/* 랜드마크 스팟 블립 */}
                        {careerData.landmarks.map((lm) => (
                            <div
                                key={lm.id}
                                className="minimap-landmark-dot"
                                title={`${lm.name} (클릭 시 순간이동)`}
                                onClick={() => teleportTo(lm.position)}
                                style={{
                                    backgroundColor: lm.color,
                                    boxShadow: `0 0 6px ${lm.color}`,
                                    top: `${50 + (lm.position[2] / 60) * 50}%`,
                                    left: `${50 + (lm.position[0] / 60) * 50}%`
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* 중앙: 조작 키 가이드 바 */}
                <div className="controls-hint-bar">
                    <div><span className="control-key">WASD</span> 이동</div>
                    <div><span className="control-key">Shift</span> 달리기</div>
                    <div><span className="control-key">E</span> 상호작용</div>
                    <div><span className="control-key">Click</span> 지면 이동</div>
                </div>

                {/* 우측: 퀘스트 위젯 위젯 */}
                <div className="quest-widget">
                    <div className="quest-header">
                        <div className="quest-title" onClick={() => openModal('quest')} style={{ cursor: 'pointer' }}>
                            <Trophy size={15} />
                            <span>탐험 퀘스트</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="quest-score">{questPoints} XP</span>
                            <button
                                onClick={() => setQuestWidgetOpen(!questWidgetOpen)}
                                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                            >
                                {questWidgetOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                            </button>
                        </div>
                    </div>

                    <div className="quest-progress-bar">
                        <div className="quest-progress-fill" style={{ width: `${(completedCount / totalQuests) * 100}%` }} />
                    </div>

                    {questWidgetOpen && (
                        <div className="quest-items-list">
                            {careerData.quests.slice(0, 4).map((q) => {
                                const isDone = completedQuests.includes(q.id);
                                return (
                                    <div key={q.id} className={`quest-item ${isDone ? 'completed' : ''}`}>
                                        <span>{isDone ? '✓' : '○'}</span>
                                        <span>{q.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* 모바일 가상 조이스틱 터치 영역 */}
            <div
                className="mobile-joystick-zone"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
            >
                <div className="mobile-joystick-knob" />
            </div>
        </div>
    );
};
