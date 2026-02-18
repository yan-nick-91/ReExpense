export type ValidationResult = {
  valid: boolean;
  error?: string;
};

export const validationResult = (
  value: string,
  errorMessage: string,
): ValidationResult => {
  if (!value) return { valid: false, error: errorMessage };
  return { valid: true };
};
