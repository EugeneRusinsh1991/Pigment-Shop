export interface DiagnosticRule {
  matchString: string;
  severity: string;
  rootCause: string;
  recommendedAction: string;
}

export interface ContextRule {
  matchStrings: string[];
  mappedValue: string;
}

export interface DiagnosticConfig {
  rootCauseRules: DiagnosticRule[];
  operationRules: ContextRule[];
  collectionRules: ContextRule[];
}

export const defaultDiagnosticConfig: DiagnosticConfig = {
  rootCauseRules: [
    { 
      matchString: 'requires an index', 
      severity: 'Configuration Warning', 
      rootCause: 'Missing Composite Index', 
      recommendedAction: 'Create the required composite index in firestore.indexes.json.' 
    },
    { 
      matchString: 'index missing', 
      severity: 'Configuration Warning', 
      rootCause: 'Missing Composite Index', 
      recommendedAction: 'Create the required composite index in firestore.indexes.json.' 
    },
    { 
      matchString: 'Permission denied', 
      severity: 'Error', 
      rootCause: 'Permission Denied', 
      recommendedAction: 'Check Firestore security rules (firestore.rules).' 
    },
    { 
      matchString: 'offline', 
      severity: 'Warning', 
      rootCause: 'Offline Mode', 
      recommendedAction: 'Ensure the browser has network access to Firebase.' 
    },
    { 
      matchString: 'Quota exceeded', 
      severity: 'Error', 
      rootCause: 'Quota Exceeded', 
      recommendedAction: 'Check Firebase console for usage limits.' 
    },
    { 
      matchString: 'inequality filter', 
      severity: 'Error', 
      rootCause: 'Invalid Query (Multiple Inequalities)', 
      recommendedAction: 'Refactor query to use only one inequality or configure a composite index if supported.' 
    }
  ],
  operationRules: [
    { 
      matchStrings: ['fetchProductCount', 'getCountFromServer'], 
      mappedValue: 'getCountFromServer()' 
    },
    { 
      matchStrings: ['fetchProductPage', 'getDocs'], 
      mappedValue: 'getDocs()' 
    }
  ],
  collectionRules: [
    { 
      matchStrings: ['products'], 
      mappedValue: 'products' 
    }
  ]
};
