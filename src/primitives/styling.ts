import { BehaviorProps, BrandTheme } from '../types';
import { createBehavior } from '../util';

export type ContentAreaConfig = {
  border?: boolean;
} & BehaviorProps;

export const useContentArea = createBehavior<ContentAreaConfig>(
  ({ border }: ContentAreaConfig) => ({
    css: (theme: BrandTheme) => ({
      background: theme.color.content.bg,
      color: theme.color.content.fg,
      border: border
        ? `${theme.size.borderWidth.thin} solid ${theme.color.content.border}`
        : '0',
    }),
  }),
);
