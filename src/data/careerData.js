/**
 * 커리어 타운 RPG 데이터 스토어
 * 학력, 직무 경력, 사이드 프로젝트 및 퀘스트 메타데이터
 */

export const developerProfile = {
    name: "Yooniron",
    title: "Full-Stack Software Engineer & Creative Developer",
    roleSubtitle: "Lv.99 Code Adventurer",
    bio: "가치 있는 사용자 경험과 견고한 소프트웨어 아키텍처를 설계하는 풀스택 개발자입니다. 복잡한 비즈니스 문제를 직관적인 인터랙티브 솔루션으로 풀어내는 것을 즐깁니다.",
    location: "Seoul, Republic of Korea",
    email: "yooniron.dev@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    blog: "https://velog.io",
    status: "🟢 새로운 도전과 기회를 탐색 중",
    stats: {
        codingExp: "5+ Years",
        problemSolving: "98/100",
        architectureDesign: "95/100",
        frontendMastery: "94/100",
        backendEfficiency: "96/100",
        teamCollaboration: "99/100"
    },
    skills: {
        frontend: ["React", "Next.js", "TypeScript", "Three.js / R3F", "Tailwind CSS", "Zustand", "HTML5/CSS3"],
        backend: ["Node.js", "Java / Spring Boot", "Express", "NestJS", "Python", "RESTful API", "GraphQL"],
        database: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "TypeORM"],
        devops: ["Docker", "Kubernetes", "AWS (EC2, S3, RDS)", "GitHub Actions", "CI/CD", "Vercel"]
    }
};

