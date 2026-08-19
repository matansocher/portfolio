// Publishes an Agent Skills discovery index at
// public/.well-known/agent-skills/index.json per the Agent Skills Discovery RFC
// v0.2.0 (https://github.com/cloudflare/agent-skills-discovery-rfc), and copies
// each skill's SKILL.md to public/.well-known/agent-skills/<name>/SKILL.md so the
// `url` in the index resolves to the exact bytes the `digest` is computed over.
//
// Every skill is published as `type: "skill-md"`: the discovery index only needs
// the SKILL.md (Level 1 + Level 2 of progressive disclosure), and content
// negotiation already serves .md files from the build as static assets.

import { createHash } from 'node:crypto';
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS_DIR = join(ROOT, '.agents', 'skills');
const WELL_KNOWN_DIR = join(ROOT, 'public', '.well-known', 'agent-skills');
const INDEX_PATH = join(WELL_KNOWN_DIR, 'index.json');

export const SCHEMA_URI = 'https://schemas.agentskills.io/discovery/0.2.0/schema.json';
// The RFC's conventional location for a single-file (`skill-md`) skill. Path-absolute
// so the URL resolves against whatever origin serves the index (RFC 3986 section 5).
export const URL_BASE = '/.well-known/agent-skills';

// The Agent Skills spec caps descriptions at 1024 characters.
const MAX_DESCRIPTION_LENGTH = 1024;
// Skill names: 1-64 chars, lowercase alphanumeric + hyphens, no leading/trailing/
// consecutive hyphens.
const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Extracts the leading `---`-delimited YAML frontmatter block. Returns its raw body
// (without the fences) or null when the file has no frontmatter.
export function extractFrontmatter(content) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(content);
  return match ? match[1] : null;
}

// Minimal frontmatter reader for the two scalar shapes these skills use: a plain or
// quoted single-line value (`name: foo`, `description: "..."`) and a `|` block scalar
// (`description: |` followed by indented lines). Not a general YAML parser -- it only
// needs to read `name` and `description`.
export function readFrontmatterField(frontmatter, field) {
  const lines = frontmatter.split(/\r?\n/);
  const keyPattern = new RegExp(`^${field}:\\s*(.*)$`);

  for (let i = 0; i < lines.length; i += 1) {
    const match = keyPattern.exec(lines[i]);
    if (!match) continue;

    const inline = match[1].trim();

    // Block scalar (`|` or `>`, with optional chomping indicators like `|-`).
    if (/^[|>][+-]?$/.test(inline)) {
      const blockLines = [];
      for (let j = i + 1; j < lines.length; j += 1) {
        const line = lines[j];
        // The block ends at the first non-indented, non-empty line (the next key).
        if (line.trim() !== '' && !/^\s/.test(line)) break;
        blockLines.push(line);
      }
      const indent = blockLines.find((line) => line.trim() !== '')?.match(/^\s*/)?.[0].length ?? 0;
      return blockLines
        .map((line) => line.slice(indent))
        .join('\n')
        .replace(/\n+$/, '')
        .replace(/\s*\n\s*/g, ' ')
        .trim();
    }

    // Inline scalar, possibly single- or double-quoted.
    return inline.replace(/^(['"])([\s\S]*)\1$/, '$2').trim();
  }

  return null;
}

export function collectSkills(skillsDir = SKILLS_DIR) {
  return readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const skillMdPath = join(skillsDir, entry.name, 'SKILL.md');
      const content = readFileSync(skillMdPath, 'utf8');
      const frontmatter = extractFrontmatter(content);
      if (!frontmatter) {
        throw new Error(`Skill "${entry.name}" is missing YAML frontmatter in SKILL.md`);
      }

      const name = readFrontmatterField(frontmatter, 'name');
      const description = readFrontmatterField(frontmatter, 'description');
      if (!name) throw new Error(`Skill "${entry.name}" is missing a "name" in its frontmatter`);
      if (!description) throw new Error(`Skill "${entry.name}" is missing a "description" in its frontmatter`);
      if (!NAME_PATTERN.test(name)) {
        throw new Error(`Skill name "${name}" does not conform to the Agent Skills naming spec`);
      }
      if (description.length > MAX_DESCRIPTION_LENGTH) {
        throw new Error(`Skill "${name}" description exceeds ${MAX_DESCRIPTION_LENGTH} characters`);
      }

      return { name, description, content };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function digestOf(content) {
  return `sha256:${createHash('sha256').update(content, 'utf8').digest('hex')}`;
}

export function buildIndex(skills) {
  return {
    $schema: SCHEMA_URI,
    skills: skills.map((skill) => ({
      name: skill.name,
      type: 'skill-md',
      description: skill.description,
      url: `${URL_BASE}/${skill.name}/SKILL.md`,
      digest: digestOf(skill.content),
    })),
  };
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const skills = collectSkills();

  // Rebuild the published tree from scratch so removed or renamed skills don't leave
  // stale SKILL.md copies behind.
  rmSync(WELL_KNOWN_DIR, { recursive: true, force: true });
  mkdirSync(WELL_KNOWN_DIR, { recursive: true });

  for (const skill of skills) {
    const dir = join(WELL_KNOWN_DIR, skill.name);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'SKILL.md'), skill.content);
  }

  writeFileSync(INDEX_PATH, `${JSON.stringify(buildIndex(skills), null, 2)}\n`);
  console.log(`agent-skills index written with ${skills.length} skills`);
}
