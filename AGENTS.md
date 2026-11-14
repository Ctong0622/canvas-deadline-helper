# Agent Instructions — Canvas Deadline Helper

## Project Goal
Build a simple Chrome extension that helps Babson students see upcoming assignment deadlines on Canvas.

Read `PROPOSAL.md` before writing any code. Follow the features and expected behavior described there.

## Development Rules
- Use the simplest code that works.
- Add nothing I did not ask for.
- Use plain HTML, CSS, and JavaScript.
- Use Chrome Manifest V3.
- Do not use React, Tailwind, or other frameworks.
- Do not use external APIs or AI models.
- Do not include API keys or private information.
- Keep all extension scripts inside this repository.
- Request only the Chrome permissions needed for the features.
- Only run content scripts on the Canvas assignment pages specified in `PROPOSAL.md`.

## Main Features
- Read assignment names and due dates from supported Canvas pages.
- Highlight assignments due within seven days.
- Show detected upcoming assignments in a popup, sorted by deadline.
- Let users turn highlighting on or off.
- Remember the user's preference using Chrome local storage.

## Error Handling
- Handle missing or invalid due dates without crashing.
- Show a clear message when the extension is opened on an unsupported page.
- Show a clear empty state when no upcoming assignments are found.
- Do not modify or submit any Canvas assignments.

## Testing
- Follow the tests described in `PROPOSAL.md`.
- Explain how to test each feature.
- Do not claim a test passed unless it was actually run.
- Keep the code simple enough for me to explain during the class showcase.

## Workflow
- Build one feature at a time.
- Explain important code changes in simple English.
- Do not add features without asking me first.