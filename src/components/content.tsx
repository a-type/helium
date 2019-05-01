import React, { FC, forwardRef } from 'react';
import { GridConfig, useGrid, useBox, BoxConfig } from '../prefabs';

export const Box: FC<BoxConfig> = forwardRef((props, ref) => (
  <div {...useBox({ ...props, ref })} />
));

export const Grid: FC<GridConfig> = forwardRef((props, ref) => (
  <div {...useGrid({ ...props, ref })} />
));
