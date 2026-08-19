# 🎮 3D RPG Interactive Career Town Portfolio

> **3D RPG 게임 캐릭터를 조작하며 개발자의 실제 일대기(학력, 직장 경력, 프로젝트)를 건물 형태로 탐험하는 인터랙티브 커리어 타운 포트폴리오**  
> Based on [3D_RPG_Portfolio_Blueprint_v2.md](file:///D:/%E2%98%85.%20yooniron/PRJ/3d-rpg-portfolio/3D_RPG_Portfolio_Blueprint_v2.md)

---

## 🌟 핵심 기능 (Core Features)

1. **🏛️ 3D 커리어 타운 & 메타포 건물 (Career Town Map)**
   - **중앙 광장 (Central Plaza):** 스폰 지점, 전체 지도, 빠른 순간이동(Fast Travel), 조작 가이드 안내판
   - **아카데미 도서관 (Academic Hall):** 대학 전공, 핵심 이수 교과목(A+ 성적), 캡스톤 디자인 수상, 학술 동아리 이력
   - **A 테크 HQ 타워 (A-Tech Tower):** 대용량 B2B SaaS 및 핀테크 플랫폼 백엔드/풀스택 실무 경력 및 정량적 성과
   - **B 넥스트 랩 (B-Next Labs):** WebGL 3D 데이터 시각화 및 인터랙티브 웹 개발 경력
   - **프로젝트 아케이드 (Project Arcade):** 개인/사이드 프로젝트 쇼케이스, 라이브 데모 및 GitHub 코드 링크
   - **타임라인 우체통 (Timeline Mailbox):** 커피챗 제안, 방명록 메시지 전송 및 연락처(Email, LinkedIn, GitHub, Blog)

2. **🕹️ 하이브리드 플레이어 컨트롤러 (Player Controller)**
   - **키보드:** `W`, `A`, `S`, `D` / 방향키 이동, `Shift` 달리기(Sprint), `E` / `Space` / `Enter` 상호작용
   - **마우스 네비게이션:** 지면 클릭 시 해당 위치로 자동 길찾기 이동 (Click-to-Move)
   - **모바일 지원:** 온스크린 가상 터치 조이스틱 & 반응형 인터랙션 터치 버튼
   - **3인칭 부드러운 카메라:** 아바타 이동을 부드럽게 추적하는 Lerp 팔로우 카메라

3. **🔄 3D 모험 ↔ 2D 이력서 듀얼 모드 (Dual Mode Switcher)**
   - 3D RPG 탐험 모드와 채용 담당자/HR을 위한 **초고속 2D Executive Resume 뷰** 1클릭 전환 지원
   - 브라우저 인쇄 및 PDF 저장 지원

4. **🏆 RPG 퀘스트 & Web Audio BGM/효과음 (Gamification & Audio Engine)**
   - 타운 내 주요 건물을 방문할 때마다 경험치(XP) 획득 및 퀘스트 달성
   - 외부 파일 다운로드 필요 없는 자체 **Web Audio API 프로시저럴 사운드 신시사이저** 탑재 (Lo-Fi 앰비언트 BGM, 발소리, 모달 오픈 차임, 퀘스트 팡파르)
   - 낮/노을/밤(Day/Sunset/Night) 대기 환경 조명 전환 지원

---

## 📂 프로젝트 구조 (Project Structure)

```text
3d-rpg-portfolio/
├── index.html                           # 메타태그, 폰트 및 뷰포트
├── vite.config.js                       # Vite 빌드 및 Three.js 청킹 최적화
├── package.json                         # 의존성 설정
├── 3D_RPG_Portfolio_Blueprint_v2.md     # 기획 블루프린트 명세서
├── src/
│   ├── main.jsx                         # React 엔트리포인트
│   ├── App.jsx                          # 3D/2D 모드 라우팅 및 모달 매니저
│   ├── index.css                        # 글래스모피즘 코어 디자인 시스템
│   ├── data/
│   │   └── careerData.js                # 학력, 경력, 프로젝트, 퀘스트 데이터
│   ├── stores/
│   │   └── useGameStore.js              # Zustand 게임 상태 관리
│   ├── utils/
│   │   └── soundEngine.js               # Web Audio API 사운드 신시사이저
│   └── components/
│       ├── 3d/
│       │   ├── TownScene.jsx            # Canvas & 3D 월드 오케스트레이터
│       │   ├── Environment.jsx          # 조명, 날씨(Day/Night), 도로, 나무, 가로등
│       │   ├── Player.jsx               # 3D 아바타 & 플레이어 컨트롤러
│       │   ├── TriggerZone.jsx          # 건물 입구 근접 감지 & 3D 플로팅 배지
│       │   └── buildings/
│       │       ├── CentralGuide.jsx     # 중앙 광장 가이드
│       │       ├── SchoolBuilding.jsx   # 학교/아카데미 건물
│       │       ├── CompanyBuilding.jsx  # 회사 타워 건물
│       │       ├── ArcadeLab.jsx        # 프로젝트 아케이드 랩
│       │       └── MailboxZone.jsx      # 타임라인 우체통
│       └── ui/
│           ├── HUD.jsx                  # 미니맵, 상단바, 퀘스트 위젯, 모바일 조이스틱
│           ├── ResumeView2D.jsx         # 2D 이력서 뷰
│           └── modals/
│               ├── GuideModal.jsx       # 중앙 광장 가이드 모달
│               ├── SchoolModal.jsx      # 학력/교과목 모달
│               ├── CompanyModal.jsx     # 회사 경력 모달
│               ├── ProjectModal.jsx     # 프로젝트 아케이드 모달
│               ├── ContactModal.jsx     # 우체통 연락처 모달
│               └── QuestModal.jsx       # 퀘스트 & 업적 모달
```

---

## 🚀 시작하기 (Getting Started)

### 1. 개발 서버 실행
```bash
npm install
npm run dev
```
로컬 브라우저에서 `http://localhost:3000`으로 접속하여 인터랙티브 커리어 타운을 탐험할 수 있습니다.

### 2. 프로덕션 빌드
```bash
npm run build
npm run preview
```

---

## ✏️ 나만의 커리어 데이터로 수정하기 (Customization)

[`src/data/careerData.js`](file:///D:/%E2%98%85.%20yooniron/PRJ/3d-rpg-portfolio/src/data/careerData.js) 파일의 내용을 본인의 실제 프로필에 맞추어 수정하면 3D 건물 모달과 2D 이력서 뷰에 즉시 반영됩니다:

- `developerProfile`: 이름, 직무, 소개글, 기술 스택, 소셜 링크(GitHub, LinkedIn, Blog, Email)
- `careerData.school`: 출신 대학교, 전공, 학점, 핵심 이수 과목, 동아리 활동
- `careerData.companies`: 재직 회사명, 기간, 담당 업무, 정량적 KPI 성과, 기술 스택
- `careerData.projects`: 사이드/메인 프로젝트 소개, 해결 과제, Live Demo & GitHub 링크
