# Syllabus Build

Create the course schedule, mapping topics to sessions with proper sequencing and theme assignments.

---

## Frontmatter

```yaml
context: main
allowed-tools: Read, Write, Edit, AskUserQuestion
```

---

## Prerequisites

- `course-plan.md` must exist and be complete
- `curriculum-design-research.md` should exist (for reference)

---

## Instructions

You are creating the course syllabus - the session-by-session schedule that maps learning objectives to class meetings.

### Step 1: Review Course Plan

Read `course-plan.md` to understand:
- Guiding principles
- Content guidelines (concepts per session)
- Pacing expectations
- Assessment philosophy
- Framework being used (if any)

### Step 2: Determine Course Parameters

Either from config or by asking:
- Total number of class sessions
- Duration of each session
- Any fixed dates/events (holidays, exams)
- Any external constraints

### Step 3: Identify Topics

Based on the framework and research, list all topics that need coverage:
- Map to framework steps (if using DE, list 24 steps)
- Group related concepts
- Identify prerequisite relationships
- Note which topics need more time

### Step 4: Sequence Topics

Apply sequencing principles:
1. **Prerequisites first**: Foundational concepts before advanced
2. **Build complexity**: Simple to complex progression
3. **Revisit for retention**: Space out related concepts
4. **Practical anchors**: Theory followed by application
5. **Assessment timing**: Reviews before evaluations

### Step 5: Assign Themes

If using a framework with themes:
- Assign each session to a theme
- Ensure theme transitions are logical
- Document theme color coding

### Step 6: Create Session Entries

For each session, document:
- Session number
- Date (if known)
- Topic title
- Theme (if applicable)
- Learning objectives (3-5 per session)
- Key activities
- Readings/preparation
- Deliverables due

### Step 7: Write SYLLABUS.md

Create `SYLLABUS.md` with this structure:

```markdown
# {Course Name} Syllabus

{Term} | {Institution}
Instructor: {Name} | {Email}

## Course Description

{2-3 sentences describing the course}

## Learning Outcomes

By the end of this course, students will be able to:

1. {Outcome 1}
2. {Outcome 2}
3. {Outcome 3}
...

## Course Materials

### Required
- {Material 1}
- {Material 2}

### Recommended
- {Material 1}

## Schedule Overview

| Week | Theme | Topics |
|------|-------|--------|
| 1 | {Theme} | {Topics} |
| 2 | {Theme} | {Topics} |
...

## Session Details

### Class 1: {Topic Title}
**Date**: {date}
**Theme**: {theme} ({theme color})

**Learning Objectives**:
- {Objective 1}
- {Objective 2}
- {Objective 3}

**Topics Covered**:
- {Topic 1}
- {Topic 2}

**Activities**:
- {Activity 1}
- {Activity 2}

**Preparation**:
- {Reading or prep work}

**Deliverables**:
- {If any due this session}

---

### Class 2: {Topic Title}
...

{Repeat for all sessions}

## Assessment

| Component | Weight | Description |
|-----------|--------|-------------|
| {Component} | {X}% | {Description} |
...

## Policies

### Attendance
{Policy}

### Late Work
{Policy}

### Academic Integrity
{Policy}

## Theme Legend

{If using themed framework}

| Theme | Color | Question |
|-------|-------|----------|
| 1. Customer | Blue (#356093) | Who is your customer? |
| 2. Value | Purple (#7c3aed) | What can you do for them? |
...

## Calendar View

{Optional: visual calendar if dates are known}
```

---

## Output Specification

This skill produces:

- **Primary Output**: `SYLLABUS.md`
- **Format**: Markdown with structured sections
- **Dependencies**: Enables `class-research` for each topic

---

## Quality Criteria

A good syllabus:
- Every session has 3-5 measurable objectives
- Objectives build on previous sessions appropriately
- No session is overloaded with concepts
- Clear preparation requirements for each session
- Assessment schedule is realistic
- Theme progression is logical

---

## Examples

### Example: DE-Based Course Syllabus

```markdown
# Applications in Entrepreneurship Syllabus

Spring 2026 | NCSSM
Instructor: Dr. Smith | smith@ncssm.edu

## Course Description

This course teaches systematic entrepreneurship using Bill Aulet's
Disciplined Entrepreneurship framework. Students work in teams to
develop real venture concepts through 24 structured steps.

## Schedule Overview

| Week | Theme | DE Steps | Topics |
|------|-------|----------|--------|
| 1 | Customer | 0-1 | Introduction, Market Segmentation |
| 2 | Customer | 2-3 | Beachhead Market, End User Profile |
| 3 | Customer | 4 | TAM/SAM/SOM |
...

## Session Details

### Class 1: Course Introduction
**Date**: January 15, 2026
**Theme**: Foundation

**Learning Objectives**:
- Explain the Disciplined Entrepreneurship framework
- Identify the 24 steps and 6 themes
- Form project teams and select initial venture ideas

**Topics Covered**:
- Why entrepreneurship can be taught
- Overview of DE methodology
- Team formation process

**Activities**:
- Framework overview presentation
- Team speed dating
- Initial idea brainstorm

**Preparation**:
- Read DE Introduction (pp. 1-20)

---

### Class 2: Market Segmentation
**Date**: January 22, 2026
**Theme**: Customer (Blue)

**Learning Objectives**:
- Brainstorm potential market opportunities
- Apply segmentation criteria to opportunities
- Select top 6-8 market segments for analysis

...
```
