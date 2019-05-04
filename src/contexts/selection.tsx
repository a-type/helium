import React, {
  createContext,
  FC,
  useContext,
  useRef,
  useEffect,
  useState,
  Ref,
  RefObject,
} from 'react';
import { KeyCode } from '../types';
import {
  getNextIndex,
  getPreviousIndex,
  useIdOrGenerated,
  useRefOrProvided,
} from '../util';

export type SelectionContextParentView = {
  selectIndex(index: number): void;
  focus(): void;
};

export type SelectionRootContextValue = {
  registerSelectionGroup(
    groupId: string,
    view: SelectionContextParentView,
  ): void;
  unregisterSelectionGroup(groupId: string): void;
  goToNextGroup(groupId: string, currentIndex: number): boolean;
  goToPreviousGroup(groupId: string, currentIndex: number): boolean;
};

export type SelectionGroupContextValue = {
  onKeyDown(ev: KeyboardEvent): void;
  onKeyUp(ev: KeyboardEvent): void;
  onMouseDown(ev: MouseEvent): void;
  id: string;
  selectedId: string | null;
  selectedIndex: number;
  registerGroupElement(elementRef: Ref<HTMLElement>): void;
};

export type SelectionElementContextValue = {
  registerElement(elementId: string): void;
  unregisterElement(elementId: string): void;
  selectedId: string | null;
  id: string;
};

export const SelectionRootContext = createContext<SelectionRootContextValue | null>(
  null,
);
export const SelectionGroupContext = createContext<SelectionGroupContextValue>({
  onKeyDown: () => {},
  onKeyUp: () => {},
  onMouseDown: () => {},
  registerGroupElement: () => {},
  id: 'none',
  selectedId: null,
  selectedIndex: -1,
});
export const SelectionElementContext = createContext<
  SelectionElementContextValue
>({
  registerElement: () => {},
  unregisterElement: () => {},
  id: 'none',
  selectedId: null,
});

