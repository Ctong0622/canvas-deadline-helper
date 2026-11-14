# Canvas Deadline Helper — Mini Project 4 Proposal

## What I Am Building

I wish my browser would highlight upcoming assignment deadlines when I am on Canvas, so I can easily see what I need to finish.

I want to build a Chrome extension called Canvas Deadline Helper. It will help students find upcoming assignments without checking every due date manually.

## Who It Is For

I am building this for myself and other Babson students who use Canvas.

As a college student, I have assignments from different courses. Sometimes it is hard to remember which assignments are due soon. I want a simple tool that helps me see deadlines more clearly.

I will ask a classmate to install and test the extension before submitting the project.

## Where It Runs

The extension will run on Babson Canvas assignment pages:

`https://babson.instructure.com/courses/*/assignments*`

It needs access to these pages because it will read assignment names and due dates that are already displayed on the page.

It will not run on unrelated websites.

## What the User Does

1. Open a Canvas course's assignments page.
2. The extension automatically highlights assignments due within the next seven days.
3. Click the extension icon to open a popup.
4. View detected assignments sorted by their deadlines.
5. Turn deadline highlighting on or off in the popup.

The user does not need to enter assignment information manually.

## What It Does With the Information

The extension reads assignment names and due dates from the current Canvas page.

JavaScript compares each due date with the current date. It identifies assignments due within the next seven days and sorts them from earliest to latest.

The extension then highlights upcoming assignments on the page and displays them in the popup.

It will use Chrome's local storage to remember whether highlighting is enabled.

I do not plan to use an AI model or external API because the main features can be built with JavaScript.

## Features

1. **Deadline Detection:** Find assignment names and due dates on supported Canvas pages.
2. **Deadline Highlighting:** Highlight assignments due within the next seven days.
3. **Assignment Popup:** Show detected upcoming assignments sorted by deadline.
4. **On/Off Switch:** Let users enable or disable highlighting.
5. **Saved Preferences:** Remember the user's highlighting setting.

## States and Tests

### 1. Empty State

**Test:** Open a supported Canvas assignments page with no upcoming assignments detected.

**Expected Result:** The popup displays "No upcoming assignments found."

### 2. Working State

**Test:** Open a Canvas assignments page containing assignments due within seven days.

**Expected Result:** The extension highlights those assignments. The popup shows their names and due dates in chronological order.

### 3. Unsupported Page

**Test:** Open Google or another website outside the supported Canvas pages.

**Expected Result:** The popup displays "Open a Canvas assignments page to use this extension."

### 4. Invalid Input

The user does not enter dates manually, but Canvas pages may contain missing or unreadable dates.

**Test:** Open a supported page containing an assignment without a valid due date.

**Expected Result:** The extension skips that date without crashing. Other valid assignments still appear.

### 5. Highlighting Disabled

**Test:** Turn off highlighting using the popup, then refresh the Canvas page.

**Expected Result:** Assignments are no longer highlighted. The extension remembers that highlighting is disabled.

### 6. No Assignments Due Within Seven Days

**Test:** Open a page containing only assignments with deadlines more than seven days away.

**Expected Result:** No assignments are highlighted, and the popup shows "No upcoming assignments found."

## What I Do Not Know Yet

I am not sure how Canvas organizes assignment names and due dates in its HTML. I need to figure out how to read this information correctly.

I also need to learn how Chrome extensions use content scripts, how the popup communicates with the current page, and how to save settings.

Canvas pages may display assignments differently, so I will need to test the extension on real course pages and fix problems I find.

My goal is to build a simple extension that works reliably before adding more features.