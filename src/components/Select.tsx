/**@jsx jsx */
import { forwardRef, useState, Fragment } from 'react';
import {
  usePopoverAnchor,
  usePressable,
  PopoverAnchorConfig,
  PressableConfig,
} from '../primitives';
import { useAll, useIdOrGenerated } from '../util';
import { jsx } from '@emotion/core';
import { DockPanel } from './DockPanel';
import { Input } from './Input';
import { Portal } from 'react-portal';
import OptionsList from './OptionsList';
import { useImperativeFocus } from '../contexts';
import { KeyCode } from '../types';

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

    const imperativelyFocus = useImperativeFocus();

    const showOptions = () => setOpen(true);

    const handleOpen = () => {
      imperativelyFocus(optionsId);
    };

    const handleClose = () => {
      setOpen(false);
      imperativelyFocus(id);
    };

    const extraInputProps = useAll<PopoverAnchorConfig & PressableConfig>(
      {
        ...props,
        ref,
        onPress: showOptions,
        id,
        pressOnEnter: true,
      },
      [usePopoverAnchor, usePressable],
    );

    const options = props.options || [];

    return (
      <Fragment>
        <Input {...props} {...extraInputProps} />
        {open && (
          <Portal>
            <DockPanel
              popoverFullWidth
              popoverOffset="0, 5"
              padding="0"
              anchorRef={extraInputProps.ref}
              onEscape={handleClose}
              escapeKeys={[KeyCode.Escape, KeyCode.Enter]}
              onOpen={handleOpen}
            >
              <OptionsList
                id={optionsId}
                onOptionSelected={props.onChange}
                options={options}
                width="100%"
                selectedIndex={options.indexOf(props.value)}
              />
            </DockPanel>
          </Portal>
        )}
      </Fragment>
    );
  },
);
