/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import { TextConfig, useText, useSpacing, SpacingConfig } from '../primitives';
import { useAll } from '../util';

export type HeadingProps = TextConfig &
  SpacingConfig & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
  };

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, providedRef) => {
    const Tag = 'h' + props.level;
    const behaviorProps = useAll({ ...props, ref: providedRef }, [
      useText,
      useSpacing,
    ]);

    return <Tag {...behaviorProps} />;
  },
);

Heading.defaultProps = {
  level: 1,
  textSize: 'auto',
  margin: {
    bottom: 'lg',
    top: 0,
    left: 0,
    right: 0,
  },
};
