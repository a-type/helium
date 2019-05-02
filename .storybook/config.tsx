import React, { FC } from 'react';
import { configure, addDecorator } from '@storybook/react';
import { Provider } from '../src';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.tsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => <Provider>{story()}</Provider>);

configure(loadStories, module);
