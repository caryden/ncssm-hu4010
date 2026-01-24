# Gate 4: Verification Checklist

"Did we build the thing right?"

Focus on CODE QUALITY. If this gate fails, fix the CODE (not the spec).

---

## Code Conventions

### HTML Quality

- [ ] Valid HTML5 (passes W3C validator)
- [ ] Semantic elements used appropriately
- [ ] Proper nesting and structure
- [ ] Comments for complex sections

### CSS Quality

- [ ] Uses CSS variables for colors
- [ ] rem units for font sizes
- [ ] Flexbox/Grid for layout
- [ ] No !important overuse
- [ ] Mobile-first responsive

### JavaScript Quality

- [ ] No global variable pollution
- [ ] Clean function names
- [ ] Comments for complex logic
- [ ] Event listeners properly attached
- [ ] No memory leaks

---

## Accessibility

### Color Contrast

| Element | Foreground | Background | Ratio | Pass |
|---------|------------|------------|-------|------|
| Body text | {color} | {bg} | {ratio} | [ ] ≥4.5:1 |
| Headings | {color} | {bg} | {ratio} | [ ] ≥3:1 |
| Links | {color} | {bg} | {ratio} | [ ] ≥4.5:1 |

Tools: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Images

- [ ] All `<img>` tags have alt attributes
- [ ] Alt text is descriptive (not "image" or "picture")
- [ ] Decorative images have `alt=""`

### Keyboard Navigation

- [ ] All interactive elements focusable
- [ ] Focus order is logical
- [ ] Focus indicators visible
- [ ] No keyboard traps

### Screen Reader

- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] ARIA labels where needed
- [ ] Link text is descriptive
- [ ] Form labels associated

---

## Performance

### Resource Loading

- [ ] Fonts preloaded
- [ ] Critical CSS inlined or preloaded
- [ ] Images optimized (compressed, right format)
- [ ] No render-blocking scripts in `<head>`

### File Sizes

| Resource | Size | Acceptable |
|----------|------|------------|
| HTML | {size} | [ ] < 100KB |
| CSS | {size} | [ ] < 50KB |
| JS | {size} | [ ] < 200KB |
| Images (total) | {size} | [ ] < 1MB |

### Load Time

- [ ] First contentful paint < 2s
- [ ] Time to interactive < 5s
- [ ] No jank on slide transitions

---

## Error-Free

### Console Errors

Open DevTools Console:

- [ ] No JavaScript errors
- [ ] No CSS warnings
- [ ] No failed resource loads

**Errors Found**:
```
{List any errors}
```

### Network Errors

Open DevTools Network:

- [ ] No 404s
- [ ] No CORS errors
- [ ] All resources load

**Failed Resources**:
```
{List any failures}
```

---

## Font Sizes (CRITICAL)

### Minimum Requirements

| Element | Minimum | Check |
|---------|---------|-------|
| Slide titles | 2.5rem (40px) | [ ] |
| Body text | 1.5rem (24px) | [ ] |
| Labels/captions | 1.25rem (20px) | [ ] |
| D3 chart text | 1.25rem (20px) | [ ] |
| Absolute minimum | 1rem (16px) | [ ] |

### Violation Search

```bash
# These should return NO results:
grep -n "font-size:\s*[0-9]px" presentation.astro
grep -n "font-size:\s*1[0-4]px" presentation.astro
grep -n "font-size:\s*0\.[0-8]rem" presentation.astro
```

- [ ] No violations found

---

## Cross-Browser Compatibility

Test in:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

Issues by browser:
```
{List any browser-specific issues}
```

---

## Zoom-Friendly (Remote Viewing)

- [ ] Readable at 80" display size
- [ ] Content not cut off when Zoom-shared
- [ ] Colors visible on typical video compression
- [ ] Text remains sharp at various zoom levels

---

## Gate 4 Result

### PASS Criteria

All critical items checked:
- [ ] No accessibility violations
- [ ] No console errors
- [ ] No font size violations
- [ ] Performance acceptable
- [ ] Cross-browser compatible

### On FAIL

**Fix the CODE, not the spec.**

| Issue Type | Fix Approach |
|------------|--------------|
| Accessibility | Add alt text, fix contrast, add ARIA |
| Console error | Debug JavaScript, fix syntax |
| Font size | Change px to rem, increase size |
| Performance | Optimize images, defer scripts |
| Browser compat | Add polyfills, fix CSS |

---

## Sign-Off

**Gate 4 Status**: [ ] PASS / [ ] FAIL

**Issues Fixed**:
```
{List of fixes applied}
```

**Reviewer**: _______________
**Date**: _______________

---

After Gate 4 passes, proceed to Gate 5 (Validation).
