/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  SpacingConfig,
  FlexLayoutConfig,
  useSizing,
  useSpacing,
  useFlexLayout,
} from '../primitives';
import { forwardRef } from 'react';
import { useCompose } from '../util';

export type BoxProps = SpacingConfig & FlexLayoutConfig;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (props: BoxProps, ref) => {
    const boxProps = useCompose({ ...props, ref }, [
      useFlexLayout,
      useSpacing,
      useSizing,
    ]);

    return <div {...boxProps} />;
  },
);
