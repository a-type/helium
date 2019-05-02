/**@jsx jsx */
import {
  ValueConfig,
  FocusConfig,
  TextSizeConfig,
  useFocus,
  useValue,
  useTextSize,
  useSpacing,
  SpacingConfig,
} from '../primitives';
import { forwardRef } from 'react';
import { useAll } from '../util';
import { jsx } from '@emotion/core';
import { BrandTheme } from '../types';

const inputCss = (theme: BrandTheme) => ({
  background: theme.color.field.bg,
  color: theme.color.field.fg,
  borderColor: theme.color.field.border,
  borderWidth: theme.size.borderWidth.normal,
  borderStyle: 'solid',
});

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
  TextSizeConfig &
  SpacingConfig & {
    type?: InputType;
  };

export const Input = forwardRef<HTMLInputElement, InputConfig>((props, ref) => {
  const inputProps = useAll<InputConfig>(
    {
      ...props,
      type: props.type || 'text',
      css: inputCss,
      padding: {
        vertical: 'md',
        horizontal: 'lg',
      },
      ref,
    },
    [useFocus, useValue, useTextSize, useSpacing],
  );

  return <input {...inputProps} />;
});
