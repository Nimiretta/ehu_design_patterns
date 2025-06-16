import type {
  ICompositeComponent,
  IFieldComponent,
  IAttributable,
  IXmlAttribute,
} from '../patterns/componentsModels/index.js';
import { hasAttributes } from './typeGuards.js';
import { escapeXml } from './stringUtils.js';

export function toXML(node: IFieldComponent): string {
  let attrs = '';
  if (hasAttributes(node)) {
    const attrNode = node as unknown as IAttributable;
    if (attrNode.attributes.length) {
      attrs = ' ' + attrNode.attributes.map((a: IXmlAttribute) => `${a.name}="${escapeXml(a.value)}"`).join(' ');
    }
  }
  if (node.type === 'value') {
    return `<${node.name}${attrs}>${escapeXml(String(node.getValue()))}</${node.name}>`;
  } else if ((node.type === 'object' || node.type === 'array') && node.isComposite()) {
    const compositeNode = node as ICompositeComponent;
    return `<${node.name}${attrs}>${compositeNode.children.map(toXML).join('')}</${node.name}>`;
  }
  return '';
}

export function prettyPrintXML(node: IFieldComponent, indent = 0): string {
  const pad = (n: number) => '    '.repeat(n); // 4 пробела
  let attrs = '';
  if (hasAttributes(node)) {
    const attrNode = node as unknown as IAttributable;
    if (attrNode.attributes.length) {
      attrs = ' ' + attrNode.attributes.map((a: IXmlAttribute) => `${a.name}="${escapeXml(a.value)}"`).join(' ');
    }
  }
  if (node.type === 'value') {
    return `${pad(indent)}<${node.name}${attrs}>${escapeXml(String(node.getValue()))}</${node.name}>`;
  } else if ((node.type === 'object' || node.type === 'array') && node.isComposite()) {
    const compositeNode = node as ICompositeComponent;
    if (!compositeNode.children.length) {
      return `${pad(indent)}<${node.name}${attrs}/>`;
    }
    return (
      `${pad(indent)}<${node.name}${attrs}>\n` +
      compositeNode.children.map((ch: IFieldComponent) => prettyPrintXML(ch, indent + 1)).join('\n') +
      `\n${pad(indent)}</${node.name}>`
    );
  }
  return '';
}
