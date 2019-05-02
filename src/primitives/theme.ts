import { ExtraProps, BrandThemeOverrides } from '../types';
import defaults from 'lodash.defaultsdeep';
import { createBehavior } from '../util';
import { useContext } from 'react';
import { ThemeContext } from '../contexts';

const convertBrandToVariables = (
  brand: { [key: string]: any },
  prefix: string = '-',
): { [name: string]: string } => {
  return Object.keys(brand).reduce<{ [name: string]: string }>((vars, key) => {
    const value = brand[key];
    const prefixedKey = `${prefix}-${key}`;
    if (typeof value === 'object') {
      return { ...vars, ...convertBrandToVariables(value, prefixedKey) };
    }

    return { ...vars, [prefixedKey]: value };
  }, {});
};

export type ThemeConfig = {
  theme: BrandThemeOverrides;
} & ExtraProps;

export const useTheme = createBehavior(({ theme }: ThemeConfig) => {
  const providedTheme = useContext(ThemeContext);
  return {
    css: convertBrandToVariables(defaults(theme, providedTheme)),
  };
});
