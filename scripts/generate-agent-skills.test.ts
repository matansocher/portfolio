import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SCHEMA_URI,
  URL_BASE,
  buildIndex,
  collectSkills,
  digestOf,
  extractFrontmatter,
  readFrontmatterField,
} from './generate-agent-skills.mjs';

const SKILLS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '.agents', 'skills');

describe('generate-agent-skills', () => {
  it('includes an entry for every skill folder', () => {
    const folders = readdirSync(SKILLS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    const index = buildIndex(collectSkills());

    expect(index.skills).toHaveLength(folders.length);
  });

  it('produces an RFC v0.2.0-shaped index', () => {
    const index = buildIndex(collectSkills());

    expect(index.$schema).toBe(SCHEMA_URI);
    expect(Array.isArray(index.skills)).toBe(true);

    for (const skill of index.skills) {
      expect(skill.type).toBe('skill-md');
      expect(skill.name).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(skill.name.length).toBeLessThanOrEqual(64);
      expect(skill.description.length).toBeGreaterThan(0);
      expect(skill.description.length).toBeLessThanOrEqual(1024);
      expect(skill.url).toBe(`${URL_BASE}/${skill.name}/SKILL.md`);
      expect(skill.digest).toMatch(/^sha256:[0-9a-f]{64}$/);
    }
  });

  it('digests match the raw bytes of each skill artifact', () => {
    const skills = collectSkills();
    const index = buildIndex(skills);

    for (const entry of index.skills) {
      const skill = skills.find((candidate) => candidate.name === entry.name)!;
      const expected = `sha256:${createHash('sha256').update(skill.content, 'utf8').digest('hex')}`;
      expect(entry.digest).toBe(expected);
    }
  });

  it('reads inline, quoted, and block-scalar frontmatter fields', () => {
    const plain = extractFrontmatter('---\nname: foo\ndescription: bar\n---\nbody')!;
    expect(readFrontmatterField(plain, 'name')).toBe('foo');
    expect(readFrontmatterField(plain, 'description')).toBe('bar');

    const quoted = extractFrontmatter('---\nname: foo\ndescription: "a, b, c"\n---\n')!;
    expect(readFrontmatterField(quoted, 'description')).toBe('a, b, c');

    const block = extractFrontmatter('---\nname: foo\ndescription: |\n  line one\n  line two\nlicense: MIT\n---\n')!;
    expect(readFrontmatterField(block, 'description')).toBe('line one line two');
    expect(readFrontmatterField(block, 'name')).toBe('foo');
  });

  it('sorts skills by name for a stable index', () => {
    const names = buildIndex(collectSkills()).skills.map((skill) => skill.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it('digestOf formats digests as sha256:<64 lowercase hex>', () => {
    expect(digestOf('hello')).toMatch(/^sha256:[0-9a-f]{64}$/);
  });
});
