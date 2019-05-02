import { InterpolationWithTheme } from '@emotion/core';

export type ExtraProps = {
  [propName: string]: any;
};

export type BehaviorProps = {
  css?: InterpolationWithTheme<any> | InterpolationWithTheme<any>[];
  className?: string;
} & ExtraProps;

export type AssignedProps = {
  css?: InterpolationWithTheme<any>;
  className?: string;
} & ExtraProps;

export type Behavior<Config extends BehaviorProps> = (
  configAndProps: Config,
) => any;

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

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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
    borderRadius: BrandSizeConfig;
    borderWidth: {
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
  shadow: {
    level: {
      [1]: string;
      [2]: string;
      [3]: string;
      [4]: string;
    };
  };
};

export type BrandThemeOverrides = {
  color?: {
    content?: Partial<BrandColorConfig>;
    control?: Partial<BrandInteractiveColorConfig> & {
      primary?: Partial<BrandInteractiveColorConfig>;
      minimal?: Partial<BrandInteractiveColorConfig>;
    };
    field?: Partial<BrandInteractiveColorConfig>;
  };
  size?: {
    text?: Partial<BrandSizeConfig>;
    spacing?: Partial<BrandSizeConfig>;
    borderRadius?: Partial<BrandSizeConfig>;
    borderWidth?: {
      thin?: string;
      normal?: string;
      thick?: string;
    };
  };
  font?: {
    weight?: {
      light?: string;
      normal?: string;
      heavy?: string;
    };
    family?: {
      content?: string;
      heading?: string;
      control?: string;
    };
  };
};
