import React, { FC } from 'react';
import { configure, addDecorator } from '@storybook/react';
import { useTheme } from '../src/behaviors/theme';
import { BrandTheme } from '../src/types';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.tsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const brand: BrandTheme = {
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
      bg: 'white',
      fg: 'black',
      border: 'black',
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

const BrandProvider: FC<{ theme: BrandTheme }> = props => (
  <div {...useTheme(props)} />
);

addDecorator(story => <BrandProvider theme={brand}>{story()}</BrandProvider>);

configure(loadStories, module);
