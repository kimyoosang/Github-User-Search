# GitHub User Search

GitHub 사용자를 검색하고 북마크할 수 있는 웹 애플리케이션입니다.

## [배포 링크](https://github-user-search-h58x.vercel.app/)

## 주요 기능

- GitHub 사용자 검색
- 무한 스크롤을 통한 검색 결과 로딩
- 사용자 북마크 추가/제거
- 반응형 그리드 레이아웃

## 기술 스택

### Frontend
- Next.js 13 (App Router)
- React 18
- TypeScript
- TanStack Query v5
- Zustand
- Tailwind CSS

### 주요 라이브러리
- `react-window` - 가상화된 리스트 구현
- `react-error-boundary` - 에러 처리
- `axios` - API 요청 처리

## 주요 기능 설명

### 검색 기능
- GitHub API를 활용한 사용자 검색
- 검색어 입력 시 실시간 결과 업데이트
- 무한 스크롤을 통한 페이지네이션

### 북마크 기능
- zustand를 활용한 북마크 데이터 저장
- 북마크 추가/제거 기능
- 북마크된 사용자 목록 표시

### 성능 최적화
- Streaming SSR 지원
- 컴포넌트 코드 스플리팅
- 가상화된 리스트로 메모리 사용 최적화
- React Query를 활용한 데이터 캐싱

### 에러 처리
- Error Boundary를 통한 에러 처리
- 에러 메시지 표시
- 자동 복구 기능

## 실행 방법

1. **의존성 설치**
   ```bash
   yarn install
   ```
2. **env 값 세팅 (Github Token)**
   ```bash
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
   ```

3. **개발 서버 실행**
   ```bash
   yarn run dev
   ```

4. **브라우저에서 애플리케이션 열기**
   ```plaintext
   http://localhost:3000
   ```
