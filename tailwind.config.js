/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        april: {
          lime: '#9DCD3B',
          'lime-dark': '#7DB025',
          'lime-soft': '#EAF6D3',
          navy: '#293849',
          'navy-soft': '#4A5A6E',
          cream: '#FFFDF6',
          sun: '#FFD84D',
        },
      },
      fontFamily: {
        sans: ['"Pretendard"', '"Noto Sans KR"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(41, 56, 73, 0.15)',
      },
    },
  },
  plugins: [],
}
