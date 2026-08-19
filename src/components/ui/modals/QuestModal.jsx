import React from 'react';
import { careerData } from '../../../data/careerData';
import { useGameStore } from '../../../stores/useGameStore';
import { Trophy, CheckCircle2, Circle, X } from 'lucide-react';

export const QuestModal = ({ onClose, onTeleport }) => {
    const completedQuests = useGameStore((state) => state.completedQuests);
    const questPoints = useGameStore((state) => state.questPoints);

    const totalPoints = careerData.quests.reduce((acc, q) => acc + q.points, 0);
    const completionRate = Math.round((questPoints / totalPoints) * 100);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div>
                        <span className="modal-tag" style={{ color: '#d97706' }}>CAREER ADVENTURE MILESTONES</span>
                        <h2 className="modal-title">🏆 탐험 퀘스트 & 업적</h2>
                        <p className="modal-subtitle">커리어 타운의 모든 구역을 탐험하고 마일스톤을 달성해 보세요!</p>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {/* Progress Card */}
                    <div
                        style={{
                            background: '#fffbeb',
                            border: '1.5px solid rgba(217, 119, 6, 0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Trophy size={20} color="#d97706" />
                                <span style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>모험 달성률</span>
                            </div>
                            <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '16px', color: '#b45309' }}>
                                {questPoints} / {totalPoints} PTS ({completionRate}%)
                            </span>
                        </div>
                        <div className="quest-progress-bar" style={{ height: '8px' }}>
                            <div className="quest-progress-fill" style={{ width: `${completionRate}%` }} />
                        </div>
                    </div>

                    {/* Quest List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {careerData.quests.map((quest) => {
                            const isDone = completedQuests.includes(quest.id);
                            const landmark = careerData.landmarks.find((l) => l.id === quest.target);

                            return (
                                <div
                                    key={quest.id}
                                    className="highlight-card"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: isDone ? '#ecfdf5' : '#f8fafc',
                                        borderColor: isDone ? 'rgba(16, 185, 129, 0.3)' : 'rgba(226, 232, 240, 0.9)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        {isDone ? <CheckCircle2 size={20} color="#059669" /> : <Circle size={20} color="#94a3b8" />}
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: '14px', color: isDone ? '#065f46' : '#0f172a' }}>
                                                {quest.name}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#64748b' }}>{quest.desc}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span className="metric-pill" style={{ background: 'rgba(217, 119, 6, 0.12)', color: '#d97706', borderColor: 'rgba(217, 119, 6, 0.3)' }}>
                                            +{quest.points} XP
                                        </span>
                                        {landmark && !isDone && (
                                            <button
                                                onClick={() => {
                                                    onTeleport(landmark.position);
                                                    onClose();
                                                }}
                                                style={{
                                                    background: '#ffffff',
                                                    border: '1px solid rgba(2, 132, 199, 0.4)',
                                                    color: '#0284c7',
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    fontSize: '11px',
                                                    fontWeight: 700,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                이동
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
