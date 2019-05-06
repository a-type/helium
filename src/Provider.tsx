import React, { FC } from 'react';
import * as Contexts from './contexts';
import { BrandTheme } from './types';

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
    selection: {
      bg: '#00000040',
      fg: 'black',
      border: '0',
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
  shadow: {
    level: {
      [1]: '0 2px 4px 0 #00000040',
      [2]: '0 4px 12px 0 #00000040',
      [3]: '0 6px 20px 0 #00000040',
      [4]: '0 8px 32px 0 #00000040',
    },
  },
};

export type ProviderProps = {
  theme?: BrandTheme;
};

export const Provider: FC<ProviderProps> = ({
  theme = defaultBrandTheme,
  children,
}) => (
  <Contexts.ThemeProvider theme={theme}>
    <Contexts.FocusProvider>{() => children}</Contexts.FocusProvider>
  </Contexts.ThemeProvider>
);
