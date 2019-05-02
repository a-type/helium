import React, {
  Ref,
  createContext,
  FC,
  useContext,
  useState,
  RefObject,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { KeyCode } from '../types';
import { generateId } from '../util';

export type KeyboardContextParentView = {
  focusFirst(): void;
};

export type KeyboardContextValue = {
  registerElement(elementId: string, elementRef: Ref<HTMLElement> | null): void;
  unregisterElement(elementId: string): void;
  registerKeyboardGroup(groupId: string, view: KeyboardContextParentView): void;
  unregisterKeyboardGroup(groupId: string): void;
  onKeyDown(ev: KeyboardEvent): void;
  onKeyUp(ev: KeyboardEvent): void;
  goToNextSibling(groupId: string): void;
  goToPreviousSibling(groupId: string): void;
};

export const KeyboardContext = createContext<KeyboardContextValue | null>(null);

export type KeyboardProviderProps = {
  direction?: 'row' | 'column';
  groupId?: string;
};

export const KeyboardProvider: FC<KeyboardProviderProps> = ({
  direction = 'row',
  groupId: providedGroupId,
  children,
}) => {
  const nextKeyCode =
    direction === 'row' ? KeyCode.ArrowRight : KeyCode.ArrowDown;
  const previousKeyCode =
    direction === 'row' ? KeyCode.ArrowLeft : KeyCode.ArrowUp;
  const nextSiblingKeyCode =
    direction === 'row' ? KeyCode.ArrowDown : KeyCode.ArrowRight;
  const previousSiblingKeyCode =
    direction === 'row' ? KeyCode.ArrowUp : KeyCode.ArrowLeft;

  const groupId = useRef<string>(
    providedGroupId || generateId('keyboardGroup'),
  );

  const parent = useContext(KeyboardContext);
  const elementsRef = useRef<
    { ref: RefObject<HTMLElement>; id: string }[] | null
  >([]);
  const childContextsRef = useRef<
    { id: string; view: KeyboardContextParentView }[] | null
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
    const idx = (elementsRef.current || []).findIndex(
      ({ id }) => id !== elementId,
    );
    const newElements = (elementsRef.current || []).splice(idx, 1);
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
    const idx = (elementsRef.current || []).findIndex(
      ({ id }) => id === targetId,
    );

    if (event.keyCode === nextKeyCode) {
      const nextIdx = Math.min(idx + 1, (elementsRef.current || []).length - 1);
      const focusElement = (elementsRef.current || [])[nextIdx].ref.current;
      if (focusElement) {
        focusElement.focus();
      }
      event.preventDefault();
    } else if (event.keyCode === previousKeyCode) {
      const previousIdx = Math.max(0, idx - 1);
      const focusElement = (elementsRef.current || [])[previousIdx].ref.current;
      if (focusElement) {
        focusElement.focus();
      }
      event.preventDefault();
    } else if (parent && event.keyCode === nextSiblingKeyCode) {
      parent.goToNextSibling(groupId.current);
      event.preventDefault();
    } else if (parent && event.keyCode === previousSiblingKeyCode) {
      parent.goToPreviousSibling(groupId.current);
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

  const goToNextSibling = (groupId: string) => {
    const idx = (childContextsRef.current || []).findIndex(
      ({ id }) => id === groupId,
    );
    if (idx !== -1 && idx < (childContextsRef.current || []).length - 1) {
      (childContextsRef.current || [])[idx + 1].view.focusFirst();
    }
  };

  const goToPreviousSibling = (groupId: string) => {
    const idx = (childContextsRef.current || []).findIndex(
      ({ id }) => id === groupId,
    );
    if (idx > 0) {
      (childContextsRef.current || [])[idx - 1].view.focusFirst();
    }
  };

  const focusFirst = () => {
    if (!elementsRef.current || !elementsRef.current.length) {
      return;
    }

    const firstElement = (elementsRef.current || [])[0].ref.current;
    if (firstElement) {
      firstElement.focus();
    }
  };

  useEffect(() => {
    if (parent) {
      parent.registerKeyboardGroup(groupId.current, { focusFirst });
    }

    return () => {
      if (parent) parent.unregisterKeyboardGroup(groupId.current);
    };
  }, [parent, groupId, focusFirst]);

  const value = {
    registerElement,
    unregisterElement,
    onKeyUp,
    onKeyDown,
    registerKeyboardGroup,
    unregisterKeyboardGroup,
    goToNextSibling,
    goToPreviousSibling,
  };

  return (
    <KeyboardContext.Provider value={value}>
      {children}
    </KeyboardContext.Provider>
  );
};
