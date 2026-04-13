// tests/helpers.js
// Utility to mount HTML into jsdom and return a cleanup function.

export function renderHTML(html) {
  document.body.innerHTML = html;
  return () => {
    document.body.innerHTML = "";
  };
}

// Walk virtual cursor until a terminal phrase appears or a max step limit is hit.
export async function collectSpokenPhrases(
  virtual,
  {
    maxSteps = 80,
    stopPhrases = ["end of document", "end of dialog", "end of alertdialog"],
  } = {}
) {
  for (let i = 0; i < maxSteps; i++) {
    const lastPhrase = await virtual.lastSpokenPhrase();
    if (stopPhrases.includes(lastPhrase)) {
      break;
    }

    await virtual.next();
  }

  return virtual.spokenPhraseLog();
}
