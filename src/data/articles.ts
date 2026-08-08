import type { Article } from '../types';

const articles: Article[] = [
  {
    slug: 'from-research-to-decisions',
    title: 'From Research to Decisions: Making UX Research Actually Count',
    excerpt:
      'Research is only valuable when it changes what a team builds. Here is how I turn interviews and observations into decisions the whole team can act on.',
    date: 'March 12, 2024',
    readingTime: '6 min read',
    tags: ['UX Research', 'Process', 'Product'],
    body: [
      {
        type: 'paragraph',
        text: 'Most teams do not have a research problem. They have a decision problem. They collect insights, fill a document with quotes, and then ship whatever was already on the roadmap. Research that does not change a decision is a cost, not an investment.',
      },
      {
        type: 'heading',
        text: 'Start from the decision, not the method',
      },
      {
        type: 'paragraph',
        text: 'Before I schedule a single interview, I ask one question: what decision will this research help us make? If the answer is fuzzy, the study will be fuzzy too. Anchoring on a real decision keeps the scope tight and makes it obvious when I have learned enough to stop.',
      },
      {
        type: 'list',
        items: [
          'What are we trying to decide, and by when?',
          'What would make us change our current plan?',
          'Who needs to be in the room when we look at the findings?',
        ],
      },
      {
        type: 'heading',
        text: 'Watch behavior, not just opinions',
      },
      {
        type: 'paragraph',
        text: 'People are generous with opinions and unreliable about their own behavior. Whenever possible I pair interviews with observation: a task walkthrough, a look at real data, or a quick usability session. The gap between what people say and what they do is usually where the best product ideas live.',
      },
      {
        type: 'quote',
        text: 'A finding is not useful until someone can repeat it back and use it to make a call.',
      },
      {
        type: 'heading',
        text: 'Package insights as bets, not reports',
      },
      {
        type: 'paragraph',
        text: 'I stopped writing long research decks. Instead I hand teams a short set of clearly framed bets: here is what we saw, here is what we think it means, and here is the change we recommend. Each bet is small enough to act on and specific enough to be proven wrong. That framing turns research into momentum instead of a document nobody opens twice.',
      },
      {
        type: 'paragraph',
        text: 'When research is tied to a decision, grounded in behavior, and delivered as clear recommendations, it stops being a phase and becomes the way the team thinks.',
      },
    ],
  },
  {
    slug: 'designing-for-trust',
    title: 'Designing for Trust: Small Details That Make Users Feel Safe',
    excerpt:
      'Trust is not a landing-page promise. It is built through hundreds of tiny moments in the interface. Here are the details I obsess over.',
    date: 'April 2, 2024',
    readingTime: '5 min read',
    tags: ['UX Design', 'Trust', 'Interaction'],
    body: [
      {
        type: 'paragraph',
        text: 'Users decide whether to trust a product long before they read your about page. They form that judgment from how the interface behaves under pressure: when something loads slowly, when they make a mistake, or when they are about to do something irreversible.',
      },
      {
        type: 'heading',
        text: 'Be honest about state',
      },
      {
        type: 'paragraph',
        text: 'Nothing erodes trust faster than an interface that hides what is happening. Loading states, saved indicators, and clear empty states tell users the system is working and their data is safe. Silence makes people assume the worst.',
      },
      {
        type: 'list',
        items: [
          'Show progress for anything that takes more than a moment.',
          'Confirm when something is saved, not just when it fails.',
          'Explain empty states instead of leaving a blank screen.',
        ],
      },
      {
        type: 'heading',
        text: 'Make mistakes recoverable',
      },
      {
        type: 'paragraph',
        text: 'Confident users are users who know they can undo. An undo option, a confirmation before destructive actions, and forgiving forms all send the same message: it is safe to explore here. That safety is what lets people commit to a product.',
      },
      {
        type: 'quote',
        text: 'Trust is the feeling that the product will not embarrass or betray you. Design every state with that in mind.',
      },
      {
        type: 'heading',
        text: 'Sweat the microcopy',
      },
      {
        type: 'paragraph',
        text: 'The words in error messages, buttons, and tooltips carry an enormous amount of emotional weight. Plain, calm language that takes responsibility ("We could not save your changes, try again") beats blaming or robotic copy every time. Good microcopy is quiet, but users feel its absence immediately.',
      },
      {
        type: 'paragraph',
        text: 'Trust is not one big feature. It is the accumulation of honest states, recoverable mistakes, and human language. Get those right and users will forgive a lot of everything else.',
      },
    ],
  },
];

export default articles;
