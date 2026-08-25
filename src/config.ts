import type { Config } from './types';

const config: Config = {
  GA_MEASUREMENT_ID: 'G-6B683KPZ1Y',

  STORAGE_BASE_URL: 'https://storage.googleapis.com/dkl-portfolio',

  PORTFOLIO_BACKEND: 'https://dkl-portfolio-be.herokuapp.com',

  CONTACT_ENDPOINT: 'contact',

  MARKETER_URL: 'https://www.gomarketer.co',

  NAVIGATION_DICTIONARY: {
    salaries: { path: '/salaries', displayName: 'Salary Additions', prev: null, next: 'marketer' },
    marketer: { path: '/marketer', displayName: 'Marketer', prev: 'salaries', next: 'myco' },
    myco: { path: '/myco', displayName: 'Myco', prev: 'marketer', next: 'employees' },
    employees: { path: '/employees', displayName: 'Employee Onboarding', prev: 'myco', next: null },
  },

  NAV_LINKS: [
    { label: 'Projects', path: '/' },
    { label: 'Articles', path: '/articles' },
  ],

  PROJECTS: [
    {
      key: 'salaries',
      path: '/salaries',
      title: 'Salary Additions',
      summary:
        'An end-to-end internal system for automating salary calculations and approvals. The solution and custom algorithm I created resulted in high success rates.',
      imageKey: 'salariesMainScreenAndUI1',
    },
    {
      key: 'marketer',
      path: '/marketer',
      title: 'Marketer',
      summary:
        'A marketing-operations platform I built end to end for an early-stage B2B startup, as the first Product Designer, including a design system from scratch.',
      imageKey: 'homeMarketerImage',
    },
    {
      key: 'myco',
      path: '/myco',
      title: 'Myco',
      summary:
        'Two mobile apps for community events - one for ticket buyers and one for event producers - I designed end to end.',
      imageKey: 'homeMycoImage',
    },
    {
      key: 'employees',
      path: '/employees',
      title: 'Employee Onboarding Page',
      summary: 'An onboarding experience that helps new employees ramp up faster and feel at home from day one.',
      imageKey: 'homeEmployeesImage',
    },
  ],

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
    ARROW_LEFT: 'angle-left',
    ARROW_RIGHT: 'angle-right',
  },

  CLIENTS_DATA: [
    {
      text: 'Dekel brought a lot of expertise in UX/UI design and a deep understanding of how to make the product user-oriented. She helped guide my vision to create a product that not only looks great, but provides real value to users. She has a strategic view that knows how to look at the content she creates as part of a bigger plan for her clients',
      name: 'Yarden Strfansky',
      title: 'CEO',
      company: 'Team Stefansky',
    },
    {
      text: 'Collaborating with Dekel was instrumental in driving our projects at TrustTech forward. She consistently delivered results that exceeded expectations in both web and mobile products. Dekel worked closely with our design and development teams, always flexible and attuned to the changing needs of our organization, while ensuring our clients received exceptional service. Her interpersonal skills fostered great cooperation across teams, from management to key users, allowing her to truly understand, define, and prioritize our requirements. Her professional, client-centered approach has been invaluable',
      name: 'Roy Akoka',
      title: 'CEO & Co-Founder',
      company: 'TrusTech',
    },
    {
      text: "Best ever!! I've been working with Dekel for a few months. Results are amazing - an energy blast, relentless professional, an amazing addition to any team, an independent, pro-active, engaged and engaging professional. Dekel had responded to everything we asked within literally minutes. Not only she is a pro, but she manages dynamic scenarios, which is super rare. She is quick on her feet, manages complex situations very well, delivers amazing results with superb quality, runs incredibly deep research and is the type of pro anyone would wish themselves",
      name: 'Ariel Zamir',
      title: 'CEO',
      company: 'Beacon',
    },
    {
      text: 'I am extremely satisfied with the results of our collaboration with our UX designer. She was a key member of our team, and her contributions were invaluable to the success of the project. She was able to identify and address issues early on, which made the development process more efficient and effective',
      name: 'Barak Ze’evi',
      title: 'Operational Systems Head of Department',
      company: 'Tel Aviv Municipality',
    },
    {
      text: 'I had the pleasure of working with Dekel as a designer and UX specialist, and she really knows how to get the job done right. Beyond her impressive design skills, she brings strategic thinking and a sharp understanding of exactly what the user needs, executing it with precision and professionalism. You can rely on her to strike the perfect balance between creativity and practicality.',
      name: 'Tal Soffer',
      title: 'Founder',
      company: 'Soffer & Co',
    },
    {
      text: 'Dekel brought a wealth of expertise in UX/UI design and a deep understanding of how to make the product user-oriented. She conducted thorough benchmarking, analyzed the existing possibilities and restrictions, and helped guide my vision to create a product that not only looks great, but provides real value to users. She has a strategic view that knows how to look at the content she creates as part of a bigger plan for her clients',
      name: 'Doron Breuer',
      title: 'Head of Design',
      company: 'ControlUp',
    },
    {
      text: 'Dekel brought a wealth of expertise in UX/UI design and a deep understanding of how to make the product user-oriented. She conducted thorough benchmarking, analyzed the existing possibilities and restrictions, and helped guide my vision to create a product that not only looks great, but provides real value to users. She has a strategic view that knows how to look at the content she creates as part of a bigger plan for her clients',
      name: 'Netta Dambinsky',
      title: "Owner 'Berger-Sisters' Design Studio",
      company: 'Berger-Sisters',
    },
    {
      text: 'Working with Dekel on projects was an outstanding experience. Her quick, thorough approach consistently ensured that implementation projects were both successful and enjoyable. Dekel brought a high level of professionalism, effective communication, and a genuine spirit of collaboration to each project. Trust was the foundation of our work together, and she quickly became a reliable partner whom I could count on to meet our goals efficiently. Her friendly and dedicated approach made our collaboration both highly effective and personally rewarding, and I look forward to any future projects together',
      name: 'Amir Birnhack',
      title: 'Digital Consultant & System Admin',
      company: '',
    },
    {
      text: 'I had the pleasure of working with Dekel on our product development, where her aim was improving our understanding of UX best practices, product strategy, and effective use of Figma. It was an incredibly valuable experience that exceeded my expectations',
      name: 'Ira Pavlova',
      title: 'Head of Design',
      company: 'Hippocampus',
    },
    {
      text: 'Working with Dekel from the early stages of our digital product was both enjoyable and highly productive. Together, we developed an MVP, built out key features, and crafted user flows that translated complex needs into intuitive solutions. Dekel’s UX expertise was invaluable—she consistently delivered seamless, well-thought-out solutions across mobile and desktop, and her close collaboration with our development team ensured smooth implementation. Her dedication and creativity were key to the success of our product, and her positive, professional attitude made every step of the process a pleasure.',
      name: 'Netta Danziger',
      title: 'Senior Product Manager',
      company: 'Beacon',
    },
    {
      text: "Throughout the process, Dekel's UX expertise was invaluable. She suggested smart solutions and prioritized tasks effectively based on their impact on users' daily work and satisfaction. Her ability to create an elaborate work plan with clear deadlines and priorities helped us navigate the complexities of the existing system. The mutual work was not only productive and professional but also very enjoyable, making it a rewarding partnership. This project presented significant challenges due to its limited budget and the need to gather data from various stakeholders.",
      name: 'Galit Shatner',
      title: 'Product Owner & System Analyst',
      company: '',
    },
    {
      text: 'Dekel brought a wealth of expertise in UX/UI design and a deep understanding of how to make the product user-oriented. She conducted thorough benchmarking, analyzed the existing possibilities and restrictions, and helped guide my vision to create a product that not only looks great, but provides real value to users. She has a strategic view that knows how to look at the content she creates as part of a bigger plan for her clients',
      name: 'Rivky Kleiman',
      title: 'R&D Project Manager',
      company: '',
    },
    {
      text: 'Dekel brought a wealth of expertise in UX/UI design and a deep understanding of how to make the product user-oriented. She conducted thorough benchmarking, analyzed the existing possibilities and restrictions, and helped guide my vision to create a product that not only looks great, but provides real value to users. She has a strategic view that knows how to look at the content she creates as part of a bigger plan for her clients',
      name: 'Naomi Rubin',
      title: 'Freelance Product Manager',
      company: '',
    },
  ],
};

export default config;
