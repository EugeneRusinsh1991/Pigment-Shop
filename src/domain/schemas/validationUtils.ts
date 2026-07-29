import { ZodSchema } from 'zod';

declare const __DEV__: boolean | undefined;

function sanitizeForLog(data: unknown, seen = new WeakSet<object>(), depth = 0): unknown {
  if (!data || typeof data !== 'object') return data;
  if (depth > 3) return '[Truncated]';
  if (seen.has(data as object)) return '[Circular]';

  seen.add(data as object);

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeForLog(item, seen, depth + 1));
  }

  const sanitized: Record<string, unknown> = {};
  for (const key of Object.keys(data as Record<string, unknown>)) {
    const val = (data as Record<string, unknown>)[key];
    if (/token|password|auth|secret|credential/i.test(key)) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof val === 'object' && val !== null) {
      sanitized[key] = sanitizeForLog(val, seen, depth + 1);
    } else {
      sanitized[key] = val;
    }
  }
  return sanitized;
}

/**
 * Safely parses raw data against a Zod schema. If validation fails,
 * returns fallbackValue and logs issue field details in __DEV__ mode
 * without printing sensitive security credentials/tokens.
 */
export function parseWithFallback<T>(
  schema: ZodSchema<T>,
  rawData: unknown,
  fallbackValue: T
): T {
  const result = schema.safeParse(rawData);
  if (result.success) {
    return result.data;
  }

  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    console.warn(
      '[Validation Warning] Payload schema validation failed. Falling back to default.',
      {
        issues: result.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
        rawData: sanitizeForLog(rawData),
      }
    );
  }

  return fallbackValue;
}

/**
 * Safely deserializes and parses a JSON string (e.g. from AsyncStorage or LocalStorage).
 * If JSON parsing or validation fails, returns fallbackValue.
 */
export function parseStorageJsonWithFallback<T>(
  schema: ZodSchema<T>,
  rawJson: string | null | undefined,
  fallbackValue: T
): T {
  if (!rawJson || typeof rawJson !== 'string') {
    return fallbackValue;
  }
  try {
    const parsedObj = JSON.parse(rawJson);
    return parseWithFallback(schema, parsedObj, fallbackValue);
  } catch {
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      console.warn('[Validation Warning] Invalid JSON string in storage deserialization.');
    }
    return fallbackValue;
  }
}
