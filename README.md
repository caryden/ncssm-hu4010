# AI-Assisted Course Design Experiment

> **[View the Live Course Site →](https://caryden.github.io/ncssm-hu4010)**

This repository is an experiment in **AI-assisted curriculum development**, exploring how [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and other AI tools can collaborate with educators to design, build, and maintain educational content.

The course itself is **Applications in Entrepreneurship** (HU4010) at the [North Carolina School of Science and Mathematics (NCSSM)](https://www.ncssm.edu/), based on Bill Aulet's *[Disciplined Entrepreneurship](https://www.amazon.com/Disciplined-Entrepreneurship-24-Steps-Successful/dp/1118692284)* framework from [MIT](https://entrepreneurship.mit.edu/).

## What Makes This Different

This isn't just a course website—it's a testbed for a new approach to curriculum development:

1. **AI-Generated Content with Human Oversight**: Presentations, lesson plans, and design documents were developed through iterative collaboration between instructors and [Claude Code](https://docs.anthropic.com/en/docs/claude-code).

2. **RPIV Workflow System**: A structured Research-Plan-Implement-Verify workflow ensures quality through defined gates and checklists.

3. **Living Documentation**: Design decisions, pedagogical rationale, and teaching philosophy are captured in queryable design documents, not lost in email threads.

4. **Rapid Iteration**: Changes to presentations, styling, or content can be made through natural language requests, dramatically reducing the friction of course updates.

## Repository Structure

```
ncssm-hu4010/
├── src/
│   ├── pages/                    # Astro pages
│   │   ├── index.astro           # Course syllabus/homepage
│   │   ├── design/               # Instructor design documents
│   │   │   ├── index.astro       # Design docs index
│   │   │   ├── [slug].astro      # Individual design docs
│   │   │   └── lessons/          # Lesson plan pages
│   │   └── class-{n}-{topic}/    # Class presentations
│   ├── content/
│   │   ├── design/               # Course design documents (MDX)
│   │   │   ├── curriculum-research.mdx
│   │   │   ├── course-plan.mdx
│   │   │   ├── syllabus.mdx
│   │   │   └── presentation-spec.mdx
│   │   └── classes/              # Per-class content
│   │       └── {n}-{topic}/
│   │           ├── lesson-plan.md
│   │           └── narration.json
│   ├── components/               # Reusable presentation components
│   ├── layouts/                  # Page layouts
│   ├── config/                   # Course configuration
│   └── styles/                   # Global styles
├── public/                       # Static assets
├── .claude/                      # Claude Code skills and config
│   └── skills/                   # RPIV workflow skills
├── CLAUDE.md                     # Instructions for Claude Code
└── master-presentation-spec.md   # Design system specification
```

## Technology Stack

- **[Astro](https://astro.build/)** - Static site generator with content collections
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[D3.js](https://d3js.org/)** - Data visualizations in presentations
- **MDX** - Markdown with components for design documents

## Working with Claude Code

This repository is designed to be maintained through conversation with [Claude Code](https://docs.anthropic.com/en/docs/claude-code), Anthropic's agentic coding tool. The `CLAUDE.md` file contains detailed instructions that Claude Code follows when making changes.

### Common Tasks

**Update a presentation:**
```
"Add a slide about customer discovery to class 2"
"Change the color scheme for theme 3 presentations"
```

**Modify course structure:**
```
"Add a new session between classes 4 and 5 about competitive analysis"
"Update the syllabus dates for spring 2027"
```

**Work with design documents:**
```
"Update the course plan to emphasize more team activities"
"Add a section about assessment rubrics to the syllabus"
```

### RPIV Workflow Skills

The `.claude/skills/` directory contains specialized skills for curriculum development:

| Skill | Purpose |
|-------|---------|
| `/class-research {topic}` | Research a topic deeply before planning |
| `/lesson-plan {topic}` | Create a lesson plan for a class |
| `/presentation-spec {topic}` | Specify slide content and flow |
| `/presentation-build {topic}` | Build the actual presentation |
| `/presentation-review {topic}` | Validate against spec and objectives |
| `/artifact-status` | Check what exists and what's missing |

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site is deployed to GitHub Pages automatically on push to `main`.

## Design Philosophy

### For Students
- Clean, distraction-free presentations optimized for classroom display and Zoom
- Consistent visual language tied to the DE Framework's 6 themes
- Keyboard navigation for smooth presentation flow

### For Instructors
- Design documents capture the "why" behind every pedagogical choice
- Lesson plans provide session-by-session guidance with timing
- Easy updates through conversation with [Claude Code](https://docs.anthropic.com/en/docs/claude-code)

### For AI Collaboration
- Structured content makes context easy to gather
- Design specs prevent drift from intended learning objectives
- Quality gates catch issues before they reach students

## Keyboard Shortcuts

**Course Homepage:**
- `0-9` - Jump to class presentation
- `D` - Open design documents

**Presentations:**
- `←/→` - Navigate slides
- `T` - Table of contents
- `A` - Appendix
- `S` - Return to syllabus
- `L` - Open lesson plan
- `F` - Fullscreen

## Contributing

This is an experimental project. If you're interested in AI-assisted curriculum development, feel free to:

1. Fork the repository
2. Explore how the RPIV workflow operates
3. Adapt the approach for your own courses

## License

MIT License - See [LICENSE](LICENSE) for details.

## Acknowledgments

- **[Bill Aulet](https://mitsloan.mit.edu/faculty/directory/bill-aulet)** and [MIT Martin Trust Center for Entrepreneurship](https://entrepreneurship.mit.edu/) for the [Disciplined Entrepreneurship](https://www.d-eship.com/) framework
- **[NCSSM](https://www.ncssm.edu/)** for supporting experimental approaches to education
- **[Anthropic](https://www.anthropic.com/)** for [Claude Code](https://docs.anthropic.com/en/docs/claude-code), which co-authored much of this content

---

*This README was collaboratively written by a human instructor and [Claude Code](https://docs.anthropic.com/en/docs/claude-code).*
