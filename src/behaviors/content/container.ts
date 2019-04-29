import {
  SpacingConfig,
  FlexLayoutConfig,
  useFlexLayout,
  useSpacing,
  GridLayoutConfig,
  useGridLayout,
  useSizing,
} from '../layout';
import { useCompose, createBehavior } from '../util';
import { BehaviorProps, ExtraProps } from '../../types';

export type BoxConfig = SpacingConfig & FlexLayoutConfig & ExtraProps;

export const useBox = createBehavior(
  (props: BoxConfig = {}): BehaviorProps =>
    useCompose(props, [useFlexLayout, useSpacing, useSizing]),
);

export type GridConfig = SpacingConfig & GridLayoutConfig & ExtraProps;

export const useGrid = createBehavior(
  (props: GridConfig = {}): BehaviorProps =>
    useCompose(props, [useGridLayout, useSpacing, useSizing]),
);
