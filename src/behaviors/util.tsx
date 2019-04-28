import { BehaviorProps, Behavior, ExtraProps } from '../types';
import { useMemo } from 'react';
import { ArrayInterpolation } from '@emotion/css';
import { InterpolationWithTheme } from '@emotion/core';

export const castCssArray = (
  cssOrList: InterpolationWithTheme<any> | undefined,
): ArrayInterpolation<any> =>
  cssOrList instanceof Array ? cssOrList : !!cssOrList ? [cssOrList] : [];

export const combineCss = (
  baseCss: InterpolationWithTheme<any> | undefined,
  css: InterpolationWithTheme<any> | undefined,
): ArrayInterpolation<any> => castCssArray(baseCss).concat(castCssArray(css));

export const combineClassName = (
  baseClassName: string | undefined,
  className: string | undefined,
): string | undefined => {
  if (!baseClassName) {
    return className;
  } else if (!className) {
    return baseClassName;
  } else {
    return baseClassName + ' ' + className;
  }
};

export const isEventHandlerPropName = (propName: string) =>
  /^on[A-Z]/.test(propName);
export const combineEventHandlers = (
  baseProps: BehaviorProps,
  newProps: BehaviorProps,
) => {
  // this is kind of naive...
  const baseHandlers = Object.keys(baseProps).filter(isEventHandlerPropName);
  const newHandlers = Object.keys(newProps).filter(isEventHandlerPropName);

  return baseHandlers.reduce<{ [key: string]: any }>((handlers, name) => {
    if (!newHandlers.includes(name)) {
      return handlers;
    }
    return {
      ...handlers,
      [name]: (...args: any[]) => {
        baseProps[name](...args);
        newProps[name](...args);
      },
    };
  }, {});
};

type MaybeBehaviorProps = BehaviorProps | undefined;

export const combine = (behaviorProps: MaybeBehaviorProps[]): BehaviorProps =>
  behaviorProps.reduce<BehaviorProps>((finalProps, behaviorProp) => {
    if (!behaviorProp) {
      return finalProps;
    }

    return {
      ...finalProps,
      ...behaviorProp,
      css: combineCss(finalProps.css, behaviorProp.css),
      className: combineClassName(finalProps.className, behaviorProp.className),
      ...combineEventHandlers(finalProps, behaviorProp),
    };
  }, {});

export const useCompose = <Props extends ExtraProps>(
  props: Props,
  behaviorHooks: Behavior[],
) => {
  // memoize once. hooks must always be run in the same order.
  const memoizedBehaviorHooks = useMemo(() => behaviorHooks, []);
  return memoizedBehaviorHooks.reduce(
    (currentProps, behavior) => behavior(currentProps),
    props,
  );
};

export const generateId = (base?: string): string => {
  return `${base || ''}-${Math.floor(Math.random() * 100000000)}`;
};
