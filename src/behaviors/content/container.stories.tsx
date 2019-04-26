/** @jsx jsx */
import { FC } from 'react';
import { useGrid, useBox, GridConfig, BoxConfig } from './container';
import { storiesOf } from '@storybook/react';
import { jsx } from '@emotion/core';

const Grid: FC<GridConfig> = props => {
  const gridProps = useGrid({
    ...props,
    css: {
      width: '100%',
      height: '300px',
    },
  });

  return <div {...gridProps} />;
};

storiesOf('useGrid', module).add('basic grid', () => (
  <Grid
    areas={[['a', 'b'], ['c', 'd']]}
    rows={['30px', '1fr']}
    columns={['2fr', '3fr']}
    gap={['10px', '5px']}
    margin="10px"
  >
    <div css={{ background: 'blue' }} />
    <div css={{ background: 'green' }} />
    <div css={{ background: 'yellow' }} />
    <div css={{ background: 'red' }} />
  </Grid>
));

const Box: FC<BoxConfig> = props => {
  const boxProps = useBox({
    ...props,
    css: {
      width: '100%',
      height: '300px',
      background: 'lightgray',
    },
  });

  return <main {...boxProps} />;
};

storiesOf('useBox', module).add('basic box', () => (
  <Box
    align="center"
    justify="end"
    padding={{ top: '30px', bottom: '20px', horizontal: '5px' }}
  >
    <div>Hello</div>
    <div>World</div>
  </Box>
));
