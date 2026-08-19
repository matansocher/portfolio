import './styles/Faq.scss';
import StructuredData from './StructuredData';

export interface FaqItem {
  question: string;
  answer: string;
}

// Grounded only in real site content (business-card page copy, config projects,
// testimonials and articles). The same array feeds both the visible UI and the
// FAQPage JSON-LD so the schema text always matches what the page renders.
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What does Dekel Nissim do?',
    answer:
      'Dekel is a freelance UX/UI designer who helps teams solve complex product decisions and UX problems, working across both desktop and mobile.',
  },
  {
    question: 'What kinds of products does Dekel specialize in?',
    answer:
      'Complex systems and internal tools — for example an internal salary calculation and approval system, a marketing management system, and an event management app — spanning both desktop and mobile.',
  },
  {
    question: 'What services does Dekel offer?',
    answer:
      'UX/UI design, design strategy, web design, and Figma best practices, from early research through to end-to-end product design.',
  },
  {
    question: 'Does Dekel work with startups?',
    answer:
      'Yes. Dekel joined a marketing-management startup as its first Product Designer and built its design system from scratch, and has worked as both UX/UI designer and product owner inside development teams.',
  },
  {
    question: 'What does Dekel write about?',
    answer:
      'Dekel writes articles on UX design, product, design process, and the thoughtful use of AI in products — arguing that not every product or slow process needs AI.',
  },
  {
    question: 'How can I get in touch with Dekel?',
    answer:
      'You can send a note through the contact form on this page, email dklnsm@gmail.com, or connect on LinkedIn at /in/dekelnissim.',
  },
];

const SITE_ORIGIN = 'https://dekelnissim.com';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: `${SITE_ORIGIN}/business-card`,
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function Faq() {
  return (
    <section className="cp-faq" aria-labelledby="faq-heading">
      <StructuredData data={faqSchema} />
      <div className="cp-content">
        <span className="cp-mono">FAQ</span>
        <h2 id="faq-heading">Frequently asked questions</h2>
        <ul className="cp-faq-list">
          {FAQ_ITEMS.map((item) => (
            <li key={item.question} className="cp-faq-item">
              <details>
                <summary>
                  <span className="cp-faq-question">{item.question}</span>
                  <i className="uil uil-angle-down cp-faq-chevron" aria-hidden="true" />
                </summary>
                <p className="cp-faq-answer">{item.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
