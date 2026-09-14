import React, { useState } from 'react';
import { useGameStore } from '../../../stores/useGameStore';
import { X, Shirt, Crown, Sparkles, Check } from 'lucide-react';

/**
 * 3D 플레이어 아바타 드레스룸 커스텀 모달 UI
 */
export function DressroomModal({ onClose }) {
    const outfit = useGameStore((state) => state.outfit);
    const setOutfit = useGameStore((state) => state.setOutfit);
    const hat = useGameStore((state) => state.hat);
    const setHat = useGameStore((state) => state.setHat);

    const [activeTab, setActiveTab] = useState('outfits'); // 'outfits' | 'hats'

    const outfitOptions = [
        {
            id: 'developer',
            name: '👔 엔터프라이즈 슈트',
            desc: '신뢰감을 주는 다크 네이비 비즈니스 정장 & 구두',
            color: '#1e293b'
        },
        {
            id: 'hoodie',
            name: '🧥 테크 개발자 후디',
            desc: '편안한 에메랄드 그린 후디 & 데님 & 화이트 스니커즈',
            color: '#10b981'
        },
        {
            id: 'ninja',
            name: '🥷 사이버 스텔스 닌자',
            desc: '딥 블랙 스텔스 수트 & 레드 마스크 & 네온 비저',
            color: '#e11d48'
        },
        {
            id: 'cyber',
            name: '⚡ 사이버 레이서',
            desc: '미래형 화이트/마젠타 어깨 패드 & 시안 안경 수트',
            color: '#d946ef'
        }
    ];

    const hatOptions = [
        {
            id: 'none',
            name: '🚫 기본 (없음)',
            desc: '단정하고 네추럴한 로우폴리 헤어 스타일',
            color: '#78350f'
        },
        {
            id: 'cap',
            name: '🧢 Y-스포티 캡 모자',
            desc: 'Y 로고가 새겨진 스포티 야구 모자',
            color: '#3b82f6'
        },
        {
            id: 'headphones',
            name: '🎧 RGB 글로우 헤드셋',
            desc: '시안 & 핑크 RGB 스튜디오 게이밍 헤드셋',
            color: '#06b6d4'
        },
        {
            id: 'crown',
            name: '👑 챔피언 황금 왕관',
            desc: '모든 퀘스트를 정복한 전용 황금 발광 왕관',
            color: '#eab308'
        }
    ];

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(12px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                boxSizing: 'border-box'
            }}
        >
            <div
                style={{
                    background: 'rgba(30, 41, 59, 0.95)',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '24px',
                    width: '100%',
                    maxWidth: '640px',
                    padding: '28px',
                    color: '#ffffff',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(56, 189, 248, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}
            >
                {/* 상단 타이틀 바 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                            style={{
                                background: 'rgba(56, 189, 248, 0.15)',
                                border: '1px solid #38bdf8',
                                borderRadius: '12px',
                                padding: '8px',
                                color: '#38bdf8',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Shirt size={22} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>
                                3D 아바타 드레스룸
                            </h2>
                            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
                                플레이어 캐릭터의 의상과 헤드기어를 실시간 커스텀하세요.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
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
                            justifyContent: 'center'
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* 카테고리 탭 버튼 */}
                <div
                    style={{
                        display: 'flex',
                        background: 'rgba(15, 23, 42, 0.6)',
                        padding: '4px',
                        borderRadius: '16px',
                        gap: '4px'
                    }}
                >
                    <button
                        onClick={() => setActiveTab('outfits')}
                        style={{
                            flex: 1,
                            background: activeTab === 'outfits' ? '#38bdf8' : 'transparent',
                            color: activeTab === 'outfits' ? '#0f172a' : '#94a3b8',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '10px',
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
                        <Shirt size={16} /> 의상 (Outfits)
                    </button>
                    <button
                        onClick={() => setActiveTab('hats')}
                        style={{
                            flex: 1,
                            background: activeTab === 'hats' ? '#38bdf8' : 'transparent',
                            color: activeTab === 'hats' ? '#0f172a' : '#94a3b8',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '10px',
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
                        <Crown size={16} /> 헤드기어 (Headgear)
                    </button>
                </div>

                {/* 의상 카드리스트 */}
                {activeTab === 'outfits' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {outfitOptions.map((item) => {
                            const isEquipped = outfit === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setOutfit(item.id)}
                                    style={{
                                        background: isEquipped ? `${item.color}30` : 'rgba(15, 23, 42, 0.5)',
                                        border: `2px solid ${isEquipped ? item.color : 'rgba(255, 255, 255, 0.1)'}`,
                                        borderRadius: '16px',
                                        padding: '16px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        color: '#ffffff',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '6px',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '15px', fontWeight: 800 }}>{item.name}</span>
                                        {isEquipped && (
                                            <span
                                                style={{
                                                    background: '#10b98120',
                                                    color: '#10b981',
                                                    border: '1px solid #10b981',
                                                    borderRadius: '10px',
                                                    padding: '2px 6px',
                                                    fontSize: '10px',
                                                    fontWeight: 700,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '2px'
                                                }}
                                            >
                                                <Check size={12} /> 장착 중
                                            </span>
                                        )}
                                    </div>
                                    <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', lineHeight: 1.4 }}>
                                        {item.desc}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* 헤드기어 카드리스트 */}
                {activeTab === 'hats' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {hatOptions.map((item) => {
                            const isEquipped = hat === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setHat(item.id)}
                                    style={{
                                        background: isEquipped ? `${item.color}30` : 'rgba(15, 23, 42, 0.5)',
                                        border: `2px solid ${isEquipped ? item.color : 'rgba(255, 255, 255, 0.1)'}`,
                                        borderRadius: '16px',
                                        padding: '16px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        color: '#ffffff',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '6px',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '15px', fontWeight: 800 }}>{item.name}</span>
                                        {isEquipped && (
                                            <span
                                                style={{
                                                    background: '#10b98120',
                                                    color: '#10b981',
                                                    border: '1px solid #10b981',
                                                    borderRadius: '10px',
                                                    padding: '2px 6px',
                                                    fontSize: '10px',
                                                    fontWeight: 700,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '2px'
                                                }}
                                            >
                                                <Check size={12} /> 장착 중
                                            </span>
                                        )}
                                    </div>
                                    <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', lineHeight: 1.4 }}>
                                        {item.desc}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* 하단 닫기 버튼 */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: '#38bdf8',
                            color: '#0f172a',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '10px 24px',
                            fontSize: '14px',
                            fontWeight: 800,
                            cursor: 'pointer'
                        }}
                    >
                        완료
                    </button>
                </div>
            </div>
        </div>
    );
}
