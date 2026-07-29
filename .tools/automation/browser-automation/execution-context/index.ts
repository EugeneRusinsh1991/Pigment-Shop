export * from './ExecutionContext';
export * from './BaseExecutionContext';
export * from './GuestContext';
export * from './AdminContext';

import { ExecutionContext } from './ExecutionContext';
import { GuestContext } from './GuestContext';
import { AdminContext } from './AdminContext';

export function resolveExecutionContext(contextId: string | ExecutionContext = 'guest'): ExecutionContext {
  if (typeof contextId !== 'string') {
    return contextId; // It's already an instance
  }

  switch (contextId.toLowerCase()) {
    case 'admin':
      return new AdminContext();
    case 'guest':
    default:
      return new GuestContext();
  }
}
