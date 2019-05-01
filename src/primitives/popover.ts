import { BehaviorProps } from '../types';
import { createBehavior } from '../util';
import {
  useRef,
  useEffect,
  RefObject,
  useState,
  useMemo,
  useLayoutEffect,
} from 'react';
import Popper, { PopperOptions } from 'popper.js';
import ResizeObserver from 'resize-observer-polyfill';

export type PopoverAnchorConfig = {} & BehaviorProps;

export const usePopoverAnchor = createBehavior(
  ({ ref }: PopoverAnchorConfig = {}) => {
    const anchorRef = useRef<HTMLElement>(ref || null);

    return {
      ref: anchorRef,
    };
  },
);

export type PopoverConfig = {
  anchorRef: RefObject<HTMLElement>;
  popper?: PopperOptions;
  placement?: Popper.Placement;
  offset?: string | number;
  overflowPadding?: number;
  flip?: boolean;
  inner?: boolean;
  fast?: boolean;
} & BehaviorProps;

const createBasePopperOptions = (props: PopoverConfig): Popper.PopperOptions =>
  props.popper || {
    placement: props.placement || 'bottom',
    modifiers: {
      shift: {
        enabled: true,
      },
      offset: {
        enabled: !!props.offset,
        offset: props.offset,
      },
      preventOverflow: {
        enabled: true,
        padding: props.overflowPadding || 5,
      },
      flip: {
        enabled: props.flip === undefined || props.flip,
        padding: props.overflowPadding || 5,
      },
      inner: {
        enabled: props.inner,
      },
    },
  };

/**
 * Turns a component into a popover, anchored to another component. This hook must be
 * used in conjunction with usePopoverAnchor.
 *
 * Props control the underlying Popper.js instance. The 'fast' prop (on by default)
 * makes this behavior modify the DOM directly, bypassing React render cycle. If you
 * want your component to re-render when Popper positioning changes, set 'fast' to false.
 */
export const usePopover = createBehavior((props: PopoverConfig) => {
  const { anchorRef, fast = true } = props;

  const popoverRef = useRef<HTMLElement>(null);
  const popperInstanceRef = useRef<Popper | null>(null);
  /**
   * NOTE: if props.fast === true, we never set this data, we bypass
   * React altogether and apply styles directly to ref element
   */
  const [popperData, setPopperData] = useState<Popper.Data | null>(null);
  const popperConfig = useMemo(() => createBasePopperOptions(props), [
    props.popper,
    props.placement,
    props.offset,
    props.overflowPadding,
    props.flip,
    props.inner,
  ]);

  useLayoutEffect(() => {
    if (!anchorRef.current || !popoverRef.current) {
      return;
    }

    const updateState = (data: Popper.Data) => {
      if (fast && popoverRef.current) {
        popoverRef.current.setAttribute('data-placement', data.placement);
        for (let cssKey in data.styles) {
          popoverRef.current.style[cssKey] = data.styles[cssKey];
        }
        popoverRef.current.style.visibility = '';
      } else if (popoverRef.current) {
        setPopperData(data);
      }
      return data;
    };

    const popperInstance = (popperInstanceRef.current = new Popper(
      anchorRef.current,
      popoverRef.current,
      {
        ...popperConfig,
        modifiers: {
          ...popperConfig.modifiers,
          // these modifiers are always overridden to work with React
          applyStyle: { enabled: false },
        },
        onCreate: updateState,
        onUpdate: updateState,
      },
    ));

    const resizeObserver = new ResizeObserver(() => {
      popperInstance.scheduleUpdate();
    });
    resizeObserver.observe(popoverRef.current);

    return () => {
      if (popperInstance) {
        popperInstance.destroy();
      }
      if (resizeObserver && popoverRef.current) {
        resizeObserver.unobserve(popoverRef.current);
      }
    };
  }, [
    anchorRef.current,
    popoverRef.current,
    setPopperData,
    popperConfig,
    fast,
  ]);

  return {
    ref: popoverRef,
    'data-placement': popperData && popperData.placement,
    style: {
      position: 'absolute',
      visibility: 'hidden',
      ...(popperData && popperData.styles),
    },
  };
});
