/**@jsx jsx */
import { forwardRef, ReactNode, useCallback } from 'react';
import {
  usePressable,
  useFocus,
  useTextSize,
  usePrimaryColors,
  TextSizeConfig,
  PressableConfig,
  FocusConfig,
} from '../primitives';
import { useCompose } from '../util';
import { jsx, InterpolationWithTheme } from '@emotion/core';

const defaultButtonCss = {
  background: 'var(--color-control-bg)',
  color: 'var(--color-control-fg)',
  borderColor: 'var(--color-control-border)',
  borderWidth: 'var(--border-width-normal)',
  borderStyle: 'solid',
  paddingTop: 'var(--size-spacing-md)',
  paddingBottom: 'var(--size-spacing-md)',
  paddingLeft: 'var(--size-spacing-lg)',
  paddingRight: 'var(--size-spacing-lg)',
};

export type ButtonProps = PressableConfig &
  FocusConfig &
  TextSizeConfig & {
    children: ReactNode;
    label?: string;
    primary?: boolean;
    buttonCss?: InterpolationWithTheme<any>;
  };

const useButton = (props: ButtonProps) =>
  useCompose<ButtonProps>(props, [
    usePressable,
    useFocus,
    useTextSize,
    [usePrimaryColors, !props.primary],
  ]);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { pressOnEnter = true, css, buttonCss = defaultButtonCss, ...props },
    ref,
  ) => {
    const buttonProps = useButton({
      pressOnEnter,
      css: [buttonCss, css].filter(Boolean),
      ref,
      ...props,
    });

    return <button {...buttonProps} />;
  },
);

export type ToggleButtonConfig = ButtonProps & {
  toggled: boolean;
  onChange: (toggleState: boolean) => void;
};

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonConfig>(
  ({ onPress: onPressed, onChange, toggled, ...rest }, ref) => {
    const combinedOnPressed = useCallback(() => {
      const isToggled = !toggled;
      onChange && onChange(isToggled);
      onPressed && onPressed();
    }, [onPressed, onChange, toggled]);

    const buttonProps = useButton({
      ...rest,
      onPress: combinedOnPressed,
      ref,
      'aria-pressed': toggled,
    });

    return <button {...buttonProps} />;
  },
);
