# FloatingActionButton

화면 하단에 고정되어 있으며, 키보드가 올라올 때 자동으로 위치가 조정되는 플로팅 액션 버튼 컴포넌트입니다.

## 주요 기능

- **키보드 자동 감지**: 모바일 키보드가 올라올 때 버튼이 자동으로 키보드 위로 이동
- **부드러운 애니메이션**: 300ms의 부드러운 전환 애니메이션
- **Visual Viewport API 지원**: 최신 브라우저에서 더 정확한 키보드 감지
- **크로스 브라우저 호환성**: 구형 브라우저에서는 window resize 이벤트로 대체
- **customizable**: 위치, z-index, 스타일 등 다양한 커스터마이징 옵션

## 사용법

### 기본 사용

```tsx
import { FloatingActionButton } from '@/components/common/FloatingActionButton';

function MyPage() {
  return (
    <div>
      {/* 페이지 콘텐츠 */}
      <FloatingActionButton>확인하기</FloatingActionButton>
    </div>
  );
}
```

### 프로퍼티

| Prop           | Type                                            | Default     | Description               |
| -------------- | ----------------------------------------------- | ----------- | ------------------------- |
| `children`     | `ReactNode`                                     | -           | 버튼 내부 콘텐츠          |
| `variant`      | `'solid' \| 'outlined' \| 'text'`               | `'solid'`   | 버튼 스타일               |
| `color`        | `'primary' \| 'assistive' \| 'dark'`            | `'primary'` | 버튼 색상                 |
| `size`         | `'large' \| 'medium' \| 'small' \| 'fullWidth'` | `'large'`   | 버튼 크기                 |
| `isFullWidth`  | `boolean`                                       | `true`      | 전체 너비 사용 여부       |
| `bottomOffset` | `number`                                        | `24`        | 하단에서 떨어진 거리 (px) |
| `zIndex`       | `number`                                        | `50`        | z-index 값                |
| `disabled`     | `boolean`                                       | `false`     | 비활성화 상태             |
| `leftIcon`     | `ReactNode`                                     | -           | 왼쪽 아이콘               |
| `rightIcon`    | `ReactNode`                                     | -           | 오른쪽 아이콘             |

### 고급 사용 예시

```tsx
import { FloatingActionButton } from '@/components/common/FloatingActionButton';
import { ArrowRight } from 'lucide-react';

function FormPage() {
  const [isValid, setIsValid] = useState(false);

  return (
    <div>
      <form>{/* 폼 필드들 */}</form>

      <FloatingActionButton
        disabled={!isValid}
        bottomOffset={32}
        rightIcon={<ArrowRight className='h-5 w-5' />}
      >
        다음 단계
      </FloatingActionButton>
    </div>
  );
}
```

## 키보드 감지 원리

### Visual Viewport API (권장)

최신 브라우저에서는 `Visual Viewport API`를 사용하여 정확한 키보드 높이를 감지합니다.

```js
window.visualViewport.addEventListener('resize', () => {
  const keyboardHeight = window.innerHeight - viewport.height;
  // 버튼 위치 조정
});
```

### Window Resize 이벤트 (대체)

Visual Viewport API를 지원하지 않는 브라우저에서는 window resize 이벤트를 사용합니다.

```js
window.addEventListener('resize', () => {
  const heightDifference =
    document.documentElement.clientHeight - window.innerHeight;
  // 키보드 감지 로직
});
```

## 브라우저 지원

- **iOS Safari**: Visual Viewport API 지원 (iOS 13+)
- **Chrome/Edge**: Visual Viewport API 지원 (Chrome 61+)
- **Firefox**: 부분 지원, window resize 이벤트 사용
- **기타 브라우저**: window resize 이벤트 대체

## 스토리북 테스트

스토리북에서 다양한 시나리오를 테스트할 수 있습니다:

1. **Default**: 기본 동작 확인
2. **WithInput**: 입력 필드와 함께 사용하는 예시
3. **KeyboardTest**: 실제 키보드 테스트 (모바일 권장)
4. **Variants**: 다양한 스타일 확인
5. **WithIcons**: 아이콘과 함께 사용하는 예시

### 모바일 테스트 방법

1. 스토리북의 KeyboardTest 스토리 실행
2. 모바일 기기나 개발자 도구의 모바일 모드 사용
3. 입력 필드 탭하여 키보드 올리기
4. 버튼 위치 변화 확인

## 주의사항

- **iOS Safe Area**: iOS 기기에서는 safe area를 고려하여 bottomOffset을 조정하세요
- **성능**: 키보드 이벤트는 성능에 영향을 줄 수 있으므로, 불필요한 렌더링을 방지하기 위해 최적화되어 있습니다
- **z-index**: 다른 고정 요소와 겹치지 않도록 적절한 z-index 값을 설정하세요
