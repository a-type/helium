/** @jsx jsx */
import { jsx } from "@emotion/core";
import { FC } from "react";
import { useAll } from "../util";
import {
  usePosition,
  PositionConfig,
  ContentAreaConfig,
  useContentArea,
  SpacingConfig,
  useSpacing,
  TextConfig,
  useText,
  DepthConfig,
  useDepth
} from "../primitives";
import { Portal } from "react-portal";

export type AlertProps = PositionConfig &
  ContentAreaConfig &
  SpacingConfig &
  TextConfig &
  DepthConfig & {
    level?: "info" | "success" | "error";
  };

export const Alert: FC<AlertProps> = ({
  children,
  position = "absolute",
  border = true,
  padding = "md",
  depth = 4,
  level = "info",
  ...rest
}) => {
  const behaviorProps = useAll<
    PositionConfig & ContentAreaConfig & SpacingConfig
  >({ ...rest, position, border, padding, depth }, [
    usePosition,
    useSpacing,
    useContentArea,
    useText,
    useDepth
  ]);

  return (
    <Portal>
      <div role="alert" {...behaviorProps}>
        {children}
      </div>
    </Portal>
  );
};
