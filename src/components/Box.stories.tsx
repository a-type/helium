/** @jsx jsx */
import { Box } from './Box';
import { storiesOf } from '@storybook/react';
import { jsx } from '@emotion/core';

storiesOf('Box', module)
  .add('column', () => (
    <Box height="200px" width="200px">
      <Box width="100%" css={{ background: 'blue', flex: '1' }} />
      <Box width="100%" css={{ background: 'red', flex: '2' }} />
    </Box>
  ))
  .add('row', () => (
    <Box direction="row" height="200px" width="200px">
      <Box height="100%" css={{ background: 'blue', flex: '1' }} />
      <Box height="100%" css={{ background: 'red', flex: '2' }} />
    </Box>
  ));
