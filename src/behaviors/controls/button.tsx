import { useCallback, KeyboardEvent, HTMLAttributes, ReactNode } from 'react';
import { KeyCode, BehaviorProps, ExtraProps } from '../../types';
import { combine } from '../util';
import { PressableConfig, usePressable } from '../basic/interaction';

export type ButtonConfig = PressableConfig & {
  children: ReactNode;
  label?: string;
} & ExtraProps;

/**
 * Turns a component into a button.
 */
export const useButton = ({
  onPress: onPressed,
  id,
  label,
  children,
  tabbable,
  ...rest
}: ButtonConfig): BehaviorProps => {
  /**
   * referencing https://www.w3.org/TR/wai-aria-practices/examples/button/button.html
   */
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === KeyCode.Enter) {
        event.preventDefault();
        onPressed && onPressed();
      }
    },
    [onPressed],
  );

  const baseButtonProps = {
    role: 'button',
    tabIndex: 0,
    onKeyDown,
    children,
    label,
    id,
  };

  const pressableProps = usePressable({
    onPress: onPressed,
    id,
    tabbable,
  });

  return combine([baseButtonProps, pressableProps, rest]);
};

export type ToggleButtonConfig = ButtonConfig & {
  toggled: boolean;
  onChange: (toggleState: boolean) => void;
};

export const useToggleButton = ({
  onPress: onPressed,
  onChange,
  toggled,
  ...rest
}: ToggleButtonConfig): BehaviorProps => {
  const combinedOnPressed = useCallback(() => {
    const isToggled = !toggled;
    onChange && onChange(isToggled);
    onPressed && onPressed();
  }, [onPressed, onChange, toggled]);

  return useButton({
    ...rest,
    onPress: combinedOnPressed,
    'aria-pressed': toggled,
  });
};
