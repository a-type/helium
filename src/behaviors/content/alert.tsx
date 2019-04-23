import { HTMLAttributes } from 'react';

export type AlertConfig = {};

export const useAlert = ({}): HTMLAttributes<HTMLElement> => {
  return {
    role: 'alert',
  };
};
