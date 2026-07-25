# Browser Automation Logging Philosophy

## The Problem
Previously, the `ConsoleReporter` printed every single event emitted by the `ObservabilityManager`. While this provided maximum transparency, it led to severe visual noise. A single page could generate hundreds of `SKIP` and `SCAN` logs, burying the actual narrative of where the engine navigated and what actions it successfully took. 

Developers had to scroll through walls of text to answer simple questions like:
- *Did it click the 'Add to Cart' button?*
- *Did it successfully navigate to the Admin panel?*

## The New Philosophy: "Narrative Over Mechanics"

The terminal output should read like a story of the user's journey, not a debug trace of the underlying engine's mechanical operations. 

### 1. Highlight Meaningful State Changes
We only print events that represent a significant progression in the exploration state:
- `🟢 PAGE`: Entering a new logical screen.
- `⚪ CLICK`: A successful physical interaction with the application.
- `🟢 NAV` / `🔵 BACK`: Successfully moving between URLs.
- `🔴 ERROR` / `🟡 WARN`: Critical issues requiring developer attention.

### 2. Mute Implementation Details
Events describing *how* the engine makes decisions are now suppressed in the terminal:
- `🟡 SKIP`: Knowing that 150 elements were skipped because of sampling policies or visited states is an implementation detail. It does not advance the narrative of the journey.
- `🟡 SCAN`: Identifying the number of candidates in the DOM is an internal mechanical step.

### 3. Separation of Concerns (Terminal vs. Reports)
Muting these events in the terminal **does not reduce observability**. The `ObservabilityManager` still emits them, and reporters like the `JsonReporter` or `MarkdownReporter` continue to capture the complete, verbose dataset. 
- **Terminal:** Optimized for quick human comprehension during live execution.
- **JSON/MD Reports:** Optimized for deep debugging, auditing, and programmatic analysis after execution completes.
