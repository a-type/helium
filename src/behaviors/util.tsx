import { BehaviorProps, Css } from '../types';

export const castCssArray = (cssOrList: Css | Css[] | undefined): Css[] =>
  cssOrList instanceof Array ? cssOrList : !!cssOrList ? [cssOrList] : [];

export const combineCss = (
  baseCss: Css | Css[] | undefined,
  css: Css | Css[] | undefined,
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
