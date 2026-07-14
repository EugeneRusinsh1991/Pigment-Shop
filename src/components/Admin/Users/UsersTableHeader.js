import { Text, TouchableOpacity, View } from 'react-native';
import styles from './UsersStyles';

function SortIndicator({ sortField, field, sortDirection, style }) {
  if (sortField !== field) return null;
  return (
    <Text style={style}>
      {sortDirection === 'asc' ? ' ▲' : ' ▼'}
    </Text>
  );
}

export default function UsersTableHeader({ t, sortField, sortDirection, handleSort }) {
  return (
    <View style={styles.tableHeader}>
      <Text style={[styles.thText, { width: 32 }]}>#</Text>
      
      <TouchableOpacity 
        style={[styles.colHeader, styles.colName]} 
        onPress={() => handleSort('firstName')}
        activeOpacity={0.7}
      >
        <Text style={styles.thText}>{t('profileFirstName')} / {t('profileLastName')}</Text>
        <SortIndicator sortField={sortField} field="firstName" sortDirection={sortDirection} style={styles.sortArrow} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.colHeader, styles.colEmail]} 
        onPress={() => handleSort('email')}
        activeOpacity={0.7}
      >
        <Text style={styles.thText}>{t('profileEmail')}</Text>
        <SortIndicator sortField={sortField} field="email" sortDirection={sortDirection} style={styles.sortArrow} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.colHeader, styles.colPhone]} 
        onPress={() => handleSort('phone')}
        activeOpacity={0.7}
      >
        <Text style={styles.thText}>{t('profilePhone')}</Text>
        <SortIndicator sortField={sortField} field="phone" sortDirection={sortDirection} style={styles.sortArrow} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.colHeader, styles.colPhone]} 
        onPress={() => handleSort('city')}
        activeOpacity={0.7}
      >
        <Text style={styles.thText}>{t('profileCity')}</Text>
        <SortIndicator sortField={sortField} field="city" sortDirection={sortDirection} style={styles.sortArrow} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.colHeader, styles.colOrders, { justifyContent: 'flex-end' }]} 
        onPress={() => handleSort('orderCount')}
        activeOpacity={0.7}
      >
        <Text style={styles.thText}>{t('adminAnalyticsOrders')}</Text>
        <SortIndicator sortField={sortField} field="orderCount" sortDirection={sortDirection} style={styles.sortArrow} />
      </TouchableOpacity>
    </View>
  );
}
