/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  SpacingConfig,
  useSpacing,
  PopoverConfig,
  usePopover,
  DepthConfig,
  useDepth,
  FlexLayoutConfig,
  useFlexLayout,
  useContentArea,
  ContentAreaConfig,
} from '../primitives';
import { useAll } from '../util';
import { forwardRef } from 'react';

export type DockPanelProps = SpacingConfig &
  ContentAreaConfig &
  FlexLayoutConfig &
  PopoverConfig &
  DepthConfig;

export const DockPanel = forwardRef<HTMLDivElement, DockPanelProps>(
  (
    {
      padding = 'md',
      popoverPlacement = 'bottom-start',
      depth = 1,
      border = true,
      ...props
    },
    ref,
  ) => {
    const dockPanelProps = useAll(
      { ...props, padding, depth, border, popoverPlacement, ref },
      [usePopover, useSpacing, useContentArea, useDepth, useFlexLayout],
    );

    return <div {...dockPanelProps} />;
  },
);
