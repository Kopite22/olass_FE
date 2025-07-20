# Olass

연봉 비교 서비스

## 🚀 주요 기술 스택

- **Next.js 14** - App Router 사용
- **TypeScript** - 타입 안정성
- **Tailwind CSS v4** - 유틸리티 퍼스트 CSS 프레임워크
- **Radix UI** - 접근성이 뛰어난 헤드리스 UI 컴포넌트
- **React Query (TanStack Query)** - 서버 상태 관리
- **Zod** - 스키마 검증 및 타입 추론
- **Storybook** - 컴포넌트 문서화 및 개발

## 📁 프로젝트 구조

- FSD 변경 / 적용 예정

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 페이지
│   ├── error.tsx          # 에러 페이지
│   ├── not-found.tsx      # 404 페이지
│   └── [페이지별 폴더]/
├── _pages/                 # 페이지별 컴포넌트 (높은 응집도)
│   ├── landing/           # 랜딩 페이지 관련 컴포넌트
│   ├── salary-compare-form/ # 급여 비교 폼 페이지
│   ├── salary-result/     # 급여 결과 페이지
│   └── asset-management-compare-form/ # 자산 관리 비교 폼
├── components/            # 공유 컴포넌트
│   ├── common/           # 공통 컴포넌트
│   ├── icons/            # 아이콘 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── steps/            # 스텝 관련 컴포넌트
│   └── ga/               # Google Analytics 컴포넌트
├── lib/                   # 유틸리티 함수
│   ├── api.ts            # API 관련 유틸
│   ├── className.ts      # 클래스명 유틸 (cn)
│   ├── env.ts            # 환경변수 관리
│   ├── logger.ts         # 로깅 유틸
│   └── og.ts             # Open Graph 유틸
├── apis/                  # API 관련 코드
├── providers/             # React Context Providers
├── constant/              # 상수 정의
├── styles/               # 글로벌 스타일
└── assets/               # 정적 자산
```

## 🏗️ 아키텍처 원칙

### 컴포넌트 구성 전략

1. **페이지별 응집도 우선**: 각 페이지의 컴포넌트는 `_pages/[페이지명]/` 내부에 수평적으로 구성
2. **점진적 분리**: 컴포넌트가 공유되는 순간 depth를 활용하여 분리
3. **전역 공유**: 여러 페이지에서 사용되는 컴포넌트는 루트의 `components/`로 이동

### 예시 구조

```
_pages/
├── salary-compare-form/
│   ├── SalaryCompareFormPage.tsx  # 메인 페이지 컴포넌트
│   ├── steps/                     # 해당 페이지 전용 스텝 컴포넌트
│   ├── providers/                 # 페이지 전용 프로바이더
│   └── constants/                 # 페이지 전용 상수
```

## 🛠️ 개발 환경 설정

### 필수 요구사항

- Node.js 18+
- pnpm (권장 패키지 매니저)

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

### 개발 도구

```bash
# 린트 검사
pnpm lint

# 린트 자동 수정
pnpm lint:fix

# 타입 검사
pnpm typecheck

# 테스트 실행
pnpm test

# 테스트 감시 모드
pnpm test:watch

# Storybook 실행
pnpm storybook

# 코드 포맷팅
pnpm format
```

## 🎨 스타일링 가이드

### Tailwind CSS v4

- 모든 스타일링은 Tailwind CSS 기반
- `src/styles/globals.css`에 정의된 디자인 토큰 사용
- 하드코딩된 스타일 값 지양

### 컴포넌트 스타일링 원칙

- Flex 또는 Grid 레이아웃 사용
- Margin 대신 Gap 활용
- 일관된 디자인 시스템 유지

## 📦 주요 라이브러리

### UI 컴포넌트

- **Radix UI**: 접근성이 뛰어난 헤드리스 컴포넌트
- **Lucide React**: 아이콘 라이브러리
- **Framer Motion**: 애니메이션 (설정됨)

### 상태 관리 및 데이터

- **TanStack Query**: 서버 상태 관리
- **Zod**: 런타임 타입 검증

### 개발 도구

- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅
- **Husky**: Git 훅 관리
- **Commitlint**: 커밋 메시지 규칙

## 🔧 설정 파일

### TypeScript 설정

- 절대 경로 임포트: `@/*` (src 폴더), `~/*` (public 폴더)
- Strict 모드 활성화

### 코드 품질

- ESLint: 엄격한 규칙 적용
- Prettier: 일관된 코드 포맷팅
- Lint-staged: 커밋 전 자동 검사

## 📚 추가 기능

- **Storybook**: 컴포넌트 문서화 및 개발
- **Jest**: 단위 테스트
- **Vitest**: 빠른 테스트 실행
- **Next Sitemap**: 자동 사이트맵 생성
- **Google Analytics**: 웹 분석 (설정됨)

## 🚀 배포

프로젝트는 Vercel, Netlify 등 다양한 플랫폼에 배포 가능합니다.

```bash
# 빌드 후 정적 파일 생성
pnpm build

# 사이트맵 자동 생성 (빌드 후 실행됨)
pnpm postbuild
```
