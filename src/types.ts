import { InterpolationWithTheme } from '@emotion/core';

export type Css = InterpolationWithTheme<any>;

export type BehaviorProps = {
  [propName: string]: any;
  css?: Css;
  className?: string;
};

export type Behavior = {
  props: BehaviorProps;
};

export enum KeyCode {
  Space = 32,
  Enter = 13,
}
