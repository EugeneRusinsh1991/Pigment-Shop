export class NavigationTracker {
  private visitedScreens = new Set<string>();
  private visitedActions = new Set<string>();

  markScreenVisited(url: string): void {
    this.visitedScreens.add(url);
  }

  isScreenVisited(url: string): boolean {
    return this.visitedScreens.has(url);
  }

  markActionVisited(screen: string, actionId: string): void {
    this.visitedActions.add(`${screen}::${actionId}`);
  }

  isActionVisited(screen: string, actionId: string): boolean {
    return this.visitedActions.has(`${screen}::${actionId}`);
  }

  reset(): void {
    this.visitedScreens.clear();
    this.visitedActions.clear();
  }
}
