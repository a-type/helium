/** @jsx jsx */
import { Select } from './Select';
import { storiesOf } from '@storybook/react';
import { jsx } from '@emotion/core';

storiesOf('Select', module).add('basic', () => <Select />);
