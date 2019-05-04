/** @jsx jsx */
import { storiesOf } from '@storybook/react';
import { jsx } from '@emotion/core';
import {
  SelectionRootProvider,
  SelectionGroupProvider,
} from '../contexts/selection';
import { useSelectableItem } from './interaction';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { useState } from 'react';
import { useAll } from '../util';
import { useText } from './text';
import { useSpacing } from './positioning';
import { useContentArea } from './styling';

const SelectableItem = ({ idx }: { idx: number }) => {
  const selectableProps = useAll(
    {
      padding: 'md',
    },
    [useSelectableItem, useText, useSpacing, useContentArea],
  );
  return (
    <li {...selectableProps} margin="4px">
      Button {idx}
    </li>
  );
};

const SelectableDemo = ({ vertical = false }: { vertical: boolean }) => {
  const [selected, setSelected] = useState(-1);

  return (
    <SelectionGroupProvider
      axis={vertical ? 'vertical' : 'horizontal'}
      selectedIndex={selected}
      onSelectionChanged={({ index }) => setSelected(index)}
    >
      {({ props }) => (
        <ul
          {...props}
          css={{
            display: 'flex',
            flexDirection: vertical ? 'column' : 'row',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <SelectableItem idx={0} />
          <SelectableItem idx={1} />
          <SelectableItem idx={2} />
          <SelectableItem idx={3} />
        </ul>
      )}
    </SelectionGroupProvider>
  );
};

const SelectableGridDemo = () => {
  const grid = boolean('Grid', true);
  const columns = boolean('Column-based', false);

  return (
    <div css={{ display: 'flex', flexDirection: columns ? 'row' : 'column' }}>
      <SelectionRootProvider grid={grid}>
        <div>
          <SelectableDemo vertical={columns} />
        </div>
        <div>
          <SelectableDemo vertical={columns} />
        </div>
      </SelectionRootProvider>
    </div>
  );
};

storiesOf('primitives/useSelectableGroup,useSelectableItem', module)
  .addDecorator(withKnobs)
  .add('row demo', () => <SelectableDemo vertical={false} />)
  .add('column demo', () => <SelectableDemo vertical />)
  .add('2-direction demo', () => <SelectableGridDemo />);
