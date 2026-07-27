import { ScrollView, View } from 'react-native';
import { Text, Heading } from '../../components/Text';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import Footer from '../shell/components/Footer';
import { CartIcon } from '@/components/Icons';
import styles from './CartViewStyles';
import useGridLayout from '../../hooks/useGridLayout';
import { ScrollFadeUp } from '../../components/Motion';
import { colors } from '../../theme/tokens';

function EmptyCart({ isDark, t }) {
  return (
    <ScrollFadeUp style={[styles.emptyState, isDark ? styles.containerDark : styles.containerLight]}>
      <CartIcon color={isDark ? colors.white : colors.dark} size={48} style={styles.emptyIcon} />
      <Text variant="body1" color="muted">
        {t('cartEmpty')}
      </Text>
    </ScrollFadeUp>
  );
}

function buildDisplayItem(item, flatList) {
  const matched = flatList.find((product) => product.id === item.id);
  return matched ? { ...item, label: matched.label } : item;
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
  const ic = (dark, light) => (isDark ? dark : light);

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
      style={[styles.container, ic(styles.containerDark, styles.containerLight)]}
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
            <>
              <ScrollFadeUp>
                <Heading level={2} style={styles.cartTitle}>
                  {t('cartTitle')}
                </Heading>
              </ScrollFadeUp>

              {isWide ? (
                <ScrollFadeUp style={styles.containerRow}>
                  <View style={styles.leftColumn}>
                    <View style={styles.list}>{items.map((item) => renderItem({ item }))}</View>
                  </View>
                  <View style={styles.rightColumn}>
                    <CartSummary {...summaryProps} />
                  </View>
                </ScrollFadeUp>
              ) : (
                <ScrollFadeUp>
                  <View style={styles.list}>{items.map((item) => renderItem({ item }))}</View>
                  <CartSummary {...summaryProps} />
                </ScrollFadeUp>
              )}
            </>
          )}
        </View>
      </View>
      <View style={styles.bottomSpacer} />
      <Footer />
    </ScrollView>
  );
}
