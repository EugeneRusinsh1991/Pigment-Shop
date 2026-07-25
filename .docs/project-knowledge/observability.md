# Browser Automation Observability Architecture

This document describes the design and implementation of the centralized Observability Layer for the Browser Automation framework. It serves as a guide for developers and AI assistants to understand the observability system without reading the implementation details.

## Architecture Decisions

The observability system was designed with the following core principles:
1. **Separation of Concerns**: Behavioral logic (exploration, navigation, policy) remains strictly separated from observability. The core `UIExplorer` components do not contain logging statements.
2. **Centralized Event Dispatch**: A single `ObservabilityManager` acts as the source of truth, subscribing to the framework's internal `ExplorerEventEmitter` and translating low-level actions into high-level, structured `ObservabilityEvent` objects.
3. **Write-Once Pipeline**: Every automation action triggers exactly one observability event, which is then dispatched to multiple specialized reporters (Console, JSON, Markdown). This eliminates duplicated logic and redundant object creation.
4. **Zero-Overhead Event Sourcing**: Rich DOM metadata (tag, text, role, selector, etc.) is extracted during the existing `ElementScanner` pass using `page.evaluate`, minimizing additional network roundtrips between Node.js and the browser context.

## New Components

The observability layer is housed under `browser-automation/explorer/observability/`.

### 1. Event Model (`events.ts`)
Defines the strict type union `ObservabilityEvent` encompassing:
- `ActionEvent`: Interactions (clicks, inputs) with associated duration and success state.
- `PickEvent`: Selection of target elements based on strategy scores.
- `SkipEvent`: Rejection of elements with specific reasons (e.g., policy, depth, already visited).
- `NavigationEvent`: Page transitions detailing source, destination, and timing metrics.
- `ScanEvent`: DOM evaluation metrics (candidates found, filtered, interactive vs clickable).
- `SummaryEvent`: Aggregated statistics emitted upon completion.
- `ErrorEvent` & `WarningEvent`: Diagnostics.

### 2. ObservabilityManager (`ObservabilityManager.ts`)
The central dispatcher. It listens to `ExplorerEventEmitter`, maintains local state for computing durations and aggregations, and broadcasts strongly typed `ObservabilityEvent`s to all registered `Reporter`s.

### 3. Reporters (`reporters/`)
- **`ConsoleReporter`**: Renders human-readable timeline logs. It strictly adheres to the one-line-per-event rule, emitting dense, formatted strings (e.g., `[CLICK] button "Save" | selector=... | page=/admin | 42ms`) without decorative noise.
- **`JsonReporter`**: Accumulates all dispatched events and serializes them into a highly detailed machine-readable diagnostic file (`reports/run-YYYYMMDD-HHmmss.json`).
- **`MarkdownReporter`**: Analyzes the accumulated events and generates a readable engineering summary report (`reports/run-YYYYMMDD-HHmmss.md`) suitable for AI contextual analysis or human review.

## Modified Files

- **`ElementScanner.ts`**: Modified `scanPage` to construct an `ElementMetadata` object and attach it to the `ScannedElement` interface.
- **`StateCacheManager.ts`**: Updated `PageStateCache` to store a `metadataMap` alongside the existing `identifierMap`, allowing components to retrieve metadata by identifier without re-querying the DOM.
- **`events/ExplorerEvents.ts`**: Enriched internal event interfaces (e.g., `InteractionCompletedEvent`, `DecisionMadeEvent`) with `metadata`, `durationMs`, and deeper metrics.
- **`InteractionProcessor.ts`**: Updated to fetch metadata from the `StateCacheManager` and pass it to the internal event emitter.
- **`UIExplorer.ts`**: Replaced the legacy `TelemetryModule` and `ConsoleRenderer` instantiations with the new `ObservabilityManager` and its reporters.
- **`index.ts`**: Removed outdated telemetry exports and setup logic.

*(The legacy `telemetry/` directory was entirely deleted).*

## Event Flow

1. **Automation Action**: An action occurs within the framework (e.g., `ElementScanner` evaluates the DOM, `InteractionProcessor` clicks an element).
2. **Internal Emission**: The component calls `emitter.emit('EventName', payload)` on the `ExplorerEventEmitter`.
3. **Translation**: `ObservabilityManager` catches the internal event, computes any missing delta timings, and constructs a structured `ObservabilityEvent`.
4. **Dispatch**: `ObservabilityManager` calls `reporter.report(event)` on all configured reporters sequentially.
5. **Reporting**:
   - `ConsoleReporter` synchronously prints to stdout.
   - `JsonReporter` & `MarkdownReporter` store the event in memory.
6. **Flush**: Upon the `ExplorerFinished` signal, `ObservabilityManager` emits a `SummaryEvent` and calls `flush()` on all reporters, causing them to write their final files to disk.

## Report Formats

- **Console Output**: Live stdout stream. Format: `[TYPE] Target/Action | metadata | timing`.
- **JSON Diagnostic**: A complete snapshot of the execution run. Includes top-level `Statistics`, `Environment`, and a flat `Timeline` array of all `ObservabilityEvent`s.
- **Markdown Report**: A structured markdown file containing aggregated statistics, navigation paths, important clicks, error breakdowns, and a frequency analysis of skip reasons.

## Future Extension Points

- **HTML / Dashboard Reporter**: A new reporter implementing the `Reporter` interface can be plugged in to generate static HTML dashboards or send data to a telemetry server.
- **Replay Viewer**: The JSON report format contains enough sequential and selector data to build a visual session replay tool.
- **Metrics/Monitoring**: The `ObservabilityEvent` model is stable enough to be piped into Time-Series databases (e.g., Prometheus/Grafana) via a custom reporter.
- **Screenshot Attachments**: Events can be extended to include base64 screenshot hashes or file paths if screenshot capabilities are added to the crawler.
