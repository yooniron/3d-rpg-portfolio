# 🎮 3D RPG Interactive Career Town Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Three.js-r173-black?style=flat-square&logo=three.js" />
  <img src="https://img.shields.io/badge/R3F-8.17-black?style=flat-square" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-5.0-brown?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
</p>

> **Three.js & React Three Fiber 기반의 3D RPG 인터랙티브 공간을 탐험하며 개발자의 학력, 직무 경력, 프로젝트를 직관적으로 경험하는 차세대 웹 포트폴리오 엔진**

---

## 🌟 핵심 시스템 및 기술 아키텍처 (Key Technical Architecture)

### 1. 🕹️ 하이브리드 플레이어 컨트롤러 (Hybrid Player Controller)
* **다중 입력 파이프라인 (Multi-Input Pipeline)**:
  * **데스크톱**: 키보드 `WASD` / 방향키 이동, `Shift` 달리기(Sprint), `E` / `Space` 상호작용
  * **마우스 네비게이션**: Raycasting 기반 지면 클릭 이동 (Click-to-Move) 및 이동 경로 안내 링 연출
  * **모바일 디바이스**: 멀티터치 인식 가상 온스크린 조이스틱 (Virtual Joystick) 지원
* **3인칭 지능형 추적 카메라 (Lerp Follow Camera)**:
  * 플레이어 아바타의 위치 변화와 이동 벡터를 실시간 보간(Linear Interpolation)하여 부드러운 3D 뷰포트 시야 제공

### 2. 🏛️ 공간 메타포 및 근접 감지 시스템 (Spatial Metaphors & Proximity Sensors)
* **영역별 3D 오브젝트 메타포**:
  * 학력(아카데미), 실무 경력(테크 타워), 프로젝트(아케이드 랩), 연락처(가제보 우체통), 가이드(중앙 광장 분수대)
* **거리 기반 인터랙션 트리거 (`TriggerZone`)**:
  * 유클리디안 거리 연산을 통해 플레이어 접근 시 3D Billboard HTML 상호작용 배지 자동 노출 및 1-Click 진입 지원

### 3. 🔄 3D 모험 ↔ 2D Executive Resume 듀얼 모드 (Dual-Engine System)
* **게이밍 경험과 채용 UX의 완벽한 조화**:
  * 3D 월드 탐험 모드와 채용 담당자(HR/Recruiter)를 위해 0.1초 만에 전환되는 **2D 모던 에디토리얼 이력서 뷰** 지원
  * CSS Print Media Query 최적화를 통한 브라우저 원클릭 인쇄 및 고품질 PDF 내보내기 지원

### 4. 🎵 제로 에셋 프로시저럴 사운드 엔진 (Zero-Asset Web Audio API Synthesizer)
* **외부 오디오 파일 의존성 제거**:
  * 무거운 MP3/WAV 에셋 다운로드 없이 브라우저 자체 Web Audio API 오실레이터(Oscillator)를 통해 실시간 합성
  * Lo-Fi 앰비언트 배경음(BGM) 및 발소리, 모달 오픈 차임, 퀘스트 달성 팡파르 효과음(SFX) 프로시저럴 생성

### 5. ⚙️ 완전 데이터 주도형 아키텍처 (Data-Driven Single Source of Truth)
* **데이터와 렌더링 계층의 완전한 분리**:
  * 단일 데이터 스키마(`src/data/careerData.js`)와 Zustand 전역 상태를 기반으로 3D 월드의 건물 배치, 모달 팝업, 2D 이력서, 퀘스트 점수가 실시간 동기화되어 동작

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 스택 |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite |
| **3D Graphics & WebGL** | Three.js, @react-three/fiber (R3F), @react-three/drei |
| **State Management** | Zustand |
| **Styling & UI** | Modern Light Glassmorphism, Lucide React, Canvas Confetti |
| **Audio Engine** | Web Audio API (Synthesizer Engine) |
| **DevOps & CI/CD** | GitHub Actions, Git Rulesets |

---

## 🚀 빠른 시작 가이드 (Getting Started)

### 1. 레포지토리 클론 및 의존성 설치
```bash
git clone https://github.com/yooniron/3d-rpg-portfolio.git
cd 3d-rpg-portfolio
npm install
```

### 2. 개발 서버 기동
```bash
npm run dev
```
브라우저에서 `http://localhost:3000`으로 접속하여 인터랙티브 커리어 타운을 탐험할 수 있습니다.

### 3. 프로덕션 빌드
```bash
npm run build
npm run preview
```

---

## 📂 프로젝트 디렉토리 구조 (Project Structure)

```text
3d-rpg-portfolio/
├── index.html                           # 메타태그 및 폰트 설정
├── vite.config.js                       # Vite 번들러 및 청크 스플리팅 최적화
├── package.json                         # 프로젝트 의존성
├── src/
│   ├── main.jsx                         # React 엔트리포인트
│   ├── App.jsx                          # 3D/2D 라우팅 및 전역 모달 오케스트레이터
│   ├── index.css                        # 글래스모피즘 디자인 토큰 및 스타일
│   ├── data/
│   │   └── careerData.js                # 커리어, 프로젝트, 퀘스트 데이터 스키마
│   ├── stores/
│   │   └── useGameStore.js              # Zustand 게임 상태 스토어
│   ├── utils/
│   │   └── soundEngine.js               # Web Audio API 사운드 신시사이저
│   └── components/
│       ├── 3d/
│       │   ├── TownScene.jsx            # Canvas & 3D 씬 루트
│       │   ├── Environment.jsx          # 날씨/조명/지형/식생 렌더러
│       │   ├── Player.jsx               # 3D 아바타 & 플레이어 컨트롤러
│       │   ├── TriggerZone.jsx          # 근접 감지 센서 & 플로팅 배지
│       │   └── buildings/               # 5대 메타포 랜드마크 건물 컴포넌트
│       └── ui/
│           ├── HUD.jsx                  # 미니맵 레이더, 퀘스트 트래커, 상단바
│           ├── ResumeView2D.jsx         # 2D Executive Resume 뷰
│           └── modals/                  # 6개 글래스모피즘 상세 모달 팝업
```
