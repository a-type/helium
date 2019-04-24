import { SerializedStyles } from '@emotion/core';

export type BehaviorProps = {
  [propName: string]: any;
  css?: SerializedStyles | SerializedStyles[];
  className?: string;
};

export type Behavior = {
  props: BehaviorProps;
};

export enum KeyCode {
  Space = 32,
  Enter = 13,
}
