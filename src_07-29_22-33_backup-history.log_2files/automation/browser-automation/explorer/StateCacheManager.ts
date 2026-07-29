import { IWebPage, IWebElement } from './driver/DriverInterfaces';
import { ElementMetadata } from './observability/events';
import { ElementScanner } from './ElementScanner';
import { ExecutionStateGraph } from './graph/ExecutionStateGraph';
import { BoundedMap } from './utils/BoundedCollections';

export interface PageStateCache {
  stateId: string;
  domHash: string;
  url: string;
  identifiers: string[];
  elements: IWebElement[];
  identifierMap: Map<string, IWebElement>;
  metadataMap: Map<string, ElementMetadata>;
}

export class StateCacheManager {
  private scanner: ElementScanner;
  private stateGraph: ExecutionStateGraph;
  private currentCache: PageStateCache | null = null;
  private pageCache: BoundedMap<string, PageStateCache>;

  constructor(
    scanner: ElementScanner,
    stateGraph: ExecutionStateGraph,
    maxCacheSize: number = 50
  ) {
    this.scanner = scanner;
    this.stateGraph = stateGraph;
    this.pageCache = new BoundedMap<string, PageStateCache>(maxCacheSize);
  }

  async getPageState(page: IWebPage, forceRescan: boolean = false): Promise<PageStateCache> {
    const currentHash = await this.scanner.checkDomHash(page);
    const url = page.url();
    const cacheKey = `${url}::${currentHash}`;
    
    if (!forceRescan) {
      if (this.currentCache && this.currentCache.domHash === currentHash && this.currentCache.url === url) {
        return this.currentCache;
      }
      const cached = this.pageCache.get(cacheKey);
      if (cached) {
        this.currentCache = cached;
        return cached;
      }
    }

    const scanned = await this.scanner.scanPage(page);
    const identifiers = scanned.map(s => s.identifier);
    const elements = scanned.map(s => s.locator);
    
    const identifierMap = new Map<string, IWebElement>();
    const metadataMap = new Map<string, ElementMetadata>();
    scanned.forEach(s => {
      identifierMap.set(s.identifier, s.locator);
      metadataMap.set(s.identifier, s.metadata);
    });

    const stateId = this.stateGraph.generateStateSignature(url, identifiers);
    this.stateGraph.addState({ id: stateId, url, elementFingerprint: stateId });
    
    this.currentCache = {
      stateId,
      domHash: currentHash,
      url,
      identifiers,
      elements,
      identifierMap,
      metadataMap
    };

    this.pageCache.set(cacheKey, this.currentCache);
    
    return this.currentCache;
  }

  clearCache(): void {
    this.currentCache = null;
    this.pageCache.clear();
  }
}
