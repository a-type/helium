import {
  useCallback,
  KeyboardEvent,
  BaseSyntheticEvent,
  HTMLAttributes,
  ReactNode,
  useState,
} from 'react';
import { KeyCode, BehaviorProps } from '../../types';
import { useFocus } from '../focus';
import { combine } from '../util';

export type ButtonConfig = {
  onPressed?: (event: BaseSyntheticEvent) => void;
  name: string;
  children: ReactNode;
  label?: string;
};

/**
 * Turns a component into a button.
 */
export const useButton = (
  { onPressed, name, label, children }: ButtonConfig,
  extraProps: BehaviorProps = {},
): HTMLAttributes<HTMLElement> => {
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
      } else if (event.keyCode === KeyCode.Enter) {
        event.preventDefault();
        onPressed && onPressed(event);
      }
    },
    [onPressed],
  );
  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === KeyCode.Space) {
        event.preventDefault();
        onPressed && onPressed(event);
      }
    },
    [onPressed],
  );

  const baseButtonProps = {
    role: 'button',
    tabIndex: 0,
    onKeyDown,
    onKeyUp,
    onClick: onPressed,
    children,
    label,
  };

  const focusProps = useFocus({
    name,
    tabbable: true,
  });

  return combine([baseButtonProps, focusProps, extraProps]);
};

export type ToggleButtonConfig = ButtonConfig & {
  onToggled?: (toggleState: boolean) => void;
};

export const useToggleButton = (
  { onPressed, onToggled, ...rest }: ToggleButtonConfig,
  extraProps: BehaviorProps = {},
): HTMLAttributes<HTMLElement> => {
  const [toggled, setToggled] = useState(false);

  const combinedOnPressed = useCallback(
    ev => {
      const isToggled = !toggled;
      setToggled(isToggled);
      onToggled && onToggled(isToggled);
      onPressed && onPressed(ev);
    },
    [onPressed, onToggled, setToggled, toggled],
  );

  return useButton(
    {
      ...rest,
      onPressed: combinedOnPressed,
    },
    {
      ...extraProps,
      'aria-pressed': toggled,
    },
  );
};
