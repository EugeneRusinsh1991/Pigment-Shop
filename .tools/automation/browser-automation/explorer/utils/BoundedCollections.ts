export class BoundedSet<T> {
  private set = new Set<T>();
  
  constructor(private limit: number) {}

  add(value: T): this {
    if (this.set.has(value)) {
      this.set.delete(value);
    }
    this.set.add(value);
    if (this.set.size > this.limit) {
      const first = this.set.keys().next().value;
      if (first !== undefined) {
        this.set.delete(first);
      }
    }
    return this;
  }

  has(value: T): boolean {
    return this.set.has(value);
  }
  
  delete(value: T): boolean {
    return this.set.delete(value);
  }

  clear(): void {
    this.set.clear();
  }

  get size(): number {
    return this.set.size;
  }
  
  [Symbol.iterator]() {
    return this.set[Symbol.iterator]();
  }
}

export class BoundedMap<K, V> {
  private map = new Map<K, V>();

  constructor(private limit: number) {}

  set(key: K, value: V): this {
    this.map.set(key, value);
    if (this.map.size > this.limit) {
      const first = this.map.keys().next().value;
      if (first !== undefined) {
        this.map.delete(first);
      }
    }
    return this;
  }

  get(key: K): V | undefined {
    const value = this.map.get(key);
    if (value !== undefined) {
      this.map.delete(key);
      this.map.set(key, value);
    }
    return value;
  }

  has(key: K): boolean {
    return this.map.has(key);
  }
  
  delete(key: K): boolean {
    return this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }

  get size(): number {
    return this.map.size;
  }
  
  values() {
    return this.map.values();
  }
  
  keys() {
    return this.map.keys();
  }
  
  entries() {
    return this.map.entries();
  }
  
  [Symbol.iterator]() {
    return this.map[Symbol.iterator]();
  }
}
