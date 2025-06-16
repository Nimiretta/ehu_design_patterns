import type { JSONValue } from '../componentsModels/FieldComponent.js';
import type { FieldComposite } from '../componentsModels/FieldComposite.js';

export interface StringCriteria {
  length?: number;
}

export interface NumberCriteria {
  min?: number;
  max?: number;
}

export type GenCriteria = StringCriteria | NumberCriteria | undefined;

export interface IGenStrategy<T = JSONValue | FieldComposite> {
  generate(name: string, criteria?: GenCriteria): T;
}
