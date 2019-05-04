/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { Alert } from "./Alert";

storiesOf("Alert", module).add("Alert", () => (
  <Alert right="lg" bottom="lg">
    Test alert
  </Alert>
));
