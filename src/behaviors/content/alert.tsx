import { HTMLAttributes } from 'react';
import { ExtraProps } from '../../types';
import { combine } from '../util';

export type AlertConfig = {} & ExtraProps;

export const useAlert = ({ ...rest }): HTMLAttributes<HTMLElement> => {
  return combine([
    {
      role: 'alert',
    },
    rest,
  ]);
};
