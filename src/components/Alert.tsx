/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC } from 'react';
import { useAll } from '../util';
import {
  usePosition,
  PositionConfig,
  ContentColorsConfig,
  useContentColors,
  SpacingConfig,
  useSpacing,
  TextConfig,
  useText,
  DepthConfig,
  useDepth,
} from '../primitives';
import { Portal } from 'react-portal';

export type AlertProps = PositionConfig &
  ContentColorsConfig &
  SpacingConfig &
  TextConfig &
  DepthConfig & {
    level?: 'info' | 'success' | 'error';
  };

export const Alert: FC<AlertProps> = ({
  children,
  position = 'absolute',
  border = true,
  padding = 'md',
  depth = 4,
  level = 'info',
  ...rest
}) => {
  const behaviorProps = useAll<
    PositionConfig & ContentColorsConfig & SpacingConfig
  >({ ...rest, position, border, padding, depth }, [
    usePosition,
    useSpacing,
    useContentColors,
    useText,
    useDepth,
  ]);

  return (
    <Portal>
      <div role="alert" {...behaviorProps}>
        {children}
      </div>
    </Portal>
  );
};
