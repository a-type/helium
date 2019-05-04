# helium

## WIP. All usage speculative. This library does not work yet and may never be completed.

> A different approach to React component library creation

[![NPM](https://img.shields.io/npm/v/helium.svg)](https://www.npmjs.com/package/helium) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save helium
```

## Usage

```tsx
// defining a button component
import { useButton } from "helium";
import { css } from "@emotion/core";

const buttonCss = css({
  background: "blue",
  border: "0",
  "&:focus": {
    outline: "none"
  }
});

const Button = props => {
  const buttonProps = useButton({
    onPressed: props.onPressed
  });
  return <button css={buttonCss} {...buttonProps} {...props} />;
};

// ok, but s'pose you want a link to act like a button?
// this is the inverse of the common "as" prop pattern - apply behaviors
// to a styled element, don't inject an element into a behavioral component
const ButtonLink = props => {
  const buttonProps = useButton({
    onPressed: props.onPressed
  });
  return <a {...buttonProps} {...props} />;
};

// adding multiple different kinds of behaviors
import { useFlex, useButton, combine } from "helium";

// we can define a button-behaving component that uses a flex layout
// and a div as underlying element.
const FlexLayoutButton = props => {
  const buttonProps = useButton({
    onPressed: props.onPressed
  });
  const flexProps = useFlex({
    direction: "row"
  });
  const addedProps = combine(buttonProps, flexProps);
  return <div css={buttonCss} {...addedProps} {...props} />;
};
```

## Theme opinions

### Theme should _not_ have a 1-to-1 relationship with components -> properties.

The objective of a theme is not to provide a place to configure a bunch of components which are located elsewhere; if I wanted to configure properties per-component I would go edit the component directly. A theme is instead a set of higher-level values which are shared across multiple components based on intuitive behaviors or roles.

### Theme should be dynamic

Dark themes, high contrast themes... themes are meant to be dynamic. The number of values in the theme should be manageable to the point that writing an alternate theme shouldn't feel like a burden. Multiple themes should be able to co-exist on the page to define different contexts of content.

### Concept: Tokens

Tokens are the lowest-level theming objects. They're colors, sizes, and names. They all get added as CSS custom properties (variables) in the root scope.

#### Colors

- `neutral-bg`: the background color of neutral content
- `neutral-fg`: the foreground color of neutral content
- `neutral-border`: the border color of neutral content
- `positive-bg`: the background color of positive content
- `positive-fg`: the foreground color of positive content
- `positive-border`: the border color of positive content
- `negative-bg`: the background color of negative content
- `negative-fg`: the foreground color of negative content
- `negative-border`: the border color of negative content
- `control-bg`: the background color of a control
- `control-fg`: the foreground color of a control
- `control-border`: the border color of a control
- `field-bg`: the background color of a field
- `field-fg`: the foreground color of a field
- `field-border`: the border color of a field
- `effect-strong`: the color of a strong visual effect
- `effect-weak`: the color of a weak visual effect

## License

MIT © [a-type](https://github.com/a-type)
