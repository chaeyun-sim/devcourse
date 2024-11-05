import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    main: {
      base: '#ffa726',
      dark: '#f57c00',
      fade: '#ffb74d',
      bright: '#ffb74da6',
    },
    list: 'rgb(235, 236, 240)',
    task: {
      base: 'rgb(255, 255, 255)',
      hover: 'rgb(245, 245, 245))',
    },
    selectedTab: 'rgb(137, 176, 174)',
    text: {
      primary: {
        bright: 'rgb(255, 255, 255)',
        dark: 'rgb(24, 42, 77))',
      },
      secondary: {
        dark: 'rgb(94, 108, 132)',
        darkHover: 'rgb(218, 219, 225)',
      },
    },
    button: {
      update: 'rgb(237, 180, 88)',
      delete: 'rgb(237, 51, 88)',
    },
  },
  fontSize: {
    T1: '32px',
    T2: '24px',
    T3: '18px',
    T4: '14px',
    P1: '12px',
  },
  spacing: {
    small: '5px',
    medium: '10px',
    big1: '20px',
    big2: '15px',
    listSpacing: '30px',
  },
  font: {
    body: 'arial',
  },
  shadow: {
    basic: '4px 4px 8px 0px rgba(24, 60, 80, 0.2)',
  },
  minWidth: {
    list: '250px',
  },
});
