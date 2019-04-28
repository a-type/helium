import { BrandTheme, ExtraProps } from './types';
import { combine } from './behaviors';

const convertBrandToVariables = (
  brand: { [key: string]: any },
  prefix: string = '-',
): { [name: string]: string } => {
  return Object.keys(brand).reduce<{ [name: string]: string }>((vars, key) => {
    const value = brand[key];
    const prefixedKey = `${prefix}-${key}`;
    if (typeof value === 'object') {
      return { ...vars, ...convertBrandToVariables(value, prefixedKey) };
    }

    return { ...vars, [prefixedKey]: value };
  }, {});
};

export type BrandConfig = {
  brand: BrandTheme;
} & ExtraProps;

export const useBrand = ({ brand, ...rest }: BrandConfig) => {
  return combine(
    {
      css: convertBrandToVariables(brand),
    },
    rest,
  );
};
