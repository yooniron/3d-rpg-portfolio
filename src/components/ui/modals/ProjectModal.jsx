import React, { useState } from 'react';
import { careerData } from '../../../data/careerData';
import { ExternalLink, Github, Flame, X } from 'lucide-react';

export const ProjectModal = ({ onClose }) => {
    const { projects } = careerData;
    const [selectedIdx, setSelectedIdx] = useState(0);
    const activeProject = projects[selectedIdx] || projects[0];

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" style={{ maxWidth: '900px' }} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div>
                        <span className="modal-tag" style={{ color: '#d97706' }}>FEATURED PROJECTS & ARCADE LAB</span>
                        <h2 className="modal-title">🕹️ 프로젝트 아케이드 (Project Arcade)</h2>
                        <p className="modal-subtitle">사이드 프로젝트 & 혁신 솔루션 쇼케이스</p>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Project Selector Tabs */}
                <div
                    style={{
                        display: 'flex',
                        gap: '8px',
                        padding: '12px 24px',
                        background: '#f8fafc',
                        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                        overflowX: 'auto'
                    }}
                >
                    {projects.map((proj, idx) => (
                        <button
                            key={proj.id}
                            onClick={() => setSelectedIdx(idx)}
                            style={{
                                background: selectedIdx === idx ? 'linear-gradient(135deg, rgba(217, 119, 6, 0.15), rgba(2, 132, 199, 0.15))' : '#ffffff',
                                border: `1.5px solid ${selectedIdx === idx ? '#d97706' : 'rgba(203, 213, 225, 0.8)'}`,
                                color: selectedIdx === idx ? '#b45309' : '#475569',
                                padding: '6px 14px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            #{idx + 1} {proj.title}
                        </button>
                    ))}
                </div>

                {/* Body */}
                <div className="modal-body">
                    {/* Active Project Details */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <span style={{ background: '#d97706', color: '#ffffff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                                    {activeProject.tag}
                                </span>
                                <span style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>{activeProject.category} • {activeProject.period}</span>
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{activeProject.title}</h3>
                        </div>

                        {/* Links */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {activeProject.github && (
                                <a
                                    href={activeProject.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="glass-btn"
                                    style={{ fontSize: '12px', padding: '6px 12px' }}
                                >
                                    <Github size={14} /> GitHub
                                </a>
                            )}
                            {activeProject.demo && (
                                <a
                                    href={activeProject.demo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="glass-btn primary"
                                    style={{ fontSize: '12px', padding: '6px 12px' }}
                                >
                                    <ExternalLink size={14} /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>

                    <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>{activeProject.summary}</p>

                    {/* Project Details Bullet Points */}
                    <div className="highlight-card" style={{ background: '#fffbeb', borderColor: 'rgba(217, 119, 6, 0.25)' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#b45309', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Flame size={16} /> 핵심 아키텍처 & 문제 해결 (Key Highlights)
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {activeProject.details.map((detail, di) => (
                                <div key={di} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#1e293b', lineHeight: 1.5 }}>
                                    <span style={{ color: '#d97706', fontWeight: 800, marginTop: '2px' }}>•</span>
                                    <span>{detail}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#475569', marginBottom: '8px' }}>
                            사용 기술 스택 (Tech Stack)
                        </h4>
                        <div className="tech-badge-container">
                            {activeProject.tech.map((t, ti) => (
                                <span key={ti} className="tech-badge" style={{ color: '#b45309', borderColor: 'rgba(217, 119, 6, 0.3)', background: 'rgba(217, 119, 6, 0.1)' }}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
