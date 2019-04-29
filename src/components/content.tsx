import React, { FC } from 'react';
import { GridConfig, useGrid, useBox, BoxConfig } from '../prefabs';

export const Box: FC<BoxConfig> = props => <div {...useBox(props)} />;

export const Grid: FC<GridConfig> = props => <div {...useGrid(props)} />;
