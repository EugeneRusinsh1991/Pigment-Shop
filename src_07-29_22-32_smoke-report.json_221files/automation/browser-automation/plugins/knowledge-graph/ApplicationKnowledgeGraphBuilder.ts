import { BaseKnowledgeGraphBuilder } from './BaseKnowledgeGraphBuilder';

export class ApplicationKnowledgeGraphBuilder extends BaseKnowledgeGraphBuilder {
  protected attachListeners() {
    this.events.on('ScreenEntered', (evt) => {
      const info = this.handleScreenEntered(evt);
      if (info) {
        this.store.upsertPage(info.url, info.normalized, evt.context.currentDepth);

        // Record navigation transition as a raw fact
        if (this.previousScreenId && this.previousScreenId !== this.currentScreenId) {
           this.store.addRelationship(
             this.previousScreenId, 
             this.currentScreenId, 
             'NAVIGATES_TO', 
             this.lastTriggerElementId, 
             { type: 'ScreenTransition' }
           );
        }
        this.lastTriggerElementId = undefined; // reset
      }
    });

    this.attachBeforeInteractionListener((el) => el.id);
    this.attachErrorWarningListeners();
  }
}

