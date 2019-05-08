/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef, Ref } from 'react';
import { useAll } from '../util';
import {
  useSpacing,
  SpacingConfig,
  TextConfig,
  ContentColorsConfig,
  useContentColors,
} from '../primitives';

export type TableProps = SpacingConfig;

export const Table = forwardRef(
  (props: TableProps, ref: Ref<HTMLTableElement>) => {
    const behaviorProps = useAll({ ...props, ref }, [useSpacing]);

    return <table {...behaviorProps} />;
  },
);

export type TableRowProps = SpacingConfig & ContentColorsConfig;

export const TableRow = forwardRef(
  (props: TableRowProps, ref: Ref<HTMLTableRowElement>) => {
    const behaviorProps = useAll({ ...props, ref }, [
      useSpacing,
      useContentColors,
    ]);

    return <tr {...behaviorProps} />;
  },
);

export type TableCellProps = SpacingConfig & TextConfig & ContentColorsConfig;

export const TableCell = forwardRef(
  (props: TableCellProps, ref: Ref<HTMLTableDataCellElement>) => {
    const behaviorProps = useAll({ ...props, ref }, [
      useSpacing,
      useContentColors,
    ]);

    return <td {...behaviorProps} />;
  },
);
