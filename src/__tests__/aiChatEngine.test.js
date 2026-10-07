import { describe, it, expect } from 'vitest';
import { generateNPCResponse, getSmartFallbackResponse } from '../utils/aiChatEngine';

describe('aiChatEngine - Smart Fallback & AI Response Engine', () => {
    it('npc-mentor ID 및 DB 관련 키워드에 대해 적절한 스마트 Fallback 응답을 반환해야 함', () => {
        const response = getSmartFallbackResponse('npc-mentor', 'DB 튜닝 및 SQL 최적화 경험에 대해 알려주세요');
        expect(response).toContain('Oracle/Tibero');
        expect(response).toContain('40%');
    });

    it('npc-recruiter ID 및 CLI 관련 키워드에 대해 적절한 스마트 Fallback 응답을 반환해야 함', () => {
        const response = getSmartFallbackResponse('npc-recruiter', 'CLI 자동화 도구로 시간을 얼마나 단축했나요?');
        expect(response).toContain('90%');
        expect(response).toContain('10분');
    });

    it('npc-devbot ID 및 Subway Quiz 관련 키워드에 대해 적절한 스마트 Fallback 응답을 반환해야 함', () => {
        const response = getSmartFallbackResponse('npc-devbot', 'Subway Quiz 실시간 동기화 방식이 궁금해');
        expect(response).toContain('삐빅!');
        expect(response).toContain('Supabase Realtime');
    });

    it('키워드 매칭 실패 시 NPC별 기본 Fallback 응답을 반환해야 함', () => {
        const response = getSmartFallbackResponse('npc-mentor', '오늘 날씨가 참 맑네요');
        expect(typeof response).toBe('string');
        expect(response.length).toBeGreaterThan(5);
    });

    it('generateNPCResponse 함수는 API Key가 설정되지 않은 경우에도 정상적인 fallback 스트링을 비동기로 반환해야 함', async () => {
        const fakeNPC = {
            id: 'npc-devbot',
            name: '데브봇 (DevBot AI)',
            role: '3D & BaaS 기술 도우미'
        };

        const response = await generateNPCResponse(fakeNPC, '3D 최적화 비결이 뭐야?');
        expect(typeof response).toBe('string');
        expect(response.length).toBeGreaterThan(0);
    });
});
