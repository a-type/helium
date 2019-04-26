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
