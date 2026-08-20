export interface SocialImage {
  path: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface SocialMetadata {
  title: string;
  description: string;
  ogDescription?: string;
  url: string;
  type: 'website' | 'article';
  locale: string;
  image: SocialImage;
  publishedTime?: string;
  tags?: string[];
  alternates?: { hreflang: string; href: string }[];
}

export declare const DEFAULT_IMAGE: SocialImage;
export declare function buildSocialMetadata(): Promise<Map<string, SocialMetadata>>;
