# Admin Panel Data Editing Automation Architecture

## Component Overview

```
+---------------------------------------------------------------------------------------+
|                                    Automation Core                                    |
|                         (.tools/browser-automation/explorer)                          |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|                             DataEditingValidationPlugin                               |
|                  (.tools/browser-automation/plugins/data-editing)                   |
|                                                                                       |
|  +---------------------------+  +---------------------------+  +-------------------+  |
|  |   FormStateBackupManager  |  |    FormMutationDriver     |  | AssertionEngine   |  |
|  | - Captures values         |  | - Fills test data         |  | - Verifies DOM &  |  |
|  | - Serializes snapshot     |  | - Triggers form save      |  |   network payloads|  |
|  +---------------------------+  +---------------------------+  +-------------------+  |
|                                              |                                        |
|                                              v                                        |
|  +---------------------------------------------------------------------------------+  |
|  |                              RollbackStackManager                               |  |
|  | - Maintains stack of uncommitted snapshots                                      |  |
|  | - Guarantees LIFO rollback on error/exit                                        |  |
|  +---------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|                                    Target Web Page                                    |
|                            (Admin Panel Form Controls)                                |
+---------------------------------------------------------------------------------------+
```

## Module Definitions

### 1. `DataEditingValidationPlugin`
- Listens to `Explorer` events (`ScreenEntered`, `FormDiscovered`).
- Evaluates form safety rules before initiating test mutations.
- Manages the top-level execution flow: Snapshot -> Mutate -> Submit -> Assert -> Restore -> Submit -> Verify Original.

### 2. `FormStateBackupManager`
- Scans target form for interactive inputs (`input[type="text"]`, `textarea`, `select`, `input[type="checkbox"]`, `input[type="radio"]`).
- Extracts current value, checked state, or selected index.
- Returns an immutable `FormSnapshot` object.

### 3. `FormMutationDriver`
- Applies pre-configured or generated non-destructive test strings to target fields.
- Respects field validation rules (e.g., email format for email inputs, positive numbers for price inputs).

### 4. `RollbackStackManager`
- Maintains an in-memory LIFO stack of active mutations.
- Registered with process signal handlers (`process.on('SIGINT')`, `process.on('uncaughtException')`) to execute rollbacks even during unexpected process termination.
