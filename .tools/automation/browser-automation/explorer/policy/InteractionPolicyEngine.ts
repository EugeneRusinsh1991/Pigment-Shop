import { Page, Locator } from 'playwright';
import { InteractionPolicyConfig, defaultPolicyConfig } from './InteractionPolicyConfig';
import { ElementGroupDetector } from './ElementGroupDetector';
import { SamplingStrategy } from './SamplingStrategy';
import { ExplorerEventEmitter } from '../events/ExplorerEventEmitter';
import { ExplorerContext } from '../ExplorerContext';

export class InteractionPolicyEngine {
  private config: InteractionPolicyConfig;

  constructor(config?: Partial<InteractionPolicyConfig>) {
    this.config = {
      ...defaultPolicyConfig,
      ...config,
      policies: { ...defaultPolicyConfig.policies, ...config?.policies }
    };
  }

  async decide(page: Page, elements: Locator[], emitter?: ExplorerEventEmitter, context?: ExplorerContext): Promise<Locator[]> {
    if (!this.config.enabled || elements.length <= 1) {
      return elements;
    }

    const groups = await ElementGroupDetector.detectGroups(page, elements);
    const selectedIndicesSet = new Set<number>();

    for (const group of groups) {
      await this.processGroup(group, selectedIndicesSet, emitter, context);
    }

    // Preserve DOM ordering
    const selectedIndices = Array.from(selectedIndicesSet).sort((a, b) => a - b);
    if (selectedIndices.length === 0) {
      return elements;
    }
    return selectedIndices.map(i => elements[i]);
  }

  private async processGroup(group: { groupType: string; indices: number[] }, selectedIndicesSet: Set<number>, emitter?: ExplorerEventEmitter, context?: ExplorerContext) {
    const policy = this.config.policies[group.groupType as keyof typeof this.config.policies] || this.config.policies.defaultGroup;

    if (this.shouldSampleAll(group.indices.length, policy.sample)) {
      group.indices.forEach(idx => selectedIndicesSet.add(idx));
      return;
    }

    const sampleCount = typeof policy.sample === 'number' ? policy.sample : group.indices.length;
    const strategy = policy.strategy || this.config.defaultStrategy;
    SamplingStrategy.sample(group.indices, sampleCount, strategy).forEach(idx => selectedIndicesSet.add(idx));

    await this.emitRepresentativeDecision(group, sampleCount, emitter, context);
  }

  private shouldSampleAll(totalIndices: number, sampleSetting: 'all' | number): boolean {
    return sampleSetting === 'all' || totalIndices <= sampleSetting;
  }

  private async emitRepresentativeDecision(group: { groupType: string; indices: number[] }, sampleCount: number, emitter?: ExplorerEventEmitter, context?: ExplorerContext) {
    if (!emitter || !context) return;
    await emitter.emit('DecisionMade', {
      context,
      timestamp: Date.now(),
      decision: `REPRESENTATIVE`,
      reason: 'Equivalent behavior',
      contextData: {
        groupName: this.formatGroupName(group.groupType),
        explored: sampleCount,
        total: group.indices.length,
        skipped: group.indices.length - sampleCount
      }
    });
  }

  private formatGroupName(type: string): string {
    const names: Record<string, string> = {
      checkboxGroup: 'Checkbox Group',
      radioGroup: 'Radio Group',
      filterGroup: 'Filter Group',
      navigationGroup: 'Navigation Group',
      listGroup: 'List Group',
      gridGroup: 'Grid Group',
      paginationGroup: 'Pagination Group',
      carouselGroup: 'Carousel Group',
      buttonGroup: 'Button Group',
      defaultGroup: 'Default Group'
    };
    return names[type] || type;
  }

  private formatStrategyName(strategy: string): string {
    const names: Record<string, string> = {
      'even-distribution': 'Even Distribution',
      'first-n': 'First N',
      'random': 'Random',
      'first-middle-last': 'First + Middle + Last'
    };
    return names[strategy] || strategy;
  }
}
