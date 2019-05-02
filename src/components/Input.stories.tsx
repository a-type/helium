/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { Input } from './Input';

storiesOf('Input', module).add('normal', () => <Input value="Hello world" />);
