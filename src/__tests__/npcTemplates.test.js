import { describe, it, expect, beforeEach } from 'vitest';
import { npcTemplates } from '../data/npcTemplates';
import { useGameStore } from '../stores/useGameStore';

describe('3D NPC Template-Driven Data & Store Integration (npcTemplates.js)', () => {
    beforeEach(() => {
        useGameStore.setState({
            activeNPC: null,
            nearbyNPC: null,
            talkedNPCs: [],
            questPoints: 0
        });
    });

    it('NPC 템플릿 데이터 3종이 올바른 무결성 구조를 지니고 있어야 한다', () => {
        expect(npcTemplates).toHaveLength(3);

        const expectedIds = ['npc-mentor', 'npc-recruiter', 'npc-devbot'];
        const actualIds = npcTemplates.map((n) => n.id);
        expect(actualIds).toEqual(expectedIds);

        npcTemplates.forEach((npc) => {
            expect(npc.name).toBeDefined();
            expect(npc.role).toBeDefined();
            expect(npc.position).toHaveLength(3);
            expect(npc.avatar).toBeDefined();
            expect(npc.greeting).toBeDefined();
            expect(npc.dialogues.length).toBeGreaterThan(0);
            npc.dialogues.forEach((d) => {
                expect(d.q).toBeDefined();
                expect(d.a).toBeDefined();
            });
        });
    });

    it('NPC 모달 열기 및 닫기 액션이 올바르게 동작해야 한다', () => {
        const mentorNpc = npcTemplates[0];
        useGameStore.getState().openNPCModal(mentorNpc);

        expect(useGameStore.getState().activeNPC).toEqual(mentorNpc);

        useGameStore.getState().closeNPCModal();
        expect(useGameStore.getState().activeNPC).toBeNull();
    });

    it('NPC 대화 완료 시 +50 XP 보상이 정상 보장되어야 한다', () => {
        const initialPoints = useGameStore.getState().questPoints;

        useGameStore.getState().talkToNPC('npc-mentor');

        expect(useGameStore.getState().talkedNPCs).toContain('npc-mentor');
        expect(useGameStore.getState().questPoints).toBe(initialPoints + 50);

        // 동일 NPC 중복 대화 시 추가 XP 중복 지급 방지 검증
        useGameStore.getState().talkToNPC('npc-mentor');
        expect(useGameStore.getState().questPoints).toBe(initialPoints + 50);
    });
});
