import { BehaviorProps, ExtraProps } from '../types';
import { createBehavior } from '../util';

export type FlexLayoutConfig = {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'space-between';
  justify?: 'start' | 'end' | 'center' | 'stretch' | 'space-between';
} & ExtraProps;

export const useFlexLayout = createBehavior(
  ({
    direction = 'column',
    align = 'start',
    justify = 'start',
    ...rest
  }: FlexLayoutConfig = {}): BehaviorProps => ({
    css: {
      display: 'flex',
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
    },
    ...rest,
  }),
);

export type GridLayoutConfig = {
  areas?: string[] | string[][];
  rows?: string[];
  columns?: string[];
  gap?: string | [string, string];
} & ExtraProps;

const isTwoDimensionalArray = <T>(array: T[][] | T[]): array is T[][] =>
  array[0] instanceof Array;

export const useGridLayout = createBehavior(
  ({
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
  },
);
