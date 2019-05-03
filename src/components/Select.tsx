/**@jsx jsx */
import { forwardRef, useState, Fragment } from 'react';
import { usePopoverAnchor, usePressable } from '../primitives';
import { useAll, useIdOrGenerated } from '../util';
import { jsx } from '@emotion/core';
import { DockPanel } from './DockPanel';
import { Input } from './Input';
import { Portal } from 'react-portal';
import OptionsList from './OptionsList';
import { useFocusElement } from '../contexts';

export type SelectProps<T> = {
  options: T[];
  onChange(value: T): void;
  value: T;
  id?: string;
};

export const Select = forwardRef<HTMLInputElement, SelectProps<any>>(
  ({ id: providedId, ...props }, ref) => {
    const id = useIdOrGenerated(providedId, 'select');
    const optionsId = id + '_options';
    const [open, setOpen] = useState(false);

    const focusElement = useFocusElement();

    const handleOpen = () => {
      setOpen(true);
      // imperatively focus the options list
      focusElement(optionsId);
    };

    const extraInputProps = useAll({ ...props, ref, onPress: handleOpen, id }, [
      usePopoverAnchor,
      usePressable,
    ]);

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
                id={optionsId}
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
