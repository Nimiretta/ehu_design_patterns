/* eslint-disable max-classes-per-file */
export class InvalidDataException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidDataException';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
