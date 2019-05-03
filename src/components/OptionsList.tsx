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
  ...rest
}: OptionsListProps<T>) => {
  return (
    <KeyboardGroupProvider axis="vertical" groupId={id}>
      <Box direction="column" {...rest}>
        {options.map(option => (
          <OptionsListItem
            key={getOptionKey(option)}
            onPress={() => onOptionSelected(option)}
          >
            {renderOption(option)}
          </OptionsListItem>
        ))}
      </Box>
    </KeyboardGroupProvider>
  );
};

export default OptionsList;
