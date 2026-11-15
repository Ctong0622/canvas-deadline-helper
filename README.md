# Canvas Deadline Helper

A simple Chrome extension that highlights upcoming Canvas assignment deadlines and helps students stay organized.

## Project Overview

I built this extension for Mini Project 4 because I sometimes lose track of assignment deadlines on Canvas. As a Babson student, I have assignments across different courses, and it can be easy to miss something that is due soon.

I wanted a simple tool that could automatically highlight assignments due within the next 7 days, instead of checking every deadline myself.

Canvas Deadline Helper is built with HTML, CSS, and JavaScript using Chrome Extension Manifest V3. It works on Babson Canvas Assignments pages and does not require any external APIs or AI models. It simply reads the assignment information already available on the page.

## Features

- **Deadline Detection:** Reads assignment names and due dates from a Canvas course's Assignments page.
- **Deadline Highlighting:** Highlights assignments due within the next 7 days with a light yellow background and an orange left border.
- **Assignment Popup:** Shows assignments due within the next 7 days, including their names, due dates, and days remaining. Assignments are sorted by the earliest deadline.
- **Error Handling:** Skips assignments with missing or invalid due dates and displays a message when no upcoming assignments are found or when the extension is opened outside a supported Canvas page.

## Installation

1. Download or clone this repository to your computer.
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer mode** in the top right corner.
4. Click **Load unpacked**.
5. Select the `canvas-deadline-helper` project folder.
6. The extension should now appear in Chrome.

## How to Use

1. Log into Babson Canvas and open a course's Assignments page.
2. Wait for the page to finish loading.
3. Assignments due within the next 7 days will automatically be highlighted in yellow with an orange left border.
4. Click the **Canvas Deadline Helper** icon in the Chrome toolbar.
5. The popup will show assignments due within the next 7 days, sorted by deadline, with their names, due dates, and days remaining.

If there are no assignments due soon, the popup will display "No upcoming assignments found."

If the extension is opened outside a supported Canvas page, it will ask the user to open a Canvas Assignments page.

## Testing

I tested the extension on my real Babson Canvas Assignments page, not just on sample HTML pages.

I confirmed that:

- The extension correctly reads assignment names and due dates from Canvas.
- Assignments due within 7 days are highlighted with a yellow background and orange border.
- Assignments due later than 7 days and past-due assignments are not highlighted.
- The popup correctly displays assignments due within 7 days, including their names, deadlines, and days remaining.
- The popup and highlighting work together without changing the original assignment information.

For example, when I tested the extension on November 13, my Case 5 Case Analysis Worksheet was highlighted because it was due that day. Assignments due on November 20 were not highlighted because they were outside the 7-day window at the time of testing.

## Challenges and Fixes

**1. Reading Canvas due dates**

My first version worked on sample HTML pages but could not correctly detect deadlines on my real Canvas page.

I used Chrome DevTools to inspect the actual HTML structure and found that Canvas stored the deadline inside a `time` element with a `datetime` attribute.

After sharing this information with Copilot, we updated the code to read the correct element. The extension could then detect real assignment deadlines.

**2. Highlighting not appearing**

After fixing the deadline detection, the extension could identify assignments due soon, but the yellow highlighting was not visible.

The problem was that Canvas's own CSS was overriding the extension's styling. We adjusted the CSS so the highlighting would appear correctly.

**3. Popup not recognizing Canvas**

The popup initially displayed "Open a Canvas assignments page" even when I was already on the correct page.

The problem was related to how the popup checked the current page and communicated with the content script.

We changed the communication method and tested it again on my real Canvas page. The popup finally displayed my upcoming assignment with the correct deadline.

## AI Reflection

I used GitHub Copilot to help build and debug this Chrome extension.

At the beginning, I explained what I wanted the extension to do. Copilot helped create the main files and implement the deadline detection, highlighting, and popup features.

However, the first versions did not work correctly on my real Canvas page. Some features worked in sample tests but failed when I tried them on Babson Canvas.

I tested the extension myself, checked the browser console, and used Chrome DevTools to understand what was going wrong. I also shared the real Canvas HTML with Copilot so it could make more accurate changes.

The biggest thing I learned is that AI-generated code does not always work in real situations, even when the AI says the code is correct. I had to test each feature, identify problems, and give Copilot specific feedback.

I think Copilot made the coding process much faster, especially because I did not have much experience building Chrome extensions. But my own testing and feedback were important in making the final version work.

This project helped me understand how AI can support software development while still requiring human judgment and testing.

## User test