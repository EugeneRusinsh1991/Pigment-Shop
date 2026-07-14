import { CATEGORY_IMAGES } from './catalogBuilder.js';

function resolveImage(aNode, pNode) {
  const nameRu = aNode.name?.ru || aNode.id;
  const fallbacks = [
    aNode.image,
    pNode?.image,
    CATEGORY_IMAGES[nameRu],
    CATEGORY_IMAGES['Другое']
  ];
  return fallbacks.find(Boolean);
}

function resolveDescription(aNode, pNode) {
  const fallbacks = [
    aNode.description?.ru,
    pNode?.description
  ];
  return fallbacks.find(Boolean) || '';
}

function resolveCategoryProps(aNode, pNode) {
  return {
    image: resolveImage(aNode, pNode),
    description: resolveDescription(aNode, pNode),
  };
}

function resolveAdminLabel(aNode, lang) {
  return aNode.name?.[lang] || aNode.name?.ru || aNode.name?.en || aNode.id;
}

function getChildrenArray(node) {
  return node?.children || [];
}

function buildProductNodeMap(productNodes) {
  const map = new Map();

  function traverse(nodes) {
    nodes.forEach((node) => {
      if (!node) return;
      if (node.isCategory) {
        if (node.label) {
          map.set(node.label, node);
        }
        if (node.id) {
          map.set(node.id, node);
        }
      }
      traverse(getChildrenArray(node));
    });
  }

  traverse(productNodes);
  return map;
}

function mergeCategoryChildren(aChildren, pChildren, mergeNodesFn, lang, pMap) {
  const pSubcats = pChildren.filter((c) => c.isCategory);
  const pLeaves = pChildren.filter((c) => !c.isCategory);

  if (aChildren.length === 0) {
    return [...pSubcats, ...pLeaves];
  }

  const mergedSubcats = mergeNodesFn(aChildren, pSubcats, lang, pMap);

  const adminLabels = new Set(
    aChildren.flatMap((a) => [resolveAdminLabel(a, lang), a.id])
  );
  const unmatchedSubcats = pSubcats.filter(
    (subcat) => !adminLabels.has(subcat.label) && !adminLabels.has(subcat.id)
  );

  return [...mergedSubcats, ...pLeaves, ...unmatchedSubcats];
}

function mergeSingleNode(aNode, mergeNodesFn, lang, pMap) {
  const label = resolveAdminLabel(aNode, lang);
  // Try to match product-derived nodes by localized label first, then by
  // admin category id as a robust fallback (products may be grouped by id).
  const pNode = pMap.get(label) || pMap.get(aNode.id);
  const { image, description } = resolveCategoryProps(aNode, pNode);
  
  const aChildren = getChildrenArray(aNode);
  const pChildren = getChildrenArray(pNode);
  
  return {
    id: aNode.id,
    label,
    image,
    description,
    children: mergeCategoryChildren(aChildren, pChildren, mergeNodesFn, lang, pMap),
    isCategory: true,
  };
}

function mergeNodes(aNodes, pNodes, lang, pMap) {
  return aNodes.map((aNode) => mergeSingleNode(aNode, mergeNodes, lang, pMap));
}

export function mergeWithAdminCategories(productTree, adminTree, lang = 'en') {
  const pMap = buildProductNodeMap(productTree);
  return mergeNodes(adminTree, productTree, lang, pMap);
}
