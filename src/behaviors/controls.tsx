import {
  useCallback,
  KeyboardEvent,
  BaseSyntheticEvent,
  HTMLAttributes,
} from 'react';
import { KeyCode } from '../types';

export type ButtonConfig = {
  onPressed: (event: BaseSyntheticEvent) => void;
};
/**
 * Turns a component into a button.
 */
export const useButton = ({
  onPressed,
}: ButtonConfig): HTMLAttributes<HTMLElement> => {
  /**
   * referencing https://www.w3.org/TR/wai-aria-practices/examples/button/button.html
   */
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    // The action button is activated by space on the keyup event, but the
    // default action for space is already triggered on keydown. It needs to be
    // prevented to stop scrolling the page before activating the button.
    if (event.keyCode === KeyCode.Space) {
      event.preventDefault();
    } else if (event.keyCode === KeyCode.Enter) {
      event.preventDefault();
      onPressed(event);
    }
  }, []);
  const onKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.keyCode === KeyCode.Space) {
      event.preventDefault();
      onPressed(event);
    }
  }, []);

  return {
    role: 'button',
    tabIndex: 0,
    onKeyDown,
    onKeyUp,
  };
};
