/** @jsx jsx */
import { FC, useState } from 'react';
import { useInput, useToggleInput } from './input';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css, jsx } from '@emotion/core';

const inputCss = css({
  padding: '8px',
});

const TextInput: FC<{}> = ({}) => {
  const [value, setValue] = useState('');
  const inputProps = useInput(
    {
      id: 'testinput',
      value,
      onChange: val => {
        action('onChange')(val);
        setValue(val);
      },
      type: 'text',
    },
    {
      inputCss,
    },
  );

  return <input {...inputProps} />;
};

storiesOf('useInput', module).add('text input', () => <TextInput />);

const ToggleInput: FC<{}> = ({}) => {
  const [toggled, setToggled] = useState(false);
  const toggleInputProps = useToggleInput({
    id: 'testtoggleinput',
    value: 'foo',
    onChange: toggled => {
      setToggled(toggled);
      action('onChange')(toggled);
    },
    toggled,
  });

  return <input {...toggleInputProps} />;
};

storiesOf('useToggleInput', module).add('checkbox', () => <ToggleInput />);
