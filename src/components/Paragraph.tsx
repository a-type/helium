/** @jsx jsx */
import { jsx } from '@emotion/core';
import { TextConfig, SpacingConfig, useText, useSpacing } from '../primitives';
import { forwardRef } from 'react';
import { useAll } from '../util';

export type ParagraphProps = TextConfig & SpacingConfig;

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, ref) => {
    const behaviorProps = useAll({ ...props, ref }, [useText, useSpacing]);

    return <p {...behaviorProps} />;
  },
);

Paragraph.defaultProps = {
  margin: {
    top: 0,
    bottom: 'lg',
    horizontal: 0,
  },
};
