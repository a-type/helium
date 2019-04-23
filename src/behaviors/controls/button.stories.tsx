/** @jsx jsx */
import React, { FC } from 'react';
import { useButton, useToggleButton } from './button';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
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

const Button: FC<{}> = ({ children }) => {
  const buttonProps = useButton({
    onPressed: action('onPressed'),
    name: 'testbutton',
    children,
  });

  return <button css={[buttonCss, focusCss]} {...buttonProps} />;
};

const DivButton: FC<{}> = ({ children }) => {
  const buttonProps = useButton({
    onPressed: action('onPressed'),
    name: 'testbutton',
    children,
  });

  return <div css={[buttonCss, focusCss]} {...buttonProps} />;
};

storiesOf('useButton', module)
  .add('basic button', () => <Button>Hello world</Button>)
  .add('div button', () => <DivButton>Hello div</DivButton>);

const toggleCss = css({
  '&[aria-pressed]': {
    background: 'lightblue',
  },
});

const ToggleButton: FC<{}> = ({ children }) => {
  const buttonProps = useToggleButton({
    onPressed: action('onPressed'),
    onToggled: action('onToggled'),
    name: 'testtogglebutton',
    children,
  });

  return <button css={[buttonCss, focusCss, toggleCss]} {...buttonProps} />;
};

storiesOf('useToggleButton', module).add('basic toggle button', () => (
  <ToggleButton>Hello toggle</ToggleButton>
));
