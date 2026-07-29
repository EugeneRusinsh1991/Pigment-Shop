export interface BaseFact {
  id: string;
  timestamp: number;
}

export interface ScreenEnteredFact extends BaseFact {
  type: 'ScreenEntered';
  url: string;
  depth: number;
}

export interface ElementDiscoveredFact extends BaseFact {
  type: 'ElementDiscovered';
  url: string;
  elementIdentifier: string;
}

export interface InteractionFact extends BaseFact {
  type: 'Interaction';
  url: string;
  elementIdentifier: string;
}

export interface WarningFact extends BaseFact {
  type: 'Warning';
  url: string;
  message: string;
}

export interface ErrorFact extends BaseFact {
  type: 'Error';
  url: string;
  message: string;
}

export type Fact = ScreenEnteredFact | ElementDiscoveredFact | InteractionFact | WarningFact | ErrorFact;
