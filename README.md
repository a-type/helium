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
import { useButton } from 'helium';
import { css } from '@emotion/core';

const buttonCss = css({
  background: 'blue',
  border: '0',
  '&:focus': {
    outline: 'none',
  }
});

const Button = props => {
  const buttonProps = useButton({
    onPressed: props.onPressed,
  });
  return (
    <button css={buttonCss} {...buttonProps} {...props} />
  );
};

// ok, but s'pose you want a link to act like a button?
// this is the inverse of the common "as" prop pattern - apply behaviors
// to a styled element, don't inject an element into a behavioral component
const ButtonLink = props => {
  const buttonProps = useButton({
    onPressed: props.onPressed,
  });
  return (
    <a {...buttonProps} {...props} />
  );
};

// adding multiple different kinds of behaviors
import { useFlex, useButton, combine } from 'helium';

// we can define a button-behaving component that uses a flex layout
// and a div as underlying element.
const FlexLayoutButton = props => {
  const buttonProps = useButton({
    onPressed: props.onPressed,
  });
  const flexProps = useFlex({
    direction: 'row'
  });
  const addedProps = combine(buttonProps, flexProps);
  return (
    <div css={buttonCss} {...addedProps} {...props} />
  );
}
```

## Theme opinions

### Theme should *not* have a 1-to-1 relationship with components -> properties.

The objective of a theme is not to provide a place to configure a bunch of components which are located elsewhere; if I wanted to configure properties per-component I would go edit the component directly. A theme is instead a set of higher-level values which are shared across multiple components based on intuitive behaviors or roles.

### Theme should be dynamic

Dark themes, high contrast themes... themes are meant to be dynamic. The number of values in the theme should be manageable to the point that writing an alternate theme shouldn't feel like a burden. Multiple themes should be able to co-exist on the page to define different contexts of content.

## License

MIT © [a-type](https://github.com/a-type)
