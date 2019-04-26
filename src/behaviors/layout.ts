import { BehaviorProps, ExtraProps } from '../types';

export type FlexLayoutConfig = {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'space-between';
  justify?: 'start' | 'end' | 'center' | 'stretch' | 'space-between';
} & ExtraProps;

export const useFlexLayout = ({
  direction = 'column',
  align = 'start',
  justify = 'start',
  ...rest
}: FlexLayoutConfig = {}): BehaviorProps => {
  return {
    css: {
      display: 'flex',
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
    },
    ...rest,
  };
};

export type GridLayoutConfig = {
  areas?: string[] | string[][];
  rows?: string[];
  columns?: string[];
  gap?: string | [string, string];
} & ExtraProps;

const isTwoDimensionalArray = <T>(array: T[][] | T[]): array is T[][] =>
  array[0] instanceof Array;

export const useGridLayout = ({
  areas = [],
  rows = [],
  columns = [],
  gap = '0',
  ...rest
}: GridLayoutConfig = {}): BehaviorProps => {
  const normalizedAreas: string[][] = isTwoDimensionalArray(areas)
    ? areas
    : [areas];
  const areasString = normalizedAreas.reduce(
    (str, row) => str + ` "${row.join(' ')}"`,
    '',
  );
  const gapString: string = gap instanceof Array ? gap.join(' ') : gap;

  return {
    css: {
      display: 'grid',
      gridTemplateAreas: areasString,
      gridTemplateRows: rows.join(' '),
      gridTemplateColumns: columns.join(' '),
      gap: gapString,
    },
    ...rest,
  };
};

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
} & ExtraProps;

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

export const useSpacing = ({
  margin,
  padding,
  ...rest
}: SpacingConfig = {}): BehaviorProps => {
  return {
    css: {
      ...parseSpacing(margin, 'margin'),
      ...parseSpacing(padding, 'padding'),
    },
    ...rest,
  };
};
