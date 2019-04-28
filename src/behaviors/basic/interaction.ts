import { useCallback } from 'react';
import { KeyCode, ExtraProps } from '../../types';
import { useFocus } from './focus';
import { combine } from '../util';

export type PressableConfig = {
  id?: string;
  tabbable?: boolean;
  onPress?: () => void;
} & ExtraProps;

export const usePressable = ({
  onPress: onPress,
  id,
  tabbable = true,
  ...rest
}: PressableConfig) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // The action button is activated by space on the keyup event, but the
      // default action for space is already triggered on keydown. It needs to be
      // prevented to stop scrolling the page before activating the button.
      if (event.keyCode === KeyCode.Space) {
        event.preventDefault();
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

  return combine([
    {
      onKeyDown,
      onKeyUp,
      onClick: onPress,
    },
    focusProps,
    rest,
  ]);
};
