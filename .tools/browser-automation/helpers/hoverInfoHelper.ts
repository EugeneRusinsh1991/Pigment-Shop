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
    const id = el.id ? `#${el.id}` : '';
    const className =
      typeof el.className === 'string' && el.className.trim()
        ? `.${el.className.trim().split(/\s+/).join('.')}`
        : '';
    const testId = el.getAttribute('data-testid');
    const selector = testId ? `[data-testid="${testId}"]` : `${tag.toLowerCase()}${id}${className}`;

    const text = (
      el.innerText ||
      el.getAttribute('placeholder') ||
      el.getAttribute('aria-label') ||
      ''
    )
      .slice(0, 40)
      .trim();

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
        selector,
        text,
      },
    };
  } catch {
    return null;
  }
}
