import { BehaviorProps } from '../types';
import { createBehavior } from '../util';

const MAX_Z_INDEX = 2147483647;

export type NamedDepth = 'neutral' | 'transcendent';
export type Depth = number | NamedDepth;

export type DepthConfig = {
  depth?: Depth;
  shadow?: boolean;
} & BehaviorProps;

export const useDepth = createBehavior((config: DepthConfig) => {
  const zIndex =
    config.depth === 'neutral'
      ? 0
      : config.depth === 'transcendent'
      ? MAX_Z_INDEX
      : config.depth || 0;
  return {
    css: {
      zIndex,
      boxShadow:
        (config.shadow === undefined || config.shadow) && zIndex > 0
          ? `var(--shadow-level-${Math.min(zIndex, 4)})`
          : 'none',
    },
  };
});

export type Spacing =
  | string
  | {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
      horizontal?: string;
      vertical?: string;
    };

export type SpacingConfig = {
  margin?: Spacing;
  padding?: Spacing;
} & BehaviorProps;

const parseSpacing = (
  spacing: Spacing | undefined,
  styleType: 'margin' | 'padding',
): {
  [cssKey: string]: string | undefined;
} => {
  if (!spacing) {
    return {};
  }

  if (typeof spacing === 'string') {
    return parseSpacing({ vertical: spacing, horizontal: spacing }, styleType);
  }

  return {
    [`${styleType}Left`]: spacing.left || spacing.horizontal,
    [`${styleType}Top`]: spacing.top || spacing.vertical,
    [`${styleType}Right`]: spacing.right || spacing.horizontal,
    [`${styleType}Bottom`]: spacing.bottom || spacing.vertical,
  };
};

export const useSpacing = createBehavior(
  ({ margin, padding, ...rest }: SpacingConfig = {}): BehaviorProps => ({
    css: {
      ...parseSpacing(margin, 'margin'),
      ...parseSpacing(padding, 'padding'),
    },
    ...rest,
  }),
);

export type SizingConfig = {
  width?: string;
  height?: string;
} & BehaviorProps;

export const useSizing = createBehavior(
  ({ width = 'auto', height = 'auto' }: SizingConfig): BehaviorProps => ({
    css: {
      width,
      height,
    },
  }),
);
