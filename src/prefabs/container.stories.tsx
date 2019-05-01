/** @jsx jsx */
import { FC, useState } from 'react';
import {
  useGrid,
  useBox,
  GridConfig,
  BoxConfig,
  useDockPanel,
} from './container';
import { storiesOf } from '@storybook/react';
import { jsx } from '@emotion/core';
import { usePopoverAnchor } from '../primitives';
import { Button } from '../components';

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

storiesOf('prefabs/useGrid', module).add('basic grid', () => (
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
    },
  });

  return <main {...boxProps} />;
};

storiesOf('prefabs/useBox', module).add('basic box', () => (
  <Box
    align="center"
    justify="end"
    padding={{ top: '30px', bottom: '20px', horizontal: '5px' }}
  >
    <div>Hello</div>
    <div>World</div>
  </Box>
));

const DockPanelExample = (props: any) => {
  const [show, setShow] = useState(false);

  const anchorProps = usePopoverAnchor({});
  const dockPanelProps = useDockPanel({ anchorRef: anchorProps.ref });

  console.log(dockPanelProps);

  return (
    <div>
      <Button {...anchorProps} onPress={() => setShow(!show)}>
        Toggle
      </Button>
      <div>
        There's some more content below the button to show the docking overlay.
      </div>
      {show && <div {...dockPanelProps}>This is a docked panel</div>}
    </div>
  );
};

storiesOf('prefabs/useDockPanel', module).add('simple example', () => (
  <DockPanelExample />
));
