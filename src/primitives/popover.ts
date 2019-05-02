import { BehaviorProps } from '../types';
import { createBehavior } from '../util';
import { useRef, RefObject, useState, useMemo, useLayoutEffect } from 'react';
import Popper, { PopperOptions } from 'popper.js';
import ResizeObserver from 'resize-observer-polyfill';

export type PopoverAnchorConfig = {} & BehaviorProps;

export const usePopoverAnchor = createBehavior(
  ({ ref }: PopoverAnchorConfig = {}) => {
    const anchorRef = useRef<HTMLElement>(null);

    return {
      ref: ref || anchorRef,
    };
  },
);

export type PopoverConfig = {
  anchorRef: RefObject<HTMLElement>;
  popperOptions?: PopperOptions;
  popoverPlacement?: Popper.Placement;
  popoverOffset?: string | number; // TODO: better interface than string
  popoverOverflowPadding?: number;
  popoverFlip?: boolean;
  popoverInner?: boolean;
  popoverFast?: boolean;
  popoverFullWidth?: boolean;
  popoverFullHeight?: boolean;
} & BehaviorProps;

const createBasePopperOptions = (props: PopoverConfig): Popper.PopperOptions =>
  props.popperOptions || {
    placement: props.popoverPlacement || 'bottom',
    modifiers: {
      shift: {
        enabled: true,
      },
      offset: {
        enabled: !!props.popoverOffset,
        offset: props.popoverOffset,
      },
      preventOverflow: {
        enabled: true,
        padding: props.popoverOverflowPadding || 5,
      },
      flip: {
        enabled: props.popoverFlip === undefined || props.popoverFlip,
        padding: props.popoverOverflowPadding || 5,
      },
      inner: {
        enabled: props.popoverInner,
      },
      matchSize: {
        enabled: props.popoverFullHeight || props.popoverFullWidth,
        fn: data => {
          if (props.popoverFullWidth) {
            data.offsets.popper.width = data.offsets.reference.width;
            data.styles.width = '' + data.offsets.popper.width + 'px';
          }
          if (props.popoverFullHeight) {
            data.offsets.popper.height = data.offsets.reference.height;
            data.styles.height = '' + data.offsets.popper.height + 'px';
          }
          return data;
        },
        order: 840,
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
  const { anchorRef, popoverFast: fast = true } = props;

  if (!anchorRef) {
    throw new Error('usePopover requires an anchorRef');
  }

  const popoverRef = useRef<HTMLElement>(null);
  const popperInstanceRef = useRef<Popper | null>(null);
  /**
   * NOTE: if props.fast === true, we never set this data, we bypass
   * React altogether and apply styles directly to ref element
   */
  const [popperData, setPopperData] = useState<Popper.Data | null>(null);
  const popperConfig = useMemo(() => createBasePopperOptions(props), [
    props.popperOptions,
    props.popoverPlacement,
    props.popoverOffset,
    props.popoverOverflowPadding,
    props.popoverFlip,
    props.popoverInner,
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
      boxSizing: 'border-box',
      ...(popperData && popperData.styles),
    },
  };
});