export type SelectionRootProviderProps = {
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
export const SelectionRootProvider: FC<SelectionRootProviderProps> = ({
  wrap = true,
  grid = false,
  children,
}) => {
  const childContextsRef = useRef<
    { id: string; view: SelectionContextParentView }[] | null
  >([]);

  const registerSelectionGroup = (
    groupId: string,
    view: SelectionContextParentView,
  ) => {
    childContextsRef.current = [
      ...(childContextsRef.current || []),
      { id: groupId, view },
    ];
  };

  const unregisterSelectionGroup = (groupId: string) => {
    childContextsRef.current = (childContextsRef.current || []).filter(
      ({ id }) => id !== groupId,
    );
  };

  const goToNextGroup = (groupId: string, currentIndex: number) => {
    const childGroups = childContextsRef.current || [];
    const idx = childGroups.findIndex(({ id }) => id === groupId);
    const nextIdx = getNextIndex(idx, childGroups.length, wrap);
    if (childGroups[nextIdx]) {
      childGroups[idx].view.selectIndex(-1);
      childGroups[nextIdx].view.selectIndex(grid ? currentIndex : 0);
      childGroups[nextIdx].view.focus();
      return true;
    }

    return false;
  };

  const goToPreviousGroup = (groupId: string, currentIndex: number) => {
    const childGroups = childContextsRef.current || [];
    const idx = childGroups.findIndex(({ id }) => id === groupId);
    const previousIdx = getPreviousIndex(idx, childGroups.length, wrap);
    if (childGroups[previousIdx]) {
      childGroups[idx].view.selectIndex(-1);
      childGroups[previousIdx].view.selectIndex(grid ? currentIndex : 0);
      childGroups[previousIdx].view.focus();
      return true;
    }

    return false;
  };

  const value = {
    registerSelectionGroup,
    unregisterSelectionGroup,
    goToNextGroup,
    goToPreviousGroup,
  };

  return (
    <SelectionRootContext.Provider value={value}>
      {children}
    </SelectionRootContext.Provider>
  );
};

export type SelectionGroupProviderProps = {
  groupId?: string;
  axis?: 'horizontal' | 'vertical';
  wrap?: boolean;
  onSelectionChanged?(selection: { id: string | null; index: number }): void;
  selectedIndex: number;
};

/**
 * The Keyboard Group Provider manages a context for contained elements which
 * use the useKeyboardNavigable behavior. It listens for key events and moves
 * focus between elements. It also uses orthogonal keyboard movement (i.e. pressing
 * "up" on a horizontal group) to signal to an optional Keyboard Root Provider to
 * transition focus to the next sibling Keyboard Group. If no Root is present,
 * orthogonal keyboard navigation will not do anything.
 */
export const SelectionGroupProvider: FC<SelectionGroupProviderProps> = ({
  groupId: providedGroupId,
  axis = 'horizontal',
  wrap = true,
  onSelectionChanged,
  selectedIndex,
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
  const [groupElementRef, setGroupElementRef] = useState<RefObject<
    HTMLElement
  > | null>(null);

  const registerGroupElement = (elementRef: Ref<HTMLElement>) => {
    if (typeof elementRef === 'function' || typeof elementRef === 'string') {
      // FIXME?
      throw new Error('Only object refs are supported on selection groups');
    }

    setGroupElementRef(elementRef);
  };

  const parent = useContext(SelectionRootContext);
  const [elements, setElements] = useState<string[]>([]);

  const selectedId = elements[selectedIndex];

  const registerElement = (elementId: string) => {
    setElements(oldElements => [...oldElements, elementId]);
  };

  const unregisterElement = (elementId: string) => {
    const idx = elements.findIndex(id => id === elementId);
    setElements(oldElements => [
      ...oldElements.slice(0, idx),
      ...oldElements.slice(idx + 1),
    ]);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const idx = selectedIndex;

    if (event.keyCode === nextKeyCode) {
      const nextIdx = getNextIndex(idx, elements.length, wrap);
      const selectElement = elements[nextIdx];
      if (selectElement) {
        onSelectionChanged &&
          onSelectionChanged({
            id: selectElement,
            index: nextIdx,
          });
      }
      event.preventDefault();
    } else if (event.keyCode === previousKeyCode) {
      const previousIdx = getPreviousIndex(idx, elements.length, wrap);
      const selectElement = elements[previousIdx];
      if (selectElement) {
        onSelectionChanged &&
          onSelectionChanged({
            id: selectElement,
            index: previousIdx,
          });
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
    if (
      // isFocusedElement &&
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

  const onMouseDown = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    const matchingElementIndex = elements.findIndex(
      elementId => elementId === element.id,
    );
    if (matchingElementIndex >= 0) {
      onSelectionChanged &&
        onSelectionChanged({
          index: matchingElementIndex,
          id: element.id,
        });
    }
  };

  const selectIndex = (index: number) => {
    if (index === -1) {
      onSelectionChanged &&
        onSelectionChanged({
          index,
          id: null,
        });
    }

    let selectedElement;
    // falls back to last element if there aren't enough elements to fulfill index
    if (!elements[index] && elements.length) {
      selectedElement = elements[elements.length - 1];
    } else {
      selectedElement = elements[index];
    }

    if (selectedElement) {
      onSelectionChanged &&
        onSelectionChanged({
          index,
          id: selectedElement,
        });
    }
  };

  const focus = () => {
    if (groupElementRef && groupElementRef.current) {
      groupElementRef.current.focus();
    }
  };

  useEffect(() => {
    if (parent) {
      parent.registerSelectionGroup(groupId, { selectIndex, focus });
    }

    return () => {
      if (parent) parent.unregisterSelectionGroup(groupId);
    };
  }, [parent, groupId, selectIndex]);

  const groupValue = {
    onKeyUp,
    onKeyDown,
    id: groupId,
    selectedId,
    selectedIndex,
    onMouseDown,
    registerGroupElement,
  };

  const elementValue = {
    id: groupId,
    selectedId,
    registerElement,
    unregisterElement,
  };

  return (
    <SelectionGroupContext.Provider value={groupValue}>
      <SelectionElementContext.Provider value={elementValue}>
        {children}
      </SelectionElementContext.Provider>
    </SelectionGroupContext.Provider>
  );
};
