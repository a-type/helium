/** @jsx jsx */
import { DockPanel } from './DockPanel';
import { storiesOf } from '@storybook/react';
import { jsx } from '@emotion/core';
import { useRef, Fragment, useState } from 'react';
import { Button } from './Button';

const DockPanelExample = (props: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState();

  return (
    <Fragment>
      <Button ref={ref} onPress={() => setOpen(!open)}>
        Toggle
      </Button>
      {open && (
        <DockPanel {...props} anchorRef={ref}>
          Hello DockPanel!
        </DockPanel>
      )}
    </Fragment>
  );
};

storiesOf('DockPanel', module).add('simple', () => <DockPanelExample />);
