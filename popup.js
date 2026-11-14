// Shows assignments due within the next 7 days, using the detection
// logic that already runs in content.js. This file does not detect
// dates itself - it only asks content.js for its results and displays
// them.
//
// To find out whether the current tab is a supported Canvas
// assignments page, this simply tries to message the tab's content
// script and sees whether it answers. Chrome only injects content.js
// on pages matching manifest.json's "matches" pattern, so getting a
// response means this is a supported page - no separate URL check or
// extra permission is needed.

const UNSUPPORTED_MESSAGE = "Open a Canvas assignments page to use this extension.";
const EMPTY_MESSAGE = "No upcoming assignments found.";

const messageEl = document.getElementById("message");
const listEl = document.getElementById("assignment-list");

function showMessage(text) {
  messageEl.textContent = text;
  listEl.innerHTML = "";
}

function showAssignments(assignments) {
  if (assignments.length === 0) {
    showMessage(EMPTY_MESSAGE);
    return;
  }

  messageEl.textContent = "";
  listEl.innerHTML = "";

  assignments.forEach((assignment) => {
    const item = document.createElement("li");

    const name = document.createElement("div");
    name.className = "assignment-name";
    name.textContent = assignment.name;

    const due = document.createElement("div");
    due.className = "assignment-due";
    const dueDate = new Date(assignment.dueDate);
    due.textContent = `Due ${dueDate.toLocaleString()} (${assignment.daysRemaining} day${assignment.daysRemaining === 1 ? "" : "s"} left)`;

    item.appendChild(name);
    item.appendChild(due);
    listEl.appendChild(item);
  });
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];

  if (!tab || typeof tab.id !== "number") {
    showMessage(UNSUPPORTED_MESSAGE);
    return;
  }

  chrome.tabs.sendMessage(tab.id, { type: "CDH_GET_UPCOMING_ASSIGNMENTS" }, (assignments) => {
    if (chrome.runtime.lastError || !assignments) {
      // No content script answered - this is not a supported Canvas
      // assignments page (or the page was open before the extension
      // was installed/reloaded).
      showMessage(UNSUPPORTED_MESSAGE);
      return;
    }
    showAssignments(assignments);
  });
});
