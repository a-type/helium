import { BehaviorProps, BrandTheme, Size } from '../types';
import { createBehavior, isSize } from '../util';
import { useContext } from 'react';
import { ThemeContext } from '../contexts';

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
    css: (theme: BrandTheme) => ({
      zIndex,
      boxShadow:
        (config.shadow === undefined || config.shadow) && zIndex > 0
          ? theme.shadow.level[Math.min(zIndex, 4)]
          : 'none',
    }),
  };
});

export type Spacing =
  | Size
  | string
  | {
      top?: Size | string;
      bottom?: Size | string;
      left?: Size | string;
      right?: Size | string;
      horizontal?: Size | string;
      vertical?: Size | string;
    };

export type SpacingConfig = {
  margin?: Spacing;
  padding?: Spacing;
} & BehaviorProps;

const parseSize = (size: Size | string | undefined, theme: BrandTheme) => {
  if (isSize(size)) {
    return theme.size.spacing[size];
  }
  return size;
};

const parseSpacing = (
  spacing: Spacing | undefined,
  styleType: 'margin' | 'padding',
  theme: BrandTheme,
): {
  [cssKey: string]: string | undefined;
} => {
  if (!spacing) {
    return {};
  }

  if (typeof spacing === 'string') {
    return parseSpacing(
      { vertical: spacing, horizontal: spacing },
      styleType,
      theme,
    );
  }

  return {
    [`${styleType}Left`]: parseSize(spacing.left || spacing.horizontal, theme),
    [`${styleType}Top`]: parseSize(spacing.top || spacing.vertical, theme),
    [`${styleType}Right`]: parseSize(
      spacing.right || spacing.horizontal,
      theme,
    ),
    [`${styleType}Bottom`]: parseSize(
      spacing.bottom || spacing.vertical,
      theme,
    ),
  };
};

export const useSpacing = createBehavior(
  ({ margin, padding, ...rest }: SpacingConfig = {}): BehaviorProps => {
    return {
      ...rest,
      css: theme => ({
        ...parseSpacing(margin, 'margin', theme),
        ...parseSpacing(padding, 'padding', theme),
      }),
    };
  },
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
