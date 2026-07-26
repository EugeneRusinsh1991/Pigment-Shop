export interface ElementHoverInfo {
  mouse: {
    x: number;
    y: number;
    active: boolean;
  };
  target: {
    rect: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    tag: string;
    selector: string;
    text: string;
  };
}

function buildSelector(el: HTMLElement, testId: string | null): string {
  if (testId) return `[data-testid="${testId}"]`;
  const tag = el.tagName ? el.tagName.toUpperCase() : 'ELEMENT';
  const id = el.id ? `#${el.id}` : '';
  const className =
    typeof el.className === 'string' && el.className.trim()
      ? `.${el.className.trim().split(/\s+/).join('.')}`
      : '';
  return `${tag.toLowerCase()}${id}${className}`;
}

function extractText(el: HTMLElement): string {
  return (
    el.innerText ||
    el.getAttribute('placeholder') ||
    el.getAttribute('aria-label') ||
    ''
  ).slice(0, 40).trim();
}

/**
 * Evaluates an HTML element and extracts hover/click info matching the structure
 * expected by takeCompressedScreenshot overlay renderer.
 */
export function extractElementHoverInfo(el: HTMLElement | null): ElementHoverInfo | null {
  if (!el || typeof el.getBoundingClientRect !== 'function') return null;

  try {
    const rect = el.getBoundingClientRect();
    const x = Math.round(rect.left + rect.width / 2);
    const y = Math.round(rect.top + rect.height / 2);
    const tag = el.tagName ? el.tagName.toUpperCase() : 'ELEMENT';
    const testId = el.getAttribute('data-testid');

    return {
      mouse: { x, y, active: true },
      target: {
        rect: {
          x: Math.round(rect.left),
          y: Math.round(rect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
        tag,
        selector: buildSelector(el, testId),
        text: extractText(el),
      },
    };
  } catch {
    return null;
  }
}
