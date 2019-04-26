import { combine } from '../util';
import pathOr from '@ramda/pathor';

export type TextSizeConfig = {
  textSize: string;
};

export const useTextSize = ({ textSize, ...rest }: TextSizeConfig) => {
  return combine([
    {
      css: theme => ({
        fontSize: pathOr<string>(textSize, ['textSize', textSize], theme),
      }),
    },
    rest,
  ]);
};
