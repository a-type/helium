/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { useState } from 'react';
import { Radio } from './Radio';

const options = ['Aang', 'Katara', 'Sokka', 'Toph', 'Zuko'];
const RadioDemo = <T extends any>({ options }: { options: T[] }) => {
  const [value, setValue] = useState<T | null>(null);
  return <Radio options={options} value={value} onChange={setValue} />;
};

storiesOf('Radio', module).add('demo', () => <RadioDemo options={options} />);
