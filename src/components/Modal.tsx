/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import {
  useDepth,
  useEscapable,
  DepthConfig,
  EscapableConfig,
  useContentColors,
  ContentColorsConfig,
  SpacingConfig,
  useSpacing,
  useSizing,
  SizingConfig,
} from '../primitives';
import { useAll } from '../util';
import { FocusProvider } from '../contexts';
import { Portal } from 'react-portal';
import { Box } from './Box';

export type ModalProps = DepthConfig &
  EscapableConfig &
  ContentColorsConfig &
  SpacingConfig &
  SizingConfig;

export const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const behaviorProps = useAll(
    { ...props, ref, role: 'dialog', 'aria-modal': true },
    [useDepth, useEscapable, useContentColors, useSpacing, useSizing],
  );

  return (
    <Portal>
      <Box
        background="#00000020"
        position="fixed"
        left="0"
        right="0"
        top="0"
        bottom="0"
      >
        <FocusProvider trapFocus ref={behaviorProps.ref}>
          {({ ref }) => <div {...behaviorProps} ref={ref} />}
        </FocusProvider>
      </Box>
    </Portal>
  );
});

Modal.defaultProps = {
  depth: 3,
  padding: 'lg',
  margin: { vertical: 'lg', horizontal: 'auto' },
  width: '50vw',
};
