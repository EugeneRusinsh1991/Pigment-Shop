import { IWebPage, IWebElement } from './driver/DriverInterfaces';
import { ElementMetadata } from './observability/events';
import { ElementScanner } from './ElementScanner';
import { ExecutionStateGraph } from './graph/ExecutionStateGraph';

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

  constructor(scanner: ElementScanner, stateGraph: ExecutionStateGraph) {
    this.scanner = scanner;
    this.stateGraph = stateGraph;
  }

  async getPageState(page: IWebPage, forceRescan: boolean = false): Promise<PageStateCache> {
    const currentHash = await this.scanner.checkDomHash(page);
    const url = page.url();
    
    if (!forceRescan && this.currentCache && this.currentCache.domHash === currentHash && this.currentCache.url === url) {
      return this.currentCache;
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
    
    return this.currentCache;
  }
}
