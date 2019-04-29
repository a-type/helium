import { combine } from '../util';

export type TextSizeConfig = {
  textSize?: string;
};

export const useTextSize = ({
  textSize = 'var(--size-text-md)',
  ...rest
}: TextSizeConfig) => {
  return combine(
    {
      css: {
        fontSize: textSize,
      },
    },
    rest,
  );
};
