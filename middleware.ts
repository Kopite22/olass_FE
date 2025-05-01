// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getExistingExperiments } from '@/components/ga/abtest';
import { getExperimentsForPath } from '@/components/ga/experiments-config';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 현재 경로 가져오기
  const path = request.nextUrl.pathname;

  // 기존 실험 쿠키 가져오기
  const experiments = getExistingExperiments(request);

  // 현재 경로에 적용할 실험 가져오기
  const applicableExperiments = getExperimentsForPath(path);

  // 업데이트가 필요한지 여부 추적
  let updated = false;
  const updatedExperiments = { ...experiments };

  // 적용 가능한 각 실험에 대해 처리
  for (const experiment of applicableExperiments) {
    // 아직 실험에 할당되지 않은 경우에만 변형 선택
    if (!updatedExperiments[experiment.name]) {
      // 가중치에 따라 변형 선택
      const randomValue = Math.random();
      let cumulativeWeight = 0;

      for (let i = 0; i < experiment.weights.length; i++) {
        cumulativeWeight += experiment.weights[i];
        if (randomValue < cumulativeWeight) {
          updatedExperiments[experiment.name] = experiment.variants[i];
          updated = true;
          break;
        }
      }

      // 변형이 선택되지 않은 경우 기본값으로 첫 번째 변형 설정
      if (!updatedExperiments[experiment.name]) {
        updatedExperiments[experiment.name] = experiment.variants[0];
        updated = true;
      }
    }
  }

  // 업데이트된 실험 쿠키를 응답에 설정
  if (updated) {
    response.cookies.set('ab-experiments', JSON.stringify(updatedExperiments), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30일
      httpOnly: false, // GA 스크립트에서 접근 가능하도록 false로 설정
    });
  }

  return response;
}

// 특정 경로에만 미들웨어 적용 (필요에 따라 수정)
export const config = {
  matcher: [
    /*
     * 모든 페이지에 미들웨어를 적용하려면:
     * '/((?!api|_next/static|_next/image|favicon.ico).*)'
     */
    '/',
    '/products/:path*',
    '/checkout/:path*',
    // 필요한 다른 경로 추가
  ],
};
