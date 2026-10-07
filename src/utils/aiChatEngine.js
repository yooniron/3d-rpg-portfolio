/**
 * NPC AI LLM 대화 및 Smart Fallback 응답 처리 엔진
 * 
 * Google Gemini API 연동 및 키 미설정/네트워크 오류 발생 시
 * 각 NPC의 페르소나에 맞춰 자연스러운 응답을 생해보는 스마트 엔진입니다.
 */

// NPC별 스마트 Fallback 응답용 규칙 맵
const fallbackRuleMap = {
    'npc-mentor': [
        {
            keywords: ['db', '튜닝', '데이터베이스', 'oracle', 'tibero', 'sql', '인덱스', '대용량', '성능'],
            response: 'Oracle/Tibero 대용량 DB 환경에서 실행 계획(Execution Plan) 분석과 최적의 인덱스 설계, 복잡한 JOIN 쿼리 리팩토링을 통해 응답 시간을 40% 이상 개선했던 경험이 대표적이라네. 데이터 모델링 단계부터 성능을 고려하는 것이 핵심이지!'
        },
        {
            keywords: ['가치', '철학', '마인드', '태도', '생각', '우선'],
            response: '코드를 작성하기에 앞서 비즈니스 문제의 본질을 먼저 정의하는 자세가 가장 중요하다네. 단순한 구현을 넘어 시스템의 안정성과 미래 확장성까지 다각도로 고민하는 게 참된 개발자의 자질이지.'
        },
        {
            keywords: ['cs', '아키텍처', '설계', '지식', '이론', '기초'],
            response: '운영체제, 자료구조, 네트워크 프로토콜 등 기초 CS 지식은 아무리 강조해도 지나침이 없다네. 단단한 기본기가 있어야 겪어보지 못한 거대한 트래픽이나 복잡한 장애 앞에서도 우아한 해결책을 낼 수 있다네.'
        },
        {
            keywords: ['안녕', '반가', '소개', '누구', '자기소개'],
            response: '반갑네! 나는 노윤철 개발자의 기술적 아키텍처와 엔터프라이즈 데이터베이스 경험을 소개해주는 마스터 멘토라네. 궁금한 기술 질문이 있다면 편하게 물어보게나!'
        }
    ],
    'npc-recruiter': [
        {
            keywords: ['cli', '온보딩', '자동화', '도구', '90%', '단축', 'node'],
            response: '신규 팀원의 세팅 불편을 해결하기 위해 SVN 커밋 체크아웃부터 RunConfig 자동화까지 Node.js CLI 단일 명령어로 통합했습니다. 덕분에 온보딩 세팅 시간이 2시간에서 10분으로 90% 이상 단축되었죠!'
        },
        {
            keywords: ['협업', '소통', '커뮤니케이션', '팀', '문화', '분위기', 'entp'],
            response: '노윤철 개발자는 솔직하고 건설적인 피드백 문화를 적극 지향합니다. 문제 상황을 빠르게 투명화하고 팀원들과 함께 더 나은 대안을 찾아 나가는 소통 스타일을 가졌습니다.'
        },
        {
            keywords: ['커리어', '목표', '포지션', '직무', '이직', '기회', '역량'],
            response: '실질적인 비즈니스 임팩트를 창출하고, 기술적 도전 과제가 명확한 팀에서 풀스택 및 백엔드 역량을 발휘하고자 합니다. 언제든 유의미한 합류 논의를 환영합니다!'
        },
        {
            keywords: ['안녕', '반가', '소개', '누구', '자기소개'],
            response: '안녕하세요! 채용 스카우터입니다. 노윤철 개발자의 핵심 실무 프로젝트 성과와 커리어 하이라이트에 대해 무엇이든 여쭤보세요!'
        }
    ],
    'npc-devbot': [
        {
            keywords: ['subway', 'quiz', '실시간', '소켓', '1v1', '지하철', 'supabase'],
            response: '삐빅! Subway Quiz 서비스는 Supabase Realtime 소켓 및 지하철 노선도 그래프 알고리즘을 결합하여 50ms 이내의 실시간 퀴즈 동기화 대전을 제공합니다!'
        },
        {
            keywords: ['3d', '60fps', '최적화', 'three', 'r3f', '성능', '포트폴리오'],
            response: '삐빅! Three.js 및 React Three Fiber 환경에서 지수 댐핑 알고리즘과 드로우콜 최적화를 적용하여, 사양이 다른 장치에서도 60FPS 프레임을 매끄럽게 유지합니다!'
        },
        {
            keywords: ['ci', 'cd', '파이프라인', '테스트', 'vitest', 'github', 'actions'],
            response: '삐빅! GitHub Actions CI/CD 파이프라인을 구축하여 자동 유닛 테스트 및 Vite 생산 빌드 배포 자동화를 달성했습니다!'
        },
        {
            keywords: ['안녕', '반가', '소개', '누구', '자기소개'],
            response: '삐빅! 안녕하세요! 저는 3D RPG 포트폴리오의 시스템 매트릭스 및 기술 스택을 담당하는 데브봇 AI입니다!'
        }
    ]
};

