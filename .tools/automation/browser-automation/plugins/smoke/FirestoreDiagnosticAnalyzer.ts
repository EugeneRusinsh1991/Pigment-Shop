export interface FirestoreDiagnostic {
  collection: string;
  operation: string;
  filters: string;
  ordering: string;
  severity: string;
  rootCause: string;
  recommendedAction: string;
  originalMessage: string;
}

import { DiagnosticConfig, defaultDiagnosticConfig } from './DiagnosticConfig';

function applyRootCauseRule(diagnostic: FirestoreDiagnostic, errorMessage: string, config: DiagnosticConfig): void {
  for (const rule of config.rootCauseRules) {
    if (errorMessage.includes(rule.matchString)) {
      diagnostic.severity = rule.severity;
      diagnostic.rootCause = rule.rootCause;
      diagnostic.recommendedAction = rule.recommendedAction;
      return;
    }
  }
}

function extractOperation(logContext: string, config: DiagnosticConfig): string | null {
  for (const rule of config.operationRules) {
    if (rule.matchStrings.some(s => logContext.includes(s))) {
      return rule.mappedValue;
    }
  }
  return null;
}

function extractCollection(logContext: string, config: DiagnosticConfig): string | null {
  for (const rule of config.collectionRules) {
    if (rule.matchStrings.some(s => logContext.includes(s))) {
      return rule.mappedValue;
    }
  }
  return null;
}

function applyContextExtraction(diagnostic: FirestoreDiagnostic, logContext: string | undefined, config: DiagnosticConfig): void {
  if (!logContext) return;
  
  const operation = extractOperation(logContext, config);
  if (operation) {
    diagnostic.operation = operation;
  }

  const collection = extractCollection(logContext, config);
  if (collection) {
    diagnostic.collection = collection;
  }
}

export class FirestoreDiagnosticAnalyzer {
  public static analyze(errorMessage: string, logContext?: string, config: DiagnosticConfig = defaultDiagnosticConfig): FirestoreDiagnostic | null {
    if (!errorMessage.includes('FirebaseError') && !errorMessage.includes('Firestore')) {
      return null;
    }

    const diagnostic: FirestoreDiagnostic = {
      collection: 'Unknown',
      operation: 'Unknown',
      filters: 'Unknown',
      ordering: 'Unknown',
      severity: 'Warning',
      rootCause: 'Unknown Firestore Error',
      recommendedAction: 'Investigate the exact query in the source code.',
      originalMessage: errorMessage
    };

    applyRootCauseRule(diagnostic, errorMessage, config);
    applyContextExtraction(diagnostic, logContext, config);

    return diagnostic;
  }
}
