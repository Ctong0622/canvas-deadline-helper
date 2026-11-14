console.log("Canvas Deadline Helper loaded");

// ---- Deadline Detection ----
//
// Confirmed structure of a Babson Canvas assignment row (checked with
// Chrome DevTools):
//
//   <div class="ig-row">
//     ...
//     <a class="ig-title">Assignment Name</a>
//     ...
//     <div class="ig-details__item assignment-date-due" data-view="date-due">
//       <span data-testid="friendly-date-time">
//         <time datetime="2026-11-14T04:59:59.000Z" title="Nov 13 at 11:59pm">
//           <span class="visible-desktop">Nov 13 at 11:59pm</span>
//         </time>
//       </span>
//     </div>
//   </div>
//
// Each assignment is a ".ig-row". Its name is in ".ig-title". Its due
// date is the "datetime" attribute of the <time> element inside
// ".assignment-date-due" (the exact ISO date Canvas uses internally),
// not the friendly text shown on screen and not the assignment title.

const DAYS_AHEAD_LIMIT = 7;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

// Finds every assignment row currently on the page.
function getAssignmentRows() {
  return document.querySelectorAll(".ig-row");
}

// Reads the assignment name from a row. Returns null if not found.
function getAssignmentName(row) {
  const titleEl = row.querySelector(".ig-title");
  if (!titleEl) {
    return null;
  }
  const text = titleEl.textContent.trim();
  return text.length > 0 ? text : null;
}

// Reads the due date from a row's ".assignment-date-due time[datetime]"
// element and converts it into a JavaScript Date object. Returns null
// if no due date is found or the date cannot be understood.
function getDueDate(row) {
  const timeEl = row.querySelector(".assignment-date-due time[datetime]");
  if (!timeEl) {
    // No due date shown (for example, "Multiple Dates" assignments or
    // assignments with no due date set).
    return null;
  }

  const isoString = timeEl.getAttribute("datetime");
  if (!isoString) {
    return null;
  }

  const parsedDate = new Date(isoString);
  if (isNaN(parsedDate.getTime())) {
    return null; // Invalid date text, skip it safely.
  }

  return parsedDate;
}

// Calculates whole days between now and a due date. Can be negative
// if the assignment is already past due.
function getDaysRemaining(dueDate) {
  const now = new Date();
  return Math.ceil((dueDate.getTime() - now.getTime()) / MS_PER_DAY);
}

// Scans the page and builds a list of assignments that have a valid
// name and due date. Assignments without a valid due date are skipped
// (not crashed on) and noted in the console. Rows are deduplicated by
// their element id so the same assignment is never logged twice.
function detectAssignments() {
  const rows = getAssignmentRows();
  const seenRowIds = new Set();
  const assignments = [];

  rows.forEach((row) => {
    if (row.id) {
      if (seenRowIds.has(row.id)) {
        return; // Already processed this exact assignment row.
      }
      seenRowIds.add(row.id);
    }

    const name = getAssignmentName(row);
    if (!name) {
      return; // Can't identify this assignment, skip it.
    }

    const dueDate = getDueDate(row);
    if (!dueDate) {
      console.log(`Canvas Deadline Helper: skipped "${name}" (no valid due date found).`);
      return;
    }

    assignments.push({
      name: name,
      dueDate: dueDate,
      daysRemaining: getDaysRemaining(dueDate),
    });
  });

  return assignments;
}

// Prints every detected assignment to the console once, noting which
// ones are due within the next 7 days.
function logAssignments() {
  const assignments = detectAssignments();

  if (assignments.length === 0) {
    console.log("Canvas Deadline Helper: no assignments with valid due dates were found on this page.");
    return;
  }

  assignments.forEach((assignment) => {
    const dueWithinSevenDays =
      assignment.daysRemaining >= 0 && assignment.daysRemaining <= DAYS_AHEAD_LIMIT;
    console.log(
      `Canvas Deadline Helper: "${assignment.name}" | Due: ${assignment.dueDate.toLocaleString()} | Days remaining: ${assignment.daysRemaining} | Due within 7 days: ${dueWithinSevenDays}`
    );
  });
}

// Canvas loads assignment rows, and then their due dates, with
// JavaScript after the page first appears - sometimes in more than
// one step. Instead of logging the moment a row shows up (which can
// be before its due date has finished rendering), we wait until the
// page stops changing for a short "quiet period" before detecting and
// logging. We log only once (hasLogged), so re-render events on the
// page never cause duplicate logging.
let hasLogged = false;
let settleTimer = null;

function scheduleLogAssignments() {
  if (hasLogged) {
    return;
  }
  clearTimeout(settleTimer);
  settleTimer = setTimeout(() => {
    if (hasLogged) {
      return;
    }
    hasLogged = true;
    observer.disconnect();
    logAssignments();
  }, 500);
}

const observer = new MutationObserver(scheduleLogAssignments);
observer.observe(document.body, { childList: true, subtree: true });

// In case the page is already fully rendered when this script runs.
scheduleLogAssignments();

// Fallback: if the page never settles, still log after a maximum wait.
setTimeout(() => {
  if (!hasLogged) {
    hasLogged = true;
    observer.disconnect();
    logAssignments();
  }
}, 10000);
