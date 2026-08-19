import React from 'react';
import { developerProfile, careerData } from '../../data/careerData';
import { useGameStore } from '../../stores/useGameStore';
import {
    Gamepad2,
    Mail,
    Github,
    Linkedin,
    Briefcase,
    GraduationCap,
    Sparkles,
    Code2,
    Printer
} from 'lucide-react';

export const ResumeView2D = () => {
    const setMode = useGameStore((state) => state.setMode);

    return (
        <div className="resume-container">
            <div className="resume-wrapper">
                {/* Navigation Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className="glass-btn primary" onClick={() => setMode('3D')}>
                        <Gamepad2 size={16} /> 3D 커리어 타운 모드로 돌아가기
                    </button>
                    <button className="glass-btn" onClick={() => window.print()}>
                        <Printer size={16} /> 이력서 인쇄 / PDF 저장
                    </button>
                </div>

                {/* Profile Header */}
                <div className="resume-header">
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                                {developerProfile.name}
                            </h1>
                            <span className="lvl-tag">Lv.99 Full-Stack</span>
                        </div>
                        <p style={{ fontSize: '15px', color: '#0284c7', fontWeight: 700, marginBottom: '12px' }}>
                            {developerProfile.title}
                        </p>
                        <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6, maxWidth: '640px' }}>
                            {developerProfile.bio}
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '180px' }}>
                        <a
                            href={`mailto:${developerProfile.email}`}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '12px', textDecoration: 'none', fontWeight: 600 }}
                        >
                            <Mail size={14} color="#0284c7" /> {developerProfile.email}
                        </a>
                        <a
                            href={developerProfile.github}
                            target="_blank"
                            rel="noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '12px', textDecoration: 'none', fontWeight: 600 }}
                        >
                            <Github size={14} color="#0f172a" /> GitHub Profile
                        </a>
                        <a
                            href={developerProfile.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '12px', textDecoration: 'none', fontWeight: 600 }}
                        >
                            <Linkedin size={14} color="#0284c7" /> LinkedIn Profile
                        </a>
                    </div>
                </div>

                {/* Core Skills Matrix */}
                <div className="resume-section">
                    <h2 className="resume-section-title">
                        <Code2 size={20} color="#0284c7" /> 핵심 기술 스택 (Technical Skills)
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                            <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0284c7', marginBottom: '8px' }}>Frontend</h4>
                            <div className="tech-badge-container">
                                {developerProfile.skills.frontend.map((s, i) => (
                                    <span key={i} className="tech-badge">{s}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#7c3aed', marginBottom: '8px' }}>Backend & DB</h4>
                            <div className="tech-badge-container">
                                {developerProfile.skills.backend.map((s, i) => (
                                    <span key={i} className="tech-badge" style={{ color: '#7c3aed', borderColor: 'rgba(124, 58, 237, 0.3)', background: 'rgba(124, 58, 237, 0.08)' }}>{s}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#059669', marginBottom: '8px' }}>DevOps & Cloud</h4>
                            <div className="tech-badge-container">
                                {developerProfile.skills.devops.map((s, i) => (
                                    <span key={i} className="tech-badge" style={{ color: '#059669', borderColor: 'rgba(5, 150, 105, 0.3)', background: 'rgba(5, 150, 105, 0.08)' }}>{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Work Experience */}
                <div className="resume-section">
                    <h2 className="resume-section-title">
                        <Briefcase size={20} color="#0284c7" /> 직장 경력 (Work Experience)
                    </h2>
                    <div>
                        {careerData.companies.map((company) => (
                            <div key={company.id} className="timeline-item">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                                    <div>
                                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>{company.name}</h3>
                                        <p style={{ fontSize: '14px', color: '#0284c7', fontWeight: 700 }}>{company.role} • {company.team}</p>
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#475569', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                                        {company.period}
                                    </span>
                                </div>
                                <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, marginBottom: '12px' }}>
                                    {company.summary}
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {company.achievements.map((item, idx) => (
                                        <div key={idx} style={{ background: '#f8fafc', border: '1px solid rgba(226, 232, 240, 0.9)', borderRadius: '8px', padding: '12px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                <span style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a' }}>{item.title}</span>
                                                <span className="metric-pill">{item.metric}</span>
                                            </div>
                                            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Projects */}
                <div className="resume-section">
                    <h2 className="resume-section-title">
                        <Sparkles size={20} color="#d97706" /> 주요 프로젝트 (Featured Projects)
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                        {careerData.projects.map((proj) => (
                            <div key={proj.id} className="highlight-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '10px', background: '#d97706', color: '#ffffff', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                                            {proj.tag}
                                        </span>
                                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{proj.period}</span>
                                    </div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '4px 0 8px' }}>{proj.title}</h3>
                                    <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.5, marginBottom: '10px' }}>{proj.summary}</p>
                                </div>
                                <div>
                                    <div className="tech-badge-container" style={{ marginBottom: '10px' }}>
                                        {proj.tech.slice(0, 4).map((t, ti) => (
                                            <span key={ti} className="tech-badge" style={{ fontSize: '10px' }}>{t}</span>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {proj.github && (
                                            <a href={proj.github} target="_blank" rel="noreferrer" className="glass-btn" style={{ fontSize: '11px', padding: '4px 8px' }}>
                                                GitHub
                                            </a>
                                        )}
                                        {proj.demo && (
                                            <a href={proj.demo} target="_blank" rel="noreferrer" className="glass-btn primary" style={{ fontSize: '11px', padding: '4px 8px' }}>
                                                Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education & Foundation */}
                <div className="resume-section">
                    <h2 className="resume-section-title">
                        <GraduationCap size={20} color="#7c3aed" /> 학력 및 자격 (Education & Certifications)
                    </h2>
                    <div className="timeline-item" style={{ borderColor: '#7c3aed' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{careerData.school.name}</h3>
                                <p style={{ fontSize: '13px', color: '#7c3aed', fontWeight: 700 }}>{careerData.school.degree} • 학점: {careerData.school.gpa}</p>
                            </div>
                            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{careerData.school.period}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '10px' }}>
                            {careerData.school.highlights.map((h, idx) => (
                                <div key={idx} style={{ fontSize: '12px', color: '#334155' }}>• {h}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
