import { describe, it, expect } from 'vitest';
import { developerProfile, careerData } from '../data/careerData';

describe('Data-Driven Single Source of Truth (careerData.js)', () => {
    it('개발자 프로필 정보가 올바르게 구성되어 있어야 한다', () => {
        expect(developerProfile.name).toBe('Yooniron');
        expect(developerProfile.title).toContain('Full-Stack');
        expect(developerProfile.email).toBe('yooniron.dev@gmail.com');
        expect(developerProfile.skills.frontend).toContain('React');
        expect(developerProfile.skills.frontend).toContain('Three.js / R3F');
        expect(developerProfile.skills.backend).toContain('Node.js');
        expect(developerProfile.skills.devops).toContain('Docker');
    });

    it('3D 타운 랜드마크 6종 데이터 무결성이 검증되어야 한다', () => {
        expect(careerData.landmarks).toHaveLength(6);

        const expectedIds = ['guide', 'school', 'company-a', 'company-b', 'arcade', 'mailbox'];
        const actualIds = careerData.landmarks.map((l) => l.id);
        expect(actualIds).toEqual(expectedIds);

        careerData.landmarks.forEach((landmark) => {
            expect(landmark.position).toHaveLength(3);
            expect(landmark.camOffset).toHaveLength(3);
            expect(landmark.camLookOffset).toHaveLength(3);
            expect(landmark.name).toBeDefined();
            expect(landmark.color).toMatch(/^#[0-9a-fA-F]{6}$/);
        });
    });

    it('모든 퀘스트가 유효한 랜드마크 타겟을 지니고 있어야 한다', () => {
        expect(careerData.quests.length).toBeGreaterThan(0);

        const landmarkIds = careerData.landmarks.map((l) => l.id);
        careerData.quests.forEach((quest) => {
            expect(landmarkIds).toContain(quest.target);
            expect(quest.points).toBeGreaterThan(0);
        });
    });

    it('회사 경력 및 성과 지표가 정밀하게 구성되어 있어야 한다', () => {
        expect(careerData.companies.length).toBeGreaterThan(0);

        careerData.companies.forEach((company) => {
            expect(company.name).toBeDefined();
            expect(company.role).toBeDefined();
            expect(company.achievements.length).toBeGreaterThan(0);
            company.achievements.forEach((ach) => {
                expect(ach.title).toBeDefined();
                expect(ach.metric).toBeDefined();
            });
        });
    });

    it('주요 프로젝트 및 기술 스택이 정의되어 있어야 한다', () => {
        expect(careerData.projects.length).toBeGreaterThan(0);

        careerData.projects.forEach((project) => {
            expect(project.title).toBeDefined();
            expect(project.tech.length).toBeGreaterThan(0);
        });
    });
});
