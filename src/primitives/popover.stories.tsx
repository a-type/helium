/** @jsx jsx */
import { storiesOf } from '@storybook/react';
import { usePopoverAnchor, usePopover, PopoverConfig } from './popover';
import { useDepth } from './positioning';
import { useState } from 'react';
import { jsx } from '@emotion/core';
import { useCompose } from '../util';

const Popped = (props: Partial<PopoverConfig>) => {
  const [show, setShow] = useState(false);
  const anchorProps = usePopoverAnchor({ onClick: () => setShow(!show) });
  const popoverProps = useCompose(
    {
      depth: 10,
      anchorRef: anchorProps.ref,
      css: {
        border: '1px solid black',
        padding: '8px',
        background: 'white',
      },
      ...props,
    },
    [usePopover, useDepth],
  );

  return (
    <div>
      <button {...anchorProps}>Toggle</button>
      {show && <div {...popoverProps}>Hello world</div>}
    </div>
  );
};

storiesOf('primitives/popover', module)
  .add('basic', () => (
    <div>
      <Popped />
      <div>Example text below popper element</div>
    </div>
  ))
  .add('positioned', () => (
    <div
      css={{ display: 'flex', height: '800px', '& > *': { margin: 'auto' } }}
    >
      <Popped placement="top" />
    </div>
  ));
