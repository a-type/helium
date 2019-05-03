/**@jsx jsx */
import { forwardRef, useState, Fragment } from 'react';
import { usePopoverAnchor, usePressable } from '../primitives';
import { useAll } from '../util';
import { jsx } from '@emotion/core';
import { DockPanel } from './DockPanel';
import { Input } from './Input';
import { Portal } from 'react-portal';
import OptionsList from './OptionsList';

export type SelectProps<T> = {
  options: T[];
  onChange(value: T): void;
  value: T;
};

export const Select = forwardRef<HTMLInputElement, SelectProps<any>>(
  (props, ref) => {
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
              popoverOffset="0, 5"
              padding="0"
              anchorRef={extraInputProps.ref}
            >
              <OptionsList
                onOptionSelected={props.onChange}
                options={props.options || []}
                width="100%"
              />
            </DockPanel>
          </Portal>
        )}
      </Fragment>
    );
  },
);
