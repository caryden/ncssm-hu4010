# Presentation Spec: Class 8 - Testing Assumptions & MVBP

**Reference:** See `../master-presentation-spec.md` for styling, fonts, colors, and animation guidelines.

---

## Presentation Overview

**Title:** Prove It
**Subtitle:** Testing Assumptions & MVBP
**Duration:** ~40 minutes of presentation content
**Slides:** 32-36 slides
**DE Steps:** 20, 21, 22, 23
**Theme Color:** Theme 5 Red (`--theme-5-build: #ef4444`)

---

## Slide Sequence

### Opening Section (Slides 1-7)

#### Slide 1: Title Slide
- **Type:** `slide-title`
- **Content:**
  - Title: "Prove It"
  - Subtitle: "Testing Assumptions & MVBP"
  - Session: "Class 8 | Steps 20, 21, 22, 23"
- **Visual:** DE wheel with Steps 20-23 highlighted, Theme 5 red accent

#### Slide 2: Welcome Back
- **Type:** `slide-statement`
- **Content:**
  - Statement: "Welcome back from Spring Break!"
- **Visual:** Energetic return graphic
- **Animation:** Warm welcome

#### Slide 3: The New Theme
- **Type:** `slide-statement`
- **Content:**
  - Statement: "Theme 5: How Do You Design and Build?"
- **Visual:** Theme 5 section of DE wheel glows (red)
- **Animation:** Wheel rotates to highlight

#### Slide 4: The Shift
- **Type:** `slide-comparison`
- **Content:**
  - Left (Old thinking): "Can we build this?"
  - Right (New thinking): "Will people pay for this?"
- **Animation:** Old thinking fades, new thinking emphasizes
- **Point:** "Build after you validate"

#### Slide 5: The Dropbox Story - Setup
- **Type:** `slide-visual`
- **Content:**
  - Title: "2007: Drew Houston Had an Idea"
- **Visual:** File syncing concept sketch
  - Problem: Files not synced across devices
  - Solution: Automatic sync
  - Challenge: Complex to build
- **Animation:** Problem → idea visualization

#### Slide 6: The Dropbox Story - The Test
- **Type:** `slide-visual`
- **Content:**
  - Title: "Instead of Building, He Tested"
- **Visual:** Video player mockup with stats:
  - 3-minute demo video
  - Posted to Hacker News
  - Result: 5,000 → 75,000 signups overnight
- **Animation:** Numbers explode upward
- **Point:** "No product. Just validation."

#### Slide 7: Tonight's Mission
- **Type:** `slide-list`
- **Content:**
  - Title: "We'll Learn to..."
  - List:
    - Identify what we're assuming
    - Test before we build
    - Define the Minimum Viable Business Product
    - Prove customers will pay
- **Animation:** Each reveals

---

### Assumptions Section (Slides 8-14)

#### Slide 8: Section Divider
- **Type:** `slide-statement`
- **Content:**
  - Statement: "Step 20: Identify Key Assumptions"
- **Visual:** DE wheel with Step 20 glowing

#### Slide 9: Everything Is an Assumption
- **Type:** `slide-statement`
- **Content:**
  - Statement: "Your business plan is a collection of beliefs. Until tested, they're just guesses."
- **Animation:** Statement reveals with weight
- **Color:** Warning accent

#### Slide 10: Categories of Assumptions
- **Type:** `slide-visual`
- **Content:**
  - Title: "What Are You Assuming?"
- **Visual:** Five categories with examples:
  - Customer: "They have this problem"
  - Value: "Our solution solves it"
  - Product: "We can build this"
  - Business: "This pricing works"
  - Competition: "We can win"
- **Animation:** Each category appears with icon
- **Color:** Each category has subtle color

#### Slide 11: The Dangerous Assumptions
- **Type:** `slide-list`
- **Content:**
  - Title: "Challenge Everything"
  - List (with question marks):
    - "They have this problem" → Have you witnessed it?
    - "They'll pay $X" → Have they paid for similar?
    - "We can build this" → Do you have the skills?
    - "We can reach them" → Have you tried?
