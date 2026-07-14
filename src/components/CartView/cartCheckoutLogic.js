import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Alert } from 'react-native';
import { db } from '../../firebase';

function showAlert(title, message) {
  if (typeof window !== 'undefined' && window.alert) {
    window.alert(message || title);
  } else {
    Alert.alert(title, message);
  }
}

function getCleanItems(items) {
  return items.map(item => {
    const cleanItem = { ...item };
    Object.keys(cleanItem).forEach(key => {
      if (cleanItem[key] === undefined) delete cleanItem[key];
    });
    return cleanItem;
  });
}

export function calculateTotals(items) {
  const totalPrice = items.reduce((sum, item) => {
    const numPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
    return sum + numPrice * item.qty;
  }, 0);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return { totalPrice, totalItems };
}

function isProfileComplete(profile) {
  if (!profile) return false;
  const required = ['email', 'firstName', 'lastName', 'phone', 'city'];
  return required.every(key => {
    const val = profile[key];
    return typeof val === 'string' && val.trim().length > 0;
  });
}

async function fetchUserProfile(uid) {
  const userDocRef = doc(db, 'users', uid);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) return null;
  return userDocSnap.data().profile || null;
}

async function createOrder(uid, items, totalItems, totalPrice, note, customerInfo, isGuestOrder = false) {
  const orderData = {
    userId: uid,
    items: getCleanItems(items),
    totalItems,
    totalPrice,
    createdAt: serverTimestamp(),
    status: 'Новый заказ',
    customerInfo: {
      email: customerInfo.email,
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      phone: customerInfo.phone,
      city: customerInfo.city,
    },
    ...(isGuestOrder && { isGuestOrder: true }),
    ...(note && note.trim().length > 0 ? { note: note.trim() } : {})
  };
  await addDoc(collection(db, 'orders'), orderData);
}

function isCustomerInfoComplete(customerInfo) {
  if (!customerInfo) return false;
  const required = ['email', 'firstName', 'lastName', 'phone', 'city'];
  return required.every((key) => {
    const val = customerInfo[key];
    return typeof val === 'string' && val.trim().length > 0;
  });
}

export async function handleCheckoutProcess({ user, items, totalItems, totalPrice, note, customerInfo, clearCart, t }) {
  // Allow guest checkout if customer info is complete
  const isGuest = !user;
  
  if (!isCustomerInfoComplete(customerInfo)) {
    showAlert(
      t('cartIncompleteProfileTitle') || 'Incomplete Profile',
      t('cartIncompleteProfileMsg') || 'Your profile contains incomplete required information. You must complete your profile before placing an order.'
    );
    return;
  }

  try {
    // For guests, generate a unique guest ID; for authenticated users, use their UID
    const uid = isGuest ? `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : user.uid;
    await createOrder(uid, items, totalItems, totalPrice, note, customerInfo, isGuest);
    clearCart();
    showAlert(t('cartSuccessAlert'), t('cartSuccessMsg'));
  } catch (error) {
    console.error("Error creating order: ", error);
    showAlert(t('cartErrorTitle'), t('cartErrorAlert'));
  }
}
