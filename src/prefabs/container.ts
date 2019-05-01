import {
  FlexLayoutConfig,
  useFlexLayout,
  GridLayoutConfig,
  useGridLayout,
} from '../behaviors/layout';
import {
  SpacingConfig,
  useSpacing,
  useSizing,
  PopoverConfig,
  usePopover,
  DepthConfig,
  useDepth,
} from '../primitives';
import { useCompose, createBehavior } from '../util';
import { BehaviorProps } from '../types';
import { useContentArea, ContentAreaConfig } from '../behaviors';

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

export type DockPanelConfig = SpacingConfig &
  ContentAreaConfig &
  FlexLayoutConfig &
  PopoverConfig &
  DepthConfig &
  BehaviorProps;

export const useDockPanel = createBehavior<DockPanelConfig>(
  ({
    padding = 'var(--size-spacing-md)',
    popoverPlacement = 'bottom-start',
    depth = 1,
    border = true,
    ...props
  }: DockPanelConfig) =>
    useCompose({ ...props, padding, depth, border, popoverPlacement }, [
      usePopover,
      useSpacing,
      useContentArea,
      useDepth,
      useFlexLayout,
    ]),
);
