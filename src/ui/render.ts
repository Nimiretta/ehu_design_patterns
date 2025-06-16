import { AppConfig } from '../patterns/AppConfigSingleton.js';
import {
  prettyPrintXML,
  hasAttributes,
  validateXmlName,
  validateXmlAttributeValue,
  escapeHtml,
} from '../utils/index.js';
import { PreviewSubject } from '../patterns/previewObserver/index.js';
import {
  IFieldComponent,
  ICompositeComponent,
  IAttributable,
  IXmlAttribute,
} from '../patterns/componentsModels/index.js';

let treeRoot: HTMLElement | null;
let preview: HTMLTextAreaElement | null;
let attrBox: HTMLElement | null;

function domReady(): boolean {
  if (!treeRoot) {
    treeRoot = document.getElementById('tree-root');
    preview = document.getElementById('preview') as HTMLTextAreaElement;
    attrBox = document.getElementById('attr-panel');
  }
  return !!treeRoot && !!preview && !!attrBox;
}

export function renderTree(root: IFieldComponent, obs: PreviewSubject): void {
  if (!domReady()) return;
  treeRoot!.innerHTML = '';
  walk(root, treeRoot!, root, obs);
  adjustAttrVisibility();
}

export function updatePreview(root: IFieldComponent): void {
  if (!domReady()) return;
  const fmt = AppConfig.getInstance().exportFormat;
  if (fmt === 'json') {
    preview!.value = prettyPrint(root.getValue());
  } else {
    preview!.value = prettyPrintXML(root);
  }
}

function prettyPrint(val: any, indent = 0): string {
  const pad = (n: number) => '    '.repeat(n);
  if (Array.isArray(val)) {
    if (val.every((el) => typeof el === 'string' || typeof el === 'number' || typeof el === 'boolean' || el === null)) {
      return '[ ' + val.map((v) => JSON.stringify(v)).join(', ') + ' ]';
    } else {
      return (
        '[\n' + val.map((v) => pad(indent + 1) + prettyPrint(v, indent + 1)).join(',\n') + '\n' + pad(indent) + ']'
      );
    }
  } else if (val && typeof val === 'object') {
    const keys = Object.keys(val);
    if (!keys.length) return '{}';
    return (
      '{\n' +
      keys.map((k) => pad(indent + 1) + JSON.stringify(k) + ': ' + prettyPrint(val[k], indent + 1)).join(',\n') +
      '\n' +
      pad(indent) +
      '}'
    );
  } else {
    return JSON.stringify(val);
  }
}

export function adjustAttrVisibility(): void {
  const isXml = AppConfig.getInstance().exportFormat === 'xml';
  document.querySelectorAll<HTMLButtonElement>('.attr-btn').forEach((b) => (b.style.display = isXml ? '' : 'none'));

  if (!isXml && attrBox) {
    attrBox.classList.remove('visible');
    attrBox.innerHTML = '';
  }
}

