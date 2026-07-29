export type ExplorationStrategy = 'hybrid' | 'breadth-first' | 'depth-first';
export type ExplorationProfile = 'quick' | 'full' | 'deep' | 'custom';
export type ExecutionMode = 'everyday-development' | 'deep-diagnostics';

import { InteractionPolicyConfig } from './policy/InteractionPolicyConfig';

export interface AuthenticationConfig {
  enabled?: boolean;
  provider?: string;
  loginUrl: string;
  username?: string;
  password?: string;
  usernameSelector: string;
  passwordSelector: string;
  submitSelector: string;
}

export interface ExplorerTimeoutsConfig {
  clickTimeoutMs: number;
  scrollTimeoutMs: number;
  pageReadyTimeoutMs: number;
  spaBreatherTimeoutMs: number;
}

export interface ExplorerConfig {
  maxDepth: number;
  maxInteractions: number;
  baseUrl: string;
  strategy: ExplorationStrategy;
  explorationProfile: ExplorationProfile;
  navigationPriority: boolean;
  maxProductsPerCategory: number;
  maxCategories: number;
  topLevelCategoryLimit?: number;
  deepBranchTraversal?: boolean;
  branchCompletionPolicy?: 'exhaustive' | 'default';
  diagnosticMode: boolean;
  executionMode?: ExecutionMode;
  interactionPolicyConfig?: Partial<InteractionPolicyConfig>;
  context?: string | any; // string (e.g. 'admin') or ExecutionContext instance
  authentication?: AuthenticationConfig;
  watchdogTimeoutMs?: number;
  longInteractionThresholdMs?: number;
  timeouts?: ExplorerTimeoutsConfig;
}

export const defaultConfig: ExplorerConfig = {
  maxDepth: 5,
  maxInteractions: 100,
  baseUrl: 'http://localhost:8081',
  strategy: 'hybrid',
  explorationProfile: 'custom',
  navigationPriority: true,
  maxProductsPerCategory: Infinity,
  maxCategories: Infinity,
  topLevelCategoryLimit: 3,
  deepBranchTraversal: true,
  branchCompletionPolicy: 'exhaustive',
  diagnosticMode: false,
  executionMode: 'everyday-development',
  watchdogTimeoutMs: 5000,
  longInteractionThresholdMs: 15000,
  timeouts: {
    clickTimeoutMs: 3000,
    scrollTimeoutMs: 2000,
    pageReadyTimeoutMs: 5000,
    spaBreatherTimeoutMs: 150,
  },
};

function getProfileConfig(profile: ExplorationProfile): Partial<ExplorerConfig> {
  switch (profile) {
    case 'quick':
      return {
        strategy: 'hybrid',
        maxDepth: 3,
        maxInteractions: 50,
        maxProductsPerCategory: 1,
        maxCategories: 5,
        navigationPriority: true
      };
    case 'full':
      return {
        strategy: 'hybrid',
        maxDepth: 5,
        maxInteractions: 200,
        maxProductsPerCategory: 5,
        maxCategories: 10,
        navigationPriority: true
      };
    case 'deep':
      return {
        strategy: 'depth-first',
        maxDepth: 10,
        maxInteractions: 1000,
        maxProductsPerCategory: Infinity,
        maxCategories: Infinity,
        navigationPriority: false
      };
    case 'custom':
    default:
      return {};
  }
}

export function getDepthLimits(config: ExplorerConfig): number[] {
  const { strategy, maxDepth, deepBranchTraversal } = config;
  if (deepBranchTraversal) return [maxDepth];
  if (strategy === 'hybrid') return [1, 2, maxDepth];
  if (strategy === 'breadth-first') return Array.from({ length: maxDepth }, (_, i) => i + 1);
  return [maxDepth];
}
