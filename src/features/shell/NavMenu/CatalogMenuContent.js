import { View } from 'react-native';
import { useCatalog } from '../../../context/CatalogContext';
import CategoryTreeNode, { useExpandedIds } from './CategoryTreeNode';
import { useAutoExpandSelectedCategory } from './useExpandedIds';
import styles from './NavMenuStyles';

export default function CatalogMenuContent({ isDark, onClose, selectedCategoryId }) {
  const { categoryTree } = useCatalog();
  const [expandedIds, toggleExpand, clearAll, setExpandedIds, lastExpandedId] = useExpandedIds();

  useAutoExpandSelectedCategory(selectedCategoryId, categoryTree, setExpandedIds);

  const roots = categoryTree ? categoryTree.filter((node) => node.isCategory) : [];

  return (
    <View style={styles.catalogContainer}>
      {roots.map((node) => (
        <CategoryTreeNode
          key={node.id}
          node={node}
          depth={0}
          isDark={isDark}
          expandedIds={expandedIds}
          toggleExpand={toggleExpand}
          onClose={onClose}
          selectedCategoryId={selectedCategoryId}
          lastExpandedId={lastExpandedId}
        />
      ))}
    </View>
  );
}
