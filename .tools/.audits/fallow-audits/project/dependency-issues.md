# 🔗 Dependency Issues

*Generated on: 31.07.2026, 12:49:50*

#### Circular Dependencies (⚠️ High Risk)
- {"files":["auditors/perf-auditor/cdp-trace-collector.ts","auditors/perf-auditor/v8-profile-resolver.ts"],"length":2,"line":2,"col":9,"edges":[{"path":"auditors/perf-auditor/cdp-trace-collector.ts","line":2,"col":9},{"path":"auditors/perf-auditor/v8-profile-resolver.ts","line":1,"col":9}],"actions":[{"type":"refactor-cycle","auto_fixable":false,"description":"Extract shared logic into a separate module to break the cycle","note":"Circular imports can cause initialization issues and make code harder to reason about"},{"type":"suppress-line","auto_fixable":false,"description":"Suppress with an inline comment above the line","comment":"// fallow-ignore-next-line circular-dependency"}]}

