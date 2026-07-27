import Button from '@/components/Button';
import {
    AdminIcon,
    ClipboardIcon,
    HeartIcon,
    LoginIcon,
    LogoutIcon,
    UserIcon
} from '@/components/Icons';
import { Text } from '@/components/Text';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useProfile } from '@/features/profile/useProfile';
import { useDropdownAnimation } from '@/hooks/useDropdownAnimation';
import { useAdminAuth } from '@/services/adminDomain';
import { colors, layout, typography } from '@/theme/tokens';
import { Link } from 'expo-router';
import { Animated, StyleSheet, View } from 'react-native';
import styles from './AppHeaderStyles';

const getTrimmedValue = (val) => {
  return typeof val === 'string' ? val.trim() : '';
};

const getEmail = (user) => {
  return user.email || '';
};

const getFullName = (first, last) => {
  return (first && last) ? `${first} ${last}` : '';
};

const getUserDisplayName = (user, profile) => {
  if (!user) return '';

  const p = profile || {};
  const name = getFullName(getTrimmedValue(p.firstName), getTrimmedValue(p.lastName));
  return name || getEmail(user);
};

const getDropdownStyles = (isDark) => {
  const ic = (dark, light) => isDark ? dark : light;
  return {
    dropdown: [styles.dropdown, ic(styles.dropdownDark, styles.dropdownLight), { width: 180 }],
    subtextText: [styles.dropdownText, ic(styles.subtextDark, styles.subtextLight)],
    itemText: [styles.dropdownText, ic(styles.textDark, styles.textLight)],
    borderBottomColor: isDark ? colors.borderDark : colors.secondaryLightBorder,
    iconColor: isDark ? colors.white : colors.dark,
  };
};

export default function UserDropdown({
  showUserMenu,
  isDark: isDarkProp,
  isAuthenticated,
  onLogout,
  onToggleUserMenu,
  isMobile
}) {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;
  const { t } = useLanguage();
  const { user } = useAuth();
  const { profile } = useProfile(user);
  const { isAdmin } = useAdminAuth();

  const { shouldRender, translateY, opacity } = useDropdownAnimation(showUserMenu);

  if (!shouldRender) return null;

  const dStyles = getDropdownStyles(isDark);

  return (
    <Animated.View
      style={[
        ...dStyles.dropdown,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      {isAuthenticated ? (
        <>
          <View style={[localStyles.userHeader, { borderBottomColor: dStyles.borderBottomColor }]}>
            <Text variant="caption" color="secondary" weight="500" size={typography.sizes.xs - 1} numberOfLines={1} ellipsizeMode="tail">
              {getUserDisplayName(user, profile)}
            </Text>
          </View>
          <Link href="/profile" asChild>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              leftIcon={<UserIcon color={dStyles.iconColor} size={typography.sizes.sm} />}
              title={t('userProfile')}
              style={StyleSheet.flatten([styles.dropdownItem, { justifyContent: 'flex-start' }])}
              textStyle={dStyles.itemText}
              onPress={onToggleUserMenu}
            />
          </Link>
          <Link href="/favorites" asChild>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              leftIcon={<HeartIcon color={dStyles.iconColor} size={typography.sizes.sm} />}
              title={t('navFavorites')}
              style={StyleSheet.flatten([styles.dropdownItem, { justifyContent: 'flex-start' }])}
              textStyle={dStyles.itemText}
              onPress={onToggleUserMenu}
            />
          </Link>
          <Link href="/orders" asChild>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              leftIcon={<ClipboardIcon color={dStyles.iconColor} size={typography.sizes.sm} />}
              title={t('userOrders')}
              style={StyleSheet.flatten([styles.dropdownItem, { justifyContent: 'flex-start' }])}
              textStyle={dStyles.itemText}
              onPress={onToggleUserMenu}
            />
          </Link>
          {isAdmin && (
            <Link href="/admin" asChild>
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                leftIcon={<AdminIcon color={dStyles.iconColor} size={typography.sizes.sm} />}
                title={t('adminTitle')}
                style={StyleSheet.flatten([styles.dropdownItem, { justifyContent: 'flex-start' }])}
                textStyle={dStyles.itemText}
                onPress={onToggleUserMenu}
                data-testid="admin-panel-link"
              />
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            leftIcon={<LogoutIcon color={dStyles.iconColor} size={typography.sizes.sm} />}
            title={t('userLogout')}
            style={StyleSheet.flatten([styles.dropdownItem, { justifyContent: 'flex-start' }])}
            textStyle={dStyles.itemText}
            onPress={() => { onLogout(); onToggleUserMenu(); }}
          />
        </>
      ) : (
        <>
          <Link href="/login" asChild>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              leftIcon={<LoginIcon color={dStyles.iconColor} size={typography.sizes.sm} />}
              title={t('userLogin')}
              style={StyleSheet.flatten([styles.dropdownItem, { justifyContent: 'flex-start' }])}
              textStyle={dStyles.itemText}
              onPress={onToggleUserMenu}
            />
          </Link>
          <Link href={{ pathname: '/login', params: { isRegister: 'true' } }} asChild>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              leftIcon={<UserIcon color={dStyles.iconColor} size={typography.sizes.sm} />}
              title={t('reviewsRegisterBtn')}
              style={StyleSheet.flatten([styles.dropdownItem, { justifyContent: 'flex-start' }])}
              textStyle={dStyles.itemText}
              onPress={onToggleUserMenu}
            />
          </Link>
        </>
      )}
    </Animated.View>
  );
}

const localStyles = StyleSheet.create({
  userHeader: {
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    borderBottomWidth: 1,
    marginBottom: layout.spacing.xxs,
  },
});
