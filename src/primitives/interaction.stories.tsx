/** @jsx jsx */
import { storiesOf } from '@storybook/react';
import { jsx } from '@emotion/core';
import { KeyboardProvider } from '../contexts/keyboard';
import { Button } from '../components';
import { useKeyboardNavigable } from './interaction';

const KeyboardNavigableButton = ({ idx }: { idx: number }) => {
  const keyboardNavigableProps = useKeyboardNavigable({});
  return <Button {...keyboardNavigableProps}>Button {idx}</Button>;
};

const KeyboardNavigableDemo = () => {
  return (
    <KeyboardProvider>
      <KeyboardNavigableButton idx={0} />
      <KeyboardNavigableButton idx={1} />
      <KeyboardNavigableButton idx={2} />
      <KeyboardNavigableButton idx={3} />
    </KeyboardProvider>
  );
};

storiesOf('primitives/useKeyboardNavigable', module).add('demo', () => (
  <KeyboardNavigableDemo />
));
