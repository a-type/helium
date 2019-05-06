/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { Heading } from './Heading';

storiesOf('Heading', module).add('levels', () => (
  <div>
    <Heading level={1}>Heading Level 1</Heading>
    <Heading level={2}>Heading Level 2</Heading>
    <Heading level={3}>Heading Level 3</Heading>
    <Heading level={4}>Heading Level 4</Heading>
    <Heading level={5}>Heading Level 5</Heading>
  </div>
));
