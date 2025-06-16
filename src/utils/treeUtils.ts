import type { ICompositeComponent, IFieldComponent } from '../patterns/componentsModels/index.js';

export function findNodeByPath(node: IFieldComponent, path: string[]): IFieldComponent | null {
  if (path.length === 0) return node;
  if (!node.isComposite()) return null;
  const [head, ...tail] = path;
  const child = (node as ICompositeComponent).children.find((c: { name: string }) => c.name === head);
  return child ? findNodeByPath(child, tail) : null;
}

export function getAllPaths(
  node: IFieldComponent,
  prefix: string[] = [],
): { label: string; path: string[]; type: 'object' | 'array' | 'value' }[] {
  const out: { label: string; path: string[]; type: 'object' | 'array' | 'value' }[] = [
    {
      label: prefix.concat(node.name).join('.'),
      path: prefix.concat(node.name),
      type: node.type,
    },
  ];
  if (node.isComposite()) {
    (node as ICompositeComponent).children.forEach((child: IFieldComponent) =>
      out.push(...getAllPaths(child, prefix.concat(node.name))),
    );
  }
  return out;
}

export function compositePaths(root: IFieldComponent) {
  return getAllPaths(root).filter((p) => {
    const node = findNodeByPath(root, p.path.slice(1));
    return node && (node.type === 'object' || node.type === 'array');
  });
}
