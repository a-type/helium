import { BehaviorProps, BrandTheme } from '../types';
import { createBehavior } from '../util';
import pathOr from '@ramda/pathor';

export type ContentColorsConfig = {
  border?: boolean;
  background?: string;
  color?: string;
} & BehaviorProps;

export const useContentColors = createBehavior<ContentColorsConfig>(
  ({
    border,
    background = 'content.bg',
    color = 'content.fg',
  }: ContentColorsConfig) => ({
    css: (theme: BrandTheme) => ({
      background: pathOr(background, background.split('.'), theme.color),
      color: pathOr(color, color.split('.'), theme.color),
      border: border
        ? `${theme.size.borderWidth.thin} solid ${theme.color.content.border}`
        : '0',
    }),
  }),
);
