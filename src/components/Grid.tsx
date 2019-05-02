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
import { useCompose } from '../util';

export type GridConfig = SpacingConfig & GridLayoutConfig;

export const Grid = forwardRef((props: GridConfig, ref) => {
  const gridProps = useCompose({ ...props, ref }, [
    useGridLayout,
    useSpacing,
    useSizing,
  ]);

  return <div {...gridProps} />;
});
