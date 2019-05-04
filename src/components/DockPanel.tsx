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
  useEscapable,
  EscapableConfig,
} from '../primitives';
import { useAll, useRefOrProvided } from '../util';
import { forwardRef, useEffect } from 'react';

export type DockPanelProps = SpacingConfig &
  ContentAreaConfig &
  FlexLayoutConfig &
  PopoverConfig &
  DepthConfig &
  EscapableConfig & {
    onOpen?(): void;
  };

export const DockPanel = forwardRef<HTMLDivElement, DockPanelProps>(
  (
    {
      padding = 'md',
      popoverPlacement = 'bottom-start',
      depth = 1,
      border = true,
      onOpen,
      ...props
    },
    providedRef,
  ) => {
    // because useAll doesn't compose, we need to define a ref here...
    // FIXME?
    const ref = useRefOrProvided(providedRef);

    const dockPanelProps = useAll(
      {
        ...props,
        padding,
        depth,
        border,
        popoverPlacement,
        ref,
      },
      [
        usePopover,
        useSpacing,
        useContentArea,
        useDepth,
        useFlexLayout,
        useEscapable,
      ],
    );

    useEffect(() => {
      onOpen && onOpen();
    }, []);

    return <div {...dockPanelProps} />;
  },
);
