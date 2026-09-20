import './styles/Legal.scss';
import { Link } from 'react-router-dom';
import { Footer, SiteNav } from '../components';

type LegalDocument = 'overview' | 'privacy' | 'cookies' | 'terms' | 'accessibility';

interface LegalProps {
  document: LegalDocument;
}

const LAST_UPDATED = 'September 20, 2026';

const legalLinks = [
  {
    path: '/privacy',
    label: 'Privacy Policy',
    description: 'How personal information is collected, used, and shared.',
  },
  { path: '/cookies', label: 'Cookie Policy', description: 'Browser storage, site analytics, and browser controls.' },
  { path: '/terms', label: 'Terms of Use', description: 'The rules and limitations that apply when using this site.' },
  {
    path: '/accessibility',
    label: 'Accessibility Statement',
    description: 'The accessibility approach and how to report a problem.',
  },
];

function Overview() {
  return (
    <>
      <p className="legal-lead">
        These documents explain how this portfolio works, how visitor information is handled, and the terms that apply
        when you use it.
      </p>
      <div className="legal-card-grid">
        {legalLinks.map((item) => (
          <Link className="legal-card" to={item.path} key={item.path}>
            <h2>{item.label}</h2>
            <p>{item.description}</p>
            <span aria-hidden="true">Read policy →</span>
          </Link>
        ))}
      </div>
      <section>
        <h2>Important note</h2>
        <p>
          These policies are intended to provide transparent, practical terms for this portfolio. They are not legal
          advice and do not replace advice from a qualified lawyer about your specific circumstances.
        </p>
      </section>
    </>
  );
}

function PrivacyPolicy() {
  return (
    <>
      <p className="legal-lead">
        This policy explains how Dekel Nissim, an individual based in Israel, collects and uses personal information
        through dekelnissim.com.
      </p>

      <section id="information-collected">
        <h2>1. Information collected</h2>
        <h3>Information you provide</h3>
        <p>
          When you use the contact form or send an email, Dekel receives the information you provide, such as your name,
          email address, message, and any details you choose to include. Providing this information is voluntary, but
          without it Dekel may not be able to respond.
        </p>
        <h3>Analytics information</h3>
        <p>
          Google Analytics may collect information such as pages viewed, approximate location, browser and device
          information, referral source, and interactions with the site. Full IP addresses are not logged or stored by
          Google Analytics. Analytics runs when the site loads; the cookie notice is informational and does not disable
          analytics.
        </p>
        <h3>Technical information and preferences</h3>
        <p>
          Hosting and security providers may process IP addresses, request details, dates, and device information in
          server logs. The site also stores your article-language preference and cookie-notice dismissal in your
          browser.
        </p>
      </section>

      <section id="use">
        <h2>2. How information is used</h2>
        <ul>
          <li>To respond to inquiries and discuss potential work.</li>
          <li>To operate, secure, troubleshoot, and improve the site.</li>
          <li>To understand site usage and improve the site.</li>
          <li>To comply with legal obligations and establish or defend legal claims.</li>
        </ul>
        <p>
          Where the GDPR or UK GDPR applies, the legal bases relied on are taking steps at your request before entering
          a contract for inquiries, legitimate interests in operating, securing, and understanding use of the site, and
          compliance with legal obligations where required.
        </p>
      </section>

      <section id="sharing">
        <h2>3. Service providers and international transfers</h2>
        <p>
          Information may be processed by providers that support this site, including Google Analytics for site
          analytics, Google Cloud Storage for images, and Heroku/Salesforce infrastructure for hosting and contact-form
          delivery. Their systems may process data outside your country, including in Israel, the United States, and
          other locations where they operate. Applicable contractual and legal transfer safeguards are relied on where
          required.
        </p>
        <p>
          Personal information is not sold. It is not shared for cross-context behavioral advertising. Information may
          also be disclosed if required by law, to protect rights or safety, or in connection with a business
          reorganization.
        </p>
      </section>

      <section id="retention">
        <h2>4. Retention</h2>
        <p>
          Contact information is kept only as long as reasonably necessary to handle the inquiry, maintain appropriate
          business records, meet legal obligations, and resolve disputes. Analytics retention is controlled through
          Google Analytics settings. Browser preferences remain on your device until you clear them or change your
          choice.
        </p>
      </section>

      <section id="rights">
        <h2>5. Your privacy rights</h2>
        <p>
          Depending on where you live, you may have rights to request access to or correction of your personal
          information, ask for deletion or restriction, object to processing, receive portable data, and withdraw
          consent. Israeli law provides rights of access and correction in applicable circumstances. EU and UK residents
          may also complain to their local data protection authority.
        </p>
        <p>
          California privacy law may provide additional rights when its applicability thresholds are met. This site does
          not sell or share personal information for targeted advertising and does not knowingly use sensitive personal
          information for purposes requiring a right to limit.
        </p>
        <p>
          To make a request, email <a href="mailto:dklnsm@gmail.com">dklnsm@gmail.com</a>. Reasonable information may be
          requested to verify your identity. Some information may be retained where the law permits or requires it.
        </p>
      </section>

      <section id="children-security">
        <h2>6. Children and security</h2>
        <p>
          This site is intended for a general professional audience and is not directed to children under 16. Personal
          information from children is not knowingly collected. Reasonable safeguards are used, but no internet
          transmission or storage system can be guaranteed completely secure.
        </p>
      </section>

      <section id="updates-contact">
        <h2>7. Updates and contact</h2>
        <p>
          This policy may be updated when the site or applicable requirements change. The date above shows the latest
          revision. Questions or requests can be sent to <a href="mailto:dklnsm@gmail.com">dklnsm@gmail.com</a>.
        </p>
      </section>
    </>
  );
}

