/**
 * mockOrdersRepository.js
 *
 * Mock implementation of ordersRepository.js.
 * Mirrors the exact public API with simulated latency.
 */

import { withServiceContract } from '../serviceContract.js';
import { delay } from './mockFactories.js';

let _orderIdCounter = 1000;

async function _createOrder() {
  await delay();
  _orderIdCounter++;
  return { id: `mock-order-${_orderIdCounter}` };
}

async function _updateOrderStatus() {
  await delay(100);
}

async function _updateAdminNote() {
  await delay(100);
}

export const createOrder = withServiceContract(_createOrder, 'Mock: Failed to create order');
export const updateOrderStatus = withServiceContract(_updateOrderStatus, 'Mock: Failed to update order status');
export const updateAdminNote = withServiceContract(_updateAdminNote, 'Mock: Failed to update admin note');
