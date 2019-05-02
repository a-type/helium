/**@jsx jsx */
import { forwardRef, useState, Fragment } from 'react';
import { usePopoverAnchor, usePressable } from '../primitives';
import { useAll } from '../util';
import { jsx } from '@emotion/core';
import { DockPanel } from './DockPanel';
import { Input } from './Input';
import { Portal } from 'react-portal';

export const Select = forwardRef<HTMLInputElement, any>((props, ref) => {
  const [open, setOpen] = useState(false);

  const extraInputProps = useAll(
    { ...props, ref, onPress: () => setOpen(true) },
    [usePopoverAnchor, usePressable],
  );

  return (
    <Fragment>
      <Input {...extraInputProps} />
      {open && (
        <Portal>
          <DockPanel
            popoverFullWidth
            padding={{ horizontal: 'lg', vertical: 'md' }}
            popoverOffset="0, 5"
            anchorRef={extraInputProps.ref}
          >
            Options
          </DockPanel>
        </Portal>
      )}
    </Fragment>
  );
});
