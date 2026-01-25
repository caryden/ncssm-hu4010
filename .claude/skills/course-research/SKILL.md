# Course Research

Research pedagogical approaches, expert sources, and best practices for curriculum design.

---

## Frontmatter

```yaml
context: fork
agent: Explore
allowed-tools: WebSearch, WebFetch, Read, Write
```

---

## Prerequisites

- Course initialized with `.claude/rpiv-config.json`
- Basic understanding of course topic/domain

---

## Instructions

You are conducting research to inform curriculum design. Your goal is to find expert sources, pedagogical approaches, and best practices that will guide the course philosophy.

### Step 1: Understand the Context

Read `.claude/rpiv-config.json` and `src/config/course.ts` (if exists) to understand:
- Course subject area
- Target audience
- Any specified pedagogical framework
- Narration preferences

### Step 2: Research Expert Sources

Search for authoritative voices in the subject domain:

1. **Academic Experts**: University professors, researchers
2. **Practitioners**: Industry professionals, entrepreneurs
3. **Content Creators**: YouTube educators, course designers
4. **Authors**: Textbook writers, thought leaders

For each expert, document:
- Name and credentials
- Key contributions/works
- Teaching philosophy (if known)
- Recommended resources

**Required**: Minimum 3 expert sources

### Step 3: Research Pedagogical Approaches

Search for effective teaching methods for this subject:

1. **Active Learning**: Problem-based, project-based, case studies
2. **Visual Learning**: Diagrams, animations, interactive visualizations
3. **Scaffolded Learning**: Prerequisites, progression, mastery
4. **Assessment Methods**: Formative, summative, peer review

Document approaches that seem particularly effective for the subject.

### Step 4: Research Common Misconceptions

Search for common student misconceptions in this domain:

- What concepts do students typically struggle with?
- What prior knowledge interferes with learning?
- What are common errors or mistakes?

**Required**: Minimum 3 misconceptions documented

### Step 5: Research Visualization Patterns

Search for effective ways to visualize key concepts:

1. Look for existing educational visualizations
2. Note interactive vs. static approaches
3. Identify data visualization best practices
4. Find inspiration from 3Blue1Brown, Khan Academy, etc.

**Required**: Minimum 1 visualization pattern documented

### Step 6: Compile Research Document

Create `curriculum-design-research.md` with this structure:

```markdown
# Curriculum Design Research: {Course Name}

Generated: {date}

## Executive Summary

{2-3 paragraph summary of key findings}

## Expert Sources

### {Expert 1 Name}
- **Credentials**: {background}
- **Key Works**: {books, courses, videos}
- **Philosophy**: {teaching approach}
- **Relevance**: {why useful for this course}

### {Expert 2 Name}
...

## Pedagogical Approaches

### Recommended Approach: {Name}

{Description of approach and why it fits}

**Evidence**:
- {Source 1}: {finding}
- {Source 2}: {finding}

### Alternative Approaches Considered

{Brief notes on other approaches and why not primary}

## Common Misconceptions

### Misconception 1: {Title}

- **What students believe**: {description}
- **Why it's wrong**: {explanation}
- **How to address**: {teaching strategy}

### Misconception 2: {Title}
...

## Visualization Patterns

### Pattern 1: {Name}

- **Concept**: {what it visualizes}
- **Approach**: {how it works}
- **Example**: {link or reference}
- **Adaptation**: {how to use in this course}

## Source Bibliography

1. {Source with URL}
2. {Source with URL}
...

## Recommendations for Course Plan

Based on this research:

1. {Recommendation 1}
2. {Recommendation 2}
3. {Recommendation 3}

## Questions for Instructor Review

- {Question needing human input}
- {Question needing human input}
```

---

## Output Specification

This skill produces:

- **Primary Output**: `curriculum-design-research.md`
- **Format**: Markdown with structured sections
- **Minimum Requirements**:
  - 3+ expert sources
  - 3+ misconceptions
  - 1+ visualization pattern
  - Complete bibliography

---

## Research Guidelines

### Good Sources
- University course syllabi (MIT OCW, Stanford, etc.)
- Peer-reviewed education research
- Expert YouTube channels (3Blue1Brown, Khan Academy)
- Published textbooks (find author credentials)
- Industry standards bodies

### Avoid
- Wikipedia (use it to find primary sources)
- Anonymous blog posts
- Outdated materials (>5 years for fast-moving fields)
- Sources without citations

### Citation Format

```
[Author Last Name, Year] "Title" - Platform/Publisher
URL: https://...
Accessed: {date}
```

---

## Examples

### Example: Entrepreneurship Course Research

```markdown
# Curriculum Design Research: Applications in Entrepreneurship

Generated: 2026-01-15

## Executive Summary

Research indicates that entrepreneurship education benefits most from
experiential, project-based approaches. The Disciplined Entrepreneurship
framework by Bill Aulet provides a structured 24-step methodology that
balances systematic thinking with creative exploration...

## Expert Sources

### Bill Aulet
- **Credentials**: Managing Director, MIT Martin Trust Center
- **Key Works**: "Disciplined Entrepreneurship" (book + workbook)
- **Philosophy**: Entrepreneurship is a craft that can be learned
- **Relevance**: Primary framework for course structure

### Steve Blank
- **Credentials**: Stanford Professor, Serial Entrepreneur
- **Key Works**: "The Startup Owner's Manual", Lean LaunchPad
- **Philosophy**: Customer Development methodology
- **Relevance**: Complements DE with customer interview techniques

...

## Common Misconceptions

### Misconception 1: Entrepreneurs Are Born, Not Made

- **What students believe**: Success requires innate traits
- **Why it's wrong**: Research shows skills can be developed
- **How to address**: Emphasize process over personality

...

## Visualization Patterns

### Pattern 1: Market Sizing Funnel

- **Concept**: TAM → SAM → SOM progression
- **Approach**: Interactive funnel that animates from top to bottom
- **Example**: Bill Aulet's DE Step 4 visualization
- **Adaptation**: Use D3 to create animated, clickable funnel
```
