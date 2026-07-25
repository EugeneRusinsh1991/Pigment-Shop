/**
 * serviceContract.js
 * 
 * Defines the canonical standard for service error handling and standardizes 
 * the shape of responses returned by Data Access Layer functions.
 * 
 * The standard response shape is:
 * {
 *   success: boolean;
 *   data?: any;
 *   error?: string | Error;
 *   code?: string;
 * }
 */

/**
 * Executes a service operation safely, returning a standardized response payload.
 * Catches any thrown errors and wraps them in the standard { success: false, error: ... } shape.
 * 
 * @param {Function} operationFn - The async function to execute.
 * @param {string} defaultErrorMessage - The error message to use if none is provided.
 * @returns {Promise<{success: boolean, data?: any, error?: string, code?: string, originalError?: any}>}
 */
export async function executeServiceOperation(operationFn, defaultErrorMessage = 'An unexpected error occurred') {
  try {
    const result = await operationFn();
    return { success: true, data: result };
  } catch (error) {
    console.warn('[ServiceError]', error);
    
    // Normalize Firebase errors (which usually contain a slash in their code, e.g. "auth/user-not-found")
    const isFirebaseError = error && typeof error.code === 'string' && error.code.includes('/');
    
    return {
      success: false,
      error: error.message || defaultErrorMessage,
      code: error.code || 'service_error',
      originalError: error,
    };
  }
}

/**
 * A Higher-Order Function (Wrapper) to apply the service contract to any existing async function.
 * 
 * @param {Function} operationFn - The original async function
 * @param {string} defaultErrorMessage - Fallback error message
 * @returns {Function} A wrapped async function that returns the canonical service payload.
 */
export function withServiceContract(operationFn, defaultErrorMessage) {
  return async (...args) => {
    return await executeServiceOperation(() => operationFn(...args), defaultErrorMessage);
  };
}
