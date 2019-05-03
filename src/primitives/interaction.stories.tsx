/** @jsx jsx */
import { storiesOf } from '@storybook/react';
import { jsx } from '@emotion/core';
import {
  KeyboardRootProvider,
  KeyboardGroupProvider,
} from '../contexts/keyboard';
import { Button } from '../components';
import { useKeyboardNavigable } from './interaction';
import { withKnobs, boolean } from '@storybook/addon-knobs';

const KeyboardNavigableButton = ({ idx }: { idx: number }) => {
  const keyboardNavigableProps = useKeyboardNavigable({});
  return (
    <Button {...keyboardNavigableProps} margin="4px">
      Button {idx}
    </Button>
  );
};

const KeyboardNavigableDemo = ({ vertical = false }: { vertical: boolean }) => {
  return (
    <div css={{ display: 'flex', flexDirection: vertical ? 'column' : 'row' }}>
      <KeyboardGroupProvider axis={vertical ? 'vertical' : 'horizontal'}>
        <KeyboardNavigableButton idx={0} />
        <KeyboardNavigableButton idx={1} />
        <KeyboardNavigableButton idx={2} />
        <KeyboardNavigableButton idx={3} />
      </KeyboardGroupProvider>
    </div>
  );
};

const KeyboardNavigableGridDemo = () => {
  const grid = boolean('Grid', false);
  const columns = boolean('Column-based', false);

  return (
    <div css={{ display: 'flex', flexDirection: columns ? 'row' : 'column' }}>
      <KeyboardRootProvider grid={grid}>
        <div>
          <KeyboardNavigableDemo vertical={columns} />
        </div>
        <div>
          <KeyboardNavigableDemo vertical={columns} />
        </div>
      </KeyboardRootProvider>
    </div>
  );
};

storiesOf('primitives/useKeyboardNavigable', module)
  .addDecorator(withKnobs)
  .add('row demo', () => <KeyboardNavigableDemo vertical={false} />)
  .add('column demo', () => <KeyboardNavigableDemo vertical />)
  .add('2-direction demo', () => <KeyboardNavigableGridDemo />);
