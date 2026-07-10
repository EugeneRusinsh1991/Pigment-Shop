import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import commonStyles from '../theme/commonStyles';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import OrderCard from './OrderCard';
import { useTheme } from '../context/ThemeContext';

export default function OrdersPage({ isDark }) {
  const { t } = useTheme();
  const getStyle = (dark, light) => (isDark ? dark : light);
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      
      ordersData.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      
      setOrders(ordersData);
    }, (error) => {
      console.error("Error fetching orders: ", error);
    });

    return () => unsubscribe();
  }, [user]);

  const toggleExpand = (orderId) => {
    setExpandedOrders(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <ScrollView 
      style={[commonStyles.container, getStyle(commonStyles.containerDark, commonStyles.containerLight)]}
      showsVerticalScrollIndicator={false}
    >
      <View style={commonStyles.content}>
        <Text style={[commonStyles.title, getStyle(commonStyles.textDark, commonStyles.textLight)]}>
          {t('ordersTitle')}
        </Text>
        
        {orders.length === 0 ? (
          <Text style={[getStyle(commonStyles.subtextDark, commonStyles.subtextLight), { marginTop: 20 }]}>
            {t('ordersEmpty')}
          </Text>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isDark={isDark}
              isExpanded={!!expandedOrders[order.id]}
              onToggle={() => toggleExpand(order.id)}
              getStyle={getStyle}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

