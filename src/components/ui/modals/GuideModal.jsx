import React from 'react';
import { developerProfile } from '../../../data/careerData';
import { Compass, MapPin, Gamepad2, X } from 'lucide-react';

export const GuideModal = ({ onClose, onTeleport }) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div>
                        <span className="modal-tag">STARTING ZONE & TOWN GUIDE</span>
                        <h2 className="modal-title">🧭 중앙 광장 가이드 & 개발자 소개</h2>
                        <p className="modal-subtitle">{developerProfile.name}의 인터랙티브 커리어 타운에 오신 것을 환영합니다!</p>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {/* Profile Hero Card */}
                    <div
                        style={{
                            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08), rgba(124, 58, 237, 0.08))',
                            border: '1.5px solid rgba(2, 132, 199, 0.25)',
                            borderRadius: '14px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{developerProfile.name}</h3>
                                <p style={{ color: '#0284c7', fontSize: '13px', fontWeight: 700 }}>{developerProfile.title}</p>
                            </div>
                            <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#059669', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 10px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700 }}>
                                {developerProfile.status}
                            </span>
                        </div>
                        <p style={{ color: '#334155', fontSize: '13px', lineHeight: 1.6 }}>{developerProfile.bio}</p>
                    </div>

                    {/* Quick Town Map Teleports */}
                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MapPin size={16} color="#0284c7" />
                            타운 주요 건물 빠른 이동 (Fast Travel)
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                            {[
                                { name: '🎓 아카데미 도서관 (학력/교육)', desc: '대학 전공 및 이수 과목', pos: [-18, 0, -10], color: '#7c3aed' },
                                { name: '🏢 A 테크 HQ 타워 (경력)', desc: '핀테크/SaaS 백엔드 & 풀스택', pos: [18, 0, -10], color: '#0284c7' },
                                { name: '🏛️ B 넥스트 랩 (경력)', desc: 'WebGL 3D 데이터 시각화', pos: [20, 0, 14], color: '#0891b2' },
                                { name: '🕹️ 프로젝트 아케이드 (작품)', desc: '풀스택 & AI 사이드 프로젝트', pos: [-18, 0, 16], color: '#d97706' },
                                { name: '📮 타임라인 우체통 (연락처)', desc: 'Coffee Chat & Email', pos: [0, 0, 15], color: '#059669' }
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        onTeleport(item.pos);
                                        onClose();
                                    }}
                                    style={{
                                        background: '#f8fafc',
                                        border: `1.5px solid ${item.color}33`,
                                        borderRadius: '10px',
                                        padding: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = `${item.color}10`;
                                        e.currentTarget.style.borderColor = item.color;
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#f8fafc';
                                        e.currentTarget.style.borderColor = `${item.color}33`;
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a' }}>{item.name}</div>
                                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{item.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Operation Guide */}
                    <div style={{ background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.9)', borderRadius: '12px', padding: '16px' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#d97706', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Gamepad2 size={16} /> 조작 방법 안내
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px', fontSize: '12px', color: '#334155' }}>
                            <div>• <b>W, A, S, D / 방향키</b>: 캐릭터 이동</div>
                            <div>• <b>마우스 클릭</b>: 해당 위치로 자동 이동</div>
                            <div>• <b>Shift 키</b>: 달리기 (Sprint)</div>
                            <div>• <b>E 키 / 터치</b>: 건물 진입 및 모달 열기</div>
                            <div>• <b>우측 상단 2D 모드</b>: 일반 이력서 전환</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
