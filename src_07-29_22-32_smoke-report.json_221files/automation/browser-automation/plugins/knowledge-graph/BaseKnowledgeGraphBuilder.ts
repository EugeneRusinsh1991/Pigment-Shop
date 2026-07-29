import { ExplorerEventEmitter } from '../../explorer/events/ExplorerEventEmitter';
import { KnowledgeGraphStore } from './models/KnowledgeGraphStore';

export abstract class BaseKnowledgeGraphBuilder {
  protected store: KnowledgeGraphStore;
  protected currentScreenId: string = '';
  protected previousScreenId: string = '';
  protected lastTriggerElementId: string | undefined;

  constructor(protected events: ExplorerEventEmitter, baseUrl: string) {
    this.store = new KnowledgeGraphStore(baseUrl);
    this.attachListeners();
  }

  public getStore(): KnowledgeGraphStore {
    return this.store;
  }

  protected abstract attachListeners(): void;

  protected handleScreenEntered(evt: any): { url: string; normalized: string } | null {
    const url = evt.context?.currentScreen;
    if (!url) return null;
    const normalized = this.normalizeUrl(url);
    this.previousScreenId = this.currentScreenId;
    this.currentScreenId = normalized;
    return { url, normalized };
  }

  protected attachBeforeInteractionListener(getId: (el: any) => string): void {
    this.events.on('BeforeInteraction', (evt) => {
      if (this.currentScreenId && evt.elementIdentifier) {
        const el = this.store.upsertElement(this.currentScreenId, evt.elementIdentifier);
        const id = getId(el);
        this.store.recordInteraction(id);
        this.lastTriggerElementId = id;
      }
    });
  }

  protected attachErrorWarningListeners(): void {
    this.events.on('Warning', (evt) => {
      if (this.currentScreenId) {
        this.store.recordWarning(this.currentScreenId, evt.message);
      }
    });

    this.events.on('Error', (evt) => {
      if (this.currentScreenId) {
        this.store.recordError(this.currentScreenId, evt.error);
      }
    });
  }

  protected normalizeUrl(url: string): string {
    try {
      const parsed = new URL(url);
      let pathname = parsed.pathname || '/';
      pathname = pathname.replace(/\/cat-[0-9a-zA-Z-]+(?:-sub-[0-9]+)*/g, '/cat-[id]');
      pathname = pathname.replace(/\/prod-[0-9a-zA-Z-]+$/, '/prod-[id]');
      return pathname;
    } catch {
      return url;
    }
  }
}
