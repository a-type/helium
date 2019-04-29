import { useCallback } from 'react';
import { combine, useCompose } from '../util';
import { useFocus, FocusConfig } from '../primitives';
import { BehaviorProps } from '../types';
import { createBehavior } from '../util';
import {
  usePressable,
  useValue,
  ValueConfig,
  useTextSize,
  TextSizeConfig,
} from '../behaviors';

const inputCss = {
  background: 'var(--color-field-bg)',
  color: 'var(--color-field-fg)',
  borderColor: 'var(--color-field-border)',
  borderWidth: 'var(--border-width-normal)',
  borderStyle: 'solid',
  paddingTop: 'var(--size-spacing-md)',
  paddingBottom: 'var(--size-spacing-md)',
  paddingLeft: 'var(--size-spacing-lg)',
  paddingRight: 'var(--size-spacing-lg)',
};

export type InputType =
  | 'text'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'number'
  | 'month'
  | 'password'
  | 'search'
  | 'tel'
  | 'time'
  | 'url'
  | 'week'
  | 'checkbox'
  | 'range'
  | 'button'
  | 'submit'
  | 'reset';

export type InputConfig = ValueConfig &
  FocusConfig &
  TextSizeConfig & {
    type?: InputType;
  } & BehaviorProps;

export const useInput = createBehavior<InputConfig>((props: InputConfig) =>
  useCompose(
    {
      ...props,
      type: props.type || 'text',
      css: inputCss,
    },
    [useFocus, useValue, useTextSize],
  ),
);

// FIXME: needs a better pattern
export type ToggleInputConfig = {
  toggled: boolean;
  value: string;
  onChange?: (toggled: boolean, value: string) => void;
  id: string;
  tabbable?: boolean;
};

export const useToggleInput = (
  { toggled, value, onChange, id, tabbable }: ToggleInputConfig,
  extraProps?: BehaviorProps,
) => {
  const handlePress = useCallback(() => {
    onChange && onChange(!toggled, value);
  }, [onChange, value, toggled]);

  const pressableProps = usePressable({
    onPress: handlePress,
    id,
    tabbable,
  });

  return combine(
    {
      onChange: handlePress,
      role: 'checkbox',
      type: 'checkbox',
      checked: toggled,
    },
    pressableProps,
    extraProps,
  );
};
