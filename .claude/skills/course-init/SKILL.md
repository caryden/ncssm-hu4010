# Course Init

Scaffold a new Astro-based course project from the NCSSM template, with proper configuration and structure.

---

## Frontmatter

```yaml
context: main
allowed-tools: Read, Write, Edit, Bash, Glob, AskUserQuestion
```

---

## Prerequisites

- Access to template repository (ncssm-hu4010 or similar)
- Git installed
- Node.js installed

---

## Instructions

You are initializing a new educational course project. This skill scaffolds the project structure, configures the build system, and sets up RPIV infrastructure.

### Step 1: Gather Course Information

Use AskUserQuestion to collect:

1. **Course Name**: Full course title (e.g., "AP Calculus BC")
2. **Course Code**: Short identifier (e.g., "ap-calc-bc")
3. **Institution**: School/organization name
4. **Term**: Semester/year (e.g., "Spring 2026")
5. **Framework Base**: Which pedagogical framework (if any)
   - Disciplined Entrepreneurship
   - Custom framework
   - None (general course)
6. **Narration**: Enable voice narration?
   - Yes, with ElevenLabs
   - No narration
7. **Template Source**:
   - Clone from ncssm-hu4010
   - Use current directory
   - Start fresh

### Step 2: Create Project Structure

If cloning from template:
```bash
git clone https://github.com/caryden/ncssm-hu4010.git {course-code}
cd {course-code}
rm -rf .git
git init
```

Create directory structure:
```
{course-code}/
├── .claude/
│   ├── rpiv-config.json
│   └── skills/                 # Copy RPIV skills
├── src/
│   ├── components/
│   │   └── presentation/       # Shared presentation components
│   ├── content/
│   │   └── config.ts          # Content collections config
│   ├── layouts/
│   │   └── PresentationLayout.astro
│   ├── pages/
│   │   └── index.astro        # Course homepage
│   └── config/
│       ├── institution.ts     # Institution branding
│       └── course.ts          # Course metadata
├── public/
│   ├── audio/                 # Narration audio files
│   └── images/                # Course images
├── shared/
│   ├── styles.css            # Common styles
│   └── presentation.js       # Navigation logic
├── CLAUDE.md                  # Project instructions
├── SYLLABUS.md               # Course schedule (created later)
├── course-plan.md            # Course philosophy (created later)
├── master-presentation-spec.md  # Design system (created later)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### Step 3: Configure Institution

Create `src/config/institution.ts`:

```typescript
export const institution = {
  name: "{institution-name}",
  shortName: "{short-name}",
  logo: "/images/logo.png",
  primaryColor: "#356093",  // Customize for institution
  accentColor: "#d4a028",
  favicon: "/favicon.ico",
  website: "https://...",
};
```

### Step 4: Configure Course

Create `src/config/course.ts`:

```typescript
export const course = {
  title: "{course-name}",
  code: "{course-code}",
  term: "{term}",
  description: "{one-line description}",
  framework: "{framework-name}",  // or null
  themes: [
    // Define theme colors if using framework
  ],
  narration: {
    enabled: {true|false},
    provider: "elevenlabs",
    defaultVoice: "Rachel",
  },
  instructors: [
    {
      name: "{instructor-name}",
      email: "{email}",
    }
  ],
};
```

### Step 5: Create RPIV Config

Create `.claude/rpiv-config.json` with course-specific settings:

```json
{
  "version": "1.0",
  "framework": "astro",
  "course": {
    "name": "{course-name}",
    "code": "{course-code}",
    "term": "{term}"
  },
  "narration": {
    "enabled": {true|false},
    "provider": "elevenlabs",
    "voiceId": "configurable",
    "model": "eleven_multilingual_v2"
  },
  "research": {
    "defaultSources": [],
    "requireMinSources": 2,
    "requireMinMisconceptions": 3
  },
  "validation": {
    "strictMode": true,
    "minFontSize": "1rem",
    "requiredElements": ["toc-overlay", "keyboard-hints", "progress-bar"]
  },
  "astro": {
    "componentPath": "src/components/presentation",
    "layoutPath": "src/layouts/PresentationLayout.astro",
    "pagesPath": "src/pages"
  },
  "paths": {
    "classPattern": "src/pages/class-{n}-{topic}"
  }
}
```

### Step 6: Create CLAUDE.md

Generate project-specific instructions:

```markdown
# Claude Instructions for {Course Name}

## Project Overview

This repository contains the {course-name} course materials...

## RPIV Workflow

This project uses the Research-Plan-Implement-Verify methodology.
See `.claude/skills/rpiv-workflow/SKILL.md` for workflow guide.

## Quick Start

1. `/artifact-status` - Check what exists
2. `/rpiv-workflow` - Get guided workflow

## Minimum Font Sizes (CRITICAL)

| Element | Minimum |
|---------|---------|
| Titles | 2.5rem |
| Body | 1.5rem |
| Labels | 1.25rem |

## Course-Specific Notes

{Add any course-specific instructions}
```

### Step 7: Install Dependencies

```bash
npm install
```

### Step 8: Initialize Git

```bash
git add -A
git commit -m "Initialize {course-name} course structure

Generated with RPIV course-init skill.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

### Step 9: Provide Next Steps

Output to user:
```
✅ Course project initialized!

Project: {course-name}
Location: {path}

## Next Steps

1. Run `/course-research` to research pedagogical approaches
2. Run `/course-plan` to define teaching philosophy
3. Run `/syllabus-build` to create session schedule
4. Run `/master-spec` to establish design system

Then for each class:
5. Run `/class-research {topic}` to research the topic
6. Continue with RPIV workflow...

## Useful Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `/artifact-status` - Check progress
- `/rpiv-workflow` - Get workflow guidance
```

---

## Output Specification

This skill produces:

- **Project structure**: Full Astro project scaffold
- **Configuration files**: Institution, course, RPIV configs
- **CLAUDE.md**: Project instructions
- **Git repository**: Initialized with first commit

---

## Templates

Templates are stored in `.claude/skills/course-init/templates/`:

- `institution.ts.template`
- `course.ts.template`
- `CLAUDE.md.template`

---

## Examples

### Example: New Entrepreneurship Course

```
User: /course-init

Claude: Let's set up your new course! I need some information:

        Course name?
User: Applications in Innovation

Claude: Course code (short identifier)?
User: innovation-101

Claude: Institution?
User: Tech Academy

Claude: Term?
User: Fall 2026

Claude: Which pedagogical framework?
        1. Disciplined Entrepreneurship
        2. Design Thinking
        3. Custom framework
        4. None
User: 2

Claude: Enable voice narration with ElevenLabs?
User: Yes

Claude: Creating project structure...
        [Creates directories, configs, files]

        ✅ Course initialized!

        Next: Run `/course-research` to begin.
```
