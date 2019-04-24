/** @jsx jsx */

import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { useButton } from '../src/index';
import { css, jsx } from '@emotion/core';

const buttonCss = css({
  background: 'black',
  padding: '16px',
  border: 0,
  borderRadius: '8px',
  color: 'white',
});

const focusCss = css({
  '&:focus': {
    outline: 0,
    boxShadow: '0 0 0 3px #00000080',
  },
});

const Button: FC<{}> = ({ children }) => {
  const buttonProps = useButton({
    onPressed: () => console.log('onPressed'),
    name: 'testbutton',
    children,
  });

  return <button css={[buttonCss, focusCss]} />;
};

ReactDOM.render(
  <div>
    Test
    <Button>Hello World</Button>
  </div>,
  document.getElementById('root'),
);
