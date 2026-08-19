import type { Article } from '../types';

function dateValue(d: string): number {
  const [day, month, year] = d.split('-').map(Number);
  return Date.UTC(year, month - 1, day);
}

export function getRelatedArticles(current: Article, all: Article[], max = 3): Article[] {
  const others = all.filter((a) => a.slug !== current.slug);

  const scored = others.map((a) => {
    const sharedTags = a.tags.filter((t) => current.tags.includes(t)).length;
    return { article: a, sharedTags };
  });

  scored.sort((a, b) => {
    if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
    return dateValue(b.article.date) - dateValue(a.article.date);
  });

  return scored.slice(0, max).map((s) => s.article);
}
