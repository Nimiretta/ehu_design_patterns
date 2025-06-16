import type { IAttributable } from '../patterns/componentsModels/index.js';

export function hasAttributes(node: any): node is IAttributable {
  return Array.isArray(node.attributes);
}