export const careerData = {
    // 1. 학력 및 아카데미 건물 데이터
    school: {
        id: "school",
        buildingName: "아카데미 도서관 (Academic Hall)",
        buildingTag: "EDUCATION & CS FOUNDATION",
        name: "한국대학교 컴퓨터공학부",
        degree: "공학사 (Computer Science & Engineering)",
        period: "2018.03 - 2022.02 (졸업)",
        location: "서울",
        gpa: "3.85 / 4.50",
        description: "컴퓨터 구조, 운영체제, 자료구조, 알고리즘 등 탄탄한 CS 이론 기초를 다지고 다양한 산학 협력 프로젝트와 알고리즘 학술 동아리를 이끌었습니다.",
        highlights: [
            "전공 학점 3.92/4.5 (우수 장학생 수혜)",
            "알고리즘 및 코딩 테스트 학술 동아리 'AlgoRush' 회장 역임",
            "2021 컴퓨터공학 캡스톤 디자인 경진대회 최우수상 (스마트 캠퍼스 솔루션)",
            "정보처리기사 및 SQLD 자격증 취득"
        ],
        courses: [
            { name: "자료구조 & 알고리즘", grade: "A+", desc: "시간/공간 복잡도 분석, 트리, 그래프, 동적 계획법 심화" },
            { name: "운영체제", grade: "A0", desc: "프로세스 스케줄링, 메모리 가상화, 멀티스레드 동기화" },
            { name: "데이터베이스 시스템", grade: "A+", desc: "관계형 DB 모델링, 정규화, 인덱싱 최적화, 트랜잭션 격리수준" },
            { name: "컴퓨터 네트워크", grade: "A0", desc: "OSI 7계층, TCP/IP 핸드셰이크, HTTP/1.1~HTTP/3 프로토콜" },
            { name: "소프트웨어 공학", grade: "A+", desc: "클린 코드, 디자인 패턴(GoF), Agile/Scrum 방법론 실무 적용" }
        ],
        clubActivities: [
            {
                title: "학술 알고리즘 연구회 (AlgoRush)",
                role: "회장 (Lead)",
                period: "2019.03 - 2021.02",
                details: "매주 백준/프로그래머스 알고리즘 세미나 주관, 백엔드 문제 풀이 스터디 4개 기수 리딩"
            },
            {
                title: "오픈소스 웹 개발 소모임",
                role: "핵심 멘토",
                period: "2020.03 - 2021.12",
                details: "React 기반 대학 캠퍼스 통합 커뮤니티 웹앱 개발 및 1,500명 실사용자 유치"
            }
        ]
    },

    // 2. 회사 직무 경력 건물 데이터
    companies: [
        {
            id: "company-a",
            buildingName: "A 테크 HQ 타워 (A-Tech Tower)",
            buildingTag: "CURRENT / RECENT CAREER",
            name: "(주) A 테크놀로지",
            role: "시니어 풀스택 / 백엔드 엔지니어",
            period: "2022.03 - 재직 중",
            type: "B2B SaaS & 글로벌 핀테크 플랫폼",
            team: "Core Platform & Commerce Squad",
            summary: "월간 활성 사용자(MAU) 80만 규모의 B2B 결제 및 정산 SaaS 코어 플랫폼의 고가용성 아키텍처 설계와 프론트엔드 모듈화를 주도했습니다.",
            achievements: [
                {
                    title: "대용량 실시간 결제/정산 파이프라인 리팩토링",
                    metric: "처리 지연시간 62% 감소 (850ms → 320ms), TPS 3.5배 향상",
                    tech: ["Java 17", "Spring Boot 3", "Kafka", "Redis Cluster", "PostgreSQL"],
                    description: "기존 동기식 DB 트랜잭션 구조를 Apache Kafka 기반 비동기 이벤트 드리븐 파이프라인으로 전환하여 트래픽 스파이크 시 결제 유실율 0% 달성."
                },
                {
                    title: "어드민 UI 디자인 시스템 및 마이크로 프론트엔드 구축",
                    metric: "신규 관리자 페이지 개발 기간 40% 단축, 빌드 속도 50% 향상",
                    tech: ["React", "TypeScript", "Vite", "Zustand", "Tailwind CSS"],
                    description: "사내 12개 어드민 서비스에 통일된 디자인 시스템과 재사용 가능한 고성능 데이터 그리드 컴포넌트 라이브러리를 배포."
                },
                {
                    title: "글로벌 멀티 테넌시(Multi-Tenancy) 데이터 격리 아키텍처 구축",
                    metric: "해외 4개국 진출 테넌트 온보딩 소요시간 기존 2주 → 1시간으로 자동화",
                    tech: ["PostgreSQL Schema Sharding", "Docker", "Kubernetes", "AWS EKS"],
                    description: "엔터프라이즈 고객사별 데이터 보안 및 규제 준수를 위한 스키마 기반 멀티 테넌트 라우팅 미들웨어 개발."
                }
            ],
            techStack: ["Java 17", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Redis", "Kafka", "Docker", "AWS EKS", "GitHub Actions"]
        },
        {
            id: "company-b",
            buildingName: "B 넥스트 랩 (B-Next Labs)",
            buildingTag: "PREVIOUS EXPERIENCE",
            name: "(주) B 솔루션즈",
            role: "주니어 프론트엔드 / 웹 소프트웨어 엔지니어",
            period: "2021.06 - 2022.02",
            type: "데이터 시각화 및 인터랙티브 웹 에이전시",
            team: "Interactive DX Team",
            summary: "공공 및 대기업 대상의 대규모 실시간 대시보드와 WebGL 기반 3D 인터랙티브 랜딩 페이지 개발을 담당했습니다.",
            achievements: [
                {
                    title: "실시간 IoT 관제 3D 디지털 트윈 대시보드 구축",
                    metric: "초당 2,000건 센서 데이터 60FPS 무지연 3D 렌더링",
                    tech: ["Three.js", "React", "WebSocket", "Chart.js"],
                    description: "공장 설비 상태를 3D 모델로 시각화하고 WebSocket 스트리밍을 통해 이상 감지 시 실시간 경고 알림 시스템 구현."
                },
                {
                    title: "반응형 웹 포털 웹표준/웹접근성(WA) 인증 획득",
                    metric: "접근성 점수 99점 달성, 다양한 브라우저 호환성 완벽 지원",
                    tech: ["HTML5", "CSS3", "JavaScript ES6+", "Webpack"],
                    description: "스크린 리더 사용자 및 키보드 전용 내비게이션을 지원하는 시맨틱 마크업 설계."
                }
            ],
            techStack: ["React", "JavaScript ES6+", "Three.js", "WebGL", "CSS3 / Sass", "WebSocket", "Git"]
        }
    ],

    // 3. 프로젝트 아케이드 랩 건물 데이터
    projects: [
        {
            id: "project-1",
            title: "3D RPG Career Town Portfolio",
            category: "Creative WebGL & Interactive Game",
            tag: "FEATURED",
            period: "2026",
            summary: "3D RPG 게임 캐릭터를 조작하며 실제 일대기와 프로젝트를 탐험하는 차세대 3D 인터랙티브 커리어 타운 웹 애플리케이션",
            details: [
                "React Three Fiber(R3F)와 Three.js를 활용한 감각적인 로우폴리 사이버 판타지 월드 구축",
                "키보드(WASD), 마우스 클릭 네비게이션, 모바일 가상 터치패드를 모두 지원하는 물리 기반 플레이어 컨트롤러",
                "건물 접근 시 실시간 거리 센서 및 3D Text 프롬프트, 부드러운 시네마틱 카메라 줌 인터랙션",
                "HR 채용 담당자를 위한 초고속 '2D Resume Mode' 1클릭 전환 및 퀘스트/배지 달성 엔진 탑재",
                "Web Audio API 기반 자체 프로시저럴 BGM 및 사운드 효과음 엔진 내장"
            ],
            tech: ["React", "Three.js", "React Three Fiber", "Drei", "Zustand", "Vite", "Web Audio API"],
            github: "https://github.com",
            demo: "https://career-town-rpg.vercel.app",
            stats: { fps: "60 FPS", loadTime: "< 0.8s", responsiveness: "Desktop & Mobile 100%" }
        },
        {
            id: "project-2",
            title: "CloudPulse: 대규모 실시간 분산 APM 모니터링",
            category: "Full-Stack & DevOps",
            tag: "SYSTEM ARCHITECTURE",
            period: "2025",
            summary: "마이크로서비스 클러스터의 메트릭, 분산 트레이싱, 로그를 실시간으로 수집 및 분석하는 올인원 APM 플랫폼",
            details: [
                "OpenTelemetry 기반 메트릭 수집 파이프라인 및 ClickHouse OLAP 고속 쿼리 엔진 연동",
                "Next.js App Router와 WebSocket 스트리밍을 통한 초당 5만 건의 실시간 트래픽 토폴로지 시각화",
                "머신러닝 기반 이상 징후 자동 탐지 알고리즘 및 슬랙/웹훅 즉시 알림 발송"
            ],
            tech: ["Next.js", "TypeScript", "Go", "ClickHouse", "Kafka", "Docker", "Prometheus"],
            github: "https://github.com",
            demo: "https://demo.cloudpulse.dev",
            stats: { throughput: "50k/sec", latency: "< 50ms" }
        },
        {
            id: "project-3",
            title: "AgentCraft: AI 자율 에이전트 워크플로우 빌더",
            category: "AI & Full-Stack",
            tag: "AI PRODUCT",
            period: "2024 - 2025",
            summary: "드래그 앤 드롭 노드 그래프 인터페이스로 LLM 멀티 에이전트 파이프라인을 시각적으로 설계하고 실행하는 오픈소스 SaaS",
            details: [
                "React Flow 기반 노드 에디터와 커스텀 프롬프트 체이닝 미들웨어 구현",
                "Python FastAPI 백엔드와 비동기 Celery 워커를 통한 대용량 RAG(검색 증강 생성) 처리",
                "Vector DB(pgvector)를 활용한 실시간 문서 임베딩 및 인덱싱"
            ],
            tech: ["React", "React Flow", "Python", "FastAPI", "PostgreSQL (pgvector)", "LangChain", "OpenAI"],
            github: "https://github.com",
            demo: "https://agentcraft.io",
            stats: { stars: "850+ Stars", users: "1,200+ MAU" }
        },
        {
            id: "project-4",
            title: "DevSprint: 실시간 협업 칸반 & 코드 샌드박스",
            category: "Web Application",
            tag: "PRODUCTIVITY",
            period: "2024",
            summary: "원격 개발팀을 위한 CRDT 기반 무충돌 실시간 문서/칸반 협업 보드 및 웹 브라우저 내장 코드 실행기",
            details: [
                "Yjs 및 WebRTC를 활용한 분산 P2P 멀티플레이어 커서 및 동시 편집 지원",
                "WebAssembly(Wasm)를 활용하여 브라우저 내에서 직접 Python/JS 코드를 격리 실행",
                "OAuth2 소셜 로그인 및 팀 워크스페이스 권한 관리 시스템 구현"
            ],
            tech: ["React", "TypeScript", "Yjs", "WebRTC", "WebAssembly", "Node.js", "MongoDB"],
            github: "https://github.com",
            demo: "https://devsprint.live",
            stats: { syncLatency: "15ms", reliability: "99.99%" }
        }
    ],

    // 4. 퀘스트 및 타운 랜드마크 데이터
    landmarks: [
        {
            id: "guide",
            name: "중앙 광장 안내판 (Central Plaza)",
            position: [0, 0, 0],
            camOffset: [5.2, 4.8, 10.5],
            camLookOffset: [0, 2.5, 0],
            color: "#38bdf8",
            icon: "🧭",
            description: "커리어 타운의 중심지이자 모험의 출발점입니다. 타운 맵과 조작 가이드를 확인할 수 있습니다."
        },
        {
            id: "school",
            name: "아카데미 도서관 (Academic Hall)",
            position: [-18, 0, -14],
            camOffset: [6.5, 5.8, 12.0],
            camLookOffset: [0, 3.8, 0],
            color: "#a855f7",
            icon: "🎓",
            description: "개발자의 대학 전공, 이수 과목, 알고리즘 학술 동아리 활동이 보관된 도서관입니다."
        },
        {
            id: "company-a",
            name: "A 테크 HQ 타워 (A-Tech HQ)",
            position: [18, 0, -14],
            camOffset: [-7.0, 6.8, 13.5],
            camLookOffset: [0, 5.2, 0],
            color: "#38bdf8",
            icon: "🏢",
            description: "대용량 B2B SaaS 및 핀테크 플랫폼을 개발한 A 테크놀로지 오피스입니다."
        },
        {
            id: "company-b",
            name: "B 넥스트 랩 (B-Next Labs)",
            position: [20, 0, 10],
            camOffset: [-6.5, 6.0, 12.8],
            camLookOffset: [0, 4.5, 0],
            color: "#06b6d4",
            icon: "🏛️",
            description: "WebGL 3D 데이터 시각화와 인터랙티브 웹을 개발한 B 솔루션즈 건물입니다."
        },
        {
            id: "arcade",
            name: "프로젝트 아케이드 (Project Arcade)",
            position: [-18, 0, 12],
            camOffset: [6.0, 5.2, 11.5],
            camLookOffset: [0, 3.5, 0],
            color: "#f59e0b",
            icon: "🕹️",
            description: "개발자가 직접 만든 혁신적인 웹/AI/클라우드 프로젝트 오락기들이 모여있는 연구소입니다."
        },
        {
            id: "mailbox",
            name: "타임라인 우체통 (Contact Mailbox)",
            position: [0, 0, 18],
            camOffset: [4.8, 4.2, 9.8],
            camLookOffset: [0, 2.2, 0],
            color: "#10b981",
            icon: "📮",
            description: "개발자에게 커피챗을 제안하거나 메시지를 남길 수 있는 소통의 우체통입니다."
        }
    ],

    quests: [
        { id: "visit-guide", name: "모험의 시작", target: "guide", desc: "중앙 광장 안내판 확인하기", points: 100 },
        { id: "visit-school", name: "지식의 전당", target: "school", desc: "아카데미 도서관 방문하여 학력 확인", points: 200 },
        { id: "visit-company-a", name: "프로의 세계", target: "company-a", desc: "A 테크 HQ 타워에서 경력 확인", points: 250 },
        { id: "visit-company-b", name: "도전의 발자취", target: "company-b", desc: "B 넥스트 랩에서 프로젝트 이력 확인", points: 200 },
        { id: "visit-arcade", name: "창의력의 오락실", target: "arcade", desc: "프로젝트 아케이드에서 작품 감상", points: 250 },
        { id: "visit-mailbox", name: "인연의 우체통", target: "mailbox", desc: "타임라인 우체통에서 연락처 확인", points: 150 }
    ]
};
