import { BehaviorProps, BrandThemeOverrides } from '../types';
import defaults from 'lodash.defaultsdeep';
import { createBehavior } from '../util';
import { useContext } from 'react';
import { ThemeContext } from '../contexts';

export type ThemeConfig = {
  overrides?: BrandThemeOverrides;
} & BehaviorProps;

export const useTheme = createBehavior(({ overrides }: ThemeConfig) => {
  const theme = useContext(ThemeContext);
  return defaults(overrides, theme);
});
