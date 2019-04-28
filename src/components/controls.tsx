import React from 'react';
import { useButton, ButtonConfig, useInput, InputConfig } from '../behaviors';
import { FC } from 'react';
import { BrandTheme } from '../types';

const buttonCss = {
  background: 'var(--color-control-bg)',
  color: 'var(--color-control-fg)',
  borderColor: 'var(--color-control-border)',
  borderWidth: 'var(--border-width-normal)',
  borderStyle: 'solid',
  paddingTop: 'var(--size-spacing-md)',
  paddingBottom: 'var(--size-spacing-md)',
  paddingLeft: 'var(--size-spacing-lg)',
  paddingRight: 'var(--size-spacing-lg)',
  cursor: 'pointer',
};

const primaryButtonCss = [
  buttonCss,
  {
    background: 'var(--color-control-primary-bg)',
    color: 'var(--color-control-primary-fg)',
    borderColor: 'var(--color-control-primary-border)',
  },
];

export const Button: FC<ButtonConfig> = props => (
  <button
    {...useButton({
      ...props,
      css: props.primary ? primaryButtonCss : buttonCss,
    })}
  />
);
