/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef, Ref, useCallback } from 'react';
import { useAll, useRefOrProvided } from '../util';
import {
  useFocus,
  FocusConfig,
  useText,
  useSpacing,
  TextConfig,
  SpacingConfig,
  usePressable,
  PressableConfig,
} from '../primitives';
import { BrandTheme } from '../types';

export type CheckboxProps = FocusConfig<HTMLDivElement> &
  TextConfig &
  SpacingConfig &
  PressableConfig & {
    value: string;
    checked: boolean;
    onChange(checked: boolean, value: string): void;
  };

export const Checkbox = forwardRef(
  (
    { onPress, checked, onChange, value, ...props }: CheckboxProps,
    providedRef: Ref<HTMLDivElement>,
  ) => {
    const ref = useRefOrProvided(providedRef);
    const handlePress = useCallback(() => {
      onPress && onPress();
      onChange && onChange(!checked, value);
    }, [onPress, checked, onChange, value]);
    const behaviorProps = useAll({ ...props, ref, onPress: handlePress }, [
      useFocus,
      useText,
      useSpacing,
      usePressable,
    ]);

    return <div role="checkbox" aria-checked={checked} {...behaviorProps} />;
  },
);

Checkbox.defaultProps = {
  focusCss: {
    '&:focus': {
      outline: 'none',
    },
  },
  css: (theme: BrandTheme) => ({
    position: 'relative',

    '&:before': {
      content: '""',
      display: 'inline-block',
      height: '16px',
      width: '16px',
      borderWidth: theme.size.borderWidth.normal,
      borderStyle: 'solid',
      borderColor: theme.color.control.border,
      transition: '0.2s ease background, 0.2s ease box-shadow',
    },
    '&:focus:before': {
      boxShadow: `0 0 0 3px ${theme.color.control.effectStrong}`,
    },
    '&[aria-checked="true"]:before': {
      background: theme.color.control.border,
    },
    '&:after': {
      content: '""',
      display: 'inline-block',
      position: 'absolute',
      top: '2px',
      left: '1px',
      height: '6px',
      width: '16px',
      borderLeftWidth: theme.size.borderWidth.thick,
      borderBottomWidth: theme.size.borderWidth.thick,
      borderLeftStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftColor: 'white', // FIXME
      borderBottomColor: 'white', // FIXME
      transform: 'rotate(-45deg)',
      opacity: '0',
      transition: '0.2s ease opacity',
    },
    '&[aria-checked="true"]:after': {
      opacity: '1',
    },
  }),
};
