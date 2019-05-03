import {
  BehaviorProps,
  Behavior,
  ExtraProps,
  Size,
  AssignedProps,
} from './types';
import { useMemo, useContext, Ref, useRef } from 'react';
import { ArrayInterpolation } from '@emotion/css';
import { InterpolationWithTheme, ThemeContext } from '@emotion/core';

export const castCssArray = (
  cssOrList:
    | InterpolationWithTheme<any>
    | InterpolationWithTheme<any>[]
    | undefined,
): ArrayInterpolation<any> =>
  cssOrList instanceof Array ? [...cssOrList] : !!cssOrList ? [cssOrList] : [];

export const combineCss = (
  baseCss: InterpolationWithTheme<any> | undefined,
  css: InterpolationWithTheme<any> | InterpolationWithTheme<any>[] | undefined,
  theme: any,
): ArrayInterpolation<any> => {
  return castCssArray(baseCss)
    .concat(castCssArray(css))
    .map(interpolation => {
      if (typeof interpolation === 'function') {
        return interpolation(theme);
      }
      return interpolation;
    });
};

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
    } else if (!baseHandlers.includes(name)) {
      return {
        ...handlers,
        [name]: newHandlers[name],
      };
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

export const useCombine = (
  ...behaviorProps: MaybeBehaviorProps[]
): AssignedProps => {
  const theme = useContext(ThemeContext);

  return behaviorProps.reduce<AssignedProps>((finalProps, behaviorProp) => {
    if (!behaviorProp) {
      return finalProps;
    }

    return {
      ...finalProps,
      ...behaviorProp,
      css: combineCss(finalProps.css, behaviorProp.css, theme),
      className: combineClassName(finalProps.className, behaviorProp.className),
      ...combineEventHandlers(finalProps, behaviorProp),
      ref: finalProps.ref || behaviorProp.ref,
    };
  }, {});
};

type SkippableBehavior<Props> = [Behavior<Props>, boolean];

export const useAll = <Props extends ExtraProps>(
  props: Props,
  behaviorHooks: (Behavior<Props> | SkippableBehavior<Props>)[],
) => {
  // memoize once. hooks must always be run in the same order.
  const memoizedBehaviorHooks = useMemo(() => behaviorHooks, []);
  const behaviorProps = memoizedBehaviorHooks.map(behavior => {
    if (behavior instanceof Array) {
      return behavior[0]({ ...props, skip: behavior[1] });
    } else {
      return behavior(props);
    }
  });
  return useCombine(props, ...behaviorProps);
};

export const generateId = (base?: string): string => {
  return `${base || 'generated'}-${Math.floor(Math.random() * 100000000)}`;
};

export const createBehavior = <BehaviorConfig extends BehaviorProps>(
  implementation: Behavior<BehaviorConfig>,
) => ({ skip = false, ...props }: BehaviorConfig & { skip?: boolean }) => {
  if (skip) {
    return props;
  }

  return implementation(props as BehaviorConfig);
};

export const isSize = (size: string | undefined): size is Size =>
  !!size && ['xs', 'sm', 'md', 'lg', 'xl'].includes(size);

export const useRefOrProvided = <T extends any>(
  providedRef: Ref<T> | null | undefined,
): Ref<T> => {
  const internalRef = useRef<T>(null);
  return providedRef || internalRef;
};

export const getNextIndex = (
  currentIndex: number,
  length: number,
  wrap?: boolean,
) => {
  if (currentIndex + 1 < length) {
    return currentIndex + 1;
  }
  if (!wrap) {
    return length - 1;
  }
  return currentIndex + 1 - length;
};

export const getPreviousIndex = (
  currentIndex: number,
  length: number,
  wrap?: boolean,
) => {
  if (currentIndex > 0) {
    return currentIndex - 1;
  }
  if (!wrap) {
    return 0;
  }
  return length + (currentIndex - 1);
};
