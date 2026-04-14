// tests/modal.test.js
//
// What we're testing:
//   - Does the screen reader announce the dialog role?
//   - Does it read the dialog title and description?
//   - Does the close button have a meaningful accessible name?
//
// We test both the GOOD (accessible) and BAD (inaccessible) versions
// so you can see exactly what a screen reader user hears in each case.

import { virtual } from "@guidepup/virtual-screen-reader";
import { describe, test, expect, afterEach } from "vitest";
import { goodModal, badModal } from "../src/components.js";
import { renderHTML, collectSpokenPhrases } from "./helpers.js";

describe("Modal Dialog", () => {
  afterEach(async () => {
    await virtual.stop();
    document.body.innerHTML = "";
  });

  // ── GOOD MODAL ────────────────────────────────────────────────────────────

  describe("✅ Accessible modal", () => {
    test("announces dialog role and title when entered", async () => {
      renderHTML(goodModal());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      // SR users should hear: the dialog role, its title
      expect(spokenPhrases.some((p) => p.toLowerCase().includes("dialog"))).toBe(true);
      expect(spokenPhrases.some((p) => p.includes("Settings"))).toBe(true);
    });

    test("close button has a descriptive accessible name", async () => {
      renderHTML(goodModal());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      // "X" is not acceptable — should hear "Close settings dialog"
      const closeButtonText = spokenPhrases.find((p) =>
        p.toLowerCase().includes("close")
      );
      expect(closeButtonText).toBeDefined();
      expect(closeButtonText.toLowerCase()).not.toBe("x");
    });

    test("email input has an associated label", async () => {
      renderHTML(goodModal());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      // SR should announce "Email address" when landing on the input
      expect(spokenPhrases.some((p) => p.includes("Email address"))).toBe(true);
    });
  });

  // ── BAD MODAL ─────────────────────────────────────────────────────────────

  describe("❌ Inaccessible modal", () => {
    test("does NOT announce a dialog role", async () => {
      renderHTML(badModal());
      await virtual.start({ container: document.body });


      const spokenPhrases = await collectSpokenPhrases(virtual);

      // SR users should hear: the dialog role, its title
      expect(spokenPhrases.some((p) => p.toLowerCase().includes("dialog"))).toBe(true);
      expect(spokenPhrases.some((p) => p.includes("Settings"))).toBe(true);
    });

    test("close button only announces 'X' — meaningless to SR users", async () => {
      renderHTML(badModal());
      await virtual.start({ container: document.body });

      const spokenPhrases = await collectSpokenPhrases(virtual);

      // "X" is not acceptable — should hear "Close settings dialog"
      const closeButtonText = spokenPhrases.find((p) =>
        p.toLowerCase().includes("close")
      );
      expect(closeButtonText).toBeDefined();
      expect(closeButtonText.toLowerCase()).not.toBe("x");
    });
    });
});
