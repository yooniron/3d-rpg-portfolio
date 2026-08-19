import React from 'react';
import { careerData } from '../../../data/careerData';
import { Building2, Calendar, Users, Zap, X } from 'lucide-react';

export const CompanyModal = ({ companyId = 'company-a', onClose }) => {
    const company = careerData.companies.find((c) => c.id === companyId) || careerData.companies[0];

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div>
                        <span className="modal-tag">{company.buildingTag}</span>
                        <h2 className="modal-title">🏢 {company.name}</h2>
                        <p className="modal-subtitle">{company.role} • {company.team}</p>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {/* Metadata info */}
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: '#475569' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar size={15} color="#0284c7" />
                            <span>{company.period}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Building2 size={15} color="#0284c7" />
                            <span>{company.type}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Users size={15} color="#0284c7" />
                            <span>{company.team}</span>
                        </div>
                    </div>

                    <div
                        style={{
                            background: 'rgba(2, 132, 199, 0.06)',
                            border: '1px solid rgba(2, 132, 199, 0.2)',
                            borderRadius: '12px',
                            padding: '16px',
                            fontSize: '14px',
                            color: '#0f172a',
                            lineHeight: 1.6
                        }}
                    >
                        {company.summary}
                    </div>

                    {/* Key Achievements & Projects */}
                    <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Zap size={18} color="#d97706" /> 주요 프로젝트 & 정량적 성과
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {company.achievements.map((item, idx) => (
                                <div key={idx} className="highlight-card">
                                    <div className="highlight-card-title">
                                        <span style={{ color: '#0f172a' }}>{item.title}</span>
                                        <span className="metric-pill">
                                            {item.metric}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, margin: '8px 0' }}>
                                        {item.description}
                                    </p>
                                    <div className="tech-badge-container">
                                        {item.tech.map((t, ti) => (
                                            <span key={ti} className="tech-badge">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Full Tech Stack */}
                    <div>
                        <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#475569', marginBottom: '8px' }}>
                            🛠️ 담당 활용 기술 스택
                        </h3>
                        <div className="tech-badge-container">
                            {company.techStack.map((tech, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        background: '#f1f5f9',
                                        border: '1px solid rgba(203, 213, 225, 0.9)',
                                        color: '#1e293b',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: 700
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
