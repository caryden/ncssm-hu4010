# Class Research

Deep research on a specific class topic, finding expert sources, common misconceptions, and visualization patterns.

---

## Frontmatter

```yaml
context: fork
agent: Explore
allowed-tools: WebSearch, WebFetch, Read, Write
```

---

## Prerequisites

- `SYLLABUS.md` must exist with class topics defined
- `course-plan.md` should exist for context
- Topic must be specified in invocation

---

## Instructions

You are conducting deep research on a specific class topic. Your goal is to gather expert content, identify teaching challenges, and discover effective visualization approaches.

### Usage

```
/class-research {topic}
```

Where `{topic}` is the kebab-case topic name from the syllabus.

### Step 1: Understand the Context

Read these files:
- `SYLLABUS.md` - Find the class entry for this topic
- `course-plan.md` - Understand guiding principles
- `curriculum-design-research.md` - Check for relevant prior research

Extract:
- Learning objectives for this class
- Prerequisites from previous classes
- Time allocation
- Framework step (if applicable)

### Step 2: Research Expert Video Sources

Search for high-quality educational videos on this topic:

**Priority Sources**:
1. **3Blue1Brown** - Exceptional visualizations for math/abstract concepts
2. **Khan Academy** - Clear explanations with good scaffolding
3. **MIT OpenCourseWare** - University-level lectures
4. **Crash Course** - Engaging summaries
5. **Veritasium** - Science explanations with misconception focus
6. **Domain-specific channels** - Based on subject area

For each video found:
- Title and URL
- Why it's useful for this topic
- Key teaching techniques used
- Visualization approaches
- Timestamp of key moments

**Required**: Minimum 2 video sources

### Step 3: Research Common Misconceptions

Search specifically for misconceptions about this topic:

Search queries to try:
- "{topic} misconceptions"
- "{topic} common mistakes"
- "{topic} student difficulties"
- "{topic} teaching challenges"
- "{topic} cognitive obstacles"

For each misconception:
- What students typically believe
- Why it's incorrect
- Why students develop this belief
- Evidence-based techniques to address it

**Required**: Minimum 3 misconceptions

### Step 4: Research Visualization Patterns

Search for ways to visualize this topic effectively:

Search queries:
- "{topic} visualization"
- "{topic} diagram"
- "{topic} animation"
- "{topic} interactive"
- "how to explain {topic}"

For each pattern:
- What it visualizes
- How it works (interaction model)
- Where to find examples
- How to adapt for this course

**Required**: Minimum 1 visualization pattern

### Step 5: Research Current Industry/Academic Context

Search for recent developments:
- Current best practices
- Real-world applications
- Recent changes or updates
- Industry standards

### Step 6: Compile Research Document

Create `research/research-{topic}.md`:

```markdown
# Research: {Topic Title}

Class: {N}
Framework Step: {if applicable}
Researched: {date}

## Learning Objectives Context

From syllabus, this class should enable students to:
1. {objective 1}
2. {objective 2}
3. {objective 3}

## Expert Video Sources

### Source 1: {Title}

- **Platform**: {YouTube, Vimeo, etc.}
- **Creator**: {Channel name}
- **URL**: {link}
- **Duration**: {length}
- **Relevance**: {why useful}

**Key Teaching Techniques**:
- {technique 1}
- {technique 2}

**Visualization Approaches**:
- {approach at timestamp}
- {approach at timestamp}

**Recommended Clips**:
- {timestamp}: {what happens}
- {timestamp}: {what happens}

### Source 2: {Title}
...

## Common Misconceptions

### Misconception 1: {Title}

- **What students believe**: {description}
- **Reality**: {correct understanding}
- **Why this develops**: {cognitive reason}
- **How to address**:
  1. {step 1}
  2. {step 2}
- **Source**: {citation}

### Misconception 2: {Title}
...

## Visualization Patterns

### Pattern 1: {Name}

- **Concept**: {what it shows}
- **Type**: {static/animated/interactive}
- **Example**: {URL or description}
- **How it works**:
  {detailed description}
- **Adaptation for this course**:
  {how to implement}
- **Technical approach**:
  - Technology: {D3, CSS, etc.}
  - Data needed: {what drives it}
  - Interaction: {click, hover, etc.}

## Real-World Context

### Current Applications
- {application 1}
- {application 2}

### Recent Developments
- {development 1}
- {development 2}

## Recommended Teaching Approach

Based on this research, the recommended approach for this class:

1. **Opening**: {how to start}
2. **Misconception Surface**: {when/how to address}
3. **Core Concept**: {main teaching approach}
4. **Visualization**: {when to use, which one}
5. **Practice**: {what students should do}

## Questions for Lesson Plan

- {Question about how to handle X}
- {Question about time allocation}

## Source Bibliography

1. {full citation}
2. {full citation}
...
```

---

## Output Specification

This skill produces:

- **Primary Output**: `research/research-{topic}.md`
- **Format**: Markdown with structured sections
- **Minimum Requirements**:
  - 2+ video sources with timestamps
  - 3+ misconceptions
  - 1+ visualization pattern
  - Complete bibliography

---

## Research Guidelines

### Good Video Sources

Prioritize videos that:
- Have clear visualizations
- Address misconceptions explicitly
- Show progressive complexity
- Are under 20 minutes (or have clear segments)

### Misconception Research

Look for:
- Education research papers
- Teacher forums and discussions
- "What students get wrong about X" articles
- Textbook error analyses

### Visualization Research

Look for:
- Interactive web demonstrations
- Educational animations
- Data visualization examples
- D3.js showcases

---

## Examples

### Example: Market Sizing Research

```markdown
# Research: Market Sizing (TAM/SAM/SOM)

Class: 4
Framework Step: DE Step 4
Researched: 2026-01-20

## Expert Video Sources

### Source 1: "How to Calculate Market Size"

- **Platform**: YouTube
- **Creator**: Y Combinator
- **URL**: https://youtube.com/...
- **Duration**: 12:34
- **Relevance**: Practical startup perspective

**Key Teaching Techniques**:
- Top-down vs. bottom-up explained
- Real company examples

**Recommended Clips**:
- 2:30: Funnel visualization introduction
- 5:45: Common mistake: TAM confusion
- 8:20: Bottom-up calculation example

### Source 2: "Market Sizing for Entrepreneurs"
...

## Common Misconceptions

### Misconception 1: TAM = Everyone Who Could Use It

- **What students believe**: TAM includes everyone who might
  theoretically benefit from the product
- **Reality**: TAM is the total market for your specific
  product category, not all tangentially related users
- **Why this develops**: Optimism bias + wanting big numbers
- **How to address**:
  1. Show examples of overstated TAMs
  2. Practice narrowing from broad to specific

...

## Visualization Patterns

### Pattern 1: Animated Funnel

- **Concept**: Shows TAM → SAM → SOM progression
- **Type**: Animated, interactive on hover
- **Example**: Bill Aulet's DE workbook illustration
- **How it works**:
  Three nested trapezoids, animate from largest to smallest,
  each with percentage and dollar value
- **Adaptation**:
  D3.js with transition, click to reveal each level,
  show calculation alongside
```
