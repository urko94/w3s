/** @type {import('tailwindcss').Config} */

const round = num =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const rem = px => `${round(px / 16)}rem`;

module.exports = {
  content: [
    `./components/**/*.{vue,js}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./plugins/**/*.{js,ts}`,
  ],
  theme: {
    screens: {
      mobile: { max: '767px' },
      xs: '500px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      hd: '1920px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',
      gray: '#ededed',
      dark: '#1F1D2E',
      background: '#1F1D2E',
      orange: '#FEAA7B',
      red: '#ff0033',

      gray: {
        DEFAULT: '#ededed',
        light: '#4D4D4D',
        lighter: '#FBF6ED',
        dark: '#D9D9D9',
      },

      green: {
        DEFAULT: '#C4FCA3',
        light: '#c4ffa2',
        dark: '#9dd57d',
      },

      purple: {
        DEFAULT: '#DDB4FF',
        light: '#d9affe',
        dark: '#b288d5',
      },

      blue: {
        DEFAULT: '#9DE5D8',
        light: '#9fe5d6',
        dark: '#7abcae',
        link: '#74A6FB',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      heading: ['TT Trailers', 'ui-sans-serif', 'system-ui'],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
    },
    extend: {
      boxShadow: {
        orange: '0px 0px 30px #FEAA7B',
        green: '0px 0px 30px #C4FCA3',
        purple: '0px 0px 30px #DDB4FF',
        blue: '0px 0px 30px #9DE5D8',
      },
      textShadow: {
        orange: '0px 0px 30px #FEAA7B',
        green: '0px 0px 30px #C4FCA3',
        purple: '0px 0px 30px #DDB4FF',
        blue: '0px 0px 30px #9DE5D8',
      },
      fontSize: {
        xxs: '0.6rem',
      },
    },
  },
  corePlugins: {},
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-textshadow')],
};
