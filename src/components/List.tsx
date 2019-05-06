/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef, Ref } from 'react';
import { useAll } from '../util';
import {
  useSpacing,
  SpacingConfig,
  TextConfig,
  useText,
  useSizing,
  SizingConfig,
} from '../primitives';

export type ListProps = SpacingConfig &
  SizingConfig & {
    displayType?: 'bullets' | 'numbers' | 'plain';
  };

export const List = forwardRef(
  (
    { displayType, ...props }: ListProps,
    providedRef: Ref<HTMLOListElement | HTMLUListElement>,
  ) => {
    const Tag = (['bullets', 'none'] as any[]).includes(displayType)
      ? 'ul'
      : 'ol';
    const behaviorProps = useAll(
      {
        ...props,
        ref: providedRef,
        css: {
          listStyleType:
            displayType === 'bullets'
              ? 'bullet'
              : displayType === 'numbers'
              ? 'number'
              : 'none',
        },
      },
      [useSpacing, useSizing],
    );

    return <Tag {...behaviorProps} />;
  },
);

List.defaultProps = {
  displayType: 'plain',
  padding: '0',
  margin: '0',
};

export type ListItemProps = TextConfig & SpacingConfig;

export const ListItem = forwardRef(
  (props: ListItemProps, ref: Ref<HTMLLIElement>) => {
    const behaviorProps = useAll({ ...props, ref }, [useSpacing, useText]);

    return <li {...behaviorProps} />;
  },
);

ListItem.defaultProps = {
  margin: '0',
};
