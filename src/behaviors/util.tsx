import { BehaviorProps } from '../types';
import { CSSObject } from '@emotion/css';

export const castCssArray = (
  cssOrList: CSSObject | CSSObject[] | undefined,
): CSSObject[] =>
  cssOrList instanceof Array ? cssOrList : !!cssOrList ? [cssOrList] : [];

export const combineCss = (
  baseCss: CSSObject | CSSObject[] | undefined,
  css: CSSObject | CSSObject[] | undefined,
) => castCssArray(baseCss).concat(castCssArray(css));

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

export const combine = (behaviorProps: BehaviorProps[]): BehaviorProps =>
  behaviorProps.reduce<BehaviorProps>((finalProps, behaviorProp) => {
    return {
      ...finalProps,
      ...behaviorProp,
      css: combineCss(finalProps.css, behaviorProp.css),
      className: combineClassName(finalProps.className, behaviorProp.className),
      ...combineEventHandlers(finalProps, behaviorProp),
    };
  }, {});