// Tree rendering
function walk(node: IFieldComponent, ul: HTMLElement, root: IFieldComponent, obs: PreviewSubject): void {
  const tpl = (document.getElementById('tpl-field-item') as HTMLTemplateElement).content;
  const frag = tpl.cloneNode(true) as DocumentFragment;
  const li = frag.querySelector('li')!;

  li.querySelector('.tag')!.textContent = node.name;
  li.querySelector('.ml-2')!.innerHTML =
    node.type === 'value'
      ? escapeHtml(JSON.stringify(node.getValue()))
      : node.type === 'object'
        ? (() => {
            if (node.isComposite()) {
              const compositeNode = node as ICompositeComponent;
              return `(object, ${compositeNode.children.length} fields)`;
            }
            return '(object, 0 fields)';
          })()
        : (() => {
            if (node.isComposite()) {
              const compositeNode = node as ICompositeComponent;
              return `(array,  ${compositeNode.children.length} items)`;
            }
            return '(array, 0 items)';
          })();

  // REMOVE button
  const removeBtn = li.querySelector('.remove-btn') as HTMLButtonElement;
  if (node === root) {
    removeBtn.style.display = 'none';
  } else {
    removeBtn.addEventListener('click', () => {
      const parent = node.parent;
      if (parent && typeof (parent as any).remove === 'function') {
        (parent as any).remove(node);
      }
      if (parent?.type === 'array' && parent.isComposite()) {
        const parentComposite = parent as ICompositeComponent;
        parentComposite.children.forEach((c: IFieldComponent, i: number) => (c.name = i.toString()));
      }
      renderTree(root, obs);
      obs.notify();
    });
  }

  // ATTRIBUTES button
  const attrBtn = li.querySelector('.attr-btn') as HTMLButtonElement;
  attrBtn.addEventListener('click', () => attrPanel(node, obs, root));

  if (node.isComposite() && node !== root) {
    removeBtn.addEventListener('click', () => {
      const parent = node.parent;
      if (parent && typeof (parent as any).remove === 'function') {
        (parent as any).remove(node);
      }
      if (parent?.type === 'array' && parent.isComposite()) {
        const parentComposite = parent as ICompositeComponent;
        parentComposite.children.forEach((c: IFieldComponent, i: number) => (c.name = i.toString()));
      }
      renderTree(root, obs);
      obs.notify();
    });
  }

  if (node.isComposite()) {
    const compositeNode = node as ICompositeComponent;
    if (compositeNode.children.length) {
      const nested = li.querySelector('.nested-list') as HTMLElement;
      compositeNode.children.forEach((ch: IFieldComponent) => walk(ch, nested, root, obs));
    }
  }

  ul.appendChild(frag);
}

function attrPanel(node: IFieldComponent, obs: PreviewSubject, root: IFieldComponent): void {
  if (!attrBox) return;
  if (AppConfig.getInstance().exportFormat !== 'xml') return;
  if (!hasAttributes(node)) return;
  const attrNode = node as unknown as IAttributable;

  attrBox.classList.add('visible');
  attrBox.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <strong>Attributes for &lt;${node.name}&gt;</strong>
      <button id="close-attr-panel" class="attr-panel-close" title="Close">×</button>
    </div>
    <ul class="attr-list">
      ${attrNode.attributes
        .map(
          (a: IXmlAttribute) =>
            `<li>${escapeHtml(a.name)}=\"${escapeHtml(a.value)}\"` +
            `<button class="button is-small is-danger is-light" data-r="${a.name}">x</button></li>`,
        )
        .join('')}
    </ul>
    <div class="field is-grouped mt-2">
      <input id="attr-name"  class="input" placeholder="name">
      <input id="attr-value" class="input" placeholder="value">
      <button id="add-attr"  class="button is-small is-info">Add</button>
    </div>`;

  attrBox.querySelector('#close-attr-panel')!.addEventListener('click', () => {
    if (!attrBox) return;
    attrBox.classList.remove('visible');
    attrBox.innerHTML = '';
  });

  // Remove attribute buttons
  attrBox.querySelectorAll('[data-r]').forEach((btn) =>
    btn.addEventListener('click', () => {
      attrNode.removeAttribute((btn as HTMLElement).dataset.r!);
      attrPanel(node, obs, root);
      obs.notify();
    }),
  );

  // Add attribute button
  attrBox.querySelector('#add-attr')!.addEventListener('click', () => {
    const n = (attrBox!.querySelector('#attr-name') as HTMLInputElement).value.trim();
    const v = (attrBox!.querySelector('#attr-value') as HTMLInputElement).value;
    const nameErrors = validateXmlName(n, 'attribute');
    const valueErrors = validateXmlAttributeValue(v);
    if (nameErrors.length || valueErrors.length) {
      alert([...nameErrors, ...valueErrors].join('\n'));
      return;
    }
    if (!n) {
      alert('Name required');
      return;
    }
    try {
      attrNode.addAttribute({ name: n, value: v });
    } catch (e) {
      alert((e as Error).message);
      return;
    }
    attrPanel(node, obs, root);
    obs.notify();
  });
}
