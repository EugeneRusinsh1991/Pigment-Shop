export type GroupSampleLimit = number | 'all';
export type StrategyType = 'even-distribution' | 'first-n' | 'random' | 'first-middle-last';

export interface GroupPolicy {
  sample: GroupSampleLimit;
  strategy?: StrategyType;
}

export interface InteractionPolicyConfig {
  enabled: boolean;
  defaultStrategy: StrategyType;
  policies: {
    checkboxGroup: GroupPolicy;
    radioGroup: GroupPolicy;
    filterGroup: GroupPolicy;
    navigationGroup: GroupPolicy;
    listGroup: GroupPolicy;
    gridGroup: GroupPolicy;
    paginationGroup: GroupPolicy;
    carouselGroup: GroupPolicy;
    buttonGroup: GroupPolicy;
    criticalGroup: GroupPolicy;
    defaultGroup: GroupPolicy;
  };
}

export const defaultPolicyConfig: InteractionPolicyConfig = {
  enabled: true,
  defaultStrategy: 'even-distribution',
  policies: {
    checkboxGroup: { sample: 3 },
    radioGroup: { sample: 2 },
    filterGroup: { sample: 3 },
    navigationGroup: { sample: 'all' },
    listGroup: { sample: 3 },
    gridGroup: { sample: 5 },
    paginationGroup: { sample: 2 },
    carouselGroup: { sample: 2 },
    buttonGroup: { sample: 5 },
    criticalGroup: { sample: 'all' },
    defaultGroup: { sample: 'all' }
  }
};