- **Animation:** Each assumption gets challenged

#### Slide 12: The Assumption Matrix
- **Type:** `slide-visual`
- **Content:**
  - Title: "Prioritize What to Test"
- **Visual:** 2x2 matrix:
  - Y-axis: Importance (high to low)
  - X-axis: Certainty (low to high)
  - Quadrants labeled:
    - High importance + Low certainty = "TEST NOW" (red, highlighted)
    - High importance + High certainty = "Monitor"
    - Low importance + Low certainty = "Test later"
    - Low importance + High certainty = "Ignore"
- **Animation:** Matrix builds, "TEST NOW" quadrant glows
- **Key insight:** "High risk = High importance × Low certainty"

#### Slide 13: Example Assumption Matrix
- **Type:** `slide-visual`
- **Content:**
  - Title: "Example: Food Delivery App"
- **Visual:** Populated matrix with assumptions:
  - "Restaurants will partner" (high importance, medium certainty)
  - "People will pay $5 delivery fee" (high importance, low certainty) → TEST
  - "We can build the app" (medium importance, high certainty)
  - "Drivers available" (high importance, low certainty) → TEST
- **Animation:** Assumptions plot on matrix

#### Slide 14: Workshop Transition
- **Type:** `slide-statement`
- **Content:**
  - Statement: "Identify YOUR assumptions"
- **Subtext:** "15 minutes: List, rate, prioritize"

---

### Testing Section (Slides 15-22)

#### Slide 15: Section Divider
- **Type:** `slide-statement`
- **Content:**
  - Statement: "Step 21: Test Key Assumptions"
- **Visual:** DE wheel with Step 21 glowing

#### Slide 16: Good Tests Are...
- **Type:** `slide-list`
- **Content:**
  - Title: "Design Experiments That Are"
  - List:
    - Fast (days or weeks, not months)
    - Cheap (minimal resources)
    - Decisive (clear pass/fail)
    - Measurable (defined success metric)
- **Animation:** Each characteristic with icon
- **Icons:** Zap, dollar-off, check-circle, bar-chart

#### Slide 17: Testing Techniques
- **Type:** `slide-visual`
- **Content:**
  - Title: "Your Testing Toolkit"
- **Visual:** Six techniques with effort level:
  - Landing page (Low effort)
  - Customer interviews (Low)
  - Smoke test / Fake door (Low)
  - Wizard of Oz (Medium)
  - Prototype (Medium)
  - Concierge MVP (High)
- **Animation:** Techniques appear with effort indicator
- **Color:** Effort coded (green → yellow → red)

#### Slide 18: Technique - Landing Page
- **Type:** `slide-two-part`
- **Content:**
  - Primary: "Landing Page Test"
  - Secondary: "Build a page describing your product, drive traffic, measure response"
  - Tests: Is there interest? Does the message resonate?
  - Metrics: Signup rate, engagement, time on page
- **Visual:** Simple landing page mockup
- **Effort:** Low

#### Slide 19: Technique - Smoke Test
- **Type:** `slide-two-part`
- **Content:**
  - Primary: "Smoke Test (Fake Door)"
  - Secondary: "Create a 'buy now' button that doesn't work (apologize after)"
  - Tests: Will they actually try to buy?
  - Metrics: Click-through rate on purchase button
- **Visual:** Button with "Buy Now" text
- **Note:** "Ethical: Apologize and explain after"

#### Slide 20: Technique - Wizard of Oz
- **Type:** `slide-two-part`
- **Content:**
  - Primary: "Wizard of Oz"
  - Secondary: "Customers think it's automated; you do it manually behind the scenes"
  - Tests: Does the solution work? What's the experience like?
  - Example: Zappos—photos online, founder buys shoes at store after order
