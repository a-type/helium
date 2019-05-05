/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  SpacingConfig,
  FlexLayoutConfig,
  useSizing,
  useSpacing,
  useFlexLayout,
  usePosition,
  useContentColors,
  SizingConfig,
  PositionConfig,
  ContentColorsConfig,
} from '../primitives';
import { forwardRef } from 'react';
import { useAll } from '../util';

export type BoxProps = SpacingConfig &
  FlexLayoutConfig &
  SizingConfig &
  PositionConfig &
  ContentColorsConfig;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (props: BoxProps, ref) => {
    const boxProps = useAll({ ...props, ref }, [
      useFlexLayout,
      useSpacing,
      useSizing,
      usePosition,
      useContentColors,
    ]);

    return <div {...boxProps} />;
  },
);

Box.defaultProps = {
  background: 'transparent',
};
