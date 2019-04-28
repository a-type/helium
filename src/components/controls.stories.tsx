/** @jsx jsx */
import { FC } from 'react';
import { Button } from './controls';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css, jsx } from '@emotion/core';

storiesOf('Button', module)
  .add('normal', () => <Button onPress={action('onPress')}>Hello world</Button>)
  .add('primary', () => (
    <Button primary onPress={action('onPress')}>
      Hello primary
    </Button>
  ));
