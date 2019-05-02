import { useContext, useEffect, useRef, useCallback, Ref } from 'react';
import { useCombine, generateId } from '../util';
import { InterpolationWithTheme } from '@emotion/core';
import { FocusContext } from '../contexts/focus';
import { KeyCode, BehaviorProps, BrandTheme } from '../types';

export const defaultFocusCss = (theme: BrandTheme) => ({
  '&:focus': {
    outline: '0',
    boxShadow: `0 0 0 2px ${theme.color.control.effectStrong}`, // FIXME
  },
  transition: '0.2s ease box-shadow',
});

export type FocusConfig = {
  id?: string;
  tabbable?: boolean;
  focusCss?: InterpolationWithTheme<any>;
  ref?: Ref<any> | null;
} & BehaviorProps;

export const useFocus = ({
  id: providedId,
  tabbable = true,
  focusCss = defaultFocusCss,
  ref,
  ...rest
}: FocusConfig) => {
  const id = providedId || generateId('focusable');

  const focusContext = useContext(FocusContext);
  const elementRef = useRef<HTMLElement>(null);

  // always use provided ref if it's there
  const usedRef = ref || elementRef;

  useEffect(() => {
    focusContext.register(id, usedRef);
    return () => focusContext.unregister(id);
  }, [usedRef]);

  return useCombine(
    {
      ref: usedRef,
      tabIndex: tabbable ? 0 : -1,
      css: focusCss,
    },
    rest,
  );
};

export const useA11yPressHandlers = (
  onPress?: () => void,
  pressOnEnter?: boolean,
) => {
  /**
   * referencing https://www.w3.org/TR/wai-aria-practices/examples/button/button.html
   */
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // The action button is activated by space on the keyup event, but the
      // default action for space is already triggered on keydown. It needs to be
      // prevented to stop scrolling the page before activating the button.
      if (event.keyCode === KeyCode.Space) {
        event.preventDefault();
      } else if (pressOnEnter && event.keyCode === KeyCode.Enter) {
        event.preventDefault();
        onPress && onPress();
      }
    },
    [onPress, pressOnEnter],
  );
  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === KeyCode.Space) {
        event.preventDefault();
        onPress && onPress();
      }
    },
    [onPress],
  );

  return {
    onKeyUp,
    onKeyDown,
  };
};

const defaultPressableCss = {
  cursor: 'pointer',
};

export type PressableConfig = {
  id?: string;
  tabbable?: boolean;
  onPress?: () => void;
  pressOnEnter?: boolean;
  pressableCss?: InterpolationWithTheme<any>;
} & BehaviorProps;

export const usePressable = ({
  onPress,
  id,
  tabbable = true,
  pressOnEnter = false,
  pressableCss = defaultPressableCss,
  ...rest
}: PressableConfig) => {
  const { onKeyDown, onKeyUp } = useA11yPressHandlers(onPress, pressOnEnter);

  return useCombine(
    {
      onKeyDown,
      onKeyUp,
      onClick: onPress,
      css: pressableCss,
    },
    rest,
  );
};
