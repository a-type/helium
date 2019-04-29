import { useCallback } from 'react';
import { KeyCode, ExtraProps } from '../../types';
import { useFocus } from './focus';
import { combine } from '../util';
import { InterpolationWithTheme } from '@emotion/core';

const defaultPressableCss = {
  cursor: 'pointer',
};

export type PressableConfig = {
  id?: string;
  tabbable?: boolean;
  onPress?: () => void;
  pressOnEnter?: boolean;
  pressableCss?: InterpolationWithTheme<any>;
} & ExtraProps;

export const usePressable = ({
  onPress: onPress,
  id,
  tabbable = true,
  pressOnEnter = false,
  pressableCss = defaultPressableCss,
  ...rest
}: PressableConfig) => {
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
    [onPress],
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

  // pressable is intrinsically focusable
  const focusProps = useFocus({
    id,
    tabbable,
  });

  return combine(
    {
      onKeyDown,
      onKeyUp,
      onClick: onPress,
      css: pressableCss,
    },
    focusProps,
    rest,
  );
};
