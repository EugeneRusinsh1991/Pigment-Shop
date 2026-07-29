import { CartIcon } from '@/components/Icons';
import { ScrollView, View } from 'react-native';
import { EmptyState } from '../../components/ui/Feedback';
import { ScrollFadeUp } from '../../components/ui/Motion';
import { Heading, Text } from '../../components/ui/Text';
import useGridLayout from '../../hooks/useGridLayout';
import { colors } from '../../theme/tokens';
import Footer from '../shell/components/Footer';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import styles from './CartViewStyles';

function EmptyCart({ isDark, t }) {
  return (
    <ScrollFadeUp style={[styles.emptyState, isDark ? styles.containerDark : styles.containerLight]}>
      <EmptyState
        icon={<CartIcon color={isDark ? colors.white : colors.dark} size={48} />}
        title={t('cartEmpty') || 'Your cart is empty'}
      />
    </ScrollFadeUp>
  );
}

function buildDisplayItem(item, flatList) {
  const matched = flatList.find((product) => product.id === item.id);
  return matched ? { ...item, label: matched.label } : item;
}

function getContainerStyle(isDark, stylesMap) {
  return [stylesMap.container, isDark ? stylesMap.containerDark : stylesMap.containerLight];
}

function renderCartList(items, renderItem) {
  return <View style={styles.list}>{items.map((item) => renderItem({ item }))}</View>;
}

function renderWideLayout({ items, renderItem, summaryProps }) {
  return (
    <ScrollFadeUp style={styles.containerRow}>
      <View style={styles.leftColumn}>
        {renderCartList(items, renderItem)}
      </View>
      <View style={styles.rightColumn}>
        <CartSummary {...summaryProps} />
      </View>
    </ScrollFadeUp>
  );
}

function renderNarrowLayout({ items, renderItem, summaryProps }) {
  return (
    <ScrollFadeUp>
      {renderCartList(items, renderItem)}
      <CartSummary {...summaryProps} />
    </ScrollFadeUp>
  );
}

function renderCartContent({ items, isWide, renderItem, summaryProps, t }) {
  return (
    <>
      <ScrollFadeUp>
        <Heading level={2} style={styles.cartTitle}>
          {t('cartTitle')}
        </Heading>
      </ScrollFadeUp>

      {isWide ? renderWideLayout({ items, renderItem, summaryProps }) : renderNarrowLayout({ items, renderItem, summaryProps })}
    </>
  );
}

export default function CartViewContent({
  items,
  isDark,
  t,
  isWide,
  totalItems,
  totalPrice,
  note,
  onNoteChange,
  onCheckout,
  email,
  firstName,
  lastName,
  phone,
  city,
  onEmailChange,
  onFirstNameChange,
  onLastNameChange,
  onPhoneChange,
  onCityChange,
  increaseQty,
  decreaseQty,
  removeItem,
  flatList,
}) {
  const { gridWidth } = useGridLayout();

  const renderItem = ({ item }) => {
    const displayItem = buildDisplayItem(item, flatList);

    return (
      <CartItem
        key={item.id}
        item={displayItem}
        isDark={isDark}
        onIncrease={() => increaseQty(item.id)}
        onDecrease={() => decreaseQty(item.id)}
        onRemove={() => removeItem(item.id)}
      />
    );
  };

  const summaryProps = {
    totalItems,
    totalPrice,
    isWide,
    isDark,
    note,
    onNoteChange,
    onCheckout,
    email,
    firstName,
    lastName,
    phone,
    city,
    onEmailChange,
    onFirstNameChange,
    onLastNameChange,
    onPhoneChange,
    onCityChange,
  };

  return (
    <ScrollView
      style={getContainerStyle(isDark, styles)}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.flexOne}>
        <View
          style={[
            styles.pageContent,
            !isWide && styles.narrowContent,
            !isWide && { width: gridWidth },
          ]}
        >
          {items.length === 0 ? (
            <EmptyCart isDark={isDark} t={t} />
          ) : (
            renderCartContent({ items, isWide, renderItem, summaryProps, t })
          )}
        </View>
      </View>
      <View style={styles.bottomSpacer} />
      <Footer />
    </ScrollView>
  );
}
