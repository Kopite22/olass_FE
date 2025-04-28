import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: {
        '100': '#F3FCE8',
        '200': '#E0F8C5',
        '300': '#CEF5A4',
        '400': '#B9F17F',
        '500': '#ADEE68',
        '600': '#92D54C',
        '700': '#76B04C',
        '800': '#36893B',
        '900': '#154618',
        '950': '#1A2E05',
      },
      neutral: {
        '0': '#FFFFFF',
        '25': '#F5F5F5',
        '50': '#E8E8E8',
        '100': '#D9D9D9',
        '200': '#BDBDBD',
        '300': '#A1A1A1',
        '400': '#858585',
        '500': '#696969',
        '600': '#4C4C4C',
        '700': '#383838',
        '800': '#242424',
        '900': '#141415',
      },
      alert: {
        DEFAULT: '#F84A4A',
      },
    },
    fontFamily: {
      sans: [
        'Pretendard',
        'ui-sans-serif',
        'system-ui',
        'Apple SD Gothic Neo',
        'AppleGothic',
        'sans-serif',
      ],
    },
    fontSize: {
      'title-1': [
        '36px',
        {
          lineHeight: '48px',
          letterSpacing: '-0.027em',
        },
      ],
      'title-2': [
        '28px',
        {
          lineHeight: '38px',
          letterSpacing: '-0.0236em',
        },
      ],
      'title-3': [
        '24px',
        {
          lineHeight: '32px',
          letterSpacing: '-0.023em',
        },
      ],
      'heading-1': [
        '22px',
        {
          lineHeight: '30px',
          letterSpacing: '-0.0194em',
        },
      ],
      'heading-2': [
        '20px',
        {
          lineHeight: '28px',
          letterSpacing: '-0.012em',
        },
      ],
      'headline-1': [
        '18px',
        {
          lineHeight: '26px',
          letterSpacing: '-0.002em',
        },
      ],
      'headline-2': [
        '17px',
        {
          lineHeight: '24px',
          letterSpacing: '0em',
        },
      ],
      'body-1': [
        '16px',
        {
          lineHeight: '24px',
          letterSpacing: '0.0057em',
        },
      ],
      'body-2': [
        '15px',
        {
          lineHeight: '22px',
          letterSpacing: '0.0096em',
        },
      ],
      'label-1': [
        '14px',
        {
          lineHeight: '20px',
          letterSpacing: '0.0145em',
        },
      ],
      'label-2': [
        '13px',
        {
          lineHeight: '18px',
          letterSpacing: '0.0194em',
        },
      ],
      'caption-1': [
        '12px',
        {
          lineHeight: '16px',
          letterSpacing: '0.0252em',
        },
      ],
      'caption-2': [
        '11px',
        {
          lineHeight: '14px',
          letterSpacing: '0.0311em',
        },
      ],
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
