/** @jsx jsx */
import { Select } from './Select';
import { storiesOf } from '@storybook/react';
import { jsx } from '@emotion/core';
import { useState } from 'react';

const options = ['Aang', 'Katara', 'Sokka', 'Toph', 'Zuko'];

const SelectDemo = <T extends any>({ options }: { options: T[] }) => {
  const [value, setValue] = useState<T | null>(null);
  return <Select options={options} value={value} onChange={setValue} />;
};

storiesOf('Select', module).add('basic', () => (
  <SelectDemo options={options} />
));
