import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useProfile } from '../../hooks/useProfile';
import { useAdminDomain } from '../../services/adminDomain';
import {
    AdminIcon,
    ClipboardIcon,
    HeartIcon,
    LoginIcon,
    LogoutIcon,
    UserIcon
} from '../Icons';
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
    subtextText: [styles.dropdownText, ic(styles.subtextDark, styles.subtextLight), { fontSize: 11 }],
    itemText: [styles.dropdownText, ic(styles.textDark, styles.textLight)],
    borderBottomColor: isDark ? '#333' : '#eee',
    iconColor: isDark ? '#FFFFFF' : '#1C1C1C'
  };
};

export default function UserDropdown({
  showUserMenu,
  isDark,
  isAuthenticated,
  onProfilePress,
  onOrdersPress,
  onLogout,
  onLoginPress,
  onToggleUserMenu,
  isMobile,
  onFavoritesPress,
  onAdminPress
}) {
  const { t } = useTheme();
  const { user } = useAuth();
  const { profile } = useProfile(user);
  const { isAdmin } = useAdminDomain();

  if (!showUserMenu) return null;
  
  const dStyles = getDropdownStyles(isDark);

  return (
    <View style={dStyles.dropdown}>
      {isAuthenticated ? (
        <>
          <View style={{ paddingVertical: 8, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: dStyles.borderBottomColor, marginBottom: 4 }}>
            <Text style={dStyles.subtextText} numberOfLines={1} ellipsizeMode="tail">
              {getUserDisplayName(user, profile)}
            </Text>
          </View>
          <TouchableOpacity style={[styles.dropdownItem, { flexDirection: 'row', alignItems: 'center' }]} onPress={() => { onProfilePress(); onToggleUserMenu(); }}>
            <UserIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
            <Text style={dStyles.itemText}>{t('userProfile')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dropdownItem, { flexDirection: 'row', alignItems: 'center' }]} onPress={() => { onFavoritesPress && onFavoritesPress(); onToggleUserMenu(); }}>
            <HeartIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
            <Text style={dStyles.itemText}>{t('navFavorites')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dropdownItem, { flexDirection: 'row', alignItems: 'center' }]} onPress={() => { onOrdersPress(); onToggleUserMenu(); }}>
            <ClipboardIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
            <Text style={dStyles.itemText}>{t('userOrders')}</Text>
          </TouchableOpacity>
          {isAdmin && (
            <TouchableOpacity style={[styles.dropdownItem, { flexDirection: 'row', alignItems: 'center' }]} onPress={() => { onAdminPress(); onToggleUserMenu(); }}>
              <AdminIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
              <Text style={dStyles.itemText}>{t('adminTitle')}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.dropdownItem, { flexDirection: 'row', alignItems: 'center' }]} onPress={() => { onLogout(); onToggleUserMenu(); }}>
            <LogoutIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
            <Text style={dStyles.itemText}>{t('userLogout')}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={[styles.dropdownItem, { flexDirection: 'row', alignItems: 'center' }]} onPress={() => { onFavoritesPress && onFavoritesPress(); onToggleUserMenu(); }}>
            <HeartIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
            <Text style={dStyles.itemText}>{t('navFavorites')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dropdownItem, { flexDirection: 'row', alignItems: 'center' }]} onPress={() => { onLoginPress(); onToggleUserMenu(); }}>
            <LoginIcon color={dStyles.iconColor} size={14} style={{ marginRight: 8 }} />
            <Text style={dStyles.itemText}>{t('userLogin')}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
