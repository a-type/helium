import React, { forwardRef } from 'react';
import { useButton, ButtonConfig, InputConfig, useInput } from '../prefabs';
import { FC } from 'react';

export const Button: FC<ButtonConfig> = forwardRef((props, ref) => (
  <button {...useButton({ ...props, ref })} />
));

export const Input: FC<InputConfig> = forwardRef((props, ref) => (
  <input {...useInput({ ...props, ref } as any)} />
));
