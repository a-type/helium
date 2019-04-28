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
  return combine(
    {
      css: {
        background: backgroundColor,
        color: foregroundColor,
      },
    },
    rest,
  );
};