// 범용 기본 응답 템플릿
const defaultFallbackResponses = {
    'npc-mentor': [
        '좋은 질문이네! 노윤철 개발자는 지속적인 코드 리팩토링과 깔끔한 구조 설계를 중요하게 여긴다네.',
        '엔터프라이즈 시스템 구축 경험에 대해 더 자세히 알고 싶다면 다른 주제에 대해서도 질문해 보게나!'
    ],
    'npc-recruiter': [
        '흥미로운 질문입니다! 노윤철 개발자의 자세한 이력서와 상세 프로젝트 내역은 2D 이력서 모드에서도 한눈에 확인하실 수 있습니다.',
        '팀 내 효율성을 높이고 동료들에게 긍정적인 자극을 주는 동료로서 큰 가치를 제공할 수 있는 개발자입니다.'
    ],
    'npc-devbot': [
        '삐빅! 요청하신 연산 데이터를 분석 중입니다. 웹 프론트엔드부터 백엔드 데이터베이스까지 폭넓은 스택을 다루고 있습니다!',
        '삐빅! 추가 기술 아키텍처 항목은 3D 타운 내 다른 건물과 랜드마크에서도 구경하실 수 있습니다!'
    ]
};

/**
 * 키워드 기반 스마트 Fallback 응답 생성
 */
export function getSmartFallbackResponse(npcId, userPrompt) {
    const promptLower = (userPrompt || '').toLowerCase();
    const rules = fallbackRuleMap[npcId] || [];

    for (const rule of rules) {
        if (rule.keywords.some((kw) => promptLower.includes(kw))) {
            return rule.response;
        }
    }

    const defaults = defaultFallbackResponses[npcId] || [
        '질문해주셔서 감사합니다! 노윤철 개발자에 대해 더 알고 싶은 구체적인 프로젝트나 기술이 있으신가요?'
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
}

/**
 * Gemini API 또는 Smart Fallback을 이용한 NPC 대화 생성 함수
 * 
 * @param {Object} npc - NPC 객체 데이터
 * @param {string} userPrompt - 사용자가 입력한 메시지
 * @param {Array} history - 기존 대화 내역 [{ role: 'user'|'model', text: '...' }]
 * @returns {Promise<string>} 생성된 대화 답변
 */
export async function generateNPCResponse(npc, userPrompt, history = []) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof localStorage !== 'undefined' ? localStorage.getItem('gemini_api_key') : null);

    if (apiKey) {
        try {
            const systemPrompt = npc.systemPrompt || `너는 3D RPG 포트폴리오 월드의 NPC '${npc.name}'이다. 역할: ${npc.role}. 친절하고 개성 있게 답변해라.`;
            
            const contents = [
                {
                    role: 'user',
                    parts: [{ text: `[System Instruction: ${systemPrompt}]\n\n이 지침에 부합하는 캐릭터 말투로 답변해주세요.` }]
                },
                {
                    role: 'model',
                    parts: [{ text: `알겠습니다. 저는 '${npc.name}'으로서 캐릭터 성격에 맞게 답변하겠습니다.` }]
                }
            ];

            // 대화 히스토리 추가
            if (Array.isArray(history)) {
                history.slice(-6).forEach((item) => {
                    contents.push({
                        role: item.role === 'user' ? 'user' : 'model',
                        parts: [{ text: item.text }]
                    });
                });
            }

            contents.push({
                role: 'user',
                parts: [{ text: userPrompt }]
            });

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents })
                }
            );

            if (response.ok) {
                const data = await response.json();
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) return text.trim();
            } else {
                console.warn(`[Gemini API Warning] Status: ${response.status}. Falling back to smart engine.`);
            }
        } catch (err) {
            console.warn('[Gemini API Fetch Exception] Falling back to smart engine:', err);
        }
    }

    // API Key가 없거나 호출 실패 시 스마트 Fallback 엔진 호출
    return getSmartFallbackResponse(npc.id, userPrompt);
}
