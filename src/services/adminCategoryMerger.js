import { CATEGORY_IMAGES } from './catalogBuilder';

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

function mergeCategoryChildren(aChildren, pChildren, mergeNodesFn) {
  const pSubcats = pChildren.filter((c) => c.isCategory);
  const pLeaves = pChildren.filter((c) => !c.isCategory);

  const mergedSubcats = mergeNodesFn(aChildren, pSubcats);

  return [...mergedSubcats, ...pLeaves];
}

function resolveNameRu(aNode) {
  return aNode.name?.ru || aNode.id;
}

function getChildrenArray(node) {
  return node?.children || [];
}

function mergeSingleNode(aNode, pMap, mergeNodesFn) {
  const nameRu = resolveNameRu(aNode);
  const pNode = pMap.get(nameRu);
  const { image, description } = resolveCategoryProps(aNode, pNode);
  
  const aChildren = getChildrenArray(aNode);
  const pChildren = getChildrenArray(pNode);
  
  return {
    id: aNode.id,
    label: nameRu,
    image,
    description,
    children: mergeCategoryChildren(aChildren, pChildren, mergeNodesFn),
    isCategory: true,
  };
}

function mergeNodes(aNodes, pNodes) {
  const pMap = new Map(pNodes.map((n) => [n.label, n]));
  return aNodes.map((aNode) => mergeSingleNode(aNode, pMap, mergeNodes));
}

export function mergeWithAdminCategories(productTree, adminTree) {
  return mergeNodes(adminTree, productTree);
}
