export interface ExecutionState {
  id: string;
  url: string;
  elementFingerprint: string;
}

export interface StateTransition {
  sourceStateId: string;
  targetStateId: string;
  triggerIdentifier: string;
}
