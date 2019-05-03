import React, {
  Ref,
  createContext,
  FC,
  useContext,
  RefObject,
  useRef,
  useEffect,
} from 'react';
import { KeyCode } from '../types';
import {
  generateId,
  getNextIndex,
  getPreviousIndex,
  useIdOrGenerated,
} from '../util';

export type KeyboardContextParentView = {
  focusIndex(index: number): void;
};

export type KeyboardRootContextValue = {
  registerKeyboardGroup(groupId: string, view: KeyboardContextParentView): void;
  unregisterKeyboardGroup(groupId: string): void;
  goToNextGroup(groupId: string, currentIndex: number): void;
  goToPreviousGroup(groupId: string, currentIndex: number): void;
};

export type KeyboardGroupContextValue = {
  registerElement(elementId: string, elementRef: Ref<HTMLElement> | null): void;
  unregisterElement(elementId: string): void;
  onKeyDown(ev: KeyboardEvent): void;
  onKeyUp(ev: KeyboardEvent): void;
  id: string;
};

export const KeyboardRootContext = createContext<KeyboardRootContextValue | null>(
  null,
);
export const KeyboardGroupContext = createContext<KeyboardGroupContextValue>({
  registerElement: () => {},
  unregisterElement: () => {},
  onKeyDown: () => {},
  onKeyUp: () => {},
  id: 'none',
});

export type KeyboardRootProviderProps = {
  wrap?: boolean;
  /**
   * Useful for tabular layouts, this will preserve the column or row of the
   * focused element as focus moves between groups. So if you press "up" on column 2 of
   * row 3, focus will move to column 2 of row 2. If "grid" is not provided, focus will
   * jump to the first child of the sibling group.
   */
  grid?: boolean;
};

/**
 * The Keyboard Root Provider is designed to be a root context for multiple
 * Keyboard Group Providers. The Groups have a particular axis (horizontal or vertical).
 * When the user presses a key orthogonal to that axis (like pressing "up" on a horizontal
 * group), this context will manage the movement of focus to the next or previous
 * sibling group. Groups register with the Root automatically, so just wrap them
 * in the React tree and you're good to go.
 */
export const KeyboardRootProvider: FC<KeyboardRootProviderProps> = ({
  wrap = true,
  grid = false,
  children,
}) => {
  const childContextsRef = useRef<
    { id: string; view: KeyboardContextParentView }[] | null
  >([]);

  const registerKeyboardGroup = (
    groupId: string,
    view: KeyboardContextParentView,
  ) => {
    childContextsRef.current = [
      ...(childContextsRef.current || []),
      { id: groupId, view },
    ];
  };

  const unregisterKeyboardGroup = (groupId: string) => {
    childContextsRef.current = (childContextsRef.current || []).filter(
      ({ id }) => id !== groupId,
    );
  };

  const goToNextGroup = (groupId: string, currentIndex: number) => {
    const childGroups = childContextsRef.current || [];
    const idx = childGroups.findIndex(({ id }) => id === groupId);
    const nextIdx = getNextIndex(idx, childGroups.length, wrap);
    if (childGroups[nextIdx]) {
      childGroups[nextIdx].view.focusIndex(grid ? currentIndex : 0);
    }
  };

  const goToPreviousGroup = (groupId: string, currentIndex: number) => {
    const childGroups = childContextsRef.current || [];
    const idx = childGroups.findIndex(({ id }) => id === groupId);
    const previousIdx = getPreviousIndex(idx, childGroups.length, wrap);
    if (childGroups[previousIdx]) {
      childGroups[previousIdx].view.focusIndex(grid ? currentIndex : 0);
    }
  };

  const value = {
    registerKeyboardGroup,
    unregisterKeyboardGroup,
    goToNextGroup,
    goToPreviousGroup,
  };

  return (
    <KeyboardRootContext.Provider value={value}>
      {children}
    </KeyboardRootContext.Provider>
  );
};

export type KeyboardGroupProviderProps = {
  groupId?: string;
  axis?: 'horizontal' | 'vertical';
  wrap?: boolean;
};

/**
 * The Keyboard Group Provider manages a context for contained elements which
 * use the useKeyboardNavigable behavior. It listens for key events and moves
 * focus between elements. It also uses orthogonal keyboard movement (i.e. pressing
 * "up" on a horizontal group) to signal to an optional Keyboard Root Provider to
 * transition focus to the next sibling Keyboard Group. If no Root is present,
 * orthogonal keyboard navigation will not do anything.
 */
