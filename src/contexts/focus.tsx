import React, {
  createContext,
  FC,
  RefObject,
  useCallback,
  Ref,
  useContext,
  useRef,
} from 'react';

export type FocusContextValue = {
  groupName: string | null;
  register(elementId: string, elementRef: Ref<HTMLElement> | null): void;
  unregister(elementId: string): void;
  focus(elementId: string): void;
};

export const FocusContext = createContext<FocusContextValue>({
  groupName: null,
  register: () => {},
  unregister: () => {},
  focus: () => {},
});

export type FocusProviderProps = {
  groupName?: string;
};

export const FocusProvider: FC<FocusProviderProps> = ({
  groupName,
  ...rest
}) => {
  const elementsRef = useRef<{
    [name: string]: RefObject<HTMLElement> | null;
  }>({});

  const register = useCallback(
    (elementId: string, elementRef: Ref<HTMLElement>) => {
      if (typeof elementRef === 'function' || typeof elementRef === 'string') {
        throw new Error('Only object refs are supported');
      }

      elementsRef.current = {
        ...elementsRef.current,
        [elementId]: elementRef,
      };
    },
    [elementsRef],
  );

  const unregister = useCallback(
    (elementId: string) => {
      delete elementsRef.current[elementId];
    },
    [elementsRef],
  );

  const focus = useCallback(
    (elementId: string) => {
      const elementRef = elementsRef.current[elementId];
      console.log(elementRef);
      if (elementRef && elementRef.current) {
        console.debug('imperatively focusing ', elementRef.current);
        elementRef.current.focus();
      } else {
        console.debug(
          `Tried to focus element ${elementId}, but it was not found in focus group${
            groupName ? ` "${groupName}"` : ''
          }`,
        );
      }
    },
    [elementsRef],
  );

  return (
    <FocusContext.Provider
      {...rest}
      value={{
        register,
        unregister,
        focus,
        groupName: groupName || null,
      }}
    />
  );
};

export const useImperativeFocus = () => {
  const focusContext = useContext(FocusContext);

  return focusContext.focus;
};
