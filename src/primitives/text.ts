import { createBehavior } from '../util';
import { Size, BrandTheme, BehaviorProps } from '../types';

export type TextSizeConfig = {
  textSize?: Size;
} & BehaviorProps;

export const useTextSize = createBehavior(
  ({ textSize = 'md' }: TextSizeConfig) => ({
    css: (theme: BrandTheme) => ({
      fontSize: theme.size.text[textSize],
    }),
  }),
);
