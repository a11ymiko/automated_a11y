// tests/accordion.test.js
//
// What we're testing:
//   - Does the SR announce expanded/collapsed state on accordion buttons?
//   - Is the section properly labelled?
//   - Are items structured as headings (so SR users can navigate with H key)?
//   - Does the bad version leave users with no state or structure context?

import { virtual } from "@guidepup/virtual-screen-reader";
import { describe, test, expect, afterEach } from "vitest";
import { goodAccordion, badAccordion } from "../src/components.js";
import { renderHTML, collectSpokenPhrases } from "./helpers.js";

describe("FAQ Accordion", () => {
  afterEach(async () => {
    await virtual.stop();
    document.body.innerHTML = "";
  });

  // ── GOOD ACCORDION ────────────────────────────────────────────────────────

  describe("✅ Accessible accordion", () => {
    test("section is announced with its label", async () => {
      renderHTML(goodAccordion());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      expect(
        spokenPhrases.some((p) => p.includes("Frequently Asked Questions"))
      ).toBe(true);
    });

    test("collapsed item is not announced as an open region", async () => {
      renderHTML(goodAccordion());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      // The collapsed panel is hidden, so its region should not be visited.
      expect(
        spokenPhrases.some((p) => p.includes("region, What is WCAG?"))
      ).toBe(false);
    });

    test("expanded item is announced as an open region", async () => {
      renderHTML(goodAccordion());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      // The expanded panel should be exposed as a region.
      expect(
        spokenPhrases.some((p) => p.includes("region, What is ARIA?"))
      ).toBe(true);
    });

    test("accordion items are structured as headings for easy navigation", async () => {
      renderHTML(goodAccordion());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      // headings are the primary navigation landmark for SR users browsing a page
      expect(
        spokenPhrases.some((p) => p.toLowerCase().includes("heading"))
      ).toBe(true);
    });
  });

  // ── BAD ACCORDION ─────────────────────────────────────────────────────────

  describe("❌ Inaccessible accordion", () => {
    test("does NOT announce expanded or collapsed state", async () => {
      renderHTML(badAccordion());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      const hasState = spokenPhrases.some(
        (p) =>
          p.toLowerCase().includes("expanded") ||
          p.toLowerCase().includes("collapsed")
      );
      expect(hasState).toBe(false);
    });

    test("items are plain divs — no heading structure for navigation", async () => {
      renderHTML(badAccordion());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      expect(
        spokenPhrases.some((p) => p.toLowerCase().includes("heading"))
      ).toBe(false);
    });
  });
});
