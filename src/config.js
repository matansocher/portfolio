
const config = {
  PORTFOLIO_BACKEND: 'https://dkl-portfolio-be.herokuapp.com',

  PASSWORD_ENDPOINT: 'is-password-valid',

  NAVIGATION_DICTIONARY: {
    '/': { path: '/', prev: null, next: null, displayName: null },
    '/myco': { path: '/myco', prev: null, next: '/salaries', displayName: 'Myco' },
    '/salaries': { path: '/salaries', prev: '/myco', next: '/marketist', displayName: 'Salary Aadditions' },
    '/marketist': { path: '/marketist', prev: '/salaries', next: null, displayName: 'Marketist' },
  },
};

export default config;