import { BrandTheme, ExtraProps, BrandThemeOverrides } from '../types';
import defaults from 'lodash.defaultsdeep';
import { createBehavior } from '../util';

const defaultBrandTheme: BrandTheme = {
  color: {
    control: {
      bg: 'transparent',
      fg: 'black',
      border: 'black',
      effectStrong: '#00000080',
      effectWeak: '#00000020',
      primary: {
        bg: 'black',
        fg: 'white',
        border: 'black',
        effectStrong: '#00000080',
        effectWeak: '#00000020',
      },
      minimal: {
        bg: 'transparent',
        fg: 'black',
        border: 'transparent',
        effectStrong: '#00000080',
        effectWeak: '#00000020',
      },
    },
    content: {
      fg: 'black',
      bg: 'white',
      border: 'black',
    },
    field: {
      bg: '#eaeaea',
      fg: 'black',
      border: '#eaeaea',
      effectStrong: '#00000080',
      effectWeak: '#00000020',
    },
  },
  font: {
    family: {
      content: 'Arial',
      heading: 'Arial',
      control: 'Arial',
    },
    weight: {
      light: '200',
      normal: '400',
      heavy: '800',
    },
  },
  size: {
    spacing: {
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '16px',
      xl: '32px',
    },
    text: {
      xs: '10px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '32px',
    },
    borderWidth: {
      thin: '1px',
      normal: '2px',
      thick: '4px',
    },
    borderRadius: {
      xs: '0',
      sm: '2px',
      md: '4px',
      lg: '8px',
      xl: '16px',
    },
  },
};

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

export const useTheme = createBehavior(({ theme }: ThemeConfig) => ({
  css: convertBrandToVariables(defaults(theme, defaultBrandTheme)),
}));
