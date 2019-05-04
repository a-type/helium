/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC, ReactNode, HTMLAttributes } from 'react';
import {
  useSelectableItem,
  useSpacing,
  useText,
  useFocus,
  useSizing,
  useSelectableGroup,
} from '../primitives';
import { useAll, toString } from '../util';
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

export const OptionsListInner = <T extends any = any>({
  options,
  renderOption = defaultOptionsListRenderOption,
  getOptionKey = defaultOptionsListGetOptionKey,
  id,
  ref,
  ...rest
}: OptionsListProps<T>) => {
  const behaviorProps = useAll({ id, ref, ...rest }, [
    useFocus,
    useSelectableGroup,
  ]);
  const optionKeys = options.map(getOptionKey);

  return (
    <Box direction="column" role="listbox" {...rest} {...behaviorProps}>
      {options.map((option, index) => (
        <OptionsListItem
          key={optionKeys[index]}
          id={id + '_' + optionKeys[index]}
        >
          {renderOption(option)}
        </OptionsListItem>
      ))}
    </Box>
  );
};

export const OptionsList = <T extends any = any>(
  props: OptionsListProps<T>,
) => {
  const handleSelectionChanged = ({ index }: { index: number }) => {
    props.onOptionSelected(props.options[index]);
  };

  return (
    <SelectionGroupProvider
      axis="vertical"
      selectedIndex={props.selectedIndex}
      onSelectionChanged={handleSelectionChanged}
      groupId={props.id}
    >
      <OptionsListInner {...props} />
    </SelectionGroupProvider>
  );
};

export default OptionsList;
