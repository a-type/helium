/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ReactNode, HTMLAttributes, forwardRef, Ref } from 'react';
import {
  useSelectableItem,
  useSpacing,
  useText,
  useSizing,
  useFocus,
  SpacingConfig,
  SelectableItemConfig,
  SizingConfig,
  TextConfig,
  FocusConfig,
} from '../primitives';
import { useAll, toString, useRefOrProvided, useIdOrGenerated } from '../util';
import { SelectionGroupProvider, SelectionMethod } from '../contexts/selection';
import { List, ListProps, ListItem } from './List';

export type OptionsListItemProps = SpacingConfig &
  SelectableItemConfig &
  TextConfig &
  SizingConfig & {
    id: string;
    isSelected: boolean;
  };

export type OptionsListProps<T> = FocusConfig<HTMLUListElement> &
  ListProps & {
    options: T[];
    optionToString?: (option: T) => string;
    renderOption?: (props: OptionsListItemProps & { key: string }) => ReactNode;
    getOptionKey?: (option: T) => string;
    id?: string;
    onOptionSelected: (option: T, method: SelectionMethod) => void;
    selectedIndex: number;
  };

export const OptionsListItem = forwardRef(
  (
    { children, id, ...rest }: OptionsListItemProps,
    ref: Ref<HTMLLIElement>,
  ) => {
    const itemBehaviorProps = useAll(
      {
        id,
        padding: { vertical: 'md', horizontal: 'lg' },
        textSize: 'md',
        width: '100%',
        ...rest,
        ref,
      },
      [useSelectableItem, useSpacing, useText, useSizing],
    );

    return <ListItem {...itemBehaviorProps}>{children}</ListItem>;
  },
);

export const defaultOptionsListOptionToString = toString;
export const defaultOptionsListRenderOption = (props: OptionsListItemProps) => (
  <OptionsListItem {...props} />
);
export const defaultOptionsListGetOptionKey = toString;

export const OptionsList = forwardRef(
  <T extends any = any>(
    {
      options,
      selectedIndex,
      onOptionSelected,
      optionToString = defaultOptionsListOptionToString,
      renderOption = defaultOptionsListRenderOption,
      getOptionKey = defaultOptionsListGetOptionKey,
      id: providedId,
      ...rest
    }: OptionsListProps<T>,
    providedRef?: Ref<HTMLUListElement>,
  ) => {
    const ref = useRefOrProvided<HTMLUListElement>(providedRef);
    const id = useIdOrGenerated(providedId, 'optionsList');
    const focusableProps = useFocus({ id, ref, ...rest });
    const optionKeys = options.map(getOptionKey);
    const handleSelectionChanged = (
      { index }: { index: number },
      method: SelectionMethod,
    ) => {
      onOptionSelected(options[index], method);
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
          <List
            displayType="plain"
            role="listbox"
            {...rest}
            {...focusableProps}
            {...props}
          >
            {options.map((option, index) => {
              return renderOption({
                key: optionKeys[index],
                id: id + '_' + optionKeys[index],
                children: optionToString(option),
                isSelected: selectedIndex === index,
              });
            })}
          </List>
        )}
      </SelectionGroupProvider>
    );
  },
);

export default OptionsList;
