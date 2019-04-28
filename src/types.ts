import { InterpolationWithTheme } from '@emotion/core';

export type ExtraProps = {
  [propName: string]: any;
};

export type BehaviorProps = {
  css?: InterpolationWithTheme<any>;
  className?: string;
} & ExtraProps;

export type Behavior = (configAndProps: any) => any;

export enum KeyCode {
  Space = 32,
  Enter = 13,
}

export type BrandColorConfig = {
  bg: string;
  fg: string;
  border: string;
};

export type BrandInteractiveColorConfig = BrandColorConfig & {
  effectWeak: string;
  effectStrong: string;
};

export type BrandSizeConfig = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export type BrandTheme = {
  color: {
    content: BrandColorConfig;
    control: BrandInteractiveColorConfig & {
      primary: BrandInteractiveColorConfig;
      minimal: BrandInteractiveColorConfig;
    };
    field: BrandInteractiveColorConfig;
  };
  size: {
    text: BrandSizeConfig;
    spacing: BrandSizeConfig;
  };
  border: {
    radius: BrandSizeConfig;
    width: {
      thin: string;
      normal: string;
      thick: string;
    };
  };
  font: {
    weight: {
      light: string;
      normal: string;
      heavy: string;
    };
    family: {
      content: string;
      heading: string;
      control: string;
    };
  };
};
