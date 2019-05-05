/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { Modal } from './Modal';
import { action } from '@storybook/addon-actions';

storiesOf('Modal', module).add('basic', () => (
  <Modal onEscape={action('onEscape')}>Hello world</Modal>
));
