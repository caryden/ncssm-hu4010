# Skill Builder

Build new Claude Code skills with proper structure, best practices, and supporting files.

---

## Frontmatter

```yaml
context: main
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
```

---

## Instructions

You are helping create a new Claude Code skill. Skills are markdown files that teach Claude how to perform specific tasks within a project.

### Step 1: Gather Requirements

Ask the user for the following information (use AskUserQuestion for structured choices):

1. **Skill Name**: kebab-case identifier (e.g., `lesson-plan`, `course-research`)
2. **Skill Purpose**: One-sentence description of what this skill does
3. **Template Type**:
   - `basic` - Simple skill with instructions only
   - `research` - Forked context for long-running research tasks
   - `validation` - Read-only verification skill
   - `builder` - Full file access for creating/editing files
   - `orchestrator` - Coordinates multiple skills
4. **Outputs**: What artifacts does this skill create?
5. **Dependencies**: What must exist before this skill can run?
6. **Gates**: Does this skill implement or check any quality gates?

### Step 2: Determine Configuration

Based on template type, configure:

| Type | Context | Agent | Typical Tools |
|------|---------|-------|---------------|
| `basic` | main | - | Read, Write |
| `research` | fork | Explore | WebSearch, WebFetch, Read, Write |
| `validation` | main | - | Read, Bash, Glob, Grep |
| `builder` | main | - | Read, Write, Edit, Bash, Glob, Grep |
| `orchestrator` | main | - | Read, Write, Skill, AskUserQuestion |

### Step 3: Generate Skill File

Create `.claude/skills/{skill-name}/SKILL.md` with this structure:

```markdown
# {Skill Name (Title Case)}

{One-line description of what this skill does.}

---

## Frontmatter

\`\`\`yaml
context: {main|fork}
{agent: Explore  # Only for research skills}
allowed-tools: {comma-separated list}
{disable-model-invocation: true  # Only for side-effect skills}
\`\`\`

---

## Prerequisites

{List what must exist before running this skill}

- Required file: `{path/to/required-file}`
- Required skill completion: `{other-skill-name}`

---

## Instructions

{Detailed instructions for Claude to follow}

### Step 1: {First Major Step}

{Instructions}

### Step 2: {Second Major Step}

{Instructions}

...

---

## Output Specification

This skill produces:

- **Primary Output**: `{path/to/output-file}`
- **Format**: {Description of expected format}

### Output Template

{If applicable, describe or link to the output template}

---

## Quality Gates

{If applicable}

### Gate {N}: {Gate Name}

**Checklist:**
- [ ] {Requirement 1}
- [ ] {Requirement 2}
- [ ] {Requirement 3}

**Pass Criteria**: {What constitutes passing}
**On Failure**: {What to do if gate fails}

---

## Examples

### Example Input
{Show example invocation or context}

### Example Output
{Show example of expected output}
```

### Step 4: Create Supporting Files

Based on the skill type, create additional files:

1. **Templates** (`templates/{output-name}.template`): If the skill produces structured output
2. **Checklists** (`gate-{n}-checklist.md`): If the skill has quality gates
3. **Scripts** (`{action}.sh`): If the skill needs shell automation
4. **References** (`{topic}-reference.md`): If the skill needs domain knowledge

### Step 5: Register the Skill

Add the skill to the workflow documentation if it's part of RPIV:

1. Update `.claude/skills/rpiv-workflow/workflow-diagram.md` if it exists
2. Add to `artifact-status` blocking rules if it produces gated artifacts

---

## Output Specification

This skill produces:

- **Primary Output**: `.claude/skills/{skill-name}/SKILL.md`
- **Supporting Files**: Templates, checklists, scripts as needed

---

## Best Practices Enforcement

When building skills, enforce these patterns:

### DO:
- Use clear, imperative step headings
- Provide concrete examples for complex outputs
- Define explicit pass/fail criteria for gates
- Use AskUserQuestion for choices with 2-4 options
- Keep instructions focused on one concern per skill

### DON'T:
- Create skills that do too many things (split them)
- Use vague language like "appropriate" or "as needed"
- Skip the Prerequisites section
- Forget to document the output format
- Create circular dependencies between skills

---

## Examples

### Example: Creating a Research Skill

**Input**: "Create a skill for researching visualization patterns"

**Generated Structure**:
```
.claude/skills/viz-research/
├── SKILL.md
├── expert-sources.md
└── templates/
    └── viz-research.md.template
```

**Generated SKILL.md** would include:
- Forked context for long-running research
- WebSearch and WebFetch in allowed-tools
- Template for structured research output
- Minimum source requirements

### Example: Creating a Validation Skill

**Input**: "Create a skill to verify presentation accessibility"

**Generated Structure**:
```
.claude/skills/a11y-check/
├── SKILL.md
├── a11y-checklist.md
└── check-a11y.sh
```

**Generated SKILL.md** would include:
- Main context (read-only)
- Bash, Glob, Grep in allowed-tools
- Detailed accessibility checklist
- Shell script for automated checks
