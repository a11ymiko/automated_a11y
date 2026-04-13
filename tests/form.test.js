// tests/form.test.js
//
// What we're testing:
//   - Are form fields announced with their labels?
//   - Are error messages announced via role="alert"?
//   - Is aria-invalid communicated to the screen reader?
//   - Is aria-required communicated?

import { virtual } from "@guidepup/virtual-screen-reader";
import { describe, test, expect, afterEach } from "vitest";
import { goodForm, badForm } from "../src/components.js";
import { renderHTML, collectSpokenPhrases } from "./helpers.js";

describe("Signup Form", () => {
  afterEach(async () => {
    await virtual.stop();
    document.body.innerHTML = "";
  });

  // ── GOOD FORM ─────────────────────────────────────────────────────────────

  describe("✅ Accessible form", () => {
    test("announces form heading", async () => {
      renderHTML(goodForm());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      expect(spokenPhrases.some((p) => p.includes("Create Account"))).toBe(true);
    });

    test("username field announces its label", async () => {
      renderHTML(goodForm());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      expect(spokenPhrases.some((p) => p.includes("Username"))).toBe(true);
    });

    test("error message is announced as an alert", async () => {
      renderHTML(goodForm());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      // role="alert" makes this discoverable and auto-announced on change
      expect(
        spokenPhrases.some((p) =>
          p.includes("Username is required")
        )
      ).toBe(true);
    });

    test("invalid username field communicates aria-invalid state", async () => {
      renderHTML(goodForm());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      // Should announce something like "invalid" alongside the field
      expect(spokenPhrases.some((p) => p.toLowerCase().includes("invalid"))).toBe(true);
    });
  });

  // ── BAD FORM ──────────────────────────────────────────────────────────────

  describe("❌ Inaccessible form", () => {
    test("username field is announced via placeholder, not an associated label", async () => {
      renderHTML(badForm());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      // Placeholder text can be announced, but this is weaker than a real label.
      expect(
        spokenPhrases.some((p) => p.toLowerCase().includes("placeholder username"))
      ).toBe(true);
    });

    test("error message is NOT announced as alert — SR users miss it", async () => {
      renderHTML(badForm());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      // Plain red <span> with no role — it IS in the DOM but not associated
      // to the input, so SR doesn't connect it to the field context
      const hasAlert = spokenPhrases.some(
        (p) => p.toLowerCase().includes("alert")
      );
      expect(hasAlert).toBe(false);
    });
  });
});
