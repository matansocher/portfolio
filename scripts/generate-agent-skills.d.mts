export interface Skill {
  name: string;
  description: string;
  content: string;
}

export interface SkillIndexEntry {
  name: string;
  type: 'skill-md';
  description: string;
  url: string;
  digest: string;
}

export interface SkillIndex {
  $schema: string;
  skills: SkillIndexEntry[];
}

export declare const SCHEMA_URI: string;
export declare const URL_BASE: string;
export declare function extractFrontmatter(content: string): string | null;
export declare function readFrontmatterField(frontmatter: string, field: string): string | null;
export declare function collectSkills(skillsDir?: string): Skill[];
export declare function digestOf(content: string): string;
export declare function buildIndex(skills: Skill[]): SkillIndex;
