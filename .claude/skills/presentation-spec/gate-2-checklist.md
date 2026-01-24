# Gate 2: Spec Achievement Checklist

Use this checklist to verify a presentation spec before proceeding to implementation.

---

## Prerequisites Check

- [ ] `lesson-plan-{topic}.md` exists and passed Gate 1
- [ ] `master-presentation-spec.md` was referenced
- [ ] Presentation spec file created in correct location

---

## Objective Coverage

Complete this matrix:

| # | Objective | Supporting Slides | Coverage Type |
|---|-----------|-------------------|---------------|
| 1 | {obj from lesson plan} | {slides} | {intro/demo/practice} |
| 2 | {obj from lesson plan} | {slides} | {coverage type} |
| 3 | {obj from lesson plan} | {slides} | {coverage type} |

Verification:
- [ ] Every objective has at least ONE supporting slide
- [ ] High-priority objectives have MULTIPLE supporting slides
- [ ] Coverage types are appropriate (not all just "intro")

---

## Visualization Completeness

For each visualization specified:

| Vis Name | Slide | Has Data Spec | Has Animation | Has Interaction | Font Sizes |
|----------|-------|---------------|---------------|-----------------|------------|
| {name} | {#} | [ ] | [ ] | [ ] | [ ] 1.25rem+ |

Verification:
- [ ] Every complex concept has a visualization
- [ ] All visualizations have complete specs
- [ ] Font sizes specified (minimum 1.25rem)
- [ ] Responsive requirements noted (viewBox)

---

## Interaction Points

| Slide | Interaction Type | Prompt Defined | Expected Response |
|-------|------------------|----------------|-------------------|
| {#} | {type} | [ ] Yes | [ ] Yes |

Verification:
- [ ] At least one interaction per 15 minutes
- [ ] Questions have expected responses documented
- [ ] Activities have clear instructions
- [ ] Think-pair-share has discussion prompts

---

## Flow Logic

Review slide sequence:

1. [ ] Title slide establishes topic and theme
2. [ ] Agenda/overview sets expectations
3. [ ] Hook captures attention before content
4. [ ] Concepts build in complexity
5. [ ] Practice follows instruction (not before)
6. [ ] Summary synthesizes key points
7. [ ] Transitions between sections are clear

Flow problems to check:
- [ ] No concept introduced before prerequisites
- [ ] No jarring topic jumps
- [ ] Appropriate pacing variation (dense → practice → dense)

---

## Time Estimates

| Section | Slides | Estimated Time | Realistic? |
|---------|--------|----------------|------------|
| Opening | {range} | {time} | [ ] |
| Core 1 | {range} | {time} | [ ] |
| Activity | {range} | {time} | [ ] |
| Core 2 | {range} | {time} | [ ] |
| Summary | {range} | {time} | [ ] |
| **Total** | **All** | **{total}** | |

Verification:
- [ ] Total matches class duration (±5 min)
- [ ] Individual slide times are realistic
- [ ] Activities have sufficient time
- [ ] No slide has unrealistic time allocation

---

## Source Citations

| Content | Source | Slide |
|---------|--------|-------|
| {fact/stat} | {source} | {#} |
| {expert quote} | {source} | {#} |
| {visualization inspired by} | {source} | {#} |

Verification:
- [ ] All facts have sources
- [ ] Visualizations credit inspiration
- [ ] Expert content attributed

---

## Design Consistency

- [ ] Theme color specified and consistent
- [ ] Slide types match purposes
- [ ] Content density is consistent
- [ ] Visual motifs are identified

---

## Gate 2 Result

### PASS Criteria
All verification checkboxes are checked.

### FAIL Actions

If any check fails:

1. **Objective not covered**
   - Add slides that support the objective
   - Document how they support it

2. **Missing visualization spec**
   - Add detailed visualization specification
   - Include data structure, animation, interaction

3. **No interactions**
   - Add discussion questions
   - Add activity slides
   - Mark think-pair-share moments

4. **Flow issues**
   - Reorder slides for logical progression
   - Add transition slides if needed

5. **Time mismatch**
   - Adjust individual slide times
   - Remove content if overloaded
   - Add content if too sparse

6. **Missing sources**
   - Add citations for facts
   - Credit visualization inspiration

---

## Sign-Off

**Gate 2 Status**: [ ] PASS / [ ] FAIL

**Reviewer**: _______________
**Date**: _______________

**Notes**:
```
{Any notes about the review}
```

---

After Gate 2 passes, proceed to: `/presentation-build {topic}`
