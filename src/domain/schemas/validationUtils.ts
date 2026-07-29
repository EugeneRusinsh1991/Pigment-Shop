import { ZodSchema } from 'zod';

declare const __DEV__: boolean | undefined;

const SENSITIVE_KEY_REGEX = /token|password|auth|secret|credential/i;

function sanitizeValue(key: string, val: unknown, seen: WeakSet<object>, depth: number): unknown {
  if (SENSITIVE_KEY_REGEX.test(key)) return '[REDACTED]';
  if (typeof val === 'object' && val !== null) return sanitizeForLog(val, seen, depth + 1);
  return val;
}

function sanitizeObject(data: Record<string, unknown>, seen: WeakSet<object>, depth: number): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  for (const key of Object.keys(data)) {
    sanitized[key] = sanitizeValue(key, data[key], seen, depth);
  }
  return sanitized;
}

function sanitizeForLog(data: unknown, seen = new WeakSet<object>(), depth = 0): unknown {
  if (!data || typeof data !== 'object') return data;
  if (depth > 3) return '[Truncated]';
  if (seen.has(data as object)) return '[Circular]';

  seen.add(data as object);

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeForLog(item, seen, depth + 1));
  }

  return sanitizeObject(data as Record<string, unknown>, seen, depth);
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

