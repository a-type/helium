import {
  FlexLayoutConfig,
  useFlexLayout,
  GridLayoutConfig,
  useGridLayout,
} from '../behaviors/layout';
import { SpacingConfig, useSpacing, useSizing } from '../primitives';
import { useCompose, createBehavior } from '../util';
import { BehaviorProps } from '../types';

export type BoxConfig = SpacingConfig & FlexLayoutConfig & BehaviorProps;

export const useBox = createBehavior<BoxConfig>(
  (props: BoxConfig = {}): BehaviorProps =>
    useCompose(props, [useFlexLayout, useSpacing, useSizing]),
);

export type GridConfig = SpacingConfig & GridLayoutConfig & BehaviorProps;

export const useGrid = createBehavior<GridConfig>(
  (props: GridConfig = {}): BehaviorProps =>
    useCompose(props, [useGridLayout, useSpacing, useSizing]),
);
