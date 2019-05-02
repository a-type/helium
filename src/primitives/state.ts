import { createBehavior } from '../util';
import { useCallback, ChangeEvent } from 'react';
import { BehaviorProps } from '../types';

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
