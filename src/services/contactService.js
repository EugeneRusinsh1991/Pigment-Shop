/**
 * @audit-keep Standalone contact & support firebase service
 */
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { COLLECTIONS } from './collections';
import { db } from './firebase';
import { withServiceContract } from './serviceContract';

async function _sendSupportMessage({ text, userId, email }) {
  const payload = {
    text,
    userId: userId || 'guest',
    email: email || 'guest',
    createdAt: serverTimestamp(),
  };
  await addDoc(collection(db, COLLECTIONS.SUPPORT_MESSAGES), payload);
}

export const sendSupportMessage = withServiceContract(_sendSupportMessage, 'Failed to send support message');
