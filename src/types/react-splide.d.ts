import { HTMLAttributes } from 'react';

declare module '@splidejs/react-splide' {
  export interface SplideProps {
    options?: Record<string, unknown>;
    hasTrack?: boolean;
    tag?: keyof JSX.IntrinsicElements;
    extensions?: Record<string, unknown>;
    transition?: string;
    className?: string;
    'aria-label'?: string;
    [key: string]: unknown;
  }

  export const Splide: FC<SplideProps>;
  export const SplideSlide: FC<HTMLAttributes<HTMLDivElement>>;
  export const SplideTrack: FC<HTMLAttributes<HTMLDivElement>>;
}
