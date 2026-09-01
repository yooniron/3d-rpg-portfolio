/**
 * 3D NPC 대화 템플릿 설정 파일
 * 
 * [사용방법]
 * 새로운 NPC를 추가하거나 기존 대화 문구를 변경하고 싶을 때 이 파일만 편집하면
 * 3D 타운 내 렌더링, 위치, 말풍선, 선택지 질문 및 답변이 100% 자동 반영됩니다.
 */

export const npcTemplates = [
    {
        id: "npc-mentor",
        name: "마스터 멘토 (Mentor)",
        role: "아키텍처 & DB 도슨트",
        position: [-8, 0, -5],
        color: "#38bdf8",
        avatar: "🧙‍♂️",
        greeting: "반갑네! 노윤철 개발자의 엔터프라이즈 아키텍처와 DB 튜닝 노하우에 대해 궁금한 점이 있나?",
        dialogues: [
            {
                id: "mentor-q1",
                q: "Java/Spring 및 대용량 DB 튜닝 경험이 궁금해요!",
                a: "노윤철 개발자는 Oracle/Tibero 대용량 데이터베이스 환경에서 복잡한 SQL 인덱스 재구획과 페이징 쿼리 튜닝을 통해 대용량 조회 응답 대기 시간을 40% 이상 개선한 경험이 있다네!"
            },
            {
                id: "mentor-q2",
                q: "개발할 때 가장 중요하게 생각하는 핵심 가치는?",
                a: "'단순히 코드를 타이핑하는 Coder보다, 비즈니스 문제를 해결하고 실질적 가치를 만드는 Developer가 되는 것'을 최우선 사명으로 삼고 있지!"
            },
            {
                id: "mentor-q3",
                q: "CS 이론과 아키텍처에 대한 철학이 있으신가요?",
                a: "운영체제, 자료구조, TCP/IP 핸드셰이크 등 탄탄한 CS 이론 기초를 바탕으로, 확장 가능하고 유지보수가 쉬운 도메인 설계를 추구한다네!"
            }
        ]
    },
    {
        id: "npc-recruiter",
        name: "채용 스카우터 (Recruiter)",
        role: "커리어 & 실무 분석가",
        position: [8, 0, 5],
        color: "#f59e0b",
        avatar: "💼",
        greeting: "안녕하세요! 개발자 노윤철 님의 실무 프로젝트 성과와 온보딩 CLI 개발 스토리가 궁금하신가요?",
        dialogues: [
            {
                id: "recruiter-q1",
                q: "팀원 온보딩 시간 90% 단축 CLI 도구는 어떻게 만들었나요?",
                a: "신규 팀원이 세팅 시 반복하던 SVN 체크아웃, 환경변수 치환, IntelliJ RunConfig 자동 생성을 Node.js 단일 CLI 도구로 자동화하여 2시간 세팅을 10분으로 단축했습니다!"
            },
            {
                id: "recruiter-q2",
                q: "어떤 협업 문화와 분위기에서 시너지가 나나요?",
                a: "ENTP 특유의 시각으로 문제를 성역 없이 공유하고, 적극적인 소통과 상호 피드백으로 함께 성장하는 커뮤니케이션을 선호합니다!"
            },
            {
                id: "recruiter-q3",
                q: "현재 어떤 직무 기회를 찾고 계신가요?",
                a: "풀스택 및 백엔드/프론트엔드 아키텍처 도전 과제가 있는 고성장 팀에서 실질적인 비즈니스 가치를 만들기를 탐색하고 계십니다!"
            }
        ]
    },
    {
        id: "npc-devbot",
        name: "데브봇 (DevBot AI)",
        role: "3D & BaaS 기술 도우미",
        position: [0, 0, 10],
        color: "#10b981",
        avatar: "🤖",
        greeting: "삐빅! 3D WebGL 포트폴리오 및 Subway Quiz Realtime 서비스 기술 매트릭스를 안내합니다!",
        dialogues: [
            {
                id: "devbot-q1",
                q: "Subway Quiz의 실시간 1v1 동기화 기술이 궁금해!",
                a: "React + TypeScript에 Supabase Realtime 소켓 및 수도권 지하철 노선도 그래프 알고리즘을 결합하여 50ms 미만의 지연 시간으로 퀴즈 대전을 처리합니다!"
            },
            {
                id: "devbot-q2",
                q: "이 3D RPG 포트폴리오의 60FPS 최적화 비결은?",
                a: "Three.js/R3F에서 조건부 updateProjectionMatrix 및 프레임 레이트 독립적 지수 댐핑을 적용하여 60FPS 스터터링 없는 45도 관찰 카메라를 구현했습니다!"
            },
            {
                id: "devbot-q3",
                q: "자동화 CI/CD 파이프라인은 어떻게 구성했나요?",
                a: "Vitest 유닛 테스트 및 Vite 생산 빌드를 GitHub Actions CI 파이프라인으로 연결하여 PR 생성 시 자동 테스트 통과 배지를 부착합니다!"
            }
        ]
    }
];
