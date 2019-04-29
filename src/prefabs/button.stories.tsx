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

const Button: FC<{}> = ({ children }) => {
  const buttonProps = useButton({
    onPress: action('onPressed'),
    id: 'testbutton',
    children,
    css: [buttonCss],
  });

  return <button {...buttonProps} />;
};

const DivButton: FC<{}> = ({ children }) => {
  const buttonProps = useButton({
    onPress: action('onPressed'),
    id: 'testbutton',
    children,
    css: [buttonCss],
  });

  return <div {...buttonProps} />;
};

storiesOf('prefabs/useButton', module)
  .add('basic button', () => <Button>Hello world</Button>)
  .add('div button', () => <DivButton>Hello div</DivButton>);

const toggleCss = css({
  '&[aria-pressed=true]': {
    background: 'lightblue',
  },
});

const ToggleButton: FC<{}> = ({ children }) => {
  const [toggled, setToggled] = useState(false);
  const buttonProps = useToggleButton({
    toggled,
    onPress: action('onPressed'),
    onChange: (toggleState: boolean) => {
      setToggled(toggleState);
      action('onToggled')(toggleState);
    },
    id: 'testtogglebutton',
    children,
    css: [buttonCss, toggleCss],
  });

  return <button {...buttonProps} />;
};

storiesOf('prefabs/useToggleButton', module).add('basic toggle button', () => (
  <ToggleButton>Hello toggle</ToggleButton>
));
