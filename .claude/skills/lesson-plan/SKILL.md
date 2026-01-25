# Lesson Plan

Create instructional design document for a specific class, aligned with course philosophy.

---

## Frontmatter

```yaml
context: main
allowed-tools: Read, Write, Edit, AskUserQuestion
```

---

## Prerequisites

- `course-plan.md` must exist
- `research/research-{topic}.md` must exist for this topic
- Topic must be specified in invocation

---

## Instructions

You are creating a lesson plan that bridges research to presentation. This document defines what students should learn and how instruction will achieve that.

### Usage

```
/lesson-plan {topic}
```

### Step 1: Review Prerequisites

Read these files:
- `course-plan.md` - Guiding principles to follow
- `SYLLABUS.md` - Learning objectives for this class
- `research/research-{topic}.md` - Topic research findings

Extract:
- Learning objectives (from syllabus)
- Guiding principles (from course plan)
- Misconceptions to address (from research)
- Recommended teaching approach (from research)

### Step 2: Refine Learning Objectives

Transform syllabus objectives into precise, measurable statements:

**Criteria for good objectives**:
- Start with action verb (Bloom's taxonomy)
- Specific and measurable
- Achievable in the class time
- Aligned with course principles

**Before**: "Understand market sizing"
**After**: "Calculate TAM, SAM, and SOM for a given market using both top-down and bottom-up approaches"

### Step 3: Design Instructional Sequence

Plan the flow of the class:

1. **Hook** (5-10 min): How to capture attention
2. **Activate Prior Knowledge** (5 min): Connect to previous learning
3. **Address Misconception** (if applicable): Surface and correct
4. **Present New Concept** (varies): Main instruction
5. **Guided Practice** (10-15 min): Work through examples together
6. **Independent Practice** (10-15 min): Students apply
7. **Synthesis** (5-10 min): Summarize and connect forward

### Step 4: Plan Activities

For each activity, define:
- **Purpose**: What learning it supports
- **Format**: Individual, pairs, groups, class discussion
- **Materials**: What's needed
- **Instructions**: Step-by-step for students
- **Time**: Duration
- **Assessment**: How to know it worked

### Step 5: Plan Assessment

Define how learning will be checked:
- **Formative**: During-class checks (questions, thumbs up, quick writes)
- **Summative**: If deliverable due, define criteria

### Step 6: Identify Differentiation

Consider how to support different learners:
- **Struggling**: Scaffolds, simplified versions
- **Advanced**: Extensions, deeper challenges

### Step 7: Write Lesson Plan

Create `src/pages/class-{n}-{topic}/lesson-plan-{topic}.md`:

```markdown
# Lesson Plan: {Topic Title}

Class: {N}
Duration: {minutes} minutes
Theme: {Theme name and color}
Framework Step: {if applicable}

## Learning Objectives

By the end of this class, students will be able to:

1. {Objective 1} [Bloom's level: {level}]
2. {Objective 2} [Bloom's level: {level}]
3. {Objective 3} [Bloom's level: {level}]

## Alignment with Course Principles

| Principle | How This Lesson Applies It |
|-----------|---------------------------|
| {Principle 1} | {application} |
| {Principle 2} | {application} |

## Prerequisites

Students should already be able to:
- {prior knowledge 1}
- {prior knowledge 2}

## Materials Needed

- Presentation slides
- {additional materials}
- {student materials}

## Misconceptions to Address

### {Misconception 1}

**What students may believe**: {description}
**When to address**: {point in lesson}
**Strategy**: {how to correct}

## Lesson Sequence

### Opening Hook (X minutes)

**Objective**: Capture attention and establish relevance

**Activity**:
{description}

**Transition to**: {next section}

### Prior Knowledge Activation (X minutes)

**Objective**: Connect to previous learning

**Questions to pose**:
1. {question 1}
2. {question 2}

### Core Instruction (X minutes)

#### Segment 1: {Sub-topic}
**Duration**: X minutes
**Method**: {lecture, demo, discussion}
**Key points**:
- {point 1}
- {point 2}

**Visualization**: {if applicable}

#### Segment 2: {Sub-topic}
...

### Guided Practice (X minutes)

**Activity**: {name}
**Format**: {individual, pairs, groups}
**Instructions**:
1. {step 1}
2. {step 2}
3. {step 3}

**Expected outcome**: {what success looks like}
**Common errors to watch for**: {what might go wrong}

### Independent Practice (X minutes)

**Activity**: {name}
**Format**: {format}
**Instructions**: {what students do}

### Synthesis & Closing (X minutes)

**Key takeaways** (have students articulate):
1. {takeaway 1}
2. {takeaway 2}

**Connection to next class**: {preview}

## Assessment

### Formative (During Class)

| Check Point | Method | What to Look For |
|-------------|--------|------------------|
| After {segment} | {method} | {criteria} |

### Summative (If Applicable)

**Deliverable**: {name}
**Due**: {date}
**Criteria**: {rubric summary}

## Differentiation

### For Struggling Students
- {support 1}
- {support 2}

### For Advanced Students
- {extension 1}
- {extension 2}

## Instructor Notes

{Any additional guidance for teaching this lesson}

## Time Budget

| Segment | Time | Running Total |
|---------|------|---------------|
| Hook | X min | X min |
| Prior Knowledge | X min | X min |
| Core Instruction | X min | X min |
| Guided Practice | X min | X min |
| Independent Practice | X min | X min |
| Synthesis | X min | X min |
| **Total** | **X min** | |

---

*Gate 1 Checklist*:
- [ ] Objectives trace to course plan principles
- [ ] Objectives are measurable (action verbs)
- [ ] Each objective has supporting activity
- [ ] Assessment methods exist for each objective
- [ ] Time allocations sum correctly
- [ ] Misconceptions from research are addressed
```

---

## Output Specification

This skill produces:

- **Primary Output**: `src/pages/class-{n}-{topic}/lesson-plan-{topic}.md`
- **Format**: Markdown with structured sections
- **Gate**: Must pass Gate 1 before proceeding to presentation-spec

---

## Gate 1 Checklist

After creating the lesson plan, verify:

- [ ] Every objective traces to a course plan principle
- [ ] Objectives use action verbs (identify, calculate, design, evaluate)
- [ ] Each objective has at least one supporting activity
- [ ] Assessment methods exist for each objective
- [ ] Time allocations sum to class duration (±5 min)
- [ ] Misconceptions from research are addressed
- [ ] Prerequisites from previous classes acknowledged

---

## Examples

### Example: Market Sizing Lesson Plan

```markdown
# Lesson Plan: Market Sizing (TAM/SAM/SOM)

Class: 4
Duration: 75 minutes
Theme: Customer (Blue #356093)
Framework Step: DE Step 4

## Learning Objectives

By the end of this class, students will be able to:

1. Define TAM, SAM, and SOM with correct distinctions [Understand]
2. Calculate market size using top-down methodology [Apply]
3. Calculate market size using bottom-up methodology [Apply]
4. Evaluate which approach is more appropriate for a given situation [Evaluate]

## Alignment with Course Principles

| Principle | Application |
|-----------|------------|
| Show, don't tell | Animated funnel visualization before definitions |
| Productive struggle | Students attempt sizing before formula reveal |
| Real-world grounding | Use actual company examples (Uber, Airbnb) |

## Misconceptions to Address

### TAM = Everyone Who Might Use It

**What students believe**: TAM includes all theoretically possible users
**When to address**: After initial definitions, before practice
**Strategy**: Show absurd TAM examples, then constrain properly

...
```
