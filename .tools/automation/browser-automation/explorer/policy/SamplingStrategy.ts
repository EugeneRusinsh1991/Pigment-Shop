import { StrategyType } from './InteractionPolicyConfig';

function sampleFirstMiddleLast<T>(items: T[], targetCount: number): T[] {
  if (targetCount === 1) return [items[0]];
  if (targetCount === 2) return [items[0], items[items.length - 1]];
  const result: T[] = [items[0]];
  const step = (items.length - 1) / (targetCount - 1);
  for (let i = 1; i < targetCount - 1; i++) {
    result.push(items[Math.round(i * step)]);
  }
  result.push(items[items.length - 1]);
  return result;
}

function sampleEvenDistribution<T>(items: T[], targetCount: number): T[] {
  if (targetCount === 1) return [items[Math.floor(items.length / 2)]];
  const result: T[] = [];
  const step = (items.length - 1) / (targetCount - 1);
  for (let i = 0; i < targetCount; i++) {
    const index = Math.round(i * step);
    if (!result.includes(items[index])) {
      result.push(items[index]);
    }
  }
  return result;
}

export class SamplingStrategy {
  static sample<T>(items: T[], targetCount: number, strategy: StrategyType): T[] {
    if (items.length <= targetCount || targetCount <= 0) return items;

    if (strategy === 'first-n') {
      return items.slice(0, targetCount);
    }
    if (strategy === 'random') {
      return [...items].sort(() => 0.5 - Math.random()).slice(0, targetCount);
    }
    if (strategy === 'first-middle-last') {
      return sampleFirstMiddleLast(items, targetCount);
    }

    return sampleEvenDistribution(items, targetCount);
  }
}
