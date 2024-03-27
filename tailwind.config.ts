import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-green': '#074040',
        'accent-yellow': '#F2E641',
        transparent: 'transparent',
        'sky-blue': '#A0E3F2',
      },
    },
    fontFamily: {
      'display': ['var(--font-raleway)'],
      'body': ['var(--font-raleway)'],
      'raleway': ['var(--font-raleway)'],
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
  ],
};

export default config;
