/** @jsx jsx */
import { FC, useState } from 'react';
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
  cursor: 'pointer',
});

const focusCss = css({
  '&:focus': {
    outline: 0,
    boxShadow: '0 0 0 3px #00000080',
  },
});

const Button: FC<{}> = ({ children }) => {
  const buttonProps = useButton(
    {
      onPress: action('onPressed'),
      id: 'testbutton',
      children,
    },
    {
      css: [buttonCss, focusCss],
    },
  );

  return <button {...buttonProps} />;
};

const DivButton: FC<{}> = ({ children }) => {
  const buttonProps = useButton(
    {
      onPress: action('onPressed'),
      id: 'testbutton',
      children,
    },
    {
      css: [buttonCss, focusCss],
    },
  );

  return <div {...buttonProps} />;
};

storiesOf('useButton', module)
  .add('basic button', () => <Button>Hello world</Button>)
  .add('div button', () => <DivButton>Hello div</DivButton>);

const toggleCss = css({
  '&[aria-pressed=true]': {
    background: 'lightblue',
  },
});

const ToggleButton: FC<{}> = ({ children }) => {
  const [toggled, setToggled] = useState(false);
  const buttonProps = useToggleButton(
    {
      toggled,
      onPress: action('onPressed'),
      onChange: toggleState => {
        setToggled(toggleState);
        action('onToggled')(toggleState);
      },
      id: 'testtogglebutton',
      children,
    },
    {
      css: [buttonCss, focusCss, toggleCss],
    },
  );

  return <button {...buttonProps} />;
};

storiesOf('useToggleButton', module).add('basic toggle button', () => (
  <ToggleButton>Hello toggle</ToggleButton>
));
