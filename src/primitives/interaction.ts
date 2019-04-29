import { useContext, useEffect, useRef } from 'react';
import { ExtraProps } from '../types';
import { combine, generateId } from '../util';
import { InterpolationWithTheme } from '@emotion/core';
import { FocusContext } from '../contexts/focus';

export const defaultFocusCss = {
  '&:focus': {
    outline: '0',
    boxShadow: '0 0 0 2px var(--color-control-effect-strong)', // FIXME
  },
  transition: '0.2s ease box-shadow',
};

export type FocusConfig = {
  id?: string;
  tabbable?: boolean;
  focusCss?: InterpolationWithTheme<any>;
} & ExtraProps;

export const useFocus = ({
  id: providedId,
  tabbable = true,
  focusCss = defaultFocusCss,
  ...rest
}: FocusConfig) => {
  const id = providedId || generateId('focusable');

  const focusContext = useContext(FocusContext);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    focusContext.register(id, elementRef);
    return () => focusContext.unregister(id);
  }, [elementRef]);

  return combine(
    {
      ref: elementRef,
      tabIndex: tabbable ? 0 : -1,
      css: focusCss,
    },
    rest,
  );
};
