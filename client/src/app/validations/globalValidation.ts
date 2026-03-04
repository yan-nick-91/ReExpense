export type ValidationResult = {
  valid: boolean;
  error?: string;
};

export const validationStringResult = (
  value: string,
  errorMessage: string,
): ValidationResult => {
  if (!value) return { valid: false, error: errorMessage };
  return { valid: true };
};

export const validationAboveZeroResult = (
  value: string,
  errorMessage: string,
): ValidationResult => {
  const trimmed = value.trim();

  if (!trimmed) return { valid: false, error: errorMessage };

  const parsed = +trimmed;

  if (Number.isNaN(parsed)) {
    return { valid: false, error: 'Must be a valid number' };
  }

  if (parsed <= 0)
    return { valid: false, error: 'Must be greater than zero' };
  return { valid: true };
};
