import { ExplorerContext } from './ExplorerContext';

export class NavigationTracker {
  private localVisitedScreens = new Set<string>();
  private localVisitedActions = new Set<string>();

  constructor(private context?: ExplorerContext) {}

  setContext(context: ExplorerContext): void {
    this.context = context;
  }

  markScreenVisited(url: string): void {
    if (this.context) {
      this.context.visitedScreens.add(url);
    } else {
      this.localVisitedScreens.add(url);
    }
  }

  isScreenVisited(url: string): boolean {
    if (this.context) {
      return this.context.visitedScreens.has(url);
    }
    return this.localVisitedScreens.has(url);
  }

  markActionVisited(screen: string, actionId: string): void {
    const key = `${screen}::${actionId}`;
    if (this.context) {
      this.context.visitedElements.add(key);
    } else {
      this.localVisitedActions.add(key);
    }
  }

  isActionVisited(screen: string, actionId: string): boolean {
    const key = `${screen}::${actionId}`;
    if (this.context) {
      return this.context.visitedElements.has(key);
    }
    return this.localVisitedActions.has(key);
  }

  reset(): void {
    if (this.context) {
      this.context.visitedScreens.clear();
      this.context.visitedElements.clear();
    }
    this.localVisitedScreens.clear();
    this.localVisitedActions.clear();
  }
}