- **Visual:** Curtain metaphor revealing manual work
- **Effort:** Medium

#### Slide 21: Success Metrics
- **Type:** `slide-visual`
- **Content:**
  - Title: "Pre-Define Success"
- **Visual:** Example thresholds:
  - "If 5% of landing page visitors sign up → Proceed"
  - "If 3/10 interviewees mention problem unprompted → It's real"
  - "If 2% click 'Buy Now' → There's demand"
- **Animation:** Each threshold appears as a bar filling to target
- **Point:** "Decide BEFORE you test what success looks like"

#### Slide 22: Workshop Transition
- **Type:** `slide-statement`
- **Content:**
  - Statement: "Design YOUR tests"
- **Subtext:** "15 minutes: Technique, experiment, metric, threshold"

---

### MVBP Section (Slides 23-30)

#### Slide 23: Section Divider
- **Type:** `slide-statement`
- **Content:**
  - Statement: "Steps 22-23: Define MVBP & Prove It"
- **Visual:** DE wheel with Steps 22-23 glowing

#### Slide 24: MVP vs MVBP
- **Type:** `slide-comparison`
- **Content:**
  - Left (MVP):
    - Minimum product that works
    - Tests "can we build it?"
    - May be free
    - Validates technology
  - Right (MVBP):
    - Minimum product people PAY for
    - Tests "will they buy it?"
    - Requires transaction
    - Validates business
- **Animation:** Side-by-side comparison
- **Emphasis:** MVBP is the real goal

#### Slide 25: Three MVBP Criteria
- **Type:** `slide-visual`
- **Content:**
  - Title: "The MVBP Test"
- **Visual:** Three circles/requirements:
  1. Customer gets VALUE (product solves problem)
  2. Customer pays MONEY (real transaction)
  3. You get FEEDBACK (actionable learning)
- **Animation:** Three circles appear and connect
- **All three required**

#### Slide 26: MVBP Examples
- **Type:** `slide-visual`
- **Content:**
  - Title: "Famous MVBPs"
- **Visual:** Four examples:
  - Dropbox: Video + waitlist → Proved demand
  - Zappos: Photos + manual → Proved online shoe buying
  - Groupon: Blog + PDF coupons → Proved local deals
  - Airbnb: Founders' apartment → Proved stranger stays
- **Animation:** Each example with before/after insight
- **Point:** "None of these were fully built products"

#### Slide 27: Dogs Eat the Dog Food
- **Type:** `slide-statement`
- **Content:**
  - Statement: "You haven't validated until strangers pay you real money."
- **Visual:** Dog eating from bowl metaphor
- **Animation:** Statement with emphasis on "strangers" and "real money"

#### Slide 28: Validation Hierarchy
- **Type:** `slide-visual`
- **Content:**
  - Title: "The Validation Ladder"
- **Visual:** Ladder/staircase with levels:
  - Opinion: "That's interesting" (0%)
  - Interest: "Tell me more" (10%)
  - Intent: "I would buy that" (20%)
  - Commitment: "Email me when ready" (40%)
  - Pre-order: "$10 deposit" (70%)
  - Purchase: "Take my money" (90%)
  - Repeat: "Renewing" (100%)
- **Animation:** Ladder builds from bottom, each step lights up
- **Color:** Gradient from weak (gray) to strong (green)
- **Target:** "Get to PAYMENT level"

#### Slide 29: MVBP Definition Template
- **Type:** `slide-visual`
- **Content:**
  - Title: "Define Your MVBP"
- **Visual:** Fill-in template:
  ```
  Our MVBP is [what]
  that [delivers this value]
  for [this price]
  and teaches us [this feedback]
  ```
- **Animation:** Template appears, example fills in
- **Example:** "Our MVBP is a manual tutoring matching service that connects students with tutors for $10/session and teaches us which subjects are most requested"

#### Slide 30: Theme 5 Progress
- **Type:** `slide-visual`
- **Content:**
  - Title: "Theme 5 Complete!"
