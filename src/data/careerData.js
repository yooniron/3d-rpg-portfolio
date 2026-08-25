/**
 * 커리어 타운 RPG 데이터 스토어
 * 개발자 노윤철 (yooniron) 실사례 및 프로젝트 메타데이터
 */

export const developerProfile = {
    name: "노윤철 (yooniron)",
    title: "Full-Stack Developer (Java/Spring & React/TypeScript)",
    roleSubtitle: "Lv.99 Value Creator",
    bio: "단순히 코드를 타이핑하는 Coder보다, 비즈니스 문제를 해결하고 실질적 가치를 만드는 Developer를 지향합니다. ENTP의 도전적인 시각으로 시스템 아키텍처를 설계합니다.",
    location: "Seoul, Republic of Korea",
    email: "dbscjf324@gmail.com",
    github: "https://github.com/yooniron",
    linkedin: "https://github.com/yooniron",
    blog: "https://yooniron.tistory.com/",
    status: "🟢 새로운 비즈니스 문제 해결과 기술적 도전을 탐색 중",
    stats: {
        codingExp: "5+ Years",
        problemSolving: "98/100",
        architectureDesign: "95/100",
        frontendMastery: "94/100",
        backendEfficiency: "96/100",
        teamCollaboration: "99/100"
    },
    skills: {
        frontend: ["TypeScript", "JavaScript", "React", "Three.js / R3F", "JSP", "HTML5/CSS3"],
        backend: ["Java", "Spring Boot", "Node.js", "Supabase Realtime", "Oracle", "Tibero", "MariaDB", "MySQL", "MSSQL"],
        database: ["Supabase", "Oracle", "Tibero", "MariaDB", "MySQL", "MSSQL"],
        devops: ["Kubernetes", "Docker", "Vite", "Git", "Subversion (SVN)", "IntelliJ IDEA"]
    }
};

