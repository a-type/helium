import { ExtraProps } from '../../types';
import { combine } from '../util';
import pathOr from '@ramda/pathor';

export type ContentColorsConfig = {
  backgroundColor?: string;
  foregroundColor?: string;
} & ExtraProps;

export const useContentColors = ({
  backgroundColor,
  foregroundColor,
  ...rest
}: ContentColorsConfig) => {
  return combine([
    {
      css: theme => ({
        background:
          backgroundColor &&
          pathOr<string>(backgroundColor, ['colors', backgroundColor], theme),
        color:
          foregroundColor &&
          pathOr<string>(foregroundColor, ['colors', foregroundColor], theme),
      }),
    },
    rest,
  ]);
};
