import React, { FC } from 'react';
import { configure, addDecorator } from '@storybook/react';
import { useTheme } from '../src/behaviors/theme';
import { BrandTheme } from '../src/types';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.tsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const brand = {};

const BrandProvider: FC<{ theme: any }> = props => <div {...useTheme(props)} />;

addDecorator(story => <BrandProvider theme={brand}>{story()}</BrandProvider>);

configure(loadStories, module);
