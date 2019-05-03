import React, {
  createContext,
  FC,
  RefObject,
  useState,
  useCallback,
  Ref,
  useContext,
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
  const [elements, setElements] = useState<{
    [name: string]: RefObject<HTMLElement> | null;
  }>({});

  const register = useCallback(
    (elementId: string, elementRef: Ref<HTMLElement>) => {
      if (typeof elementRef === 'function' || typeof elementRef === 'string') {
        throw new Error('Only object refs are supported');
      }

      setElements({
        ...elements,
        [elementId]: elementRef,
      });
    },
    [elements, setElements],
  );

  const unregister = useCallback(
    (elementId: string) => {
      delete elements[elementId];
      setElements(elements);
    },
    [elements, setElements],
  );

  const focus = useCallback(
    (elementId: string) => {
      const elementRef = elements[elementId];
      if (elementRef && elementRef.current) {
        elementRef.current.focus();
      } else {
        console.debug(
          `Tried to focus element ${elementId}, but it was not found in focus group${
            groupName ? ` "${groupName}"` : ''
          }`,
        );
      }
    },
    [elements],
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

export const useFocusElement = () => {
  const focusContext = useContext(FocusContext);

  return focusContext.focus;
};
