/**@jsx jsx */
import { forwardRef, useState, Fragment } from 'react';
import { usePopoverAnchor, usePressable, useTheme } from '../primitives';
import { useCompose } from '../util';
import { jsx } from '@emotion/core';
import { DockPanel } from './DockPanel';
import { Input } from './Input';
import { Portal } from 'react-portal';

export const Select = forwardRef<HTMLInputElement, any>((props, ref) => {
  const [open, setOpen] = useState(false);

  const extraInputProps = useCompose(
    { ...props, ref, onPress: () => setOpen(true) },
    [usePopoverAnchor, usePressable],
  );

  return (
    <Fragment>
      <Input {...extraInputProps} />
      {open && (
        <Portal>
          <DockPanel popoverFullWidth anchorRef={extraInputProps.ref}>
            Options
          </DockPanel>
        </Portal>
      )}
    </Fragment>
  );
});
