import './styles/Faq.scss';
import { Link } from 'react-router-dom';

export interface FaqItem {
  question: string;
  answer: string;
}

// Grounded only in real site content (business-card page copy, config projects,
// testimonials and articles). This single array feeds the visible UI here, the
// dedicated /faq screen, and the FAQPage JSON-LD, so the schema text always
// matches what the page renders.
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

// FAQPage structured data. Rendered once site-wide on the dedicated /faq screen
// (Google guideline: mark up a page's FAQ only once) — not on /business-card,
// which keeps only the visible list below.
export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: `${SITE_ORIGIN}/faq`,
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

interface FaqProps {
  // When true, renders a link to the dedicated /faq page below the list.
  showFaqPageLink?: boolean;
  // When true, hides the section's own eyebrow + heading (used on the dedicated
  // /faq screen, which already provides an <h1> in its hero).
  hideHeading?: boolean;
}

export default function Faq({ showFaqPageLink = false, hideHeading = false }: FaqProps) {
  return (
    <section
      className="cp-faq"
      aria-labelledby={hideHeading ? undefined : 'faq-heading'}
      aria-label={hideHeading ? 'Frequently asked questions' : undefined}
    >
      <div className="cp-content">
        {!hideHeading && (
          <>
            <span className="cp-mono">FAQ</span>
            <h2 id="faq-heading">Frequently asked questions</h2>
          </>
        )}
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
        {showFaqPageLink && (
          <p className="cp-faq-more">
            <Link to="/faq">See all frequently asked questions</Link>
          </p>
        )}
      </div>
    </section>
  );
}
