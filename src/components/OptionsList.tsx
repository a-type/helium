/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC, ReactNode, HTMLAttributes } from 'react';
import {
  useSelectableItem,
  useSpacing,
  useText,
  useSizing,
  useFocus,
} from '../primitives';
import { useAll, toString, useRefOrProvided } from '../util';
import { SelectionGroupProvider } from '../contexts/selection';
import { Box, BoxProps } from './Box';

export interface OptionsListItemProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
}

export type OptionsListProps<T> = HTMLAttributes<HTMLDivElement> &
  BoxProps & {
    options: T[];
    renderOption?: (option: T) => ReactNode;
    getOptionKey?: (option: T) => string;
    id?: string;
    onOptionSelected: (option: T) => void;
    selectedIndex: number;
  };

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
    [useSelectableItem, useSpacing, useText, useSizing],
  );

  return <div {...itemBehaviorProps}>{children}</div>;
};

export const defaultOptionsListRenderOption = toString;
export const defaultOptionsListGetOptionKey = toString;

export const OptionsList = <T extends any = any>({
  options,
  selectedIndex,
  onOptionSelected,
  renderOption = defaultOptionsListRenderOption,
  getOptionKey = defaultOptionsListGetOptionKey,
  id,
  ref: providedRef,
  ...rest
}: OptionsListProps<T>) => {
  const ref = useRefOrProvided<HTMLDivElement>(providedRef);
  const focusableProps = useFocus({ id, ref });
  const optionKeys = options.map(getOptionKey);
  const handleSelectionChanged = ({ index }: { index: number }) => {
    onOptionSelected(options[index]);
  };

  return (
    <SelectionGroupProvider
      axis="vertical"
      selectedIndex={selectedIndex}
      onSelectionChanged={handleSelectionChanged}
      groupId={id}
      ref={ref}
    >
      {({ props }) => (
        <Box
          direction="column"
          role="listbox"
          {...rest}
          {...focusableProps}
          {...props}
        >
          {options.map((option, index) => (
            <OptionsListItem
              key={optionKeys[index]}
              id={id + '_' + optionKeys[index]}
            >
              {renderOption(option)}
            </OptionsListItem>
          ))}
        </Box>
      )}
    </SelectionGroupProvider>
  );
};

export default OptionsList;
