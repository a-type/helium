import { createBehavior } from '../util';

export type TextSizeConfig = {
  textSize?: string;
};

export const useTextSize = createBehavior(
  ({ textSize = 'var(--size-text-md)' }: TextSizeConfig) => ({
    css: {
      fontSize: textSize,
    },
  }),
);