export const careerData = {
    // 1. 학력 및 CS 아카데미 데이터
    school: {
        id: "school",
        buildingName: "아카데미 도서관 (Academic Hall)",
        buildingTag: "EDUCATION & CS FOUNDATION",
        name: "컴퓨터공학 학술 연구소",
        degree: "컴퓨터공학 전공 (Computer Science & Engineering)",
        period: "2018.03 - 2022.02",
        location: "서울",
        gpa: "3.85 / 4.50",
        description: "컴퓨터 구조, 자료구조, 알고리즘, 데이터베이스 등 탄탄한 CS 이론 기초를 다지고 다양한 웹/백엔드 실무 아키텍처를 스터디했습니다.",
        highlights: [
            "알고리즘 및 백엔드 문제 풀이 스터디 기수 리딩",
            "Java/Spring 및 데이터베이스 인덱싱 최적화 연구",
            "정보처리기사 자격증 취득 및 CS 네트워크 핸드셰이크 심화",
            "티스토리 기술 블로그(yooniron.tistory.com)에 개발 기록 작성"
        ],
        courses: [
            { name: "자료구조 & 알고리즘", grade: "A+", desc: "시간/공간 복잡도 분석, 트리, 그래프, 동적 계획법 심화" },
            { name: "데이터베이스 시스템", grade: "A+", desc: "관계형 DB 모델링, 정규화, 인덱싱 최적화, 트랜잭션 격리수준" },
            { name: "운영체제 & 네트워크", grade: "A0", desc: "프로세스 스케줄링, 메모리 가상화, TCP/IP 핸드셰이크" },
            { name: "소프트웨어 공학", grade: "A+", desc: "클린 코드, 디자인 패턴(GoF), Agile/Scrum 실무 적용" }
        ],
        clubActivities: [
            {
                title: "백엔드 & CS 알고리즘 연구 스터디",
                role: "팀장 (Lead)",
                period: "2019.03 - 2021.02",
                details: "백준/프로그래머스 알고리즘 세미나 주관, 백엔드 문제 풀이 스터디 리딩"
            },
            {
                title: "개발자 기술 블로그 운영 (yooniron.tistory.com)",
                role: "테크 라이터",
                period: "2020.03 - 현재",
                details: "트러블슈팅, Java/Spring 및 프론트엔드 최적화 기술 포스팅 지속 작성"
            }
        ]
    },

    // 2. 회사 직무 경력 건물 데이터
    companies: [
        {
            id: "company-a",
            buildingName: "A 테크 HQ 타워 (A-Tech Tower)",
            buildingTag: "ENTERPRISE BACKEND & DB",
            name: "엔터프라이즈 인프라 & 플랫폼",
            role: "시니어 풀스택 / 백엔드 엔지니어",
            period: "2022.03 - 재직 중",
            type: "엔터프라이즈 B2B & 대용량 데이터베이스 플랫폼",
            team: "Core Platform & Infrastructure Squad",
            summary: "Java/Spring 및 엔터프라이즈 DB(Oracle, Tibero) 기반 대용량 데이터 플랫폼 아키텍처 구축과 사내 온보딩 자동화 CLI 도구를 개발했습니다.",
            achievements: [
                {
                    title: "SVN 체크아웃 및 IntelliJ 개발환경 온보딩 자동화 CLI 구축",
                    metric: "신규 팀원 개발환경 온보딩 소요시간 90% 단축 (2시간 → 10분)",
                    tech: ["JavaScript", "Node.js", "Subversion (SVN)", "IntelliJ RunConfig"],
                    description: "신규 팀원이 프로젝트 세팅 시 수행하는 반복 작업(SVN 체크아웃, 환경변수 치환, IntelliJ RunConfig 수정)을 단일 CLI 명령으로 자동 처리."
                },
                {
                    title: "대용량 엔터프라이즈 DB(Oracle/Tibero) 쿼리 튜닝 및 데이터 연동",
                    metric: "대용량 트랜잭션 쿼리 응답 대기시간 40% 이상 개선",
                    tech: ["Java", "Spring Boot", "Oracle", "Tibero", "MariaDB"],
                    description: "복잡한 SQL 인덱스 재구획 및 DB 페이징 쿼리 튜닝을 통해 대용량 조회 성능 극대화."
                }
            ],
            techStack: ["Java", "Spring Boot", "TypeScript", "React", "Oracle", "Tibero", "MariaDB", "Kubernetes", "SVN", "Git"]
        },
        {
            id: "company-b",
            buildingName: "B 넥스트 랩 (B-Next Labs)",
            buildingTag: "REALTIME FRONTEND & BAAS",
            name: "풀스택 & 프론트엔드 솔루션 랩",
            role: "풀스택 / 웹 소프트웨어 엔지니어",
            period: "2021.06 - 2022.02",
            type: "실시간 웹 애플리케이션 및 인터랙티브 솔루션",
            team: "Interactive App Team",
            summary: "React, TypeScript 및 Supabase Realtime 기반 실시간 인터랙티브 웹 애플리케이션 개발을 담당했습니다.",
            achievements: [
                {
                    title: "Subway Quiz 실시간 1v1 스피드 퀴즈 대전 플랫폼 개발",
                    metric: "Supabase Realtime 기반 대전 동기화 lateness < 50ms",
                    tech: ["React", "TypeScript", "Supabase Realtime", "Vite"],
                    description: "지하철 노선도 네트워크 그래프 알고리즘을 결합한 실시간 1v1 스피드 대전 퀴즈 서비스 연동."
                },
                {
                    title: "반응형 웹 UI/UX 및 실시간 데이터 바인딩",
                    metric: "다양한 디바이스 환경에서 무지연 인터랙션 지원",
                    tech: ["React", "TypeScript", "CSS Modules", "Vite"],
                    description: "사용자 중심의 직관적 웹 UI 마크업 및 실시간 상태 동기화 처리."
                }
            ],
            techStack: ["React", "TypeScript", "Node.js", "Supabase", "Vite", "Git"]
        }
    ],

    // 3. 프로젝트 아케이드 랩 건물 데이터
    projects: [
        {
            id: "subway-quiz",
            title: "🚇 Subway Quiz (실시간 1v1 지하철 퀴즈 대전)",
            category: "Realtime Web Application & BaaS",
            tag: "FEATURED",
            period: "2026.07 - 2026.08",
            summary: "지하철 노선도 네트워크 그래프 알고리즘 기반의 실시간 1v1 대전 퀴즈 플랫폼",
            details: [
                "React + TypeScript와 Supabase Realtime 소켓 서버를 활용한 초고속 실시간 대전 엔진 구축",
                "수도권 지하철 노선도 그래프 알고리즘을 이용한 역 검색 및 실시간 퀴즈 스코어링 동기화",
                "Vite 및 모던 CSS 마크업으로 모바일 및 데스크톱 전 브라우저 반응형 지원",
                "GitHub 퍼블릭 오픈소스 프로젝트로 2 Stars 및 실사용자 대전 환경 검증 완료"
            ],
            tech: ["React", "TypeScript", "Supabase Realtime", "Vite", "CSS Modules"],
            github: "https://github.com/yooniron/subway-quiz",
            demo: "https://github.com/yooniron/subway-quiz",
            stats: { latency: "< 50ms", sync: "100% Realtime", stars: "2 Stars" }
        },
        {
            id: "intellij-svn-dev-setup",
            title: "⚡ IntelliJ SVN Dev Setup (온보딩 자동화 CLI)",
            category: "Developer CLI Tool & Productivity",
            tag: "DEV TOOL",
            period: "2026.06 - 2026.07",
            summary: "신규 팀원의 개발환경 세팅부터 SVN 체크아웃, IntelliJ RunConfig 생성을 자동화하는 단일 CLI 도구",
            details: [
                "Node.js 및 CLI 스크립팅으로 SVN 레포지토리 체크아웃 및 환경변수 치환 자동화",
                "IntelliJ 실행 설정 XML(Run Configuration) 자동 편집 기능을 통해 신규 팀원 온보딩 시간 90% 단축",
                "반복적인 수동 세팅 오류를 차단하고 개발 생산성 혁신 달성"
            ],
            tech: ["JavaScript", "Node.js", "SVN CLI", "IntelliJ API"],
            github: "https://github.com/yooniron/intellij-svn-dev-setup",
            demo: "https://github.com/yooniron/intellij-svn-dev-setup",
            stats: { onboardingTime: "-90%", toolType: "CLI Automation" }
        },
        {
            id: "3d-rpg-portfolio",
            title: "🎮 3D RPG Interactive Career Town (본 포트폴리오)",
            category: "Creative WebGL & Interactive Game",
            tag: "FLAGSHIP",
            period: "2026.08 (개인 프로젝트)",
            summary: "3D RPG 게임 캐릭터를 조작하며 실제 노윤철 님의 커리어와 프로젝트를 탐험하는 차세대 3D 인터랙티브 커리어 타운",
            details: [
                "React Three Fiber(R3F)와 Three.js를 활용한 감각적인 로우폴리 사이버 3D 월드 구축",
                "60FPS 지수 댐핑 최적화 및 45도 입체 관찰 시네마틱 카메라 시스템 적용",
                "선(先) 느긋한 슬로우 글라이딩(650ms) ➔ 후(後) 모달 페이드인 노출 시퀀서 탑재",
                "Web Audio API 기반 프로시저럴 BGM 및 SFX 사운드 엔진",
                "Vitest 유닛 테스트(11개 케이스 100% PASS) 및 GitHub Actions CI 자동 검증 파이프라인 구축"
            ],
            tech: ["React 18", "Three.js", "React Three Fiber", "Zustand", "Vitest", "GitHub Actions"],
            github: "https://github.com/yooniron/3d-rpg-portfolio",
            demo: "https://github.com/yooniron/3d-rpg-portfolio",
            stats: { fps: "60 FPS", ci: "GitHub Actions PASS", tests: "11/11 Passed" }
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
            description: "개발자 노윤철(yooniron)의 커리어 타운 중심지입니다. 타운 맵과 조작 가이드를 확인할 수 있습니다."
        },
        {
            id: "school",
            name: "아카데미 도서관 (Academic Hall)",
            position: [-18, 0, -14],
            camOffset: [6.5, 5.8, 12.0],
            camLookOffset: [0, 3.8, 0],
            color: "#a855f7",
            icon: "🎓",
            description: "개발자의 컴퓨터공학 CS 이론, 데이터베이스 인덱싱, 티스토리 블로그 스터디가 보관된 도서관입니다."
        },
        {
            id: "company-a",
            name: "A 테크 HQ 타워 (A-Tech HQ)",
            position: [18, 0, -14],
            camOffset: [-7.0, 6.8, 13.5],
            camLookOffset: [0, 5.2, 0],
            color: "#38bdf8",
            icon: "🏢",
            description: "엔터프라이즈 Java/Spring 및 대용량 DB(Oracle/Tibero) 아키텍처와 SVN CLI 온보딩 자동화가 위치한 오피스입니다."
        },
        {
            id: "company-b",
            name: "B 넥스트 랩 (B-Next Labs)",
            position: [20, 0, 10],
            camOffset: [-6.5, 6.0, 12.8],
            camLookOffset: [0, 0.6, 0],
            color: "#06b6d4",
            icon: "🏛️",
            description: "React, TypeScript 및 Supabase Realtime 기반 실시간 웹 애플리케이션 개발 기술이 보관된 솔루션 랩입니다."
        },
        {
            id: "arcade",
            name: "프로젝트 아케이드 (Project Arcade)",
            position: [-18, 0, 12],
            camOffset: [6.0, 5.2, 11.5],
            camLookOffset: [0, 3.5, 0],
            color: "#f59e0b",
            icon: "🕹️",
            description: "노윤철 님이 개발한 Subway Quiz, IntelliJ SVN Dev Setup CLI, 3D RPG Portfolio 오락기 연구소입니다."
        },
        {
            id: "mailbox",
            name: "타임라인 우체통 (Contact Mailbox)",
            position: [0, 0, 18],
            camOffset: [4.8, 4.2, 9.8],
            camLookOffset: [0, 2.2, 0],
            color: "#10b981",
            icon: "📮",
            description: "개발자 노윤철 님에게 커피챗을 제안하거나 메시지를 남길 수 있는 소통의 우체통입니다."
        }
    ],

    quests: [
        { id: "visit-guide", name: "모험의 시작", target: "guide", desc: "중앙 광장 안내판 확인하기", points: 100 },
        { id: "visit-school", name: "지식의 탐구자", target: "school", desc: "아카데미 도서관 열람하기", points: 150 },
        { id: "visit-company-a", name: "엔터프라이즈 아키텍트", target: "company-a", desc: "A 테크 HQ 타워 탐방하기", points: 200 },
        { id: "visit-company-b", name: "실시간 반응형 마스터", target: "company-b", desc: "B 넥스트 랩 탐방하기", points: 200 },
        { id: "visit-arcade", name: "혁신 프로젝트 체험", target: "arcade", desc: "프로젝트 아케이드 랩 테스트하기", points: 250 },
        { id: "visit-mailbox", name: "커뮤니케이션 연결", target: "mailbox", desc: "우체통 확인하기", points: 100 }
    ]
};
