# 최성영 포트폴리오

Unity 게임 개발자 포트폴리오 웹사이트입니다. 순수 HTML·CSS·JavaScript로 만들어졌고 GitHub Pages로 무료 배포됩니다.

---

## 처음 사용하는 분을 위한 안내

이 폴더 안에 있는 모든 파일을 그대로 GitHub 저장소에 올리고 설정 몇 개만 바꾸면 웹사이트가 공개됩니다. 아래 순서대로 따라오시면 됩니다.

### 1단계: GitHub 저장소 만들기

1. [github.com](https://github.com) 에 로그인합니다.
2. 우측 상단의 `+` 버튼 → `New repository` 클릭.
3. 저장소 이름은 아무거나 상관없습니다 (예: `portfolio`).
4. `Public` 선택 후 `Create repository`.

### 2단계: 이 폴더의 파일들을 저장소에 올리기

**가장 쉬운 방법 (GitHub Desktop 사용)**
1. [GitHub Desktop](https://desktop.github.com) 을 설치하고 로그인합니다.
2. `File → Clone repository` 에서 방금 만든 저장소를 복제합니다.
3. 이 폴더 안의 파일들(`docs`, `scripts`, `claude.md`, `README.md`)을 복제한 폴더에 복사해서 넣습니다.
4. GitHub Desktop 창에서 변경사항 확인 → 커밋 메시지 입력 → `Commit to main` → `Push origin`.

### 3단계: GitHub Pages 설정

1. 저장소 페이지의 `Settings` → 좌측 `Pages` 메뉴로 이동합니다.
2. `Source` 항목에서 `Deploy from a branch` 선택.
3. `Branch` 를 `main` 으로, 폴더를 `/docs` 로 선택합니다.
4. `Save` 클릭.
5. 1~2분 뒤 화면 상단에 공개 주소가 표시됩니다 (예: `https://BomB1961.github.io/portfolio/`).

---

## GitHub 저장소 목록 업데이트하기

처음 배포하면 `저장소` 섹션이 비어 있습니다. 아래 방법으로 GitHub API에서 저장소 정보를 가져와 채워넣어야 합니다. **이 작업은 본인의 GitHub 저장소가 바뀔 때마다 한 번씩 해주시면 됩니다.**

### 준비물
- Node.js 18 이상 설치 ([nodejs.org](https://nodejs.org) 에서 LTS 버전)

### 실행 방법
1. 터미널(명령 프롬프트)을 엽니다.
2. 이 프로젝트 폴더로 이동합니다. (예: `cd Desktop/portfolio`)
3. 아래 명령을 실행합니다:
   ```
   node scripts/fetch-repos.js
   ```
4. `docs/data/repos.json` 파일이 자동으로 업데이트됩니다.
5. GitHub Desktop으로 변경사항을 커밋하고 push 합니다.

### 특정 저장소를 상단에 고정(Pinned)하고 싶다면
1. `scripts/fetch-repos.js` 파일을 열어 상단의 `PINNED_REPOS` 배열을 수정합니다.
2. 예시:
   ```javascript
   const PINNED_REPOS = ['my-best-game', 'unity-study'];
   ```
3. 저장 후 다시 `node scripts/fetch-repos.js` 실행.

---

## 프로젝트 내용 수정하는 법

### 대표 프로젝트(게임) 수정
`docs/data/projects.json` 파일을 열어서 내용을 바꾸세요. 항목별 설명은 다음과 같습니다.

- `title`: 게임 제목
- `role`: 본인 역할 (예: "1인 개발", "팀 프로젝트 - 프로그래밍 담당")
- `engine`: 사용한 엔진 (예: "Unity 2022.3 LTS")
- `platform`: 플랫폼 배열 (예: `["Android", "iOS"]`)
- `genre`: 장르
- `period`: 개발 기간 (예: "2024.03 - 2024.08")
- `thumbnail`: 썸네일 이미지 경로. `docs/assets/projects/` 폴더에 이미지를 넣고 그 경로를 적으세요. (예: `"assets/projects/alpha/thumb.jpg"`)
- `video`: 유튜브 영상 링크 (없으면 빈 문자열 `""`)
- `playable`: 웹 플레이 가능 링크 (itch.io, WebGL 빌드 등)
- `github`: 저장소 링크
- `stores.google_play` / `stores.app_store`: 스토어 링크
- `summary`: 한 줄 요약
- `contributions`: 본인이 한 일 (3개 정도 권장)
- `tech`: 사용한 기술 태그 배열

### 자기소개 글 수정
`docs/index.html` 파일에서 `<!-- About -->` 부분을 찾아 `<p>` 태그 안의 텍스트를 수정하세요.

### 스킬 목록 수정
`docs/index.html` 파일에서 `<!-- Skills -->` 부분을 찾아 `<li>` 항목들을 수정하세요.

### 이메일 주소 수정
`docs/index.html` 파일에서 `uoujj5150@gmail.com` 을 찾아 본인 이메일로 바꾸세요. (여러 군데에 있으니 전부 바꿔야 합니다)

---

## 로컬에서 미리보기

파일을 바로 열면 `data/projects.json` 같은 파일 로딩이 실패합니다. 간단한 로컬 서버가 필요합니다.

**Python이 설치되어 있다면 (가장 쉬움)**
1. 터미널에서 `docs` 폴더로 이동: `cd docs`
2. 명령 실행: `python -m http.server 8080`
3. 브라우저에서 `http://localhost:8080` 접속.

**VS Code 사용자**
1. VS Code 확장 프로그램 `Live Server` 설치.
2. `docs/index.html` 우클릭 → `Open with Live Server`.

---

## 폴더 구조

```
portfolio/
├── docs/                      ← GitHub Pages가 이 폴더를 웹으로 공개
│   ├── index.html            ← 메인 페이지
│   ├── .nojekyll             ← Jekyll 처리 방지용 빈 파일 (건드리지 마세요)
│   ├── css/                  ← 스타일
│   ├── js/                   ← 동작 스크립트
│   ├── data/                 ← 프로젝트·저장소 데이터
│   │   ├── projects.json    ← 게임 프로젝트 목록 (직접 수정)
│   │   └── repos.json       ← GitHub 저장소 (스크립트가 자동 생성)
│   └── assets/               ← 이미지 저장 위치
├── scripts/
│   └── fetch-repos.js       ← GitHub API에서 저장소 가져오는 스크립트
├── claude.md                 ← AI 수정 요청 시 참고용 규칙 파일
└── README.md                 ← 이 파일
```

---

## 문제 해결

**Q. 웹사이트 주소에 접속했는데 404 에러가 납니다.**
- GitHub Pages 설정이 `main` 브랜치의 `/docs` 폴더로 되어 있는지 확인하세요.
- 설정 후 1~2분 기다린 뒤 새로고침 해 보세요.

**Q. 저장소 섹션이 계속 "데이터가 비어 있습니다"로 나옵니다.**
- `node scripts/fetch-repos.js` 를 실행했는지 확인하세요.
- 실행 후 `docs/data/repos.json` 파일이 빈 배열(`[]`)이 아닌지 확인.
- 변경사항을 GitHub에 push 했는지 확인.

**Q. 스타일이 깨져 보입니다.**
- 브라우저 캐시 문제일 수 있습니다. `Ctrl + Shift + R` (Mac은 `Cmd + Shift + R`)로 강제 새로고침.

**Q. 이미지가 안 나옵니다.**
- `docs/assets/projects/` 폴더 안에 이미지 파일이 실제로 있는지 확인.
- `projects.json` 의 `thumbnail` 경로가 정확한지 확인 (대소문자 구분됨).
