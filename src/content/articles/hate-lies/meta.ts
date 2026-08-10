import type { ArticleMeta } from '../../../types';

const meta: ArticleMeta = {
  slug: 'hate-lies',
  date: '22-06-2026',
  image: 'articleHateLies',
  tags: ['UX Design', 'Trust', 'Product'],
  en: {
    title: 'When an Interface Acts Like Someone You Can’t Trust',
    excerpt:
      'Bugs in an interface are not only a usability problem. Sometimes they are a breach of a small agreement between the system and the user. When a system sends me a verification code and then says the code is wrong, it does not only prevent me from logging in. It damages my trust in it.',
  },
  he: {
    title: 'כשממשק מתנהג כמו מישהו שאי אפשר לסמוך עליו',
    excerpt:
      'באגים בממשק הם לא רק בעיית שימושיות. לפעמים הם הפרה של הסכם קטן בין המערכת לבין המשתמש. כשהמערכת שולחת לי קוד אימות ואז אומרת שהקוד שגוי, היא לא רק מונעת ממני להתחבר. היא פוגעת באמון שלי בה.',
  },
};

export default meta;
