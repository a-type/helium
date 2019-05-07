/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const CheckboxDemo = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      value="foo"
      checked={checked}
      onChange={(val: boolean) => setChecked(val)}
    >
      Check me out
    </Checkbox>
  );
};

storiesOf('Checkbox', module).add('basic', () => <CheckboxDemo />);
