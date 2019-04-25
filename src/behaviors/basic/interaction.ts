import { useCallback } from 'react';
import { KeyCode } from '../../types';
import { useFocus } from './focus';
import { combine } from '../util';

export type PressableConfig = {
  id: string;
  tabbable?: boolean;
  onPress: () => void;
};

export const usePressable = ({
  onPress: onPressed,
  id,
  tabbable = true,
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
    [onPressed],
  );
  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === KeyCode.Space) {
        event.preventDefault();
        onPressed && onPressed();
      }
    },
    [onPressed],
  );
  const onClick = useCallback(() => onPressed(), [onPressed]);

  // pressable is intrinsically focusable
  const focusProps = useFocus({
    id,
    tabbable,
  });

  return combine([
    {
      onKeyDown,
      onKeyUp,
      onClick,
    },
    focusProps,
  ]);
};
