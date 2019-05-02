import { createBehavior } from '../util';
import { useCallback, ChangeEvent } from 'react';
import { BehaviorProps } from '../types';
import { useA11yPressHandlers } from './interaction';

export type ValueConfig = {
  value: string;
  onChange: (newValue: string) => void;
} & BehaviorProps;

export const useValue = createBehavior(({ value, onChange }: ValueConfig) => {
  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const newTextValue = ev.target.value;
      onChange && onChange(newTextValue);
    },
    [onChange],
  );

  return {
    value,
    onChange: handleChange,
  };
});

export type ToggleableConfig = {
  toggled: boolean;
  value?: string;
  onChange: (toggleState: boolean, value: string | undefined) => void;
} & BehaviorProps;

export const useToggleable = createBehavior<ToggleableConfig>(
  ({ toggled, value, onChange }) => {
    const onPress = () => {
      onChange && onChange(!toggled, value);
    };
    const handlers = useA11yPressHandlers(onPress);

    return {
      value,
      checked: toggled,
      ...handlers,
    };
  },
);
