import { BoundedSet, BoundedMap } from './utils/BoundedCollections';

export interface ExplorerContext {
  currentScreen: string;
  navigationHistory: string[];
  currentDepth: number;
  interactionCount: number;
  visitedScreens: BoundedSet<string>;
  visitedElements: BoundedSet<string>;
  elementDepths: BoundedMap<string, number>;
  startTime: number;
}
