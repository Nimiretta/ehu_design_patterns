import { AppConfig } from './patterns/AppConfigSingleton.js';
import { FieldComposite } from './patterns/componentsModels/index.js';
import { PreviewSubject, PreviewObserver } from './patterns/previewObserver/index.js';
import { setupUIHandlers } from './ui/uiHandler.js';
import { renderTree } from './ui/render.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadTemplates();

    const config = AppConfig.getInstance();

    const root = new FieldComposite('root', 'object');

    const previewSubject = new PreviewSubject();
    const previewObserver = new PreviewObserver(root);
    previewSubject.subscribe(previewObserver);

    renderTree(root, previewSubject);

    setupUIHandlers({ root, config, previewSubject });
  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
});

async function loadTemplates() {
  try {
    const response = await fetch('src/ui/templates.html');
    if (!response.ok) {
      throw new Error(`Failed to load templates: ${response.status}`);
    }
    const html = await response.text();
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
  } catch (error) {
    console.error('Failed to load templates:', error);
    throw error;
  }
}
