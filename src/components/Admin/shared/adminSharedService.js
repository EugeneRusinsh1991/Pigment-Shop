import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

/**
 * Fetches both users and orders collections from Firestore and returns them as mapped arrays.
 * @returns {Promise<{ users: Array, orders: Array }>}
 */
export async function fetchUsersAndOrders() {
  const [usersSnap, ordersSnap] = await Promise.all([
    getDocs(collection(db, 'users')),
    getDocs(collection(db, 'orders'))
  ]);

  const users = usersSnap.docs.map((docSnap) => ({
    uid: docSnap.id,
    ...docSnap.data()
  }));

  const orders = ordersSnap.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));

  return { users, orders };
}
