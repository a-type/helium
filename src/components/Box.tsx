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
import { useAll } from '../util';

export type BoxProps = SpacingConfig & FlexLayoutConfig;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (props: BoxProps, ref) => {
    const boxProps = useAll({ ...props, ref }, [
      useFlexLayout,
      useSpacing,
      useSizing,
    ]);

    return <div {...boxProps} />;
  },
);
