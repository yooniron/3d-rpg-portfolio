import React, { useState } from 'react';
import { useGameStore } from '../../../stores/useGameStore';
import { X, MessageSquare, Award, Sparkles } from 'lucide-react';

/**
 * RPG 대화 오버레이 UI 컴포넌트
 * activeNPC가 활성화되었을 때 하단에 RPG 스타일 말풍선 및 선택지 버튼을 렌더링합니다.
 */
export function NPCModal() {
    const activeNPC = useGameStore((state) => state.activeNPC);
    const closeNPCModal = useGameStore((state) => state.closeNPCModal);
    const talkToNPC = useGameStore((state) => state.talkToNPC);
    const talkedNPCs = useGameStore((state) => state.talkedNPCs);

    const [selectedDialogue, setSelectedDialogue] = useState(null);

    if (!activeNPC) return null;

    const isTalked = talkedNPCs.includes(activeNPC.id);

    const handleSelectQuestion = (dialogue) => {
        setSelectedDialogue(dialogue);
        talkToNPC(activeNPC.id);
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'calc(100% - 48px)',
                maxWidth: '720px',
                zIndex: 100,
                pointerEvents: 'auto'
            }}
        >
            <div
                style={{
                    background: 'rgba(15, 23, 42, 0.92)',
                    backdropFilter: 'blur(16px)',
                    border: `2px solid ${activeNPC.color}`,
                    borderRadius: '24px',
                    padding: '24px',
                    boxShadow: `0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px ${activeNPC.color}30`,
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}
            >
                {/* 상단 NPC 이름표 & 닫기 버튼 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                            style={{
                                fontSize: '28px',
                                width: '48px',
                                height: '48px',
                                background: `${activeNPC.color}20`,
                                border: `1.5px solid ${activeNPC.color}`,
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {activeNPC.avatar}
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '18px', fontWeight: 800 }}>{activeNPC.name}</span>
                                {isTalked && (
                                    <span
                                        style={{
                                            background: '#10b98120',
                                            color: '#10b981',
                                            border: '1px solid #10b981',
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        <Sparkles size={12} /> +50 XP 획득함
                                    </span>
                                )}
                            </div>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{activeNPC.role}</span>
                        </div>
                    </div>

                    <button
                        onClick={closeNPCModal}
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* 대화 본문 말풍선 */}
                <div
                    style={{
                        background: 'rgba(30, 41, 59, 0.7)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '16px',
                        fontSize: '14px',
                        lineHeight: 1.6,
                        color: '#f8fafc',
                        minHeight: '64px'
                    }}
                >
                    {selectedDialogue ? (
                        <div>
                            <div style={{ fontSize: '12px', color: activeNPC.color, fontWeight: 700, marginBottom: '4px' }}>
                                💬 Q. {selectedDialogue.q}
                            </div>
                            <div>{selectedDialogue.a}</div>
                        </div>
                    ) : (
                        <div>{activeNPC.greeting}</div>
                    )}
                </div>

                {/* 선택지 질문 버튼 목록 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MessageSquare size={14} color={activeNPC.color} /> 질문할 항목을 선택해 주세요:
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
                        {activeNPC.dialogues.map((dialogue) => {
                            const isSelected = selectedDialogue?.id === dialogue.id;
                            return (
                                <button
                                    key={dialogue.id}
                                    onClick={() => handleSelectQuestion(dialogue)}
                                    style={{
                                        background: isSelected ? `${activeNPC.color}25` : 'rgba(255, 255, 255, 0.05)',
                                        border: `1.5px solid ${isSelected ? activeNPC.color : 'rgba(255, 255, 255, 0.15)'}`,
                                        borderRadius: '12px',
                                        padding: '10px 14px',
                                        color: isSelected ? '#ffffff' : '#cbd5e1',
                                        fontSize: '13px',
                                        fontWeight: isSelected ? 700 : 500,
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <span>{dialogue.q}</span>
                                    {isSelected && <Award size={14} color={activeNPC.color} />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 하단 닫기 버튼 */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                    <button
                        onClick={closeNPCModal}
                        style={{
                            background: activeNPC.color,
                            color: '#0f172a',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '8px 20px',
                            fontSize: '13px',
                            fontWeight: 800,
                            cursor: 'pointer'
                        }}
                    >
                        대화 마치기
                    </button>
                </div>
            </div>
        </div>
    );
}
