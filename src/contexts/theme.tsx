export { ThemeProvider } from 'emotion-theming';
import { ThemeContext as EmotionThemeContext } from '@emotion/core';
import { BrandTheme } from '../types';
import { Context } from 'react';

export const ThemeContext = EmotionThemeContext as Context<BrandTheme>;
