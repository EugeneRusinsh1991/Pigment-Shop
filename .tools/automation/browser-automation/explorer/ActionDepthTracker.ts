export class ActionDepthTracker {
  private actionMaxDepthExplored: Record<string, number> = {};

  getActionKey(url: string, id: string): string {
    return `${url}::${id}`;
  }

  shouldSkipAction(actionKey: string, remainingDepthNeeded: number): boolean {
    const exploredRemainingDepth = this.actionMaxDepthExplored[actionKey] ?? -1;
    if (exploredRemainingDepth >= remainingDepthNeeded) {
      return true;
    }
    this.actionMaxDepthExplored[actionKey] = remainingDepthNeeded;
    return false;
  }

  reset(): void {
    this.actionMaxDepthExplored = {};
  }
}
