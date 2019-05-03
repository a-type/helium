import { createBehavior } from '../util';
import { Size, BrandTheme, BehaviorProps } from '../types';

export type TextConfig = {
  textSize?: Size;
  fontGroup?: 'content' | 'control' | 'heading';
} & BehaviorProps;

export const useText = createBehavior(
  ({ textSize = 'md', fontGroup = 'content' }: TextConfig) => ({
    css: (theme: BrandTheme) => ({
      fontSize: theme.size.text[textSize],
      fontFamily: theme.font.family[fontGroup],
    }),
  }),
);
