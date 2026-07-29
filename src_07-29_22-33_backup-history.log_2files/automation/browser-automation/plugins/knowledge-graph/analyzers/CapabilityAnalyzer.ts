import { KnowledgeAnalyzer } from './KnowledgeAnalyzer';
import { KnowledgeGraphStore } from '../models/KnowledgeGraphStore';
import * as crypto from 'crypto';

export class CapabilityAnalyzer implements KnowledgeAnalyzer {
  analyze(store: KnowledgeGraphStore): void {
    const graph = store.getGraph();
    
    const capabilities = [];

    const hasLogin = Object.values(graph.pages).some(p => p.normalizedRoute.includes('/login') || p.normalizedRoute.includes('/auth'));
    if (hasLogin) {
      capabilities.push({ name: 'Authentication', desc: 'User login, registration, and session management.' });
    }

    const hasCart = Object.values(graph.pages).some(p => p.normalizedRoute.includes('/cart') || p.normalizedRoute.includes('/checkout'));
    if (hasCart) {
      capabilities.push({ name: 'Checkout & Cart', desc: 'Shopping cart and checkout flows.' });
    }

    const hasCatalog = Object.values(graph.pages).some(p => p.normalizedRoute.includes('/catalog') || p.normalizedRoute.includes('/products'));
    if (hasCatalog) {
      capabilities.push({ name: 'Catalog Browsing', desc: 'Product listing and category navigation.' });
    }

    const hasFilters = Object.values(graph.elements).some(e => e.identity.semanticId.toLowerCase().includes('filter'));
    if (hasFilters) {
      capabilities.push({ name: 'Filtering', desc: 'Searching and refining data sets.' });
    }

    for (const cap of capabilities) {
      const stableId = crypto.createHash('sha256').update(`capability:${cap.name}`).digest('hex').substring(0, 12);
      store.addCapability({
        identity: {
          stableId,
          semanticId: cap.name,
          runtimeId: cap.name
        },
        discoveryStatus: 'Discovered',
        confidence: 0.9,
        firstDiscovery: Date.now(),
        lastUpdate: Date.now(),
        name: cap.name,
        description: cap.desc
      });
    }
  }
}
