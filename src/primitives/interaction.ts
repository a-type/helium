import { useContext, useEffect, useCallback, Ref } from 'react';
import { createBehavior, useRefOrProvided, useIdOrGenerated } from '../util';
import { InterpolationWithTheme } from '@emotion/core';
import { FocusContext } from '../contexts/focus';
import { KeyCode, BehaviorProps, BrandTheme } from '../types';
import { SelectionElementContext } from '../contexts/selection';

export const defaultFocusCss = (theme: BrandTheme) => ({
  '&:focus': {
    outline: '0',
    boxShadow: `0 0 0 2px ${theme.color.control.effectStrong}`, // FIXME
  },
  transition: '0.2s ease box-shadow',
});

export type FocusConfig<T extends HTMLElement> = {
  id?: string;
  tabbable?: boolean;
  focusCss?: InterpolationWithTheme<any>;
  ref?: Ref<T> | null;
} & BehaviorProps;

export const useFocus = <T extends HTMLElement>({
  id: providedId,
  tabbable = true,
  focusCss = defaultFocusCss,
  ref: providedRef,
}: FocusConfig<T>) => {
  const id = useIdOrGenerated(providedId, 'focusable');

  const focusContext = useContext(FocusContext);
  const ref = useRefOrProvided<T>(providedRef);

  useEffect(() => {
    focusContext.register(id, ref);
    return () => focusContext.unregister(id);
  }, [ref]);

  return {
    id,
    ref,
    tabIndex: tabbable ? 0 : -1,
    css: focusCss,
  };
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
  onPress?: () => void;
  pressOnEnter?: boolean;
  pressableCss?: InterpolationWithTheme<any>;
} & BehaviorProps;

export const usePressable = ({
  onPress,
  pressOnEnter = false,
  pressableCss = defaultPressableCss,
}: PressableConfig) => {
  const { onKeyDown, onKeyUp } = useA11yPressHandlers(onPress, pressOnEnter);

  return {
    onKeyDown,
    onKeyUp,
    onClick: onPress,
    css: pressableCss,
  };
};

export type SelectableItemConfig = {
  id?: string;
  selectableCss?: InterpolationWithTheme<BrandTheme>;
} & BehaviorProps;

const defaultSelectableCss = (theme: BrandTheme) => ({
  userSelect: 'none',
  cursor: 'pointer',
  '&[aria-selected="true"]': {
    background: theme.color.selection.bg,
    color: theme.color.selection.fg,
  },
});

export const useSelectableItem = createBehavior<SelectableItemConfig>(
  ({ id: providedId, selectableCss = defaultSelectableCss }) => {
    const id = useIdOrGenerated(providedId, 'selectableItem');
    const keyboardContext = useContext(SelectionElementContext);

    useEffect(() => {
      if (!keyboardContext) {
        return;
      }

      keyboardContext.registerElement(id);
      return () => {
        if (keyboardContext) {
          keyboardContext.unregisterElement(id);
        }
      };
    }, [keyboardContext.id, id]);

    return {
      id: id,
      'aria-selected': keyboardContext && id === keyboardContext.selectedId,
      css: selectableCss,
    };
  },
);

export type EscapableConfig = {
  id?: string;
  ref?: Ref<HTMLElement>;
  onEscape(): void;
  escapeKeys?: KeyCode[];
} & BehaviorProps;

export const useEscapable = createBehavior<EscapableConfig>(
  ({
    id: providedId,
    ref: providedRef,
    onEscape,
    escapeKeys = [KeyCode.Escape],
  }) => {
    const ref = useRefOrProvided<HTMLElement>(providedRef);
    const id = useIdOrGenerated(providedId, 'escapable');

    if (typeof ref === 'function') {
      throw new Error('Function refs are not compatible with useEscapable');
    }

    const handleKeyDown = useCallback(
      (ev: KeyboardEvent) => {
        if (escapeKeys.includes(ev.keyCode)) {
          ev.preventDefault();
          onEscape();
        }
      },
      [onEscape],
    );

    useEffect(() => {
      const handleMouseDown = (ev: MouseEvent) => {
        if (ref && ref.current && ref.current.contains(ev.target as Node)) {
          return;
        }

        onEscape();
      };

      document.addEventListener('mousedown', handleMouseDown);
      return () => {
        document.removeEventListener('mousedown', handleMouseDown);
      };
    }, [ref && ref.current, onEscape]);

    return {
      id,
      ref: ref,
      onKeyDown: handleKeyDown,
    };
  },
);
