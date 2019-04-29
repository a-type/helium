import { ExtraProps } from '../../types';
import { createBehavior } from '../util';
import { useTheme } from '../brand';

export type ContentColorsConfig = {
  backgroundColor?: string;
  foregroundColor?: string;
} & ExtraProps;

export const useContentColors = createBehavior<ContentColorsConfig>(
  ({ backgroundColor, foregroundColor }: ContentColorsConfig) => ({
    css: {
      background: backgroundColor,
      color: foregroundColor,
    },
  }),
);

export type PrimaryColorsConfig = {} & ExtraProps;

export const usePrimaryColors = createBehavior<PrimaryColorsConfig>(props =>
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
