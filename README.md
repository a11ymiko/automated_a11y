# 🦮 Guidepup A11y Demo

A showcase project demonstrating **real screen reader output assertions** using  
[`@guidepup/virtual-screen-reader`](https://github.com/guidepup/virtual-screen-reader) + [Vitest](https://vitest.dev/).

---

## What This Project Demonstrates

Most accessibility automation tools (axe-core, Lighthouse) check *rules* —  
they tell you **what the code looks like**. Guidepup tells you **what a screen reader actually announces**.

This is the difference between:
- ❌ `aria-expanded attribute is missing` (rule-based)
- ✅ `Expected SR to announce "collapsed" but heard nothing` (user-experience-based)

---

## Project Structure

```
guidepup-a11y-demo/
├── src/
│   └── components.js       # Good + bad versions of 3 UI components
├── tests/
│   ├── helpers.js          # HTML mount utility
│   ├── modal.test.js       # Dialog role, title, close button name
│   ├── form.test.js        # Labels, alerts, aria-invalid
│   └── accordion.test.js   # aria-expanded, heading structure
├── vitest.config.js
└── package.json
```

---

## Components Under Test

Each component has an **accessible (✅)** and **inaccessible (❌)** version  
so tests demonstrate *real failures*, not just theoretical ones.

| Component | What's tested |
|-----------|--------------|
| **Modal Dialog** | `role="dialog"`, `aria-labelledby`, close button name |
| **Signup Form** | Field labels, `role="alert"` errors, `aria-invalid` |
| **FAQ Accordion** | `aria-expanded` state, heading structure, region labels |

---

## Setup & Run

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Watch mode
npm run test:watch
```

> **No screen reader required.** The Virtual Screen Reader simulates screen reader
> output in jsdom — runs anywhere Node.js runs, including CI.

---

## Key Concepts

### `virtual.start()` / `virtual.stop()`
Boots the simulated screen reader against a DOM container.

### `virtual.next()`
Moves the virtual cursor to the next item — just like pressing the Down arrow in NVDA browse mode.

### `virtual.itemText()`
Returns the text the screen reader would announce at the current cursor position.

### `virtual.cursor.isActive()`
Returns `false` when the cursor has moved past the last element — used to know when to stop iterating.

---

## Why Good vs Bad?

Showing only passing tests doesn't teach much. By pairing accessible and  
inaccessible versions of the same component, you can see:

- Exactly what SR users hear in each case
- Which ARIA attributes are responsible for which announcements
- How to write meaningful assertions (not just "element exists")

---

## Next Steps

- Replace `@guidepup/virtual-screen-reader` with `@guidepup/playwright` to test  
  with **real NVDA** (Windows) or **real VoiceOver** (macOS)
- Add `axe-core` alongside Guidepup — they complement each other perfectly
- Integrate into CI with GitHub Actions

---

## Resources

- [Guidepup docs](https://www.guidepup.dev/)
- [Virtual Screen Reader API](https://github.com/guidepup/virtual-screen-reader)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
