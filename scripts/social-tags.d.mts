import type { SocialMetadata } from './social-metadata.d.mts';

export declare function renderSocialTags(metadata: SocialMetadata, baseUrl: string): string;
export declare function injectSocialTags(html: string, metadata: SocialMetadata | undefined, baseUrl: string): string;
