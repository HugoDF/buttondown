import {HTTPPayload} from './types';

export function validatePresence(
  fields: HTTPPayload,
  requiredFields: string[],
  errorMessage: string
): void {
  if (requiredFields.find((f) => !fields[f])) {
    throw new Error(errorMessage);
  }
}

export function validateNonEmptyObj(
  fields: HTTPPayload,
  errorMessage: string
): void {
  if (Object.keys(fields).length === 0) {
    throw new Error(errorMessage);
  }
}
