export function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"\u00A0]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      case '\u00A0':
        return '&nbsp;';
      default:
        return c;
    }
  });
}

export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export const isValidNumber = (v: string) => !isNaN(Number(v));

export const isEmptyOrWhitespace = (s: string) => !s || !s.trim();
