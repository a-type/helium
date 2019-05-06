/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef, Ref } from 'react';
import { useAll, useIdOrGenerated } from '../util';
import { useSelectableItem, useSpacing, useText } from '../primitives';
import OptionsList, {
  OptionsListItemProps,
  OptionsListProps,
} from './OptionsList';
import { BrandTheme } from '../types';

export const RadioOption = forwardRef<HTMLLIElement, OptionsListItemProps>(
  (props, ref) => {
    const behaviorProps = useAll(
      {
        ...props,
        ref,
      },
      [useSelectableItem, useSpacing, useText],
    );

    return <li {...behaviorProps} />;
  },
);

RadioOption.defaultProps = {
  padding: {
    vertical: 'sm',
  },
  selectableCss: (theme: BrandTheme) => ({
    '&:before': {
      content: '""',
      display: 'inline-block',
      width: '20px',
      height: '20px',
      borderRadius: '100%',
      borderWidth: '1px',
      borderColor: theme.color.control.border,
      borderStyle: 'solid',
      background: theme.color.content.bg,
      marginRight: '1em',
    },
    '&[aria-selected="true"]:before': {
      background: theme.color.control.border,
    },
  }),
};

export type RadioProps<T extends any> = Exclude<
  OptionsListProps<T>,
  'onOptionSelected' | 'isSelected'
> & {
  id?: string;
  value: T;
  onChange(value: T): void;
};

export const Radio = forwardRef(
  <T extends any = any>(
    { id: providedId, onChange, value, ...props }: RadioProps<T>,
    ref: Ref<HTMLUListElement>,
  ) => {
    const id = useIdOrGenerated(providedId, 'radio');
    return (
      <OptionsList
        renderOption={(props: OptionsListItemProps) => (
          <RadioOption {...props} />
        )}
        selectedIndex={props.options.indexOf(value)}
        onOptionSelected={(value: T) => onChange(value)}
        id={id}
        {...props}
        ref={ref}
      />
    );
  },
);
