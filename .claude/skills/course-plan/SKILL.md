# Course Plan

Transform curriculum research into a teaching philosophy document with guiding principles.

---

## Frontmatter

```yaml
context: main
allowed-tools: Read, Write, Edit, AskUserQuestion
```

---

## Prerequisites

- `curriculum-design-research.md` must exist and be complete

---

## Instructions

You are creating the course philosophy document that will guide all subsequent curriculum development. This document bridges research findings to practical teaching decisions.

### Step 1: Review Research

Read `curriculum-design-research.md` thoroughly, extracting:
- Recommended pedagogical approach
- Key expert insights
- Common misconceptions to address
- Visualization patterns to employ
- Specific recommendations made

### Step 2: Define Course Philosophy

Articulate the overarching teaching philosophy in 2-3 paragraphs:
- What kind of learning experience should this be?
- What role does the instructor play?
- What role do students play?
- How does this course differ from typical approaches?

### Step 3: Establish Guiding Principles

Create 5-7 guiding principles that will inform all content decisions:

**Format for each principle**:
```markdown
### Principle {N}: {Short Name}

**Statement**: {One sentence capturing the principle}

**Rationale**: {Why this principle matters, cite research}

**Implications**:
- {What this means for slide design}
- {What this means for activities}
- {What this means for assessment}
```

**Example principles**:
- "Show, don't tell" - Use visualizations before explanations
- "Productive struggle" - Let students grapple before revealing answers
- "Real-world grounding" - Every concept connects to practical application
- "Misconception first" - Address what students wrongly believe
- "Iteration over perfection" - Emphasize learning from failure

### Step 4: Define Learning Objectives Framework

Establish the taxonomy for objectives:
- Use Bloom's taxonomy levels appropriately
- Define what "mastery" looks like
- Establish action verbs to use

### Step 5: Set Content Guidelines

Based on research, define:
- Maximum concepts per class session
- Balance of theory vs. practice
- Role of worked examples
- When to use interactive elements
- Pacing expectations

### Step 6: Address Misconceptions Strategy

Document the approach for handling misconceptions:
- When to surface misconceptions explicitly
- Techniques for conceptual change
- How to validate understanding

### Step 7: Create Course Plan Document

Write `course-plan.md` with this structure:

```markdown
# Course Plan: {Course Name}

Version: 1.0
Date: {date}
Based on: curriculum-design-research.md

## Course Philosophy

{2-3 paragraphs articulating the teaching philosophy}

## Guiding Principles

### Principle 1: {Name}

**Statement**: {principle}

**Rationale**: {from research}

**Implications**:
- Slide design: {implication}
- Activities: {implication}
- Assessment: {implication}

{Repeat for 5-7 principles}

## Learning Objectives Framework

### Taxonomy

We use modified Bloom's taxonomy levels:
- **Remember**: Recall facts and basic concepts
- **Understand**: Explain ideas and concepts
- **Apply**: Use information in new situations
- **Analyze**: Draw connections and identify patterns
- **Evaluate**: Justify decisions and positions
- **Create**: Produce new work

### Objective Writing Rules

1. Start with action verb
2. Be specific and measurable
3. One objective = one skill
4. Match level to actual expectation

### Mastery Definition

{What does mastery look like in this course?}

## Content Guidelines

### Concepts Per Session

- Maximum new concepts: {N}
- Revisited concepts for reinforcement: {N}
- Total concept touches per session: {N}

### Theory/Practice Balance

- Theory introduction: {X}%
- Worked examples: {X}%
- Student practice: {X}%
- Reflection/discussion: {X}%

### Visualization Guidelines

Based on research, visualizations should:
- {guideline 1}
- {guideline 2}
- {guideline 3}

### Pacing

- New concept introduction: {time}
- Practice time: {time}
- Transition time: {time}

## Misconception Handling

### Strategy

{How will we address misconceptions?}

### Specific Misconceptions to Address

| Misconception | When to Address | Technique |
|---------------|-----------------|-----------|
| {from research} | Class {N} | {approach} |

## Assessment Philosophy

{How will we know if learning happened?}

### Formative Assessment

{ongoing checks}

### Summative Assessment

{final evaluation}

## Success Metrics

How do we know if this course is working?

1. {Metric 1}
2. {Metric 2}
3. {Metric 3}

## Instructor Notes

{Any special guidance for teaching this course}

---

*This plan was derived from curriculum-design-research.md
and should be reviewed by the instructor before proceeding.*
```

### Step 8: Request Instructor Review

Inform the user that the course plan needs review before proceeding to syllabus creation.

---

## Output Specification

This skill produces:

- **Primary Output**: `course-plan.md`
- **Format**: Markdown with structured sections
- **Dependencies**: Blocks `syllabus-build` and `lesson-plan` skills

---

## Quality Criteria

A good course plan:
- Traces every principle to research evidence
- Provides specific, actionable guidelines (not vague)
- Addresses all documented misconceptions
- Defines measurable success criteria
- Is internally consistent (principles don't contradict)

---

## Examples

### Example Principle: "Productive Struggle"

```markdown
### Principle 3: Productive Struggle

**Statement**: Students should wrestle with problems before
receiving explanations, as this deepens understanding.

**Rationale**: Research on desirable difficulties (Bjork, 1994)
shows that making learning harder in the right ways improves
long-term retention. The "Struggle Zone" identified by our
research lies between trivial and impossible.

**Implications**:
- Slide design: Present problems before solutions; use
  "pause and think" moments
- Activities: Provide challenges slightly beyond current
  ability with scaffolds available
- Assessment: Value process and reasoning, not just
  correct answers
```
