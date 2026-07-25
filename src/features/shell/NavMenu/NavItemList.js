import { Text, View } from 'react-native';
import Button from '@/components/Button';
import {
    BagIcon,
    BrowIcon,
    ChevronRightIcon,
    GridIcon,
    HomeIcon,
    LashIcon,
    LipIcon,
    NeedleIcon,
    SparkleIcon,
    TagIcon
} from '@/components/Icons';
import styles from './NavMenuStyles';

const ICON_MATCHERS = [
  {
    test: (id, label) => id.includes('essential') || label.includes('баз') || label.includes('топ'),
    icon: SparkleIcon,
  },
  {
    test: (id, label) => id.includes('lash') || id.includes('glue') || label.includes('кле') || label.includes('ресн') || label.includes('вії'),
    icon: LashIcon,
  },
  {
    test: (id, label) => id.includes('pigment') && (id.includes('brow') || label.includes('бров')),
    icon: BrowIcon,
  },
  {
    test: (id, label) => id.includes('pigment') && (id.includes('lip') || label.includes('губ')),
    icon: LipIcon,
  },
  {
    test: (id, label) => id.includes('needle') || id.includes('cartridge') || label.includes('игла') || label.includes('картр') || label.includes('голк'),
    icon: NeedleIcon,
  },
];

const ACTION_ICONS = {
  home: HomeIcon,
  catalog: BagIcon,
  allProducts: TagIcon,
};

function findMatchingIcon(id, label) {
  for (const matcher of ICON_MATCHERS) {
    if (matcher.test(id, label)) return matcher.icon;
  }
  return null;
}

function renderIcon(IconComponent, color, size) {
  return <IconComponent color={color} size={size} />;
}

export function getNavItemIcon(item, color, size = 18) {
  const actionIcon = item.action && ACTION_ICONS[item.action];
  if (actionIcon) return renderIcon(actionIcon, color, size);

  const categoryIcon = findMatchingIcon((item.id || '').toLowerCase(), (item.label || '').toLowerCase());
  if (categoryIcon) return renderIcon(categoryIcon, color, size);

  return renderIcon(GridIcon, color, size);
}

function NavItem({ item, isDark, onSelect }) {
  const iconColor = isDark ? '#f1f5f9' : '#0f172a';
  const chevronColor = isDark ? '#475569' : '#94a3b8';

  return (
    <Button
      key={item.id}
      variant="ghost"
      isDark={isDark}
      style={[styles.itemRow, isDark ? styles.itemRowDark : styles.itemRowLight, { minHeight: 44 }]}
      onPress={() => onSelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrapper}>
        {getNavItemIcon(item, iconColor)}
      </View>
      <Text style={[styles.itemLabel, isDark ? styles.textDark : styles.textLight]} numberOfLines={1}>
        {item.label}
      </Text>
      <ChevronRightIcon color={chevronColor} size={14} />
    </Button>
  );
}

export default function NavItemList({ items, isDark, accentLabels, onSelect }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      {items.map((item) => (
        <NavItem key={item.id} item={item} isDark={isDark} accent={accentLabels} onSelect={onSelect} />
      ))}
    </>
  );
}