function CookiePolicy() {
  return (
    <>
      <p className="legal-lead">
        This site uses browser storage for preferences and Google Analytics cookies. The cookie notice is informational
        and dismissing it does not stop analytics.
      </p>

      <section>
        <h2>1. Essential storage</h2>
        <p>
          Essential local storage remembers whether you dismissed the cookie notice. The article section also remembers
          your English or Hebrew language choice. These preferences stay on your device until you clear your browser
          data. They are used to provide the choices you request and cannot track you across unrelated sites.
        </p>
      </section>

      <section>
        <h2>2. Optional analytics cookies</h2>
        <div className="legal-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Names</th>
                <th>Purpose</th>
                <th>Typical duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Analytics</td>
                <td>
                  <code>_ga</code>, <code>_ga_*</code>
                </td>
                <td>Distinguish visitors and sessions and measure site usage.</td>
                <td>Up to 2 years, subject to configuration.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Google Analytics loads when you visit the site. The site does not use advertising cookies.</p>
      </section>

      <section>
        <h2>3. Browser controls</h2>
        <p>
          Select “Cookie information” in the footer to reopen this notice. You can block or delete cookies and local
          storage through your browser settings or use{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Google’s Analytics opt-out browser add-on
          </a>
          . Blocking cookies may affect saved preferences.
        </p>
      </section>

      <section>
        <h2>4. More information</h2>
        <p>
          See the <Link to="/privacy">Privacy Policy</Link> for details about data uses, providers, transfers, and your
          rights. Questions can be sent to <a href="mailto:dklnsm@gmail.com">dklnsm@gmail.com</a>.
        </p>
      </section>
    </>
  );
}

function TermsOfUse() {
  return (
    <>
      <p className="legal-lead">
        By accessing this site, you agree to these terms. If you do not agree, please do not use the site.
      </p>

      <section>
        <h2>1. About this site</h2>
        <p>
          This portfolio presents selected work, articles, professional experience, and ways to contact Dekel Nissim.
          Its content is for general information and does not constitute legal, financial, technical, or other
          professional advice.
        </p>
      </section>

      <section>
        <h2>2. Intellectual property</h2>
        <p>
          Unless otherwise stated, the site’s original text, visual design, graphics, and presentation are owned by
          Dekel Nissim. Case studies may include names, trademarks, interfaces, or materials belonging to clients or
          other rights holders; those remain the property of their respective owners.
        </p>
        <p>
          You may view and share links to public pages for personal or professional reference. You may not reproduce,
          republish, sell, scrape at scale, remove attribution from, or create derivative commercial works from site
          content without prior written permission, except where applicable law allows it.
        </p>
      </section>

      <section>
        <h2>3. Acceptable use</h2>
        <p>
          Do not interfere with the site, attempt unauthorized access, introduce malicious code, misuse the contact
          form, impersonate another person, infringe rights, or use the site unlawfully. Reasonable automated access to
          public, machine-readable resources is permitted when it respects published crawler instructions and does not
          disrupt the service.
        </p>
      </section>

      <section>
        <h2>4. Third-party content and links</h2>
        <p>
          Links to third-party services are provided for convenience. Dekel does not control and is not responsible for
          their availability, content, security, or privacy practices. References to clients, employers, products, or
          services do not imply endorsement unless expressly stated.
        </p>
      </section>

      <section>
        <h2>5. Availability and disclaimers</h2>
        <p>
          The site is provided “as is” and “as available.” Content may be changed, removed, or become outdated, and
          uninterrupted or error-free operation is not guaranteed. To the fullest extent permitted by law, implied
          warranties are disclaimed.
        </p>
      </section>

      <section>
        <h2>6. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Dekel Nissim will not be liable for indirect, incidental, special,
          consequential, or punitive loss arising from use of or inability to use the site. Nothing in these terms
          excludes liability that cannot lawfully be excluded or limited.
        </p>
      </section>

      <section>
        <h2>7. Governing law and changes</h2>
        <p>
          These terms are governed by the laws of the State of Israel, without regard to conflict-of-law rules, and
          disputes are subject to the competent courts in Israel. Mandatory consumer protections that apply in your
          location remain unaffected. Updated terms apply from the date posted above.
        </p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>
          For permission requests or questions about these terms, email{' '}
          <a href="mailto:dklnsm@gmail.com">dklnsm@gmail.com</a>.
        </p>
      </section>
    </>
  );
}

function AccessibilityStatement() {
  return (
    <>
      <p className="legal-lead">
        Dekel Nissim is committed to making this portfolio usable by as many people as reasonably possible, including
        people who use assistive technologies.
      </p>

      <section>
        <h2>Accessibility approach</h2>
        <p>
          The site aims to follow WCAG 2.2 Level AA principles. Measures include semantic headings and landmarks,
          keyboard-accessible navigation, visible focus indicators, a skip link, form labels, descriptive alternative
          text, responsive layouts, and reduced-motion support where motion is used.
        </p>
      </section>

      <section>
        <h2>Known limitations</h2>
        <p>
          Some portfolio images show interfaces or historical project materials that may contain text embedded in an
          image. Third-party websites reached through external links are outside Dekel’s control. Accessibility is an
          ongoing effort, and parts of the site may not yet work perfectly for every user or technology.
        </p>
      </section>

      <section>
        <h2>Feedback and assistance</h2>
        <p>
          If you encounter an accessibility barrier or need content in another format, email{' '}
          <a href="mailto:dklnsm@gmail.com">dklnsm@gmail.com</a>. Please include the page, the problem, and the
          assistive technology or browser used if you are comfortable doing so. Dekel will make a reasonable effort to
          respond and provide an accessible alternative.
        </p>
      </section>
    </>
  );
}

const documents = {
  overview: { eyebrow: 'Legal', title: 'Policies & terms', content: <Overview /> },
  privacy: { eyebrow: 'Legal', title: 'Privacy Policy', content: <PrivacyPolicy /> },
  cookies: { eyebrow: 'Legal', title: 'Cookie Policy', content: <CookiePolicy /> },
  terms: { eyebrow: 'Legal', title: 'Terms of Use', content: <TermsOfUse /> },
  accessibility: { eyebrow: 'Accessibility', title: 'Accessibility Statement', content: <AccessibilityStatement /> },
};

export default function Legal({ document }: LegalProps) {
  const current = documents[document];

  return (
    <>
      <title>{current.title} - Dekel Nissim</title>
      <SiteNav />
      <main id="content" className="legal-page">
        <div className="legal-hero">
          <div className="legal-container">
            <span className="legal-eyebrow">{current.eyebrow}</span>
            <h1>{current.title}</h1>
            <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>
        <div className="legal-container legal-content">{current.content}</div>
      </main>
      <Footer />
    </>
  );
}
