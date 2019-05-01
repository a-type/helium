import React, { forwardRef } from 'react';
import { useButton, ButtonConfig, useInput, InputConfig } from '../prefabs';

export const Button = forwardRef<any, ButtonConfig>((props, ref) => (
  <button {...useButton({ ...props, ref })} />
));

export const Input = forwardRef<HTMLInputElement, InputConfig>((props, ref) => (
  <input {...useInput({ ...props, ref } as any)} />
));
