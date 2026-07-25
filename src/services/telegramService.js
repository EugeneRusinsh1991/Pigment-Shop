import { withServiceContract } from './serviceContract';

const TELEGRAM_SERVICE_URL = process.env.TELEGRAM_SERVICE_URL || 'http://localhost:5001';

async function _notifyOrderCreated(payload = {}) {
  if (!TELEGRAM_SERVICE_URL) return { status: 'skipped' };

  const response = await fetch(`${TELEGRAM_SERVICE_URL}/notify/order-created`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Telegram service returned ${response.status}`);
  }

  return await response.json();
}

export const notifyOrderCreated = withServiceContract(_notifyOrderCreated, 'Failed to notify order creation');
