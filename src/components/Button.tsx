/**@jsx jsx */
import { forwardRef, ReactNode, useCallback } from 'react';
import {
  usePressable,
  useFocus,
  useText,
  TextConfig,
  PressableConfig,
  FocusConfig,
  useSpacing,
  SpacingConfig,
  useTheme,
  useToggleable,
} from '../primitives';
import { useAll } from '../util';
import { jsx, InterpolationWithTheme } from '@emotion/core';
import { BrandTheme, BehaviorProps } from '../types';
import { ThemeProvider } from '../contexts';

const defaultButtonCss = (theme: BrandTheme) => ({
  background: theme.color.control.bg,
  color: theme.color.control.fg,
  borderColor: theme.color.control.border,
  borderWidth: theme.size.borderWidth.normal,
  borderStyle: 'solid',
});

const defaultButtonPrimaryCss = (theme: BrandTheme) => ({
  background: theme.color.control.primary.bg,
  color: theme.color.control.primary.fg,
  borderColor: theme.color.control.primary.border,
});

export type ButtonProps = PressableConfig &
  FocusConfig &
  TextConfig &
  SpacingConfig & {
    children: ReactNode;
    label?: string;
    primary?: boolean;
  } & BehaviorProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ pressOnEnter = true, css, primary, ...props }, ref) => {
    const buttonProps = useAll<ButtonProps>(
      {
        pressOnEnter,
        css: Array<InterpolationWithTheme<any>>()
          .concat(defaultButtonCss)
          .concat(primary ? defaultButtonPrimaryCss : null)
          .concat(css)
          .filter(Boolean),
        padding: {
          vertical: 'md',
          horizontal: 'lg',
        },
        ref,
        ...props,
      },
      [usePressable, useFocus, useText, useSpacing],
    );

    return <button {...buttonProps} />;
  },
);

export type ToggleButtonConfig = ButtonProps & {
  toggled: boolean;
  onChange: (toggleState: boolean) => void;
  value?: string;
};

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonConfig>(
  ({ onPress, onChange, toggled, value, css, ...rest }, ref) => {
    const toggleProps = useToggleable({ toggled, onChange, value });

    return (
      <Button
        {...rest}
        css={css as any}
        {...toggleProps}
        ref={ref}
        aria-pressed={toggled}
      />
    );
  },
);
