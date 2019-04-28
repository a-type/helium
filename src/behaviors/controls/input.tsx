import { useCallback, ChangeEvent, useState } from 'react';
import { usePressable } from '../basic/interaction';
import { combine } from '../util';
import { useFocus } from '../basic/focus';
import { BehaviorProps } from '../../types';

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

export type InputConfig = {
  value: string;
  onChange?: (value: string) => void;
  type: InputType;
  id: string;
  tabbable?: boolean;
};

export const useInput = (
  { value, onChange, type, id, tabbable }: InputConfig,
  extraProps?: BehaviorProps,
) => {
  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const newTextValue = ev.target.value;
      onChange && onChange(newTextValue);
    },
    [onChange],
  );

  const focusProps = useFocus({
    id,
    tabbable,
  });

  const inputProps = {
    onChange: handleChange,
    value,
    type,
    id,
  };

  return combine(inputProps, focusProps, extraProps);
};

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
