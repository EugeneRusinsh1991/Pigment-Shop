import * as crypto from 'crypto';
import { ExecutionState, StateTransition } from './ExecutionState';

export class ExecutionStateGraph {
  private states = new Map<string, ExecutionState>();
  private transitions: StateTransition[] = [];
  
  // Quick adjacency list for pathfinding
  // adjacency[sourceId] = { targetId, triggerIdentifier }[]
  private adjacency = new Map<string, { targetId: string, triggerIdentifier: string }[]>();

  public generateStateSignature(url: string, elementIdentifiers: string[]): string {
    const sorted = [...elementIdentifiers].sort();
    const joined = sorted.join('|');
    const hash = crypto.createHash('md5').update(joined).digest('hex');
    return `${url}::${hash}`;
  }

  public addState(state: ExecutionState): void {
    if (!this.states.has(state.id)) {
      this.states.set(state.id, state);
      this.adjacency.set(state.id, []);
    }
  }

  public getState(id: string): ExecutionState | undefined {
    return this.states.get(id);
  }

  public addTransition(sourceId: string, targetId: string, triggerIdentifier: string): void {
    // Only add if it doesn't already exist to avoid duplicates
    const existing = this.transitions.find(t => 
      t.sourceStateId === sourceId && 
      t.targetStateId === targetId && 
      t.triggerIdentifier === triggerIdentifier
    );
    
    if (!existing) {
      this.transitions.push({ sourceStateId: sourceId, targetStateId: targetId, triggerIdentifier });
      const adj = this.adjacency.get(sourceId);
      if (adj) {
        adj.push({ targetId, triggerIdentifier });
      }
    }
  }

  /**
   * Finds the shortest path of interactions to get from startStateId to endStateId.
   * Returns an array of triggerIdentifiers to execute.
   * Returns null if no path is found.
   */
  public findShortestPath(startStateId: string, endStateId: string): string[] | null {
    if (startStateId === endStateId) return [];

    const queue: { stateId: string, path: string[] }[] = [{ stateId: startStateId, path: [] }];
    const visited = new Set<string>([startStateId]);

    while (queue.length > 0) {
      const { stateId, path } = queue.shift()!;
      if (stateId === endStateId) return path;

      this.enqueueUnvisitedNeighbors(stateId, path, queue, visited);
    }

    return null;
  }

  private enqueueUnvisitedNeighbors(
    stateId: string,
    path: string[],
    queue: { stateId: string, path: string[] }[],
    visited: Set<string>
  ): void {
    const neighbors = this.adjacency.get(stateId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.targetId)) {
        visited.add(neighbor.targetId);
        queue.push({
          stateId: neighbor.targetId,
          path: [...path, neighbor.triggerIdentifier]
        });
      }
    }
  }
}
