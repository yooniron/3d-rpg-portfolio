import React, { useState } from 'react';
import { developerProfile } from '../../../data/careerData';
import { Mail, Github, Linkedin, BookOpen, Send, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactModal = ({ onClose }) => {
    const [copied, setCopied] = useState(false);
    const [senderName, setSenderName] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSent, setIsSent] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(developerProfile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!senderName || !message) return;
        setIsSent(true);

        try {
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.6 }
            });
        } catch {}
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div>
                        <span className="modal-tag" style={{ color: '#059669' }}>GET IN TOUCH & TIMELINE MAILBOX</span>
                        <h2 className="modal-title">📮 타임라인 우체통 (Contact)</h2>
                        <p className="modal-subtitle">커피챗, 프로젝트 제안, 채용 문의 등 무엇이든 편하게 보내주세요!</p>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {/* Quick Contact Badges */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                        <div
                            onClick={handleCopyEmail}
                            className="highlight-card"
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', borderColor: copied ? '#059669' : undefined }}
                        >
                            <Mail size={22} color="#059669" />
                            <div style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a', marginTop: '6px' }}>
                                {copied ? '복사 완료! ✓' : '이메일 복사'}
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>{developerProfile.email}</div>
                        </div>

                        <a
                            href={developerProfile.github}
                            target="_blank"
                            rel="noreferrer"
                            className="highlight-card"
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', textDecoration: 'none' }}
                        >
                            <Github size={22} color="#0f172a" />
                            <div style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a', marginTop: '6px' }}>GitHub</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>코드 저장소</div>
                        </a>

                        <a
                            href={developerProfile.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="highlight-card"
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', textDecoration: 'none' }}
                        >
                            <Linkedin size={22} color="#0284c7" />
                            <div style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a', marginTop: '6px' }}>LinkedIn</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>프로필 연결</div>
                        </a>

                        <a
                            href={developerProfile.blog}
                            target="_blank"
                            rel="noreferrer"
                            className="highlight-card"
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', textDecoration: 'none' }}
                        >
                            <BookOpen size={22} color="#7c3aed" />
                            <div style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a', marginTop: '6px' }}>Tech Blog</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>기술 블로그</div>
                        </a>
                    </div>

                    {/* Contact Message Form */}
                    {isSent ? (
                        <div
                            style={{
                                background: '#ecfdf5',
                                border: '1.5px solid #059669',
                                borderRadius: '12px',
                                padding: '24px',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Check size={36} color="#059669" />
                            <h3 style={{ color: '#065f46', fontSize: '16px', fontWeight: 800 }}>메시지가 우체통에 도착했습니다!</h3>
                            <p style={{ color: '#047857', fontSize: '13px' }}>
                                남겨주신 메시지를 확인 후 기재해주신 연락처로 빠르게 회신드리겠습니다. 감사합니다!
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>✉️ 우체통에 메시지 남기기</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <input
                                    type="text"
                                    placeholder="보내시는 분 이름 / 소속"
                                    required
                                    value={senderName}
                                    onChange={(e) => setSenderName(e.target.value)}
                                    style={{
                                        background: '#f8fafc',
                                        border: '1px solid rgba(203, 213, 225, 0.9)',
                                        borderRadius: '8px',
                                        padding: '10px 14px',
                                        color: '#0f172a',
                                        fontSize: '13px',
                                        outline: 'none'
                                    }}
                                />
                                <input
                                    type="email"
                                    placeholder="회신 받으실 이메일 주소"
                                    required
                                    value={senderEmail}
                                    onChange={(e) => setSenderEmail(e.target.value)}
                                    style={{
                                        background: '#f8fafc',
                                        border: '1px solid rgba(203, 213, 225, 0.9)',
                                        borderRadius: '8px',
                                        padding: '10px 14px',
                                        color: '#0f172a',
                                        fontSize: '13px',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <textarea
                                placeholder="전달하실 제안, 커피챗 내용 또는 응원 메시지를 작성해 주세요 :)"
                                required
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={{
                                    background: '#f8fafc',
                                    border: '1px solid rgba(203, 213, 225, 0.9)',
                                    borderRadius: '8px',
                                    padding: '10px 14px',
                                    color: '#0f172a',
                                    fontSize: '13px',
                                    outline: 'none',
                                    resize: 'none'
                                }}
                            />
                            <button
                                type="submit"
                                className="glass-btn primary"
                                style={{ justifyContent: 'center', padding: '10px', marginTop: '4px' }}
                            >
                                <Send size={15} /> 메시지 보내기
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
