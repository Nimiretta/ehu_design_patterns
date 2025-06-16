import {
  validateXmlName,
  downloadFile,
  showErrors,
  clearInputs,
  compositePaths,
  findNodeByPath,
} from '../utils/index.js';
import { PreviewSubject } from '../patterns/previewObserver/index.js';
import { renderTree, adjustAttrVisibility } from './render.js';
import { ExportFacade } from '../patterns/ExportFacade.js';
import { AppConfig, ExportFormat } from '../patterns/AppConfigSingleton.js';
import {
  FieldComposite,
  FieldLeaf,
  IFieldComponent,
  JSONValue,
  ICompositeComponent,
} from '../patterns/componentsModels/index.js';
import {
  RandomArrayStrategy,
  RandomBooleanStrategy,
  RandomNullStrategy,
  RandomNumberStrategy,
  RandomStringStrategy,
  RandomObjectStrategy,
  ManualStrategy,
  IGenStrategy,
} from '../patterns/genStrategy/index.js';

//  --------- Main setup entry ----------

interface SetupParams {
  root: FieldComposite;
  config: AppConfig;
  previewSubject: PreviewSubject;
}

export function setupUIHandlers({ root, config, previewSubject }: SetupParams) {
  const fieldNameInput = document.getElementById('field-name') as HTMLInputElement;
  const valueTypeSelect = document.getElementById('value-type') as HTMLSelectElement;
  const genModeSelect = document.getElementById('gen-mode') as HTMLSelectElement;
  const manualValueField = document.getElementById('manual-value-field')!;
  const manualValueInput = document.getElementById('manual-value') as HTMLInputElement;
  const booleanValueField = document.getElementById('boolean-value-field')!;
  const booleanValueSelect = document.getElementById('boolean-value') as HTMLSelectElement;
  const randomCriteriaFld = document.getElementById('random-criteria-field')!;
  const randomLengthInput = document.getElementById('random-length') as HTMLInputElement;
  const parentSelect = document.getElementById('parent-select') as HTMLSelectElement;
  const formatSelect = document.getElementById('format') as HTMLSelectElement;
  const addBtn = document.getElementById('add-field') as HTMLButtonElement;
  const exportBtn = document.getElementById('export') as HTMLButtonElement;
  const resetBtn = document.getElementById('reset') as HTMLButtonElement;
  const errorList = document.getElementById('error-list') as HTMLElement;

  // Default strategy
  const manualStrategy = new ManualStrategy();
  let currentStrategy: IGenStrategy = manualStrategy;

  // Parent dropdown
  function refreshParentSelect() {
    parentSelect.innerHTML = '';
    compositePaths(root).forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p.path.slice(1).join('.');
      opt.textContent = p.label;
      parentSelect.appendChild(opt);
    });
  }
  (window as any).refreshParentSelect = refreshParentSelect;
  refreshParentSelect();

  // Value types
  function updateValueTypeOptions() {
    const allowedTypes = config.getAllowedValueTypes();
    Array.from(valueTypeSelect.options).forEach((opt) => {
      if (!allowedTypes.includes(opt.value)) {
        opt.style.display = 'none';
        if (valueTypeSelect.value === opt.value) {
          valueTypeSelect.value = allowedTypes[0];
        }
      } else {
        opt.style.display = '';
      }
    });
  }

  // Format select change handler
  formatSelect.addEventListener('change', () => {
    config.exportFormat = formatSelect.value as ExportFormat;
    updateValueTypeOptions();
    previewSubject.notify();
    adjustAttrVisibility();
  });
  updateValueTypeOptions();

  // Inputs visibility
  function updateValueUI() {
    const t = valueTypeSelect.value;
    const random = genModeSelect.value === 'random';
    manualValueField.style.display = (t === 'string' || t === 'number') && !random ? '' : 'none';
    booleanValueField.style.display = t === 'boolean' && !random ? '' : 'none';
    randomCriteriaFld.style.display = t === 'string' && random ? '' : 'none';
  }

  valueTypeSelect.addEventListener('change', () => {
    if (genModeSelect.value === 'random') {
      currentStrategy = chooseRandomStrategy(valueTypeSelect.value);
    }
    updateValueUI();
  });

  genModeSelect.addEventListener('change', () => {
    currentStrategy = genModeSelect.value === 'random' ? chooseRandomStrategy(valueTypeSelect.value) : manualStrategy;
    updateValueUI();
  });

  updateValueUI();

  // ADD Button
  addBtn.addEventListener('click', () => {
    errorList.innerHTML = '';
    const key = fieldNameInput.value.trim();

    // XML validation
    if (formatSelect.value === 'xml') {
      const xmlNameErrors = validateXmlName(key, 'tag');
      if (xmlNameErrors.length) {
        showErrors(errorList, xmlNameErrors);
        return;
      }
    }

    const parentPath = parentSelect.value ? parentSelect.value.split('.') : [];
    const parentNode = parentPath.length === 0 ? root : findNodeByPath(root, parentPath);

    if (!parentNode || !parentNode.isComposite()) {
      showErrors(errorList, ['Parent not found or cannot contain children']);
      return;
    }
    const compositeParent = parentNode as ICompositeComponent;

    let finalKey = key;
    if (compositeParent.type === 'array') {
      if (!key) {
        finalKey = (compositeParent.children?.length || 0).toString();
      }
    } else if (compositeParent.type === 'object') {
      if (!key) {
        showErrors(errorList, ['Field name is required for objects']);
        return;
      }
      if (hasDuplicateKey(compositeParent, key)) {
        showErrors(errorList, [`Duplicate key "${key}" in this object`]);
        return;
      }
    }

    // Create child component
    let child: IFieldComponent;

    if (genModeSelect.value === 'random') {
      const criteria = valueTypeSelect.value === 'string' ? { length: Number(randomLengthInput.value) } : undefined;

      if (valueTypeSelect.value === 'object' || valueTypeSelect.value === 'array') {
        child = currentStrategy.generate(finalKey, criteria) as IFieldComponent;
      } else {
        const value = currentStrategy.generate(finalKey, criteria) as JSONValue;
        child = new FieldLeaf(finalKey, value);
      }
    } else {
      const rawVal = readManualValue(valueTypeSelect.value, manualValueInput, booleanValueSelect);
      manualStrategy.setValue(rawVal);

      if (valueTypeSelect.value === 'object') {
        child = new FieldComposite(finalKey, 'object');
      } else if (valueTypeSelect.value === 'array') {
        child = new FieldComposite(finalKey, 'array');
      } else {
        child = new FieldLeaf(finalKey, manualStrategy.generate(finalKey) as JSONValue);
      }
    }

    compositeParent.add(child);

    renderTree(root, previewSubject);
    previewSubject.notify();
    refreshParentSelect();
    clearInputs(fieldNameInput, manualValueInput);
  });

  // EXPORT Button
  exportBtn.addEventListener('click', () => {
    errorList.innerHTML = '';
    config.exportFormat = formatSelect.value as ExportFormat;
    const errs = root.validate(config.exportFormat);
    if (errs.length) {
      showErrors(errorList, errs);
      return;
    }
    const { data, mime, ext } = ExportFacade.export(root);
    downloadFile(`data.${ext}`, data, mime);
  });

  // RESET Button
  resetBtn.addEventListener('click', () => {
    if (root.isComposite()) {
      (root as ICompositeComponent).children?.splice(0);
    }
    renderTree(root, previewSubject);
    previewSubject.notify();
    refreshParentSelect();
    clearInputs(fieldNameInput, manualValueInput);
    errorList.innerHTML = '';
  });
}

// -------- Helpers for setupUIHandlers ----------

function hasDuplicateKey(parent: ICompositeComponent, key: string): boolean {
  return !!parent.children?.some((child) => child.name === key);
}

function chooseRandomStrategy(type: string): IGenStrategy {
  switch (type) {
    case 'string':
      return new RandomStringStrategy();
    case 'number':
      return new RandomNumberStrategy();
    case 'boolean':
      return new RandomBooleanStrategy();
    case 'null':
      return new RandomNullStrategy();
    case 'array':
      return new RandomArrayStrategy();
    case 'object':
      return new RandomObjectStrategy();
    default:
      return new RandomStringStrategy();
  }
}

function readManualValue(type: string, strInput: HTMLInputElement, boolSelect: HTMLSelectElement): JSONValue {
  switch (type) {
    case 'string':
      return strInput.value;
    case 'number':
      return Number(strInput.value);
    case 'boolean':
      return boolSelect.value === 'true';
    case 'null':
      return null;
    default:
      return strInput.value;
  }
}
