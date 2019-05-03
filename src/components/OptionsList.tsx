/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC, ReactNode, HTMLAttributes } from 'react';
import {
  useKeyboardNavigable,
  usePressable,
  useSpacing,
  useText,
  useFocus,
  useSizing,
} from '../primitives';
import { useAll, toString } from '../util';
import { KeyboardGroupProvider } from '../contexts/keyboard';
import { Box, BoxProps } from './Box';

export interface OptionsListItemProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  onPress: () => void;
}

export type OptionsListProps<T> = HTMLAttributes<HTMLDivElement> &
  BoxProps & {
    options: T[];
    renderOption?: (option: T) => ReactNode;
    getOptionKey?: (option: T) => string;
    id?: string;
    onOptionSelected: (option: T) => void;
    selectedOption?: T;
    selectedIndex?: number;
  };

export const defaultOptionsListRenderOption = toString;
export const defaultOptionsListGetOptionKey = toString;

export const OptionsListItem: FC<OptionsListItemProps> = ({
  children,
  id,
  ...rest
}) => {
  const itemBehaviorProps = useAll(
    {
      id,
      padding: { vertical: 'md', horizontal: 'lg' },
      textSize: 'md',
      width: '100%',
      ...rest,
    },
    [
      useKeyboardNavigable,
      usePressable,
      useSpacing,
      useText,
      useFocus,
      useSizing,
    ],
  );

  return <div {...itemBehaviorProps}>{children}</div>;
};

export const OptionsList = <T extends any = any>({
  options,
  renderOption = defaultOptionsListRenderOption,
  getOptionKey = defaultOptionsListGetOptionKey,
  id,
  onOptionSelected,
  selectedOption,
  selectedIndex: providedSelectedIndex,
  ...rest
}: OptionsListProps<T>) => {
  const focusProps = useFocus({ id, ref: rest.ref });

  const selectedIndex =
    providedSelectedIndex ||
    (selectedOption ? options.indexOf(selectedOption) : -1);
  const optionKeys = options.map(getOptionKey);
  const selectedId = optionKeys[selectedIndex] || null;

  return (
    <KeyboardGroupProvider axis="vertical" groupId={id}>
      <Box
        direction="column"
        aria-activedescendant={selectedId}
        role="listbox"
        {...rest}
        {...focusProps}
      >
        {options.map((option, index) => (
          <OptionsListItem
            key={optionKeys[index]}
            id={id + '_' + optionKeys[index]}
            onPress={() => onOptionSelected(option)}
            aria-selected={index === selectedIndex}
          >
            {renderOption(option)}
          </OptionsListItem>
        ))}
      </Box>
    </KeyboardGroupProvider>
  );
};

export default OptionsList;
