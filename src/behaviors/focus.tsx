import React, { useContext, useRef, useEffect } from 'react';
import { createContext, FC, RefObject, useState, useCallback } from 'react';

export type FocusContextValue = {
  groupName: string | null;
  register(elementName: string, elementRef: RefObject<HTMLElement>): void;
  unregister(elementName: string): void;
  focus(elementName: string): void;
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
    [name: string]: RefObject<HTMLElement>;
  }>({});

  const register = useCallback(
    (elementName: string, elementRef: RefObject<HTMLElement>) => {
      setElements({
        ...elements,
        [elementName]: elementRef,
      });
    },
    [elements, setElements],
  );

  const unregister = useCallback(
    (elementName: string) => {
      delete elements[elementName];
      setElements(elements);
    },
    [elements, setElements],
  );

  const focus = useCallback(
    (elementName: string) => {
      const elementRef = elements[elementName];
      if (elementRef && elementRef.current) {
        elementRef.current.focus();
      } else {
        console.debug(
          `Tried to focus element ${elementName}, but it was not found in focus group${
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

export type UseFocusConfig = {
  name: string;
  tabbable?: boolean;
};

export const useFocus = ({ name, tabbable = true }: UseFocusConfig) => {
  const focusContext = useContext(FocusContext);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    focusContext.register(name, elementRef);
    return () => focusContext.unregister(name);
  }, [elementRef]);

  return {
    ref: elementRef,
    tabIndex: tabbable ? 0 : -1,
  };
};
