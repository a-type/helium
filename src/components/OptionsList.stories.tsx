/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { OptionsList } from './OptionsList';
import { Box } from './Box';
import { action } from '@storybook/addon-actions';

const options = ['Bob', 'Linda', 'Tina', 'Gene', 'Louise'];

storiesOf('OptionsList', module).add('normal', () => (
  <Box width="300px" border margin="8px">
    <OptionsList
      options={options}
      onOptionSelected={action('onOptionSelected')}
    />
  </Box>
));
