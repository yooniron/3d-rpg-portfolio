# Git & GitHub Workflow Rules

1. **지시 기반 실행 원칙**:
   - 사용자의 명시적인 지시(예: "커밋해", "푸시해", "브랜치 생성해", "PR 작성해" 등)가 있기 전까지는 `git commit`, `git push`, 브랜치 생성/전환, PR 생성을 임의로 수행하지 않는다.

2. **Subway-Quiz 스타일 상세 PR 문서화 원칙**:
   - Pull Request(PR)는 항상 실제 개발/변경 내역을 바탕으로 명확한 Title(`type: emoji 한글제목`)과 상세한 Description 구조를 갖추어 직접 작성한다:
     - `## 🎯 PR 개요 (Summary)`: 목표 및 배경 설명
     - `## 🌟 주요 아키텍처 및 변경 사항 (Key Highlights)`: 핵심 기술적 결정 사항 및 설계 포인트
     - `## 🛠️ 세부 개발 및 파일별 작업 내역 (File Details)`: 도메인별 세부 파일 변경점
     - `## 🧪 검증 결과 (Verification Results)`: `npm run build` 결과 및 브라우저 테스트 결과

3. **Feature 브랜치 전략**:
   - 깃 브랜치는 항상 `local feature` 브랜치 -> `remote/feature` 브랜치로 생성하여 commit/push를 진행한 뒤, `main` 브랜치로 merge하는 PR을 요청한다.
