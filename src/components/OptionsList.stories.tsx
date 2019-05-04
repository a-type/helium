/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { OptionsList } from './OptionsList';
import { Box } from './Box';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

const options = ['Bob', 'Linda', 'Tina', 'Gene', 'Louise'];

const OptionsListDemo = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Box width="300px" border margin="8px">
      <OptionsList
        selectedIndex={selected ? options.indexOf(selected) : -1}
        options={options}
        onOptionSelected={selection => {
          action('onOptionSelected')(selection);
          setSelected(selection);
        }}
      />
    </Box>
  );
};

storiesOf('OptionsList', module).add('normal', () => <OptionsListDemo />);
