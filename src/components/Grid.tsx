/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  SpacingConfig,
  useSizing,
  useSpacing,
  GridLayoutConfig,
  useGridLayout,
} from '../primitives';
import { forwardRef } from 'react';
import { useAll } from '../util';

export type GridConfig = SpacingConfig & GridLayoutConfig;

export const Grid = forwardRef((props: GridConfig, ref) => {
  const gridProps = useAll({ ...props, ref }, [
    useGridLayout,
    useSpacing,
    useSizing,
  ]);

  return <div {...gridProps} />;
});
