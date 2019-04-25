import {
  SpacingConfig,
  FlexLayoutConfig,
  useFlexLayout,
  useSpacing,
  GridLayoutConfig,
  useGridLayout,
} from '../layout';
import { combine } from '../util';
import { BehaviorProps } from '../../types';

export type BoxConfig = SpacingConfig & FlexLayoutConfig;

export const useBox = (
  { margin, padding, direction, align, justify }: BoxConfig = {},
  extraProps?: BehaviorProps,
): BehaviorProps => {
  const flexProps = useFlexLayout({ direction, align, justify });
  const spacingProps = useSpacing({ margin, padding });

  return combine([flexProps, spacingProps, extraProps]);
};

export type GridConfig = SpacingConfig & GridLayoutConfig;

export const useGrid = (
  { margin, padding, areas, rows, columns, gap }: GridConfig = {},
  extraProps?: BehaviorProps,
): BehaviorProps => {
  const gridProps = useGridLayout({ areas, rows, columns, gap });
  const spacingProps = useSpacing({ margin, padding });

  return combine([gridProps, spacingProps, extraProps]);
};
