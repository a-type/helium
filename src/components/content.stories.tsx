/** @jsx jsx */
import { Box, Grid } from './content';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
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

storiesOf('Grid', module).add('basic', () => (
  <Grid
    width="200px"
    height="200px"
    areas={['first', 'second']}
    columns={['1fr', '2fr']}
  >
    <Box width="100%" height="100%" css={{ background: 'blue' }} />
    <Box width="100%" height="100%" css={{ background: 'red' }} />
  </Grid>
));
