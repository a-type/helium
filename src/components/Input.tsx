/**@jsx jsx */
import {
  ValueConfig,
  FocusConfig,
  TextSizeConfig,
  useFocus,
  useValue,
  useTextSize,
} from '../primitives';
import { forwardRef } from 'react';
import { useCompose } from '../util';
import { jsx } from '@emotion/core';

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
  };

export const Input = forwardRef<HTMLInputElement, InputConfig>((props, ref) => {
  const inputProps = useCompose<any>(
    {
      ...props,
      type: props.type || 'text',
      css: inputCss,
      ref,
    },
    [useFocus, useValue, useTextSize],
  );

  return <input {...inputProps} />;
});
