# 🎮 3D RPG Interactive Portfolio Blueprint (Updated v2)
> **Gemini CLI & Claude CLI 협업 워크플로우 기반 / 커리어 타운(학교·회사·프로젝트) 콘셉트 포트폴리오**

---

## 📌 1. 프로젝트 개요 (Project Overview)

본 프로젝트는 방문자가 3D RPG 게임 캐릭터를 조작하며 **개발자의 실제 일대기(학력, 직장 경력, 프로젝트)가 건물 형태로 구축된 마을**을 탐험하는 **인터랙티브 커리어 타운 포트폴리오**입니다.

### 🎯 핵심 콘셉트: "My Career World / 커리어 타운"
* **학교 건물 (School / Academy Building):** 학창 시절, 전공 지식, 교육 이수 내역 탐험
* **회사 건물 (Company Office Buildings):** 재직했던 회사별 오피스 건물 (입구 진입 시 프로젝트 경력, 담당 업무, 성과 표출)
* **프로젝트 아케이드 / 연구소 (Project Arcade & Lab):** 개인/사이드 프로젝트 오락기 및 실험실
* **주인공 (Player):** 개발자 자신을 투영한 Avatar 캐릭터

---

## 🏛️ 2. 커리어 타운 맵 구조 설계 (Town Layout)

```text
[ 3D 커리어 타운 레이아웃 ]

                   ┌───────────────────────────┐
                   │   [ 1. 중앙 광장 / 스폰 ]   │
                   │  개발자 안내판 / 전체 지도  │
                   └─────────────┬─────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ [ 2. 학교/아카데미 ] │     │  [ 3. 회사 타운 ]   │     │ [ 4. 프로젝트 랩 ] │
│                 │     │                 │     │                 │
│ • 학과/전공 정보  │     │ • A 회사 오피스  │     │ • 오락기 형태   │
│ • 핵심 이수 과목  │     │ • B 회사 오피스  │     │ • 사이드 프로젝트│
│ • 동아리 활동    │     │ • 주요 업무/성과 │     │ • 시연 연동 링크│
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   │    [ 5. 타임라인 우체통 ]    │
                   │  Contact / 방명록 / 이메일│
                   └───────────────────────────┘
```

---

## 🤖 3. AI CLI 역할 분담 (Gemini CLI & Claude CLI)

| 구분 | **Gemini CLI** (건물 데이터화 & 프롬프트 설계) | **Claude CLI** (건물 메타포 구현 & 3D 연동) |
| :--- | :--- | :--- |
| **주요 역할** | • 건물별 경력 데이터 구조화 (`careerData.js`)<br>• 건물 배치 및 동선 최적화 프롬프트 기획<br>• 건물별 3D 에셋 키워드 선정 | • R3F `Building` 및 `IndoorModal` 컴포넌트 개발<br>• 건물 입구 텔레포트/센서 감지 로직 구현<br>• 회사별 커스텀 3D 오브젝트 Interaction 로직 작성 |
| **명령어 예시** | `gemini "학교, 회사, 프로젝트 건물을 구별하는 R3F 3D 에셋 배치 및 데이터 구조 제안해줘"` | `claude -p "R3F에서 플레이어가 회사 건물 정문에 다가가면 해당 회사의 경력 모달이 뜨는 BuildingZone 컴포넌트 만들어줘"` |

---

## 📂 4. 권장 프로젝트 구조

```text
rpg-portfolio/
├── public/
│   ├── models/
│   │   ├── buildings/     # school.glb, company_a.glb, company_b.glb, lab.glb
│   │   └── player.glb
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── World.jsx
│   │   │   ├── Player.jsx
│   │   │   ├── buildings/
│   │   │   │   ├── SchoolBuilding.jsx     # 학교 건물 (학력/교육)
│   │   │   │   ├── CompanyBuilding.jsx    # 회사 건물 (경력/성과)
│   │   │   │   └── ArcadeLab.jsx          # 프로젝트 아케이드
│   │   │   └── TriggerZone.jsx            # 건물 입구 감지 센서
│   │   └── ui/
│   │       ├── modals/
│   │       │   ├── SchoolDetailModal.jsx
│   │       │   ├── CompanyDetailModal.jsx
│   │       │   └── ProjectDetailModal.jsx
│   │       └── ModeToggle.jsx             # 3D ↔ 2D 이력서 전환
│   ├── data/
│   │   └── careerData.js                  # 학교, 회사, 프로젝트 통합 데이터
│   ├── stores/
│   │   └── useGameStore.js
│   └── App.jsx
```

---

## 🚀 5. 건물별 인터랙션 연동 데이터 구조 (`careerData.js`)

```javascript
export const careerData = {
  school: {
    name: "00대학교 컴퓨터공학과",
    period: "2018.03 - 2022.02",
    description: "전공 기초 습득 및 컴퓨터 아키텍처, 알고리즘 이수",
    highlights: ["학점: 3.8/4.5", "알고리즘 동아리 회장", "캡스톤 디자인 우수상"]
  },
  companies: [
    {
      id: "company-a",
      name: "(주) A 테크",
      role: "백엔드 / 풀스택 개발자",
      period: "2022.03 - 2024.01",
      buildingModel: "/models/buildings/company_a.glb",
      projects: [
        { title: "대용량 트래픽 결제 시스템 리팩토링", tech: ["Java", "Spring Boot", "MyBatis"] },
        { title: "어드민 그리드 컴포넌트 모듈화", tech: ["JavaScript", "jQuery"] }
      ]
    }
  ],
  projects: [
    {
      id: "arcade-1",
      title: "3D RPG 포트폴리오 웹사이트",
      tech: ["Three.js", "React Three Fiber", "Zustand"],
      link: "https://github.com/..."
    }
  ]
};
```

---

## 💻 6. AI CLI 실전 사용 프롬프트 예시 (업데이트)

### 1) Gemini CLI: 건물 중심의 데이터 & 동선 설계
```bash
gemini "사용자가 3D 캐릭터로 학교, 회사 건물에 진입하는 포트폴리오를 만들려고 해.
careerData.js 데이터를 매핑하여 각 건물마다 고유한 UI 모달과 3D 텍스트 타이틀을 띄우는 R3F 아키텍처를 설계해줘."
```

### 2) Claude CLI: 건물 접근 센서 & UI 연동 컴포넌트
```bash
claude -p "R3F와 @react-three/rapier 환경에서 BuildingTriggerZone 컴포넌트를 작성해줘.
조건:
1. 플레이어가 특정 건물(학교, 회사) 일정 반경 내로 들어오면 건물 위 3D Text 또는 HTML 표시
2. 'E' 키 입력 시 해당 건물의 데이터(companyData)를 Zustand에 저장하고 2D 모달을 오픈
3. 모달 오픈 시 카메라가 건물을 클로즈업(Camera Animate)하도록 지원"
```
