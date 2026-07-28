import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { COLLECTIONS } from './collections';
import { db } from './firebase';

function sortByCreatedAtDesc(a, b) {
  const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
  const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
  return timeB - timeA;
}

export function subscribeUserOrders(userId, onUpdate, onError) {
  const q = query(collection(db, COLLECTIONS.ORDERS), where('userId', '==', userId));
  return onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort(sortByCreatedAtDesc);
      onUpdate(data);
    },
    onError
  );
}