export const KeyboardGroupProvider: FC<KeyboardGroupProviderProps> = ({
  groupId: providedGroupId,
  axis = 'horizontal',
  wrap = true,
  children,
}) => {
  const nextKeyCode =
    axis === 'horizontal' ? KeyCode.ArrowRight : KeyCode.ArrowDown;
  const previousKeyCode =
    axis === 'horizontal' ? KeyCode.ArrowLeft : KeyCode.ArrowUp;
  const nextSiblingKeyCode =
    axis === 'horizontal' ? KeyCode.ArrowDown : KeyCode.ArrowRight;
  const previousSiblingKeyCode =
    axis === 'horizontal' ? KeyCode.ArrowUp : KeyCode.ArrowLeft;

  const groupId = useIdOrGenerated(providedGroupId, 'keyboardGroup');

  const parent = useContext(KeyboardRootContext);
  const elementsRef = useRef<
    { ref: RefObject<HTMLElement>; id: string }[] | null
  >([]);

  const registerElement = (elementId: string, elementRef: Ref<HTMLElement>) => {
    if (typeof elementRef === 'function' || typeof elementRef === 'string') {
      throw new Error('Only object refs are supported');
    }

    if (!elementRef) {
      return;
    }

    elementsRef.current = [
      ...(elementsRef.current || []),
      { id: elementId, ref: elementRef },
    ];
  };

  const unregisterElement = (elementId: string) => {
    const elements = elementsRef.current || [];

    const idx = elements.findIndex(({ id }) => id === elementId);
    const newElements = [...elements.slice(0, idx), ...elements.slice(idx + 1)];
    const focusIdx = Math.min(idx, newElements.length - 1);

    // TODO: more robust fallback
    if (newElements[focusIdx]) {
      const focusElement = newElements[focusIdx].ref.current;
      if (focusElement !== null) {
        focusElement.focus();
      }
    }

    elementsRef.current = newElements;
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const targetId = (event.target as HTMLElement).id;
    const elements = elementsRef.current || [];
    const idx = elements.findIndex(({ id }) => id === targetId);

    if (event.keyCode === nextKeyCode) {
      const nextIdx = getNextIndex(idx, elements.length, wrap);
      const focusElement = elements[nextIdx].ref.current;
      if (focusElement) {
        focusElement.focus();
      }
      event.preventDefault();
    } else if (event.keyCode === previousKeyCode) {
      const previousIdx = getPreviousIndex(idx, elements.length, wrap);
      const focusElement = elements[previousIdx].ref.current;
      if (focusElement) {
        focusElement.focus();
      }
      event.preventDefault();
    } else if (parent && event.keyCode === nextSiblingKeyCode) {
      parent.goToNextGroup(groupId, idx);
      event.preventDefault();
    } else if (parent && event.keyCode === previousSiblingKeyCode) {
      parent.goToPreviousGroup(groupId, idx);
      event.preventDefault();
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
    const hasFocusedElement = (elementsRef.current || []).some(
      ({ ref }) => !!ref.current && !!ref.current.getAttribute('focus'),
    );

    if (
      hasFocusedElement &&
      [nextKeyCode, previousKeyCode].includes(event.keyCode)
    ) {
      event.preventDefault();
    } else if (
      [
        KeyCode.Enter,
        KeyCode.Escape,
        nextSiblingKeyCode,
        previousSiblingKeyCode,
      ].includes(event.keyCode)
    ) {
      event.preventDefault();
    }
  };

  const focusIndex = (index: number) => {
    if (!elementsRef.current || !elementsRef.current.length) {
      return;
    }

    const elements = elementsRef.current || [];
    let focusElement: HTMLElement | null;
    // falls back to last element if there aren't enough elements to fulfill index
    if (!elements[index] && elements.length) {
      focusElement = elements[elements.length - 1].ref.current;
    } else {
      focusElement = elements[index].ref.current;
    }

    if (focusElement) {
      focusElement.focus();
    }
  };

  useEffect(() => {
    if (parent) {
      parent.registerKeyboardGroup(groupId, { focusIndex });
    }

    return () => {
      if (parent) parent.unregisterKeyboardGroup(groupId);
    };
  }, [parent, groupId, focusIndex]);

  const value = {
    registerElement,
    unregisterElement,
    onKeyUp,
    onKeyDown,
    id: groupId,
  };

  return (
    <KeyboardGroupContext.Provider value={value}>
      {children}
    </KeyboardGroupContext.Provider>
  );
};
