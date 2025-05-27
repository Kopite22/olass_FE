'use client';

import { type VariantProps } from 'class-variance-authority';
import {
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { cn } from '@/lib/className';

import { Button, buttonVariants } from '@/components/common/Button';

type FloatingActionButtonVariantProps = VariantProps<typeof buttonVariants>;

interface FloatingActionButtonProps
  extends FloatingActionButtonVariantProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  bottomOffset?: number; // 하단에서 떨어진 거리 (기본값: 24px)
  zIndex?: number; // z-index 값 (기본값: 50)
}

const FloatingActionButton = forwardRef<
  HTMLButtonElement,
  FloatingActionButtonProps
>(
  (
    {
      className,
      variant = 'solid',
      color = 'primary',
      size = 'large',
      isFullWidth = true,
      children,
      leftIcon,
      rightIcon,
      bottomOffset = 48,
      zIndex = 50,
      ...props
    }: FloatingActionButtonProps,
    ref
  ) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
      const handleResize = () => {
        if (typeof window === 'undefined') return;

        const viewportHeight = window.innerHeight;
        const documentHeight = document.documentElement.clientHeight;

        // 키보드가 올라온 경우 viewport height가 작아짐
        const heightDifference = documentHeight - viewportHeight;

        if (heightDifference > 150) {
          // 150px 이상 차이나면 키보드가 올라온 것으로 판단
          setKeyboardHeight(heightDifference);
        } else {
          setKeyboardHeight(0);
        }
      };

      // Visual Viewport API 지원 브라우저에서 더 정확한 키보드 감지
      if ('visualViewport' in window && window.visualViewport) {
        const handleVisualViewportChange = () => {
          const viewport = window.visualViewport;
          if (!viewport) return;

          const keyboardHeight = window.innerHeight - viewport.height;
          setKeyboardHeight(keyboardHeight > 0 ? keyboardHeight : 0);
        };

        window.visualViewport.addEventListener(
          'resize',
          handleVisualViewportChange
        );

        return () => {
          if (window.visualViewport) {
            window.visualViewport.removeEventListener(
              'resize',
              handleVisualViewportChange
            );
          }
        };
      } else {
        // Visual Viewport API를 지원하지 않는 브라우저에서는 window resize 이벤트 사용
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    }, []);

    const bottomPosition =
      keyboardHeight > 0 ? keyboardHeight - 24 : bottomOffset;

    return (
      <div
        className={cn(
          'fixed left-0 right-0 px-10 transition-all duration-300 ease-in-out',
          className
        )}
        style={{
          bottom: `${bottomPosition}px`,
          zIndex: zIndex,
        }}
      >
        <Button
          ref={ref}
          variant={variant}
          color={color}
          size={size}
          isFullWidth={isFullWidth}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          {...props}
        >
          {children}
        </Button>
      </div>
    );
  }
);

FloatingActionButton.displayName = 'FloatingActionButton';

export { FloatingActionButton };
export type { FloatingActionButtonProps };
