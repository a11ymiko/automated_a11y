// src/components.js
// These functions return HTML strings representing UI components.
// We have "good" (accessible) and "bad" (inaccessible) versions
// of each component so tests can demonstrate real failures.

// ─────────────────────────────────────────────
// 1. MODAL DIALOG
// ─────────────────────────────────────────────

export function goodModal() {
  return `
    <div>
      <button id="open-modal">Open Settings</button>

      <div
        id="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <h2 id="modal-title">Settings</h2>
        <p id="modal-desc">Adjust your account preferences below.</p>
        <label for="email-input">Email address</label>
        <input id="email-input" type="email" />
        <button id="save-btn">Save changes</button>
        <button id="close-modal" aria-label="Close settings dialog">Close</button>
      </div>
    </div>
  `;
}

export function badModal() {
  // Missing: role="dialog", aria-labelledby, aria-describedby
  // Close button has no accessible name
  return `
    <div>
      <button id="open-modal">Open Settings</button>

      <div id="modal">
        <div>Settings</div>
        <div>Adjust your account preferences below.</div>
        <input id="email-input" type="email" />
        <button id="save-btn">Save changes</button>
        <button id="close-modal">X</button>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────
// 2. FORM WITH ERROR HANDLING
// ─────────────────────────────────────────────

export function goodForm() {
  return `
    <form id="signup-form" novalidate>
      <h1>Create Account</h1>

      <div>
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          aria-required="true"
          aria-describedby="username-error"
          aria-invalid="true"
        />
        <span id="username-error" role="alert">
          Username is required and must be at least 3 characters.
        </span>
      </div>

      <div>
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          aria-required="true"
          aria-describedby="password-hint"
        />
        <span id="password-hint">
          Must be at least 8 characters and include a number.
        </span>
      </div>

      <button type="submit">Create account</button>
    </form>
  `;
}

export function badForm() {
  // Missing: labels, aria-required, aria-invalid, error association
  return `
    <form id="signup-form">
      <div>Create Account</div>

      <div>
        <input id="username" type="text" placeholder="Username" />
        <span style="color:red">Username is required</span>
      </div>

      <div>
        <input id="password" type="password" placeholder="Password" />
      </div>

      <button type="submit">Submit</button>
    </form>
  `;
}

// ─────────────────────────────────────────────
// 3. ACCORDION
// ─────────────────────────────────────────────

export function goodAccordion() {
  return `
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently Asked Questions</h2>

      <div>
        <h3>
          <button
            id="faq-btn-1"
            aria-expanded="false"
            aria-controls="faq-panel-1"
          >
            What is WCAG?
          </button>
        </h3>
        <div
          id="faq-panel-1"
          role="region"
          aria-labelledby="faq-btn-1"
          hidden
        >
          <p>WCAG stands for Web Content Accessibility Guidelines.</p>
        </div>
      </div>

      <div>
        <h3>
          <button
            id="faq-btn-2"
            aria-expanded="true"
            aria-controls="faq-panel-2"
          >
            What is ARIA?
          </button>
        </h3>
        <div
          id="faq-panel-2"
          role="region"
          aria-labelledby="faq-btn-2"
        >
          <p>ARIA stands for Accessible Rich Internet Applications.</p>
        </div>
      </div>
    </section>
  `;
}

export function badAccordion() {
  // Missing: aria-expanded, aria-controls, region roles, headings
  return `
    <div>
      <div class="faq-item">
        <div id="faq-btn-1" onclick="toggle(1)">What is WCAG?</div>
        <div id="faq-panel-1" style="display:none">
          WCAG stands for Web Content Accessibility Guidelines.
        </div>
      </div>
      <div class="faq-item">
        <div id="faq-btn-2" onclick="toggle(2)">What is ARIA?</div>
        <div id="faq-panel-2">
          ARIA stands for Accessible Rich Internet Applications.
        </div>
      </div>
    </div>
  `;
}
