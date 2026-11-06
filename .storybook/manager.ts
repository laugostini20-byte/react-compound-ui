import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Compound UI',
    brandUrl: 'https://github.com/laugostini20-byte/react-compound-ui',
    brandImage: 'brand/logo.svg',
    brandTarget: '_blank',
    colorPrimary: '#f97360',
    colorSecondary: '#0f766e',
    appBg: '#f8fafa',
    appBorderColor: '#d5e0df',
    textColor: '#102a2a',
    barSelectedColor: '#0f766e',
  }),
});
