import React, { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../../../stores/useGameStore';
import { X, MessageSquare, Award, Sparkles, Send, Bot, HelpCircle, Loader2 } from 'lucide-react';
import { generateNPCResponse } from '../../../utils/aiChatEngine';

/**
 * 3D RPG 대화 오버레이 UI 컴포넌트
 * 추천 프리셋 질문 탭과 LLM 기반 AI 자유 대화 탭을 제공합니다.
 */
export function NPCModal() {
    const activeNPC = useGameStore((state) => state.activeNPC);
    const closeNPCModal = useGameStore((state) => state.closeNPCModal);
    const talkToNPC = useGameStore((state) => state.talkToNPC);
    const talkedNPCs = useGameStore((state) => state.talkedNPCs);
    const npcChatLogs = useGameStore((state) => state.npcChatLogs);
    const addNPCChatMessage = useGameStore((state) => state.addNPCChatMessage);

    const [activeTab, setActiveTab] = useState('preset'); // 'preset' | 'ai'
    const [selectedDialogue, setSelectedDialogue] = useState(null);
    const [inputPrompt, setInputPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const chatEndRef = useRef(null);

    // activeNPC 변경 시 초기화
    useEffect(() => {
        setSelectedDialogue(null);
        setInputPrompt('');
    }, [activeNPC?.id]);

    // AI 채팅 메시지 추가 시 자동 스크롤
    useEffect(() => {
        if (activeTab === 'ai') {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeTab, npcChatLogs[activeNPC?.id]?.length, isGenerating]);

    if (!activeNPC) return null;

    const isTalked = talkedNPCs.includes(activeNPC.id);
    const currentLogs = npcChatLogs[activeNPC.id] || [];

    const handleSelectQuestion = (dialogue) => {
        setSelectedDialogue(dialogue);
        talkToNPC(activeNPC.id);
    };

    const handleSendAIChat = async (e) => {
        e?.preventDefault();
        if (!inputPrompt.trim() || isGenerating) return;

        const userText = inputPrompt.trim();
        setInputPrompt('');
        
        // 1. 유저 메시지 저장
        addNPCChatMessage(activeNPC.id, 'user', userText);
        talkToNPC(activeNPC.id);
        setIsGenerating(true);

        try {
            // 2. 대화 기록 포맷 변환
            const history = currentLogs.map((log) => ({
                role: log.sender === 'user' ? 'user' : 'model',
                text: log.text
            }));

            // 3. AI / Fallback 응답 생성
            const aiResponse = await generateNPCResponse(activeNPC, userText, history);
            addNPCChatMessage(activeNPC.id, 'npc', aiResponse);
        } catch (err) {
            console.error('AI Response generation error:', err);
            addNPCChatMessage(activeNPC.id, 'npc', '삐빅! 죄송합니다. 응답 생성 중 오류가 발생했습니다.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'calc(100% - 48px)',
                maxWidth: '740px',
                zIndex: 100,
                pointerEvents: 'auto'
            }}
        >
            <div
                style={{
                    background: 'rgba(15, 23, 42, 0.94)',
                    backdropFilter: 'blur(16px)',
                    border: `2px solid ${activeNPC.color}`,
                    borderRadius: '24px',
                    padding: '24px',
                    boxShadow: `0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px ${activeNPC.color}30`,
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    maxHeight: '85vh'
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
                                        <Sparkles size={12} /> +50 XP
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

                {/* 탭 네비게이션 (프리셋 질문 VS AI 자유 대화) */}
                <div
                    style={{
                        display: 'flex',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '4px',
                        borderRadius: '14px',
                        gap: '6px'
                    }}
                >
                    <button
                        onClick={() => setActiveTab('preset')}
                        style={{
                            flex: 1,
                            padding: '8px 12px',
                            borderRadius: '10px',
                            border: 'none',
                            background: activeTab === 'preset' ? activeNPC.color : 'transparent',
                            color: activeTab === 'preset' ? '#0f172a' : '#94a3b8',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <HelpCircle size={15} /> 추천 질문 목록
                    </button>
                    <button
                        onClick={() => setActiveTab('ai')}
                        style={{
                            flex: 1,
                            padding: '8px 12px',
                            borderRadius: '10px',
                            border: 'none',
                            background: activeTab === 'ai' ? activeNPC.color : 'transparent',
                            color: activeTab === 'ai' ? '#0f172a' : '#94a3b8',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Bot size={15} /> 🤖 AI 실시간 대화
                    </button>
                </div>

                {/* 탭 1: 추천 질문 목록 */}
                {activeTab === 'preset' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                    </div>
                )}

                {/* 탭 2: AI 실시간 자유 대화 */}
                {activeTab === 'ai' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {/* 채팅 타임라인 영역 */}
                        <div
                            style={{
                                background: 'rgba(15, 23, 42, 0.6)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '16px',
                                padding: '14px',
                                height: '220px',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}
                        >
                            {currentLogs.length === 0 ? (
                                <div style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', marginTop: '60px' }}>
                                    💡 {activeNPC.name}에게 궁금한 무엇이든 자유롭게 질문해 보세요!
                                </div>
                            ) : (
                                currentLogs.map((log) => (
                                    <div
                                        key={log.id}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: log.sender === 'user' ? 'flex-end' : 'flex-start'
                                        }}
                                    >
                                        <div
                                            style={{
                                                maxWidth: '80%',
                                                padding: '10px 14px',
                                                borderRadius: log.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                                                background: log.sender === 'user' ? `${activeNPC.color}35` : 'rgba(30, 41, 59, 0.9)',
                                                border: `1px solid ${log.sender === 'user' ? activeNPC.color : 'rgba(255, 255, 255, 0.15)'}`,
                                                color: '#f8fafc',
                                                fontSize: '13px',
                                                lineHeight: 1.5
                                            }}
                                        >
                                            {log.text}
                                        </div>
                                        <span style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
                                            {log.timestamp}
                                        </span>
                                    </div>
                                ))
                            )}

                            {isGenerating && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: activeNPC.color, fontSize: '13px' }}>
                                    <Loader2 size={16} className="animate-spin" /> {activeNPC.name}이(가) 생각을 정리하는 중...
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* 메시지 입력 폼 */}
                        <form onSubmit={handleSendAIChat} style={{ display: 'flex', gap: '8px' }}>
                            <input
                                type="text"
                                value={inputPrompt}
                                onChange={(e) => setInputPrompt(e.target.value)}
                                placeholder={`${activeNPC.name}에게 질문하기...`}
                                disabled={isGenerating}
                                style={{
                                    flex: 1,
                                    background: 'rgba(30, 41, 59, 0.8)',
                                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                                    borderRadius: '12px',
                                    padding: '10px 14px',
                                    color: '#ffffff',
                                    fontSize: '13px',
                                    outline: 'none'
                                }}
                            />
                            <button
                                type="submit"
                                disabled={!inputPrompt.trim() || isGenerating}
                                style={{
                                    background: inputPrompt.trim() && !isGenerating ? activeNPC.color : 'rgba(255, 255, 255, 0.1)',
                                    color: inputPrompt.trim() && !isGenerating ? '#0f172a' : '#64748b',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '0 16px',
                                    cursor: inputPrompt.trim() && !isGenerating ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                )}

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
