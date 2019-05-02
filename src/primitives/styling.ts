import { ExtraProps } from '../types';
import { createBehavior } from '../util';
import { useTheme } from './theme';

export type ContentAreaConfig = {
  border?: boolean;
} & ExtraProps;

export const useContentArea = createBehavior<ContentAreaConfig>(
  ({ border }: ContentAreaConfig) => ({
    css: {
      background: 'var(--color-content-bg)',
      color: 'var(--color-content-fg)',
      border: border
        ? `var(--size-border-width-thin) solid var(--color-content-border)`
        : '0',
    },
  }),
);

export type PrimaryColorsConfig = {} & ExtraProps;

export const usePrimaryColors = createBehavior<PrimaryColorsConfig>(() =>
  useTheme({
    theme: {
      color: {
        control: {
          bg: 'var(--color-control-primary-bg)',
          fg: 'var(--color-control-primary-fg)',
          border: 'var(--color-control-primary-border)',
          effectStrong: 'var(--color-control-primary-effect-strong)',
          effectWeak: 'var(--color-control-primary-effect-weak)',
        },
      },
    },
  }),
);
