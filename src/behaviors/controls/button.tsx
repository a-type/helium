import { useCallback, ReactNode } from 'react';
import { BehaviorProps, ExtraProps } from '../../types';
import { useCompose, createBehavior } from '../util';
import { PressableConfig, usePressable } from '../basic/interaction';
import { useTextSize, TextSizeConfig, usePrimaryColors } from '../styling';
import { InterpolationWithTheme } from '@emotion/core';

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

export type ButtonConfig = PressableConfig &
  TextSizeConfig & {
    children: ReactNode;
    label?: string;
    primary?: boolean;
    buttonCss?: InterpolationWithTheme<any>;
  } & ExtraProps;

/**
 * Turns a component into a button.
 */
export const useButton = createBehavior(
  ({
    pressOnEnter = true,
    css,
    buttonCss = defaultButtonCss,
    primary,
    ...rest
  }: ButtonConfig): BehaviorProps =>
    useCompose<ButtonConfig>(
      {
        ...rest,
        pressOnEnter,
        role: 'button',
        tabIndex: 0,
        css: [buttonCss, css].filter(Boolean),
      },
      [usePressable, useTextSize, [usePrimaryColors, !primary]],
    ),
);

export type ToggleButtonConfig = ButtonConfig & {
  toggled: boolean;
  onChange: (toggleState: boolean) => void;
};

export const useToggleButton = createBehavior(
  ({
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
  },
);
