import React, { FC } from 'react';
import { useButton, ButtonConfig } from '../../../src/index';
import { css, jsx } from '@emotion/core';

const buttonCss = css({
  background: 'black',
  padding: '16px',
  border: 0,
  borderRadius: '8px',
  color: 'white',
});

const focusCss = css({
  '&:focus': {
    outline: 0,
    boxShadow: '0 0 0 3px #00000080',
  },
});

export const Button: FC<ButtonConfig> = props => (
  <button {...useButton({ ...props, css: [buttonCss, focusCss] })} />
);
