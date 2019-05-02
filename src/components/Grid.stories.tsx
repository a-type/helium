/** @jsx jsx */
import { Grid } from './Grid';
import { Box } from './Box';
import { storiesOf } from '@storybook/react';
import { jsx } from '@emotion/core';

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
