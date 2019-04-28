import {
  SpacingConfig,
  FlexLayoutConfig,
  useFlexLayout,
  useSpacing,
  GridLayoutConfig,
  useGridLayout,
} from '../layout';
import { combine } from '../util';
import { BehaviorProps, ExtraProps } from '../../types';

export type BoxConfig = SpacingConfig & FlexLayoutConfig & ExtraProps;

export const useBox = ({
  margin,
  padding,
  direction,
  align,
  justify,
  ...rest
}: BoxConfig = {}): BehaviorProps => {
  const flexProps = useFlexLayout({ direction, align, justify });
  const spacingProps = useSpacing({ margin, padding });

  return combine(flexProps, spacingProps, rest);
};

export type GridConfig = SpacingConfig & GridLayoutConfig & ExtraProps;

export const useGrid = ({
  margin,
  padding,
  areas,
  rows,
  columns,
  gap,
  ...rest
}: GridConfig = {}): BehaviorProps => {
  const gridProps = useGridLayout({ areas, rows, columns, gap });
  const spacingProps = useSpacing({ margin, padding });

  return combine(gridProps, spacingProps, rest);
};
