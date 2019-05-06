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
  useText,
  TextConfig,
  usePosition,
  PositionConfig,
} from '../primitives';
import { useAll, useIdOrGenerated } from '../util';
import { FocusProvider } from '../contexts';
import { Portal } from 'react-portal';
import { Box } from './Box';
import { Heading } from './Heading';
import { Button } from './Button';

export type ModalProps = DepthConfig &
  EscapableConfig &
  ContentColorsConfig &
  SpacingConfig &
  SizingConfig &
  TextConfig &
  PositionConfig & {
    label?: string;
    title?: string;
    id?: string;
    hideCloseButton?: boolean;
  };

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    { title, label, hideCloseButton, onEscape, id: providedId, ...props },
    ref,
  ) => {
    const id = useIdOrGenerated(providedId);
    const { children, ...behaviorProps } = useAll(
      { ...props, id, ref, onEscape, role: 'dialog', 'aria-modal': true },
      [
        useDepth,
        useEscapable,
        useContentColors,
        useSpacing,
        useSizing,
        useText,
        usePosition,
      ],
    );

    const closeButtonProps = usePosition({
      top: 'md',
      right: 'md',
      position: 'absolute',
    });

    const titleId = id + '_title';

    if (!title && !label) {
      console.warn(
        `A11y warning: modal ${id} is lacking 'label' or 'title' prop`,
      );
    }

    const ariaProps = title
      ? { 'aria-labeledby': titleId }
      : { 'aria-label': label };

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
            {({ ref }) => (
              <div {...behaviorProps} ref={ref} {...ariaProps}>
                {title && (
                  <Heading id={titleId} level={2}>
                    {title}
                  </Heading>
                )}
                {!hideCloseButton && (
                  <Button
                    onPress={onEscape}
                    label="Close modal"
                    padding={{
                      horizontal: 'md',
                      vertical: 'sm',
                    }}
                    {...closeButtonProps}
                  >
                    &times;
                  </Button>
                )}
                {children}
              </div>
            )}
          </FocusProvider>
        </Box>
      </Portal>
    );
  },
);

Modal.defaultProps = {
  depth: 3,
  padding: 'lg',
  margin: { vertical: 'lg', horizontal: 'auto' },
  width: '50vw',
  position: 'relative',
  hideCloseButton: false,
};
