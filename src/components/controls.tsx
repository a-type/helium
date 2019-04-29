import React from 'react';
import { useButton, ButtonConfig, InputConfig, useInput } from '../behaviors';
import { FC } from 'react';

export const Button: FC<ButtonConfig> = props => (
  <button {...useButton(props)} />
);

export const Input: FC<InputConfig> = props => <input {...useInput(props)} />;
