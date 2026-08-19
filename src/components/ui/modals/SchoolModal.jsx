import React from 'react';
import { careerData } from '../../../data/careerData';
import { GraduationCap, Award, BookOpen, Users, Calendar, MapPin, X } from 'lucide-react';

export const SchoolModal = ({ onClose }) => {
    const { school } = careerData;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div>
                        <span className="modal-tag" style={{ color: '#7c3aed' }}>{school.buildingTag}</span>
                        <h2 className="modal-title">🎓 {school.name}</h2>
                        <p className="modal-subtitle">{school.degree} • GPA {school.gpa}</p>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {/* Top Meta Info Bar */}
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: '#475569' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar size={15} color="#7c3aed" />
                            <span>{school.period}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MapPin size={15} color="#7c3aed" />
                            <span>{school.location}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <GraduationCap size={15} color="#7c3aed" />
                            <span>학점: <b style={{ color: '#d97706' }}>{school.gpa}</b></span>
                        </div>
                    </div>

                    <p style={{ color: '#334155', fontSize: '14px', lineHeight: 1.6 }}>{school.description}</p>

                    {/* Academic Highlights */}
                    <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Award size={18} color="#d97706" /> 주요 성과 및 수상 내역
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {school.highlights.map((highlight, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        background: '#faf5ff',
                                        border: '1px solid rgba(124, 58, 237, 0.2)',
                                        borderRadius: '8px',
                                        padding: '10px 14px',
                                        fontSize: '13px',
                                        color: '#581c87',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <span style={{ color: '#7c3aed', fontWeight: 800 }}>✓</span>
                                    <span>{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Key Coursework */}
                    <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <BookOpen size={18} color="#0284c7" /> 핵심 전공 이수 교과목
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                            {school.courses.map((course, idx) => (
                                <div key={idx} className="highlight-card">
                                    <div className="highlight-card-title">
                                        <span style={{ color: '#0f172a' }}>{course.name}</span>
                                        <span className="metric-pill" style={{ background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed', borderColor: 'rgba(124, 58, 237, 0.3)' }}>
                                            {course.grade}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>{course.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Club / Extracurricular */}
                    <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Users size={18} color="#059669" /> 학술 동아리 및 과외 활동
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {school.clubActivities.map((act, idx) => (
                                <div key={idx} className="highlight-card">
                                    <div className="highlight-card-title">
                                        <span style={{ color: '#0f172a' }}>{act.title}</span>
                                        <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>{act.role} ({act.period})</span>
                                    </div>
                                    <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.5 }}>{act.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