- **Visual:** DE wheel with Steps 20-23 checked
  - "How do you design and build? ✓"
- **Animation:** Checkmarks, celebration

---

### Closing Section (Slides 31-36)

#### Slide 31: Key Takeaways
- **Type:** `slide-list`
- **Content:**
  - Title: "Remember"
  - List:
    - Every business is built on assumptions
    - High importance + Low certainty = Test first
    - MVBP = Value + Payment + Feedback
    - Talk is cheap—payment is validation
- **Animation:** Each emphasizes

#### Slide 32: Homework
- **Type:** `slide-list`
- **Content:**
  - Title: "Before Next Week"
  - List:
    - Complete assumption matrix (top 3 identified)
    - Design test for each risky assumption
    - Define your MVBP
    - Run at least one test if possible
    - Read: DE Chapter 24 + Start pitch prep
- **Icons:** Grid, flask, lightbulb, play, book

#### Slide 33: Next Week Preview
- **Type:** `slide-two-part`
- **Content:**
  - Primary: "Class 9: Scale & Pitch Preparation"
  - Secondary: "How do you grow? How do you present your venture?"
  - Tertiary: "Final pitches in 2 weeks!"
- **Visual:** Rocket/presentation icon teaser

---

## Key Visualizations to Build

### 1. Assumption Matrix (Slide 12)
```
Structure:
- 2x2 grid with labeled axes
- Four quadrants with different colors/actions
- Interactive feel for plotting assumptions

Animation:
1. Axes draw with labels
2. Quadrant backgrounds fill
3. Labels appear ("TEST NOW", "Monitor", etc.)
4. "TEST NOW" quadrant glows/pulses
5. Example assumptions plot (optional)

Technical:
- SVG or D3 for axes and quadrants
- Glow filter on critical quadrant
- Possible interactive plotting
```

### 2. Testing Techniques Grid (Slide 17)
```
Structure:
- Six technique cards
- Effort indicator for each
- Icon/illustration for technique

Animation:
1. Grid structure appears
2. Cards populate with stagger
3. Effort indicators fill
4. Hover/click for details (optional)

Technical:
- CSS grid layout
- Progress bar for effort level
- Color coding (green/yellow/red)
```

### 3. Validation Ladder (Slide 28)
```
Structure:
- Staircase/ladder shape
- 7 steps with labels
- Percentage indicators
- Color gradient (weak to strong)

Animation:
1. Base step appears
2. Each subsequent step builds upward
3. Labels fade in
4. Percentage indicators appear
5. "Target" marker highlights Payment level

Technical:
- SVG stepped path
- Color gradient from gray to green
- Highlight effect on target step
```

### 4. MVBP Venn Diagram (Slide 25)
```
Structure:
- Three overlapping circles
- Labels: Value, Payment, Feedback
- Center intersection = MVBP

Animation:
1. First circle (Value) appears
2. Second circle (Payment) overlaps
3. Third circle (Feedback) completes
4. Intersection highlights as "MVBP"
5. All three required message

Technical:
- SVG circles with transparency
- Highlight on intersection
- Labels positioned around
```

### 5. Dropbox Growth Visualization (Slide 6)
```
Structure:
- Counter showing signups
- Before: 5,000
- After: 75,000
- Timestamp showing overnight change

Animation:
1. Initial number: 5,000
2. Video icon appears (represents the test)
3. Number rapidly counts up to 75,000
4. "Overnight" label appears
5. "No product built" caption

Technical:
- D3 number interpolation (rapid counting)
- Dramatic timing
- Sound effect optional
```

---

## Transition Notes

- New theme color: Red for Theme 5
- Energy should be high—returning from break
- Testing is liberating, not scary
- Dropbox story is the anchor

---

## Technical Requirements

- D3.js v7 for visualizations
- SVG for custom shapes (ladder, matrix)
- Number counter animations
- Estimated 36 slides
