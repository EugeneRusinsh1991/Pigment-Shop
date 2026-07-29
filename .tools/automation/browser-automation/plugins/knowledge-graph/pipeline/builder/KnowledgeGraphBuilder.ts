import { BaseKnowledgeGraphBuilder } from '../../BaseKnowledgeGraphBuilder';

export class KnowledgeGraphBuilder extends BaseKnowledgeGraphBuilder {
  protected attachListeners() {
    this.events.on('ScreenEntered', (evt) => {
      const info = this.handleScreenEntered(evt);
      if (info) {
        const page = this.store.upsertPage(info.url, info.normalized, evt.context.currentDepth);

        if (this.previousScreenId && this.previousScreenId !== this.currentScreenId) {
           this.store.addRelationship({
             id: `${this.previousScreenId}-NAVIGATES_TO-${page.identity.stableId}-${this.lastTriggerElementId || 'unknown'}`,
             sourceId: this.previousScreenId,
             sourceType: 'PAGE',
             targetId: page.identity.stableId,
             targetType: 'PAGE',
             relationshipType: 'NAVIGATES_TO',
             createdBy: 'KnowledgeGraphBuilder',
             typedMetadata: {
               triggerElementId: this.lastTriggerElementId,
               transitionType: 'navigation',
               success: true
             }
           });
        }
        this.lastTriggerElementId = undefined;
      }
    });

    this.attachBeforeInteractionListener((el) => el.identity.stableId);
    this.attachErrorWarningListeners();
  }
}

