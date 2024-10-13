
const config = {
  USE_CDN: true,

  STORAGE_BASE_URL: 'https://storage.googleapis.com/dkl-portfolio',

  PORTFOLIO_BACKEND: 'https://dkl-portfolio-be.herokuapp.com',

  PASSWORD_ENDPOINT: 'is-password-valid',
  CONTACT_ENDPOINT: 'contact',

  MARKETER_URL: 'https://www.gomarketer.co',

  NAVIGATION_DICTIONARY: {
    'salaries': { path: '/salaries', displayName: 'Salary Additions', prev: null, next: 'marketer' },
    'marketer': { path: '/marketer', displayName: 'Marketer', prev: 'salaries', next: 'myco' },
    'myco': { path: '/myco', displayName: 'Myco', prev: 'marketer', next: 'employees' },
    'employees': { path: '/employees', displayName: 'Employee Onboarding', prev: 'myco', next: null },
  },

  ICONS_MAP: {
    SEARCH: 'search',
    LIGHTBULB: 'lightbulb-alt',
    FILE: 'file-check-alt',
    BRACKETS: 'brackets-curly',
    CHART: 'chart',
    USER: 'user',
    USERS: 'users-alt',
    CALCULATOR: 'calculator-alt',
    MONITOR: 'monitor',
  },

  CLIENTS_DATA: [
    {
      text: 'Dekel brought a lot of expertise in UX/UI design and a deep understanding of how to make the product user-oriented. She helped guide my vision to create a product that not only looks great, but provides real value to users. She has a strategic view that knows how to look at the content she creates as part of a bigger plan for her clients',
      name: 'Yarden Strfansky',
      title: 'CEO',
      company: 'Team Stefansky',
    },
    {
      text: 'I am extremely satisfied with the results of our collaboration with our UX designer. She was a key member of our team, and her contributions were invaluable to the success of the project. She was able to identify and address issues early on, which made the development process more efficient and effective',
      name: 'Barak Ze’evi',
      title: 'Head of Planning & Engineering Systems Department',
      company: 'Tel Aviv Municipality',
    },
    {
      text: 'I had the pleasure of working with Dekel on our product development, where her aim was improving our understanding of UX best practices, product strategy, and effective use of Figma. It was an incredibly valuable experience that exceeded my expectations',
      name: 'Ira Pavlova',
      title: 'Head of Design',
      company: 'Hippocampus',
    },
    {
      text: 'Best ever!! I\'ve been working with Dekel for a few months. Results are amazing - an energy blast, relentless professional, an amazing addition to any team, an independent, pro-active, engaged and engaging professional. Dekel had responded to everything we asked within literally minutes. Not only she is a pro, but she manages dynamic scenarios, which is super rare. She is quick on her feet, manages complex situations very well, delivers amazing results with superb quality, runs incredibly deep research and is the type of pro anyone would wish themselves',
      name: 'Ariel Zamir',
      title: 'Leading Teams to Build Things That Matter',
      company: 'NetApp',
    },
  ],
};

export default config;