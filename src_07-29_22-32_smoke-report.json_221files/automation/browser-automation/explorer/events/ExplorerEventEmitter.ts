import { ExplorerEventMap, ExplorerEventType } from './ExplorerEvents';

type EventHandler<K extends ExplorerEventType> = (event: ExplorerEventMap[K]) => void | Promise<void>;

export class ExplorerEventEmitter {
  private listeners: { [K in ExplorerEventType]?: Array<EventHandler<K>> } = {};

  on<K extends ExplorerEventType>(event: K, handler: EventHandler<K>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(handler);
  }

  off<K extends ExplorerEventType>(event: K, handler: EventHandler<K>): void {
    const handlers = this.listeners[event];
    if (handlers) {
      this.listeners[event] = handlers.filter(h => h !== handler) as any;
    }
  }

  async emit<K extends ExplorerEventType>(event: K, payload: ExplorerEventMap[K]): Promise<void> {
    const handlers = this.listeners[event];
    if (handlers) {
      for (const handler of handlers) {
        try {
          await handler(payload);
        } catch (e) {
          console.error(`[ExplorerEventEmitter] Error in handler for ${event}:`, e);
        }
      }
    }
  }
}
